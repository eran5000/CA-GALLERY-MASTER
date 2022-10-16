'use strict'
var gPageIdx = loadFromStorage('pageDB')
var gLengKey = loadFromStorage('lengDB')
var isTable = true
var isUpdateBookOpen = false
var isCreateBookOpen = false 
if(isNaN(gPageIdx)) gPageIdx = 1
console.log(gLengKey);
if(gLengKey === null) gLengKey = 'eng'

function onInit() {
    isTable = loadFromStorage('favLayout')
    isTable? renderBooks() : renderTiles()
    onSetFilter({value: 'all'})
    caruselrender()
}

function renderBooks(books = gBooks) {
    isTable = true
    document.querySelector('.books-table').innerHTML = `<thead>
        <tr>
            <th scope="col" class="text-center border-secondary leng id">Id</th>
            <th scope="col" class="text-center border-secondary leng title">Title</th>
            <th scope="col" class="text-center border-secondary leng price">Price</th>
            <th scope="col" class="text-center border-secondary leng rate">Rate</th>
            <th scope="col" colspan="3" class="text-center border-secondary leng action">Actions</th>
        </tr>
        </thead>
        <tbody class="books-container"></tbody>`
    /* const books = gBooks */ 
    const strHtmls = books.map(book => {
        return `<tr scope="row">
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td class="rate">
                <button class="plus" onclick="onPlusRate(${book.id})">+</button>
                <p class="rate-num">${book.rate}</p>
                <button class="minus" onclick="onMinusRate(${book.id})">-</button>
            </td>
            <td><button class="leng action read" onclick="onReadBook(${book.id})">Read</button></td>
            <td><button class="leng action update" onclick="onUpdateBook(${book.id})">Update</button></td>
            <td><button class="leng action delete" onclick="onRemoveBook(${book.id})">Delete</button></td>
            <tr>`
    }).join('')
    document.querySelector('.books-container').innerHTML = strHtmls
    document.querySelector('.books-cards').innerHTML = ''
    gBooks.forEach(book => {
        if(book.isOpen) onReadBook(book.id)
    });
    document.querySelector('.tiles').style.backgroundColor = ''
    document.querySelector('.lines').style.backgroundColor = 'turquoise'
    /* document.querySelector('table').style.border = '1px solid black' */
    changeLeng(gLengKey)
}

function onRemoveBook(bookId){
    removeBook(bookId)
    isTable? renderBooks() : renderTiles()
}

function onAddBook(ev){
    ev.preventDefault()
   /*  var name= prompt('what is the name of the book?')
    var price= +prompt('what is the price of the book?') */
    var name = document.querySelector('[name = new-book-name]').value
    var price = document.querySelector('[name = book-price]').value
    if(name.length > 0 && !isNaN(price)){
        price = parseFloat(price).toFixed(2) + '$'
        addBook(name,price)
        isTable? renderBooks() : renderTiles()
        caruselrender()
    }
}

function onUpdateBook(bookId){
    /* var price = document.querySelector('[name = book-update-price]').value
    price = parseFloat(price).toFixed(2)
    updateBook(bookId,price)
    isTable? renderBooks() : renderTiles() */
    updateToggle()
    gBookId = bookId
}

function onReadBook(bookId){
    buttonDisable(true)
    readBook(bookId)
    _saveBooksToStorage()
}

function onNextPage(){
    nextPage()
}

function onPrevPage(){
    prevPage()
}

function onCloseModal(){
    isOpenFalse()
    buttonDisable(false)
    closeModal()
}

function onPlusRate(bookId){
    plusRate(bookId)
    isTable? renderBooks() : renderTiles()
}

function onMinusRate(bookId){
    minusRate(bookId)
    isTable? renderBooks() : renderTiles()
}

function onSetFilter(sort){
    setFilter(sort)
    isTable? renderBooks() : renderTiles()
}


function onSetFilterByTxt(txt) {
    console.log('Filtering by txt', txt)
    isTable? renderBooks(setFilterByTxt(txt)) : renderTiles(setFilterByTxt(txt))
}

function onSwitchingTiles(){
    document.querySelector('.books-table').innerHTML = ''
    document.querySelector('.books-table').style.border = '0'
    renderTiles()
    _saveBooksToStorage('favLayout', isTable)
}

function onSwitchingTable(){
    document.querySelector('.books-table').innerHTML = ''
    renderBooks()
    /* document.querySelector('.books-table').style.border = "1px solid black" */
    document.querySelector('.books-table').style.display = ''
    _saveBooksToStorage('favLayout', isTable)
}

function renderTiles(books = gBooks){
    isTable = false
    const strHtmls = books.map(book => {
        return `<section class="book book${book.id}">
            <section class= "row">
                <section class= "leng id">Id</section>
                <section class= "col-xs-6">:${book.id}</section>
            </section>     
            ${book.cover}
            <section class= "row"> 
                <section class= "col-xs-6 leng title">Title</section>
                <section class= "col-xs-6">:${book.title}</section>
            </section>
            <section class= "row">     
                <section class= "col-xs-6 leng price">Price</section>
                <section class= "col-xs-6">:${book.price}</section>
            </section>     
            <section class="rate">
                <button class="plus" onclick="onPlusRate(${book.id})">+</button>
                <p class="rate-num">${book.rate}</p>
                <button class="minus" onclick="onMinusRate(${book.id})">-</button>
            </section>
                <section><button class="leng action read" onclick="onReadBook(${book.id})">Read</button></section>
                <section><button class="leng action update" onclick="onUpdateBook(${book.id})">Update</button></section>
                <section><button class="leng action delete" onclick="onRemoveBook(${book.id})">Delete</button></section>
            </section>
        </section>`
    }).join('')
    document.querySelector('.books-table').innerHTML = ''
    document.querySelector('.books-cards').innerHTML = strHtmls
    var book = document.querySelectorAll('.book')
    book.forEach(book => {
        book.style.border = '1px solid black'
        book.style.padding = '15px'
    });
    gBooks.forEach(book => {
        if(book.isOpen) onReadBook(book.id)
    });
    document.querySelector('.tiles').style.backgroundColor = 'turquoise'
    document.querySelector('.lines').style.backgroundColor = ''
    changeLeng(gLengKey)
}

function onCreateBook(){ 
    openCreateBook()
}

function onChangeLeng(leng){
    changeLeng(leng)
}

function caruselrender(books = gBooks){
    const strHtmls = books.map(book => {
        return `<div class="text-center carousel-item">
            <div class="col-md-4 mx-auto" alt="${book.id}">
            <section class= "row"> 
                <section class= "col-xs-6 leng title">Title</section>
                <section class= "col-xs-6">:${book.title}</section>
            </section>
            ${book.cover}
            <section class= "row">     
                <section class= "col-xs-6 leng price">Price</section>
                <section class= "col-xs-6">:${book.price}</section>
            </section>
            </div>
            </div>`
    }).join('')
    document.querySelector('.carousel-inner').innerHTML = strHtmls
    document.querySelector('.carousel-item').classList.add('active')
    /* <div class="carousel-item active">
            <div class="col-md-4 mx-auto" alt="First slide">
              <span class="fa-stack fa-4x">
                <i class="fa fa-square fa-stack-2x text-primary"></i>
                <i class="fa fa-users fa-stack-1x fa-inverse"></i>
              </span>
              <h4 class="service-heading">Team Worker</h4>
              <p class="text-muted">strong communication skills, an active listener, and know how to develops and maintains credibility with colleagues.</p>
            </div> */
}