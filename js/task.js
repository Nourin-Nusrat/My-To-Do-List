let editTaskId = null;
let tasks = [];
let currentView = "today";

// ==========================
// ELEMENTS
// ==========================

const saveTaskBtn = document.getElementById("saveTaskBtn");
const taskList = document.querySelector(".task-list");

// safety check
if (!saveTaskBtn || !taskList) {
  console.error("Task DOM not found. Check HTML load order.");
}

// ==========================
// SAVE / EDIT TASK
// ==========================

saveTaskBtn.addEventListener("click", () => {

  const taskName = document.getElementById("taskName").value;
  const startDateTime = document.getElementById("startDateTime").value;
  const endDateTime = document.getElementById("endDateTime").value;
  const taskNotes = document.getElementById("taskNotes").value;
  const taskColor = document.getElementById("taskColor").value;

  if (!taskName || !startDateTime || !endDateTime) {
    alert("Fill all required fields");
    return;
  }

  // ==========================
  // EDIT TASK
  // ==========================
  if (editTaskId !== null) {

    const task = tasks.find(t => t.id === editTaskId);

    if (task) {
      task.name = taskName;
      task.start = startDateTime;
      task.end = endDateTime;
      task.notes = taskNotes;
      task.color = taskColor;
    }

    editTaskId = null;

  }

  // ==========================
  // NEW TASK
  // ==========================
  else {

    tasks.push({
      id: Date.now(),
      name: taskName,
      start: startDateTime,
      end: endDateTime,
      notes: taskNotes,
      color: taskColor,
      done: false,
      starred: false
    });

  }

  renderTasks(currentView);

  // close modal safely
  if (window.modal) {
    window.modal.classList.remove("active");
  }

  if (window.clearInputs) {
    window.clearInputs();
  }

});


// ==========================
// RENDER TASKS
// ==========================

function renderTasks(view = "today") {

  taskList.innerHTML = "";

  let filteredTasks = [...tasks];

  const now = new Date();

  const today =
    `${now.getFullYear()}-${
      String(now.getMonth() + 1).padStart(2, "0")
    }-${
      String(now.getDate()).padStart(2, "0")
    }`;

  // ==========================
  // FILTER: TODAY
  // ==========================
  if (view === "today") {

    filteredTasks = tasks.filter(task => {

      const startDate = task.start.split("T")[0];
      const endDate = task.end.split("T")[0];

      return today >= startDate && today <= endDate;

    });

  }

  // ==========================
  // FILTER: IMPORTANT
  // ==========================
  if (view === "important") {

    filteredTasks = tasks.filter(task => task.starred);

  }

  // ==========================
  // SORT (DONE LAST + END TIME)
  // ==========================
  filteredTasks.sort((a, b) => {

    if (a.done !== b.done) {
      return a.done - b.done;
    }

    return new Date(a.end) - new Date(b.end);

  });

  // ==========================
  // RENDER CARDS
  // ==========================
  filteredTasks.forEach(task => {

    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");

    if (task.done) {
      taskCard.style.opacity = "0.5";
    }

    taskCard.style.borderLeft = `8px solid ${task.color}`;

    const start = formatDateTime(task.start);
    const end = formatDateTime(task.end);

    taskCard.innerHTML = `

      <div class="task-top">

        <!-- LEFT -->
        <div class="task-left">

          <button class="star-btn">
            ${task.starred ? "★" : "☆"}
          </button>

          <div class="task-info">

            <h3>${task.name}</h3>

            <div class="start-date">
              ${start.date} • ${start.time}
            </div>

            <p>${task.notes}</p>

          </div>

        </div>

        <!-- RIGHT -->
        <div class="task-right">

          <div class="remaining-time">
            ${getRemainingTime(task.end)}
          </div>

          <div class="end-date">
            ${end.time} | ${end.date}
          </div>

        </div>

      </div>

      <div class="task-actions">

        <button class="done-btn">
          ${task.done ? "✓" : "○"}
        </button>

        <button class="edit-btn">✎</button>

        <button class="delete-btn">🗑</button>

      </div>

    `;

    // ==========================
    // STAR
    // ==========================
    taskCard.querySelector(".star-btn")
      .addEventListener("click", () => {
        task.starred = !task.starred;
        renderTasks(currentView);
      });

    // ==========================
    // DONE
    // ==========================
    taskCard.querySelector(".done-btn")
      .addEventListener("click", () => {
        task.done = !task.done;
        renderTasks(currentView);
      });

    // ==========================
    // EDIT
    // ==========================
    taskCard.querySelector(".edit-btn")
      .addEventListener("click", () => {

        editTaskId = task.id;

        if (window.modal) {
          window.modal.classList.add("active");
        }

        document.getElementById("taskName").value = task.name;
        document.getElementById("startDateTime").value = task.start;
        document.getElementById("endDateTime").value = task.end;
        document.getElementById("taskNotes").value = task.notes;
        document.getElementById("taskColor").value = task.color;

      });

    // ==========================
    // DELETE
    // ==========================
    taskCard.querySelector(".delete-btn")
      .addEventListener("click", () => {

        tasks = tasks.filter(t => t.id !== task.id);

        renderTasks(currentView);

      });

    taskList.appendChild(taskCard);

  });

}


// ==========================
// SIDEBAR SWITCH
// ==========================

document.querySelectorAll(".menu-item")
  .forEach(item => {

    item.addEventListener("click", () => {

      currentView = item.dataset.page;

      renderTasks(currentView);

      updateTitle(currentView);   // ✅ ADD THIS

      if (window.closeSidebar) {
        window.closeSidebar();
      }

    });

  });

  const pageTitle = document.querySelector(".navbar h1");
  function updateTitle(view) {

  if (!pageTitle) return;

  if (view === "today") {
    pageTitle.textContent = "Today's Tasks";
  }

  else if (view === "all") {
    pageTitle.textContent = "All Tasks";
  }

  else if (view === "important") {
    pageTitle.textContent = "Important Tasks";
  }

}
renderTasks(currentView);
updateTitle(currentView);

// ==========================
// EXPORT
// ==========================

window.renderTasks = renderTasks;
