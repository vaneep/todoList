const todos = JSON.parse(localStorage.getItem('todo')) || [];
const list = document.getElementsByClassName('list')[0];
const todo = document.getElementsByClassName('todo')[0];
const addBtn = document.getElementsByClassName('add')[0];
const delAllBtn = document.getElementsByClassName('danger')[0];


todo.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        addTodo();
    }
});
addBtn.addEventListener('click', addTodo);
list.addEventListener('click', delTodo)
delAllBtn.addEventListener('click', delAllTodo);


function addTodo() {
    const newTodo = todo.value.trim();
    if (newTodo == '') return;
    todos.push(newTodo);
    todo.value = '';
    saveTodos();
}

function delTodo(e) {
    if (e.target.nodeName !== 'A') { return };
    const dataNum = e.target.dataset.num;
    todos.splice(dataNum, 1);
    saveTodos();
}


function delAllTodo() {
    todos.length = 0;
    saveTodos();
}

//local storage
function saveTodos() {
    var todosStr = JSON.stringify(todos);
    localStorage.setItem('todo', todosStr);
    updateTodos();
}

function updateTodos() {
    let str = '';
    for (let i = 0; i < todos.length; i++) {
        str += `<li>${todos[i]}<a href="#" data-num="${i}">Remover</a></li>`
    }
    list.innerHTML = str;
    if (todos.length !== 0) {
        delAllBtn.classList.remove('hide');
    } else {
        delAllBtn.classList.add('hide');
    }
}

updateTodos();