'use strict'
const STORAGE_KEY = 'bookDB'

var gBooks
var gBookIdCounter
var gFilterBy
var gOpenBook
var gBookId


_createbooks()
/* document.getElementsByName('book-name')[0].placeholder = 'dude' */
/* document.querySelector('.All').innerHTML =  */

const i18n = [
    {
        h1:{heb:"ברוך הבא לחנות הספרים שלי" ,eng:"Welcome to my bookshop"},
        id:{heb:"מזהה", eng:"Id"},
        title:{heb:"כותרת", eng:"Title"},
        price:{heb:"מחיר", eng:"Price"},
        rate:{heb:"דירוג", eng:"Rate"},
        action:{heb:"פעולות", eng:"Action"},
        currecy:{heb:"\u20AA" ,eng:"\u0024"},
        read:{heb:"קרא" ,eng:"Read"},
        update:{heb:"עדכן" ,eng:"Update"},
        delete:{heb:"מחק" ,eng:"Delete"},
        addBook:{heb:"צור ספר חדש" ,eng:"create new book"},
        bookName:{heb:"שם הספר" ,eng:"Type the book name"},
        bookPrice:{heb:"מחיר הספר" ,eng:"Type the book price"},
        all:{heb:"הכל" ,eng:"All"},
        maxPrice:{heb:"מחיר מקסימלי" ,eng:"Max Price"}, 
        minRate:{heb:"דירוג מינימלי" ,eng:"Min Rate"},
        add:{heb:"הוסף" ,eng:"Add"},
    }
]

function _createbook(title, price) {
    gBookIdCounter++
    return {
        id: gBookIdCounter,
        title, 
        price,
        desc: [],
        pageSize: Math.floor(getRandomIntInclusive(1,6)),
        rate: 0,
        isOpen: false,
        cover: '<img class="cover" src="img/bookCover' + gBookIdCounter + '.jpg ">'
    }
}

function _createbooks() {
    var books = loadFromStorage(STORAGE_KEY)
    // Nothing in storage - generate demo data
    if (!books || !books.length) {
        books = [
            {
                id: 1,
                title: 'Learning Laravel',
                price: 18.90 + '$',
                desc: [],
                pageSize: Math.floor(getRandomIntInclusive(1,6)),
                rate: 0,
                isOpen: false,
                cover: '<img class="cover" src="img/bookCover1.jpg">'
            },
            {
                id: 2,
                title:'Beginning with Laravel',
                price: 6.65 + '$',
                desc: [],
                pageSize: Math.floor(getRandomIntInclusive(1,6)),
                rate: 0,
                isOpen: false,
                cover: '<img class="cover" src="img/bookCover2.jpg">'
            },
            {
                id: 3,
                title: 'Java for developers',
                price: 7.20 + '$',
                desc: [],
                pageSize: Math.floor(getRandomIntInclusive(1,6)),
                rate: 0,
                isOpen: false,
                cover: '<img class="cover" src="img/bookCover3.jpg">'
            }
        ]
        books.forEach(book => {
            makePages(book)
        });
    }
    gBooks = books
    gBookIdCounter = gBooks.length  
    _saveBooksToStorage()
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function addBook(name,price){
    const book = _createbook(name,price)
    makePages(book)
    gBooks.push(book)
    document.querySelector('[name = book-name]').value = ""
    document.querySelector('[name = book-price]').value = ""
    openCreateBook()
    _saveBooksToStorage()
}

function updateBook(ev){
    ev.preventDefault()
    var price = document.querySelector('[name = book-update-price]').value
    const bookIdx = gBooks.findIndex(book => gBookId === book.id)
    if(price != ''){
        price = parseFloat(price).toFixed(2) + '$'
        gBooks[bookIdx].price =  price
        updateToggle('.update-book')
        _saveBooksToStorage()
        isTable? renderBooks() : renderTiles()
    }
    document.querySelector('.update-book').classList.remove('open')
    document.querySelector('[name = book-update-price]').value =''
    isUpdateBookOpen = false
}

function getBookById(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    return book
}

function plusRate(bookId){
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    if(gBooks[bookIdx].rate < 10) gBooks[bookIdx].rate++
    _saveBooksToStorage()
}

function minusRate(bookId){
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    if(gBooks[bookIdx].rate > 0) gBooks[bookIdx].rate--
    _saveBooksToStorage()
}

function setFilter(sort){
    if(sort.value === "price") {
        gBooks.sort(compareByPrice)
        _saveBooksToStorage() 
    }else if(sort.value === "rate"){
        gBooks.sort(compareByRate)
        _saveBooksToStorage()
    }else{
        gBooks.sort(compareById)
        _saveBooksToStorage()
    }
    const queryStringParams = `?sort=${sort.value}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({path: newUrl},'',newUrl)
}

function compareByPrice(book1, book2){
    return parseInt(book2.price) - parseInt(book1.price)
}

function compareByRate(book1,book2){
    return book1.rate - book2.rate
}

function compareById(book1,book2){
    return book1.id - book2.id
}

function setFilterByTxt(txt){
    gFilterBy = txt
    var books
    books = gBooks.filter(book => book.title.toLowerCase().includes(gFilterBy.toLowerCase()))
    console.log(books);
    return books
}

function readBook(bookId){
    console.log(gPageIdx);
    var book = getBookById(bookId)
    gOpenBook = book
    book.isOpen = true 
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.title
    elModal.querySelector('.modal-p').innerText = book.desc[gPageIdx - 1]
    elModal.querySelector('.page-num').innerHTML = gPageIdx + '/' + book.pageSize
    elModal.classList.add('open')
}

function nextPage(){
    var elModal = document.querySelector('.modal')
    if(gPageIdx < gOpenBook.pageSize){
        gPageIdx++
        elModal.querySelector('.modal-p').innerText = gOpenBook.desc[gPageIdx - 1]
        elModal.querySelector('.page-num').innerHTML = gPageIdx + '/' + gOpenBook.pageSize
        _saveBooksToStorage('pageDB',gPageIdx)
    }
}

function prevPage(){
    var elModal = document.querySelector('.modal')
    if(gPageIdx > 0){
        gPageIdx--
        elModal.querySelector('.modal-p').innerText = gOpenBook.desc[gPageIdx - 1]
        elModal.querySelector('.page-num').innerHTML = gPageIdx + '/' + gOpenBook.pageSize
        _saveBooksToStorage('pageDB',gPageIdx)
    }
}

function makePages(book){
    for(var i = 0; i< book.pageSize; i++){
        book.desc.push(makeLorem())
    }
}

function _saveBooksToStorage(key = STORAGE_KEY, val = gBooks){
    saveToStorage(key, val)
}

function updateToggle(){
    if(isUpdateBookOpen){
        /* document.querySelector('.add-book').style.display = 'none' */
        document.querySelector('.update-book').classList.remove('open')
        isUpdateBookOpen = false
    }else{
        /* document.querySelector('.add-book').style.display = 'block' */
        document.querySelector('.update-book').classList.add('open')
        isUpdateBookOpen = true
    }
}

function closeModal(){
    document.querySelector('.modal').classList.remove('open')
    gPageIdx = 1
    _saveBooksToStorage('pageDB', gPageIdx)
    _saveBooksToStorage()
}

function openCreateBook(){
    if(isCreateBookOpen){
        isCreateBookOpen = false
        document.querySelector('.add-book').style.display = 'none'
        console.log(isCreateBookOpen);

    }else{
        isCreateBookOpen = true
        document.querySelector('.add-book').style.display = 'block'
        console.log(isCreateBookOpen);
    } 
}

function changeLeng(leng){
    var direction
    leng === 'heb' ? direction = 'rtl' : direction = 'ltr'; 
    var elText = document.querySelectorAll('.leng')
    elText.forEach(text => {
        var nameI18n = text.classList[text.classList.length - 1]
        text.innerHTML = i18n[0][nameI18n][leng]
    });
    document.getElementsByName('book-name')[0].placeholder = i18n[0]['bookName'][leng]
    document.getElementsByName('new-book-name')[0].placeholder = i18n[0]['bookName'][leng]
    document.getElementsByName('book-price')[0].placeholder = i18n[0]['bookPrice'][leng]
    document.getElementsByName('book-update-price')[0].placeholder = i18n[0]['bookPrice'][leng]
    document.querySelector('body').style.direction = direction
    document.querySelector('.update-book').style.direction = direction
    gLengKey = leng
    _saveBooksToStorage('lengDB',gLengKey)
    
}


