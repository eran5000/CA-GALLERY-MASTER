'use strict'
const STORAGE_KEY = 'projDB'

var gProj
var gFilterBy
var gOpenBook
var gBookId

_createbooks()

function _createbook(name,title,url,publishedAt,) {
    return {
        id: makeId(), 
        name, 
        title, 
        desc: "lorem ipsum lorem ipsum lorem ipsum", 
        url, 
        publishedAt, 
        labels: ["Matrixes", "keyboard events"],
    }
}

function _createbooks() {
    var projs = loadFromStorage(STORAGE_KEY)
    // Nothing in storage - generate demo data
    if (!projs || !projs.length) {
        projs = [
            {
                id: "mine-sweeper", 
                name: 'MineSweeper', 
                title: 'Find all the mines', 
                desc: "lorem ipsum lorem ipsum lorem ipsum", 
                url, 
                publishedAt, 
                labels: ["Matrixes", "keyboard events"],
            },
            {
                id: 'to-do', 
                name: 'MvcToDo', 
                title, 
                desc: "lorem ipsum lorem ipsum lorem ipsum", 
                url, 
                publishedAt, 
                labels: ["Matrixes", "keyboard events"],
            },
            {
                id: 'book-shop', 
                name: 'BookShop', 
                title, 
                desc: "lorem ipsum lorem ipsum lorem ipsum", 
                url, 
                publishedAt, 
                labels: ["Matrixes", "keyboard events"],
            },
        ]
    }
    gProj = projs 
    _saveBooksToStorage()
}

function _saveBooksToStorage(key = STORAGE_KEY, val = gProj){
    saveToStorage(key, val)
}