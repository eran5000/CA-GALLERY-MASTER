'use strict'

function makeId(counter) {
    counter++
    return counter
}

function isOpenFalse(){
    gBooks.forEach(book => {
        book.isOpen = false
    });
}

function buttonDisable(bolian){
    var elButton = document.querySelectorAll('.action')
    elButton.forEach(button => {
        button.disabled = bolian
        bolian? button.style.backgroundColor = 'grey' : button.style.backgroundColor = ''
    });
}

function makeLorem(wordCount = 100) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (wordCount > 0) {
        wordCount--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    var randoNum = (Math.random() * (max - min + 1)) + min
    return  parseFloat(randoNum).toFixed(2)//The maximum is inclusive and the minimum is inclusive 
}