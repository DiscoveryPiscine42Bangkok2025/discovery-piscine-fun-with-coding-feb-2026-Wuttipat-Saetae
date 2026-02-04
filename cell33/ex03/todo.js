function newTodo() {
    let text = prompt("New TO DO:");
    if (!text || text.trim() === "") return;

    addTodo(text);
    saveTodos();
}

function addTodo(text) {
    const list = document.getElementById("ft_list");

    const div = document.createElement("div");
    div.className = "todo";
    div.innerText = text;

    div.onclick = function () {
        if (confirm("Do you want to remove this TO DO?")) {
            div.remove();
            saveTodos();
        }
    };

    list.prepend(div);
}

function saveTodos() {
    const todos = [];
    document.querySelectorAll(".todo").forEach(todo => {
        todos.push(todo.innerText);
    });
    document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos));
}

function loadTodos() {
    const cookies = document.cookie.split("; ");
    for (let c of cookies) {
        if (c.startsWith("todos=")) {
            const todos = JSON.parse(decodeURIComponent(c.split("=")[1]));
            todos.forEach(todo => addTodo(todo));
        }
    }
}

window.onload = loadTodos;