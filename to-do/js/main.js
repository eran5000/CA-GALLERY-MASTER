'use strict'
const date = Date()
var gToDoPlace  


function onInit() {
    renderTodos()
    getTotalCount() === 0 ? gToDoPlace = getTotalCount() : gToDoPlace = gTodos[gTodos.length - 1].place + 1
}


function renderTodos() {

    const todos = getTodosForDisplay()
    var elTotal = document.querySelector('span.total')

    const strHTMLs = todos.map(todo => `
        <li class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
            (${todo.importance})
            ${todo.txt}
            <button onclick="onRemoveTodo(event,'${todo.id}')" >X</button>
            <span class="time-stamp">${todo.date}</span>
        </li>
    `)
        
    document.querySelector('ul').innerHTML = strHTMLs.join('')
    elTotal.innerText = getTotalCount() 
    if(elTotal.innerHTML < 1) {
        document.querySelector('ul').innerHTML = 'No Active Todos'
        gToDoPlace = 0
    }
    document.querySelector('span.active').innerText = getActiveCount() 
}


function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    if(confirm("Are you sure?")){
        console.log('Removing:', todoId)
        removeTodo(todoId)
        renderTodos()
    }
}

function onToggleTodo(todoId) {
    console.log('Toggling:', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elImportance = document.querySelector('.importance')
    const importance = elImportance.value
    if(importance != ""){
        const elTxt = document.querySelector('[name=txt]')
        const txt = elTxt.value
        addTodo(txt,importance)
        renderTodos()
        elTxt.value = ''
        elImportance.value = ""
    }
}

function onSetFilter(filterBy) {
    console.log('filterBy:', filterBy)
    setFilter(filterBy)
    renderTodos()
}


function onSetFilterByTxt(txt) {
    console.log('Filtering by txt', txt)
    setFilterByTxt(txt)
    renderTodos()
}

function onSetSorting(sort){
    switch (sort) {
        case "date":
            /* _createTodos() */
            gTodos.sort(compareBydate)
            renderTodos()
            break;
    
        case "importance":
            gTodos.sort(compareByImportance)
            renderTodos()
            break;
    }
}

function compareByImportance(toDo1 , toDo2){
    return toDo1.importance- toDo2.importance
}

function compareBydate(toDo1 , toDo2){
    return toDo1.place- toDo2.place
}

