'use strict'
var gPageIdx = loadFromStorage('pageDB')
var isTable = true
var isCreateBookOpen = false
if(isNaN(gPageIdx)) gPageIdx = 1

function onInit() {
    isTable = loadFromStorage('favLayout')
    isTable? renderBooks() : renderTiles()
    onSetFilter({value: 'all'})
}

function renderBooks(books = gBooks) {
    isTable = true
    document.querySelector('.books-table').innerHTML = `<thead>
        <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Price</th>
            <th>Rate</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody class="books-container"></tbody>`
    /* const books = gBooks */ 
    const strHtmls = books.map(book => {
        return `<tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td class="rate">
                <button class="plus" onclick="onPlusRate(${book.id})">+</button>
                <p class="rate-num">${book.rate}</p>
                <button class="minus" onclick="onMinusRate(${book.id})">-</button>
            </td>
            <td><button class="action read" onclick="onReadBook(${book.id})">Read</button></td>
            <td><button class="action update" onclick="onUpdateBook(${book.id})">Update</button></td>
            <td><button class="action delete" onclick="onRemoveBook(${book.id})">Delete</button></td>
            <tr>`
    }).join('')
    document.querySelector('.books-container').innerHTML = strHtmls
    document.querySelector('.books-cards').innerHTML = ''
    gBooks.forEach(book => {
        if(book.isOpen) onReadBook(book.id)
    });
    document.querySelector('.tiles').style.backgroundColor = ''
    document.querySelector('.lines').style.backgroundColor = 'turquoise'
    document.querySelector('table').style.border = '1px solid black'
}

function onRemoveBook(bookId){
    removeBook(bookId)
    isTable? renderBooks() : renderTiles()
}

function onAddBook(ev){
    ev.preventDefault()
   /*  var name= prompt('what is the name of the book?')
    var price= +prompt('what is the price of the book?') */
    var name = document.querySelector('[name = book-name]').value
    var price = document.querySelector('[name = book-price]').value
    if(name.length > 0 && !isNaN(price)){
        price = parseFloat(price).toFixed(2) + '$'
        addBook(name,price)
        isTable? renderBooks() : renderTiles()
        document.querySelector('.add-book').style.display = 'none'
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
    document.querySelector('.books-table').style.border = "1px solid black"
    document.querySelector('.books-table').style.display = ''
    _saveBooksToStorage('favLayout', isTable)
}

function renderTiles(books = gBooks){
    isTable = false
    const strHtmls = books.map(book => {
        return `<section class="book book${book.id}">
        <section class= "id">Id:${book.id}</section>     
        ${book.cover}
        <section class= "title">Title:${book.title}</section>     
            <section class= "price">Price:${book.price}</section>     
            <section class="rate">
                <button class="plus" onclick="onPlusRate(${book.id})">+</button>
                <p class="rate-num">${book.rate}</p>
                <button class="minus" onclick="onMinusRate(${book.id})">-</button>
            </section>
            <section><button class="action read" onclick="onReadBook(${book.id})">Read</button></section>
            <section><button class="action update" onclick="onUpdateBook(${book.id})">Update</button></section>
            <section><button class="action delete" onclick="onRemoveBook(${book.id})">Delete</button></section>
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
}

function onCreateBook(){ 
    document.querySelector('.add-book').style.display = 'block'
}