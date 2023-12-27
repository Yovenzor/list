function addTask() {
    var taskInput = document.getElementById("task-input");
    var taskText = taskInput.value;

    if (taskText.trim() !== "") {
        var todoList = document.getElementById("to-do_list");
        var li = document.createElement("li");
        li.innerHTML = taskText + '<button onclick="removeTask(this)">Remove Task</button>';
        todoList.appendChild(li);
        taskInput.value = "";
        saveTasks();
    }
}

function removeTask(button) {
    var li = button.parentNode;
    var ul = li.parentNode;
    ul.removeChild(li);
    saveTasks();
}

function saveTasks() {
    var todoList = document.getElementById("to-do_list");
    var tasks = [];
    for (var i = 0; i < todoList.children.length; i++) {
        tasks.push(todoList.children[i].innerHTML);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var todoList = document.getElementById("to-do_list");
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    for (var i = 0; i < tasks.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = tasks[i];
        todoList.appendChild(li);
    }
}

window.onload = loadTasks;