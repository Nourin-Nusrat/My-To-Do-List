const tasks = [
  {
    title: "Complete UI Design",
    due: "2026-05-11"
  },
  {
    title: "Study JavaScript Modules",
    due: "2026-05-11"
  }
];

function loadTodayTasks() {

  const taskList = document.getElementById("taskList");

  const today = new Date().toISOString().split("T")[0];

  const todayTasks = tasks.filter(task => task.due === today);

  todayTasks.forEach(task => {

    const card = document.createElement("div");
    card.className = "task-card";

    card.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.due}</p>
    `;

    taskList.appendChild(card);

  });

}

loadTodayTasks();