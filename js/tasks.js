let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

function saveTasks() {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}

function displayTasks() {

    const table = document.getElementById("taskBody");
    table.innerHTML = "";

    tasks.forEach(function(task) {

        const row = table.insertRow();

        row.insertCell(0).textContent = task.name;
        row.insertCell(1).textContent = task.date;
        row.insertCell(2).textContent = task.priority;

        const statusCell = row.insertCell(3);
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.onchange = function() {
            task.completed = checkbox.checked;
            saveTasks();
        };

        statusCell.appendChild(checkbox);

        const actionCell = row.insertCell(4);
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.onclick = function() {
            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });

            saveTasks();
            displayTasks();
        };

        actionCell.appendChild(deleteButton);
    });
}

function addTask() {

    const name = document.getElementById("taskName").value.trim();
    const date = document.getElementById("taskDate").value;
    const priority = document.getElementById("priority").value;

    if (!name || !date || !priority) {
        alert("Please fill in all task details!");
        return;
    }

    tasks.push({
        id: Date.now() + Math.random(),
        name: name,
        date: date,
        priority: priority,
        completed: false
    });

    saveTasks();
    displayTasks();

    document.getElementById("taskName").value = "";
    document.getElementById("taskDate").value = "";
    document.getElementById("priority").value = "";

    alert("Task added successfully!");
}

displayTasks();