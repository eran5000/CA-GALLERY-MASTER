'use strict'
const STORAGE_KEY = 'projDB'

var gProjs
var gFilterBy
var gOpenBook
var gBookId

_createprojs()

function _createprojs() {
    var projs = loadFromStorage(STORAGE_KEY)
    // Nothing in storage - generate demo data
    if (!projs || !projs.length) {
        projs = [
            {
                id: 'mine-sweeper', 
                name: 'MineSweeper', 
                title: 'Find all the mines', 
                desc: "lorem ipsum lorem ipsum lorem ipsum",
                img: 'img/portfolio/minesweeper.png', 
                url: 'projects/mine-sweeper/index.html', 
                publishedAt: '29/09/2022', 
                labels: ["Matrixes", "mouse events"],
            },
            {
                id: 'mvc-to-do', 
                name: 'MvcToDo', 
                title: 'You can manage all of your tasks', 
                desc: "lorem ipsum lorem ipsum lorem ipsum",
                img: 'img/portfolio/to-do-list.png', 
                url: 'projects/mvc-to-do/index.html', 
                publishedAt: '03/10/2022', 
                labels: ["MVC", "mouse events"],
            },
            {
                id: 'book-shop', 
                name: 'BookShop', 
                title: 'Check the price rate and summery of the latest books', 
                desc: "lorem ipsum lorem ipsum lorem ipsum",
                img: 'img/portfolio/bookshop.jpg', 
                url: 'projects/book-shop/index.html', 
                publishedAt:'06/10/2022', 
                labels: ["CRUDL", "mouse events"],
            },
        ]
    }
    gProjs = projs 
    _saveprojsToStorage()
}

function _saveprojsToStorage(key = STORAGE_KEY, val = gProjs){
    saveToStorage(key, val)
}