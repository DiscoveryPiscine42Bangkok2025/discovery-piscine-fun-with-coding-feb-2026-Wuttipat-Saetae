$(document).ready(function () {

    function saveTodos() {
        let todos = [];
        $(".todo").each(function () {
            todos.push($(this).text());
        });
        document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos));
    }

    function loadTodos() {
        let cookies = document.cookie.split("; ");
        cookies.forEach(c => {
            if (c.startsWith("todos=")) {
                let todos = JSON.parse(decodeURIComponent(c.split("=")[1]));
                todos.forEach(t => addTodo(t));
            }
        });
    }

    function addTodo(text) {
        let div = $("<div></div>")
            .addClass("todo")
            .text(text)
            .click(function () {
                if (confirm("Do you want to remove this TO DO?")) {
                    $(this).remove();
                    saveTodos();
                }
            });

        $("#ft_list").prepend(div);
    }

    $("#new").click(function () {
        let text = prompt("New TO DO:");
        if (text && text.trim() !== "") {
            addTodo(text);
            saveTodos();
        }
    });

    loadTodos();
});
