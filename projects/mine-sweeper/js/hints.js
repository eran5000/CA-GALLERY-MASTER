'use strict'
const HINT = '<img class="lightbulb" src="./Img/hint.png">'
const HINTUSE = '<img class="lightbulb" src="./Img/hintuse.png">'
const gElHint = document.querySelector('.hints')

var gHintUses
var isHintUse
var safeClicks
var gElSafeClick = document.getElementById('safe-click')

function hintShown(rowIdxStart, rowIdxEnd, colIdxStart, colIdxEnd){
    var elCell
    var cell
    for(var i = rowIdxStart; i <= rowIdxEnd; i++){
        for(var j = colIdxStart; j <= colIdxEnd ; j++){
            cell = '.cell-' + i + '-' + j
            elCell = document.querySelector(cell)
            if(isHintUse){
                if(elCell.style.backgroundColor != 'grey'){
                    elCell.style.backgroundColor = 'yellow'
                    elCell.style.color = 'black'
                }
            }
        }
    }
    if(isHintUse) hintFinish()
}

function showHint(element){
    if(gFirstClick && gGame.isOn){
        var elLightBulb
        elLightBulb = document.querySelector(element)
        if(isHintUse){
            elLightBulb.innerHTML = HINT
            isHintUse = false
        }else{
            elLightBulb.innerHTML = HINTUSE
            isHintUse = true
        }
        return
    }
}

function hintFinish(){
    gGame.isOn = false
    isHintUse = false
    gHintUses--
    hintRender()
    var elCell
    var cell
    var interval = setInterval(hintDelete,1000)
    function hintDelete(){
        for(var i = 0; i < gBoard.length; i++){
            for(var j = 0; j < gBoard[0].length ; j++){
                cell = '.cell-' + i + '-' + j
                elCell = document.querySelector(cell)
                if(elCell.style.backgroundColor === 'yellow'){
                    elCell.style.backgroundColor = 'white'
                    elCell.style.color = 'white'
                }
            }
        }
        gGame.isOn = true
        clearInterval(interval)
    }
}

function hintRender(){
    gElHint.innerHTML = ' '
    for(var i = 0; i < gHintUses; i++){
        gElHint.innerHTML += `<button class="hint hint` + i + `" onclick="showHint('.hint` + i + `')">` + HINT + `</button>`
    }
}

function safeClick(){
    var cell
    var elCell
    if(gGame.isOn && safeClicks > 0 && gFirstClick){
        safeClicks--
        gElSafeClick.innerHTML = safeClicks
        for(var i = 0; i < gBoard.length; i++){
            for(var j = 0; j < gBoard[0].length; j++){
                cell = '.cell-' + i + '-' + j
                elCell = document.querySelector(cell)
                if(!gBoard[i][j].isMine && elCell.style.backgroundColor != 'grey' && elCell.style.backgroundColor != 'blue'){
                    elCell.style.backgroundColor = 'blue'
                    elCell.style.color = 'blue'
                    return
                }
            }
        }
    }
}
