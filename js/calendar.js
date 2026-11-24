let currentDate = new Date();
let selectedDate = formatDate(currentDate);

let dailyPlans = JSON.parse(
    localStorage.getItem("dailyPlans")
) || {};

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function displayCalendar() {

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthNames = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    document.getElementById("monthYear").textContent =
        monthNames[month] + " " + year;

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const calendar = document.getElementById("calendarDays");
    calendar.innerHTML = "";

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    dayNames.forEach(day => {
        const heading = document.createElement("div");
        heading.textContent = day;
        heading.className = "calendar-day-heading";
        calendar.appendChild(heading);
    });

    for (let i = 0; i < firstDay; i++) {
        calendar.appendChild(document.createElement("div"));
    }

    for (let day = 1; day <= totalDays; day++) {

        const dateBox = document.createElement("div");
        dateBox.className = "calendar-date";

        const date = new Date(year, month, day);
        const dateKey = formatDate(date);

        dateBox.textContent = day;

        if (dateKey === formatDate(new Date())) {
            dateBox.classList.add("today");
        }

        if (dateKey === selectedDate) {
            dateBox.classList.add("selected");
        }
if (dailyPlans[dateKey]?.length) {
    dateBox.classList.add("has-plan");

    const planCount = document.createElement("small");
    planCount.textContent = dailyPlans[dateKey].length + " plans";

    dateBox.appendChild(planCount);
}

        dateBox.addEventListener("click", function() {
            selectedDate = dateKey;
            displayCalendar();
            displayDailyPlans();
        });

        calendar.appendChild(dateBox);
    }
}

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    displayCalendar();
}

function addDailyPlan() {

    const input = document.getElementById("dailyPlan");
    const plan = input.value.trim();

    if (!plan) {
        alert("Please enter a study plan!");
        return;
    }

    if (!dailyPlans[selectedDate]) {
        dailyPlans[selectedDate] = [];
    }

    dailyPlans[selectedDate].push({
        id: Date.now(),
        text: plan
    });

    localStorage.setItem("dailyPlans", JSON.stringify(dailyPlans));

    input.value = "";

    displayCalendar();
    displayDailyPlans();
}

function displayDailyPlans() {

    document.getElementById("selectedDate").textContent =
        "Study Plans for " + selectedDate;

    const list = document.getElementById("dailyPlanList");
    list.innerHTML = "";

    const plans = dailyPlans[selectedDate] || [];
    const completed = plans.filter(plan => plan.completed).length;
const total = plans.length;
const pending = total - completed;

const percentage = total
    ? Math.round((completed / total) * 100)
    : 0;

document.getElementById("dailyProgressText").textContent =
    percentage + "% Completed";

document.getElementById("dailyProgressBar").style.width =
    percentage + "%";

document.getElementById("dailyPlanStats").textContent =
    `Total: ${total} | Completed: ${completed} | Pending: ${pending}`;

    plans.forEach(plan => {

        const item = document.createElement("li");
        const text = document.createElement("span");
        const button = document.createElement("button");

text.textContent = plan.text;
if (plan.completed) {
    item.classList.add("completed");
}

const completeButton = document.createElement("button");
completeButton.textContent = plan.completed ? "Completed" : "Mark Done";

completeButton.onclick = function() {
    plan.completed = !plan.completed;

    localStorage.setItem(
        "dailyPlans",
        JSON.stringify(dailyPlans)
    );

    displayDailyPlans();
};

button.textContent = "Delete";

        button.addEventListener("click", function() {
            dailyPlans[selectedDate] = plans.filter(
                p => p.id !== plan.id
            );

            localStorage.setItem(
                "dailyPlans",
                JSON.stringify(dailyPlans)
            );

            displayCalendar();
            displayDailyPlans();
        });

        item.appendChild(text);
item.appendChild(completeButton);
item.appendChild(button);
        list.appendChild(item);
    });
}

displayCalendar();
displayDailyPlans();