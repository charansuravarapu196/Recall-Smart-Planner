let studySessions = JSON.parse(localStorage.getItem("studySessions")) || [];

function addStudySession() {
    const subject = document.getElementById("studySubject").value;
    const topic = document.getElementById("studyTopic").value;
    const date = document.getElementById("studyDate").value;
    const start = document.getElementById("studyStart").value;
    const end = document.getElementById("studyEnd").value;

    if (!subject || !topic || !date || !start || !end) {
        alert("Please fill in all fields!");
        return;
    }

    if (end <= start) {
        alert("End time must be after start time!");
        return;
    }

    const session = {
        id: Date.now(),
        subject,
        topic,
        date,
        start,
        end,
        completed: false
    };

    studySessions.push(session);

    localStorage.setItem("studySessions", JSON.stringify(studySessions));

    displayStudySessions();

    document.getElementById("studySubject").value = "";
    document.getElementById("studyTopic").value = "";
    document.getElementById("studyDate").value = "";
    document.getElementById("studyStart").value = "";
    document.getElementById("studyEnd").value = "";
}

function displayStudySessions() {
    const body = document.getElementById("studyBody");
    body.innerHTML = "";

    studySessions.forEach(session => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${session.subject}</td>
            <td>${session.topic}</td>
            <td>${session.date}</td>
            <td>${session.start}</td>
            <td>${session.end}</td>
            <td>
                <button onclick="toggleStudyStatus(${session.id})">
                    ${session.completed ? "Completed" : "Pending"}
                </button>
            </td>
            <td>
                <button onclick="deleteStudySession(${session.id})">
                    Delete
                </button>
            </td>
        `;

        body.appendChild(row);
    });
}

function toggleStudyStatus(id) {
    studySessions = studySessions.map(session => {
        if (session.id === id) {
            session.completed = !session.completed;
        }
        return session;
    });

    localStorage.setItem("studySessions", JSON.stringify(studySessions));
    displayStudySessions();
}

function deleteStudySession(id) {
    studySessions = studySessions.filter(session => session.id !== id);

    localStorage.setItem("studySessions", JSON.stringify(studySessions));
    displayStudySessions();
}

displayStudySessions();