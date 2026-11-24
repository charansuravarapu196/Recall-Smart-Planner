function updateDashboard() {

    const classes = JSON.parse(
        localStorage.getItem("myTimetable")
    ) || [];

    const sessions = JSON.parse(
        localStorage.getItem("studySessions")
    ) || [];

    const tasks = JSON.parse(
        localStorage.getItem("tasks")
    ) || [];

    document.getElementById("classCount").textContent =
        classes.length;

    document.getElementById("studyCount").textContent =
        sessions.length;

    document.getElementById("taskCount").textContent =
        tasks.length;

    document.getElementById("completedCount").textContent =
        tasks.filter(task => task.completed).length;
        // Task Progress
    const completedTasks = tasks.filter(task => task.completed).length;

    const taskPercentage = tasks.length
        ? Math.round((completedTasks / tasks.length) * 100)
        : 0;

    document.getElementById("taskProgressText").textContent =
        taskPercentage + "% Completed";

    document.getElementById("taskProgressBar").style.width =
        taskPercentage + "%";
        // Daily Study Plan Statistics
const dailyPlans = JSON.parse(
    localStorage.getItem("dailyPlans")
) || {};

const allPlans = Object.values(dailyPlans).flat();

document.getElementById("totalDailyPlans").textContent =
    allPlans.length;

document.getElementById("completedDailyPlans").textContent =
    allPlans.filter(plan => plan.completed).length;


    // Study Progress
    const completedSessions = sessions.filter(
        session => session.completed
    ).length;

    const studyPercentage = sessions.length
        ? Math.round((completedSessions / sessions.length) * 100)
        : 0;

    document.getElementById("studyProgressText").textContent =
        studyPercentage + "% Completed";

    document.getElementById("studyProgressBar").style.width =
        studyPercentage + "%";
}

updateDashboard();

window.addEventListener("pageshow", updateDashboard);