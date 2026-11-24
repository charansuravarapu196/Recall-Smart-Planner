// Load saved classes from Local Storage
let classes = JSON.parse(localStorage.getItem("myTimetable")) || [];

// Display all saved classes
function displayClasses() {

    const table = document.getElementById("timetableBody");

    table.innerHTML = "";

    classes.forEach(function(item) {

        const row = table.insertRow();

        row.insertCell(0).textContent = item.day;
        row.insertCell(1).textContent = item.subject;
        row.insertCell(2).textContent = item.start;
        row.insertCell(3).textContent = item.end;

        const actionCell = row.insertCell(4);

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.onclick = function() {
            deleteClass(item.id);
        };

        actionCell.appendChild(deleteButton);
    });
}

// Add a new class
function addClass() {

    const subject = document.getElementById("subject").value.trim();
    const day = document.getElementById("day").value;
    const start = document.getElementById("startTime").value;
    const end = document.getElementById("endTime").value;

    if (!subject || !day || !start || !end) {
        alert("Please fill in all the details!");
        return;
    }

    if (start >= end) {
        alert("End time must be after start time!");
        return;
    }

    const newClass = {
        id: Date.now() + Math.random(),
        subject: subject,
        day: day,
        start: start,
        end: end
    };

    classes.push(newClass);

    // Save classes in Local Storage
    localStorage.setItem("myTimetable", JSON.stringify(classes));

    displayClasses();

    document.getElementById("subject").value = "";
    document.getElementById("day").value = "";
    document.getElementById("startTime").value = "";
    document.getElementById("endTime").value = "";

    alert("Class added successfully!");
}

// Delete a class
function deleteClass(id) {

    classes = classes.filter(function(item) {
        return item.id !== id;
    });

    localStorage.setItem("myTimetable", JSON.stringify(classes));

    displayClasses();
}

// Display saved classes when page opens
displayClasses();