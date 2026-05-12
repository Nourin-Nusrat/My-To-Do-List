// let editTaskId = null;
// let tasks = [];
// let currentView = "today";


// // ==========================
// // ELEMENTS
// // ==========================

// const saveTaskBtn = document.getElementById("saveTaskBtn");
// const taskList = document.querySelector(".task-list");

// // safety check
// if (!saveTaskBtn || !taskList) {
//   console.error("Task DOM not found. Check HTML load order.");
// }

// // ==========================
// // SAVE / EDIT TASK
// // ==========================

// saveTaskBtn.addEventListener("click", () => {

//   const taskName = document.getElementById("taskName").value;
//   const startDateTime = document.getElementById("startDateTime").value;
//   const endDateTime = document.getElementById("endDateTime").value;
//   const taskNotes = document.getElementById("taskNotes").value;
//   const taskColor = document.getElementById("taskColor").value;

//   if (!taskName || !startDateTime || !endDateTime) {
//     alert("Fill all required fields");
//     return;
//   }

//   // ==========================
//   // EDIT TASK
//   // ==========================
//   if (editTaskId !== null) {

//     const task = tasks.find(t => t.id === editTaskId);

//     if (task) {
//       task.name = taskName;
//       task.start = startDateTime;
//       task.end = endDateTime;
//       task.notes = taskNotes;
//       task.color = taskColor;
//     }

//     editTaskId = null;

//   }

//   // ==========================
//   // NEW TASK
//   // ==========================
//   else {

//     // tasks.push({
//     //   id: Date.now(),
//     //   name: taskName,
//     //   start: startDateTime,
//     //   end: endDateTime,
//     //   notes: taskNotes,
//     //   color: taskColor,
//     //   done: false,
//     //   starred: false
//     // });
//     tasks.push({
//       id: Date.now(),
//       name: taskName,
//       start: startDateTime,
//       end: endDateTime,
//       notes: taskNotes,
//       color: taskColor,
//       done: false,
//       starred: false,

//       // stopwatch
//       timer: 0,
//       timerRunning: false,
//       intervalId: null
//     });

//   }

//   renderTasks(currentView);

//   // close modal safely
//   if (window.modal) {
//     window.modal.classList.remove("active");
//   }

//   if (window.clearInputs) {
//     window.clearInputs();
//   }

// });


// // ==========================
// // RENDER TASKS
// // ==========================

// function renderTasks(view = "today") {

//   taskList.innerHTML = "";

//   let filteredTasks = [...tasks];

//   const now = new Date();

//   const today =
//     `${now.getFullYear()}-${
//       String(now.getMonth() + 1).padStart(2, "0")
//     }-${
//       String(now.getDate()).padStart(2, "0")
//     }`;

//   // ==========================
//   // FILTER: TODAY
//   // ==========================
//   if (view === "today") {

//     filteredTasks = tasks.filter(task => {

//       const startDate = task.start.split("T")[0];
//       const endDate = task.end.split("T")[0];

//       return today >= startDate && today <= endDate;

//     });

//   }

//   // ==========================
//   // FILTER: IMPORTANT
//   // ==========================
//   if (view === "important") {

//     filteredTasks = tasks.filter(task => task.starred);

//   }

//   // ==========================
//   // SORT (DONE LAST + END TIME)
//   // ==========================
//   filteredTasks.sort((a, b) => {

//     if (a.done !== b.done) {
//       return a.done - b.done;
//     }

//     return new Date(a.end) - new Date(b.end);

//   });

//   // ==========================
//   // RENDER CARDS
//   // ==========================
//   filteredTasks.forEach(task => {

//     const taskCard = document.createElement("div");
//     taskCard.classList.add("task-card");

//     if (task.done) {
//       taskCard.style.opacity = "0.5";
//     }

//     taskCard.style.borderLeft = `8px solid ${task.color}`;

//     const start = formatDateTime(task.start);
//     const end = formatDateTime(task.end);

//     // taskCard.innerHTML = `

//     //   <div class="task-top">

//     //     <!-- LEFT -->
//     //     <div class="task-left">

//     //       <button class="star-btn">
//     //         ${task.starred ? "★" : "☆"}
//     //       </button>

//     //       <div class="task-info">

//     //         <h3>${task.name}</h3>
//     //         <div class="start-date">
//     //           ${start.date} • ${start.time}
//     //         </div>

//     //         <p>${task.notes}</p>

//     //       </div>

//     //     </div>

//     //     <!-- RIGHT -->
//     //     <div class="task-right">

          

//     //       <div class="remaining-time">
//     //         ${getRemainingTime(task.end)}
//     //       </div>

//     //       <div class="end-date">
//     //         ${end.time} | ${end.date}
//     //       </div>
//     //       <div class="task-timer">

//     //         <div class="timer-display">
//     //           ${formatTimer(task.timer)}
//     //         </div>

//     //         <div class="timer-buttons">
//     //           <button class="start-timer">
//     //             ${task.timerRunning ? "Pause" : "Start"}
//     //           </button>

//     //           <button class="reset-timer">
//     //             Reset
//     //           </button>
//     //         </div>

//     //       </div>

//     //     </div>

//     //   </div>

//     //   <div class="task-actions">

//     //     <button class="done-btn">
//     //       ${task.done ? "✓" : "○"}
//     //     </button>

//     //     <button class="edit-btn">✎</button>

//     //     <button class="delete-btn">🗑</button>

//     //   </div>


//     // `;
//     taskCard.innerHTML = `

//     <!-- ===================== -->
//     <!-- TOP -->
//     <!-- ===================== -->
//     <div class="task-top">

//       <!-- LEFT -->
//       <div class="task-left">

//         <button class="star-btn">
//           ${task.starred ? "★" : "☆"}
//         </button>

//         <div class="task-info">

//           <h3 class="task-title">
//             ${task.name}
//           </h3>

//           <div class="task-start">
//             ${start.date} • ${start.time}
//           </div>

//           <p class="task-notes">
//             ${task.notes || ""}
//           </p>

//         </div>

//       </div>

//       <!-- RIGHT -->
//       <div class="task-right">

//         <div class="remaining-label">
//           Ends In
//         </div>

//         <div class="remaining-time">
//           ${getRemainingTime(task.end)}
//         </div>

//         <div class="end-date">
//           ${end.time}
//         </div>

//         <div class="end-date-small">
//           ${end.date}
//         </div>

//       </div>

//     </div>

//     <!-- ===================== -->
//     <!-- TIMER -->
//     <!-- ===================== -->
//     <div class="task-timer">

//       <div class="timer-display">
//         ${formatTimer(task.timer)}
//       </div>

//       <div class="timer-buttons">

//         <button class="start-timer">
//           ${task.timerRunning ? "Pause" : "Start"}
//         </button>

//         <button class="reset-timer">
//           Reset
//         </button>

//       </div>

//     </div>

//     <!-- ===================== -->
//     <!-- ACTIONS -->
//     <!-- ===================== -->
//     <div class="task-actions">

//       <button class="done-btn">
//         ${task.done ? "✓ Done" : "○ Done"}
//       </button>

//       <button class="edit-btn">
//         ✎ Edit
//       </button>

//       <button class="delete-btn">
//         🗑 Delete
//       </button>

//     </div>

//   `;

//     // ==========================
//     // STAR
//     // ==========================
//     taskCard.querySelector(".star-btn")
//       .addEventListener("click", () => {
//         task.starred = !task.starred;
//         renderTasks(currentView);
//       });

//     // ==========================
//     // DONE
//     // ==========================
//     taskCard.querySelector(".done-btn")
//       .addEventListener("click", () => {
//         task.done = !task.done;
//         renderTasks(currentView);
//       });

//     // ==========================
//     // EDIT
//     // ==========================
//     taskCard.querySelector(".edit-btn")
//       .addEventListener("click", () => {

//         editTaskId = task.id;

//         if (window.modal) {
//           window.modal.classList.add("active");
//         }

//         document.getElementById("taskName").value = task.name;
//         document.getElementById("startDateTime").value = task.start;
//         document.getElementById("endDateTime").value = task.end;
//         document.getElementById("taskNotes").value = task.notes;
//         document.getElementById("taskColor").value = task.color;

//       });

//     // ==========================
//     // DELETE
//     // ==========================
//     taskCard.querySelector(".delete-btn")
//       .addEventListener("click", () => {

//         tasks = tasks.filter(t => t.id !== task.id);

//         renderTasks(currentView);

//       });

//     taskList.appendChild(taskCard);

//     // ==========================
//     // TIMER START / PAUSE
//     // ==========================

//     // const startBtn =
//     //   taskCard.querySelector(".start-timer");

//      const startBtn = taskCard.querySelector(".start-timer")
//       .addEventListener("click", () => {

//         task.timerRunning = !task.timerRunning;

//         renderTasks(currentView);

//       });

//     const resetBtn =
//       taskCard.querySelector(".reset-timer");

//     startBtn.addEventListener("click", () => {

//       // START
//       if (!task.timerRunning) {

//         task.timerRunning = true;

//         task.intervalId = setInterval(() => {

//           // task.timer++;

//           const display =
//             taskCard.querySelector(".timer-display");

//           if (display) {
//             display.textContent =
//               formatTimer(task.timer);
//           }

//         }, 1000);

//       }

//       // PAUSE
//       else {

//         task.timerRunning = false;

//         clearInterval(task.intervalId);

//       }

//       renderTasks(currentView);

//     });

//     // ==========================
//     // RESET TIMER
//     // ==========================

//     resetBtn.addEventListener("click", () => {

//       clearInterval(task.intervalId);

//       task.timer = 0;
//       task.timerRunning = false;

//       renderTasks(currentView);

//     });

//   });

// }

// function startLiveTimer() {

//   if (timerInterval) return;

//   timerInterval = setInterval(() => {

//     let hasRunningTimer = false;

//     tasks.forEach(task => {

//       if (task.timerRunning) {

//         task.timer++;
//         hasRunningTimer = true;

//       }

//     });

//     // IMPORTANT:
//     // don't rerender while modal open
//     if (
//       hasRunningTimer &&
//       !modal.classList.contains("active")
//     ) {
//       renderTasks(currentView);
//     }

//   }, 1000);

// }

// function formatTimer(seconds) {

//   const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");

//   const mins = String(
//     Math.floor((seconds % 3600) / 60)
//   ).padStart(2, "0");

//   const secs = String(seconds % 60).padStart(2, "0");

//   return `${hrs}:${mins}:${secs}`;
// }


// // ==========================
// // SIDEBAR SWITCH
// // ==========================

// document.querySelectorAll(".menu-item")
//   .forEach(item => {

//     item.addEventListener("click", () => {

//       currentView = item.dataset.page;

//       renderTasks(currentView);

//       updateTitle(currentView);   // ✅ ADD THIS

//       if (window.closeSidebar) {
//         window.closeSidebar();
//       }

//     });

//   });

//   const pageTitle = document.querySelector(".navbar h1");
//   function updateTitle(view) {

//   if (!pageTitle) return;

//   if (view === "today") {
//     pageTitle.textContent = "Today's Tasks";
//   }

//   else if (view === "all") {
//     pageTitle.textContent = "All Tasks";
//   }

//   else if (view === "important") {
//     pageTitle.textContent = "Important Tasks";
//   }

// }
// renderTasks(currentView);
// updateTitle(currentView);

// // ==========================
// // EXPORT
// // ==========================

// startLiveTimer();
// window.renderTasks = renderTasks;


let editTaskId = null;
let tasks = [];
let currentView = "today";

let timerInterval = null;

// ==========================
// ELEMENTS
// ==========================

const saveTaskBtn = document.getElementById("saveTaskBtn");
const taskList = document.querySelector(".task-list");

// ==========================
// SAVE / EDIT TASK
// ==========================

saveTaskBtn.addEventListener("click", () => {

  const taskName =
    document.getElementById("taskName").value;

  const startDateTime =
    document.getElementById("startDateTime").value;

  const endDateTime =
    document.getElementById("endDateTime").value;

  const taskNotes =
    document.getElementById("taskNotes").value;

  const taskColor =
    document.getElementById("taskColor").value;

  if (!taskName || !startDateTime || !endDateTime) {
    alert("Fill all required fields");
    return;
  }

  // ==========================
  // EDIT TASK
  // ==========================
  if (editTaskId !== null) {

    const task =
      tasks.find(t => t.id === editTaskId);

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
      starred: false,

      // TIMER
      timer: 0,
      timerRunning: false

    });

  }

  // renderTasks(currentView);
  if (currentView === "home") {
    renderTasks("today");
  }
  else {
    renderTasks(currentView);
  }


  // CLOSE MODAL
  if (window.modal) {
    window.modal.classList.remove("active");
  }

  // CLEAR INPUTS
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
  // TODAY
  // ==========================
  if (view === "today") {

    filteredTasks = tasks.filter(task => {

      const startDate =
        task.start.split("T")[0];

      const endDate =
        task.end.split("T")[0];

      return today >= startDate &&
             today <= endDate;

    });

  }

  // ==========================
  // IMPORTANT
  // ==========================
  if (view === "important") {

    filteredTasks =
      tasks.filter(task => task.starred);

  }

  // ==========================
  // SORT
  // ==========================
  filteredTasks.sort((a, b) => {

    if (a.done !== b.done) {
      return a.done - b.done;
    }

    return new Date(a.end) -
           new Date(b.end);

  });

  // ==========================
  // RENDER
  // ==========================
  filteredTasks.forEach(task => {

    const taskCard =
      document.createElement("div");

    taskCard.classList.add("task-card");

    if (task.done) {
      taskCard.style.opacity = "0.5";
    }

    taskCard.style.borderLeft =
      `8px solid ${task.color}`;

    const start =
      formatDateTime(task.start);

    const end =
      formatDateTime(task.end);

    taskCard.innerHTML = `

      <div class="task-top">

        <div class="task-left">

          <button class="star-btn">
            ${task.starred ? "★" : "☆"}
          </button>

          <div class="task-info">

            <h3 class="task-title">
              ${task.name}
            </h3>

            <div class="task-start">
              ${start.date} • ${start.time}
            </div>

            <p class="task-notes">
              ${task.notes || ""}
            </p>

          </div>

        </div>

        <div class="task-right">

          <div class="remaining-label">
            Ends In
          </div>

          <div class="remaining-time">
            ${getRemainingTime(task.end)}
          </div>

          <div class="end-date">
            ${end.time} | ${end.date}
          </div>

        </div>

      </div>

      <!-- TIMER -->
      <div class="task-timer">

        <div class="timer-display">
          ${formatTimer(task.timer)}
        </div>

        <div class="timer-buttons">

          <button class="start-timer">
            ${task.timerRunning ? "Pause" : "Start"}
          </button>

          <button class="reset-timer">
            Reset
          </button>

        </div>

      </div>

      <!-- ACTIONS -->
      <div class="task-actions">

        <button class="done-btn">
          ${task.done ? "✓ Done" : "○ Done"}
        </button>

        <button class="edit-btn">
          ✎ Edit
        </button>

        <button class="delete-btn">
          🗑 Delete
        </button>

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

        document.getElementById("taskName").value =
          task.name;

        document.getElementById("startDateTime").value =
          task.start;

        document.getElementById("endDateTime").value =
          task.end;

        document.getElementById("taskNotes").value =
          task.notes;

        document.getElementById("taskColor").value =
          task.color;

      });

    // ==========================
    // DELETE
    // ==========================
    taskCard.querySelector(".delete-btn")
      .addEventListener("click", () => {

        task.timerRunning = false;

        tasks = tasks.filter(t => t.id !== task.id);

        renderTasks(currentView);

      });

    // ==========================
    // TIMER START / PAUSE
    // ==========================
    const startBtn =
      taskCard.querySelector(".start-timer");

    const resetBtn =
      taskCard.querySelector(".reset-timer");

    startBtn.addEventListener("click", () => {

      task.timerRunning =
        !task.timerRunning;

      renderTasks(currentView);

    });

    // ==========================
    // RESET
    // ==========================
    resetBtn.addEventListener("click", () => {

      task.timer = 0;
      task.timerRunning = false;

      renderTasks(currentView);

    });

    taskList.appendChild(taskCard);

  });

}


function getRemainingTime(endTime) {

  const end = new Date(endTime);
  const now = new Date();

  let diff = end - now;

  // =========================
  // EXPIRED CASE
  // =========================
  if (diff <= 0) {
    return "⚠ Expired";
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);

  const minutes = Math.floor(diff / (1000 * 60));

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
}


// ==========================
// LIVE TIMER
// ==========================

function startLiveTimer() {

  if (timerInterval) return;

  timerInterval = setInterval(() => {

    let changed = false;

    tasks.forEach(task => {

      if (task.timerRunning) {

        task.timer++;
        changed = true;

      }

    });

    if (changed) {
      renderTasks(currentView);
    }

  }, 1000);

}

// ==========================
// FORMAT TIMER
// ==========================

function formatTimer(seconds) {

  const hrs =
    String(Math.floor(seconds / 3600))
    .padStart(2, "0");

  const mins =
    String(Math.floor((seconds % 3600) / 60))
    .padStart(2, "0");

  const secs =
    String(seconds % 60)
    .padStart(2, "0");

  return `${hrs}:${mins}:${secs}`;

}

// ==========================
// SIDEBAR
// ==========================

document.querySelectorAll(".menu-item")
  .forEach(item => {

    item.addEventListener("click", () => {

      currentView = item.dataset.page;

      renderTasks(currentView);

      updateTitle(currentView);

      if (window.closeSidebar) {
        window.closeSidebar();
      }

    });

  });

// ==========================
// TITLE
// ==========================

const pageTitle =
  document.querySelector(".navbar h1");

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

// ==========================
// INIT
// ==========================

renderTasks(currentView);
updateTitle(currentView);
startLiveTimer();

// ==========================
// EXPORT
// ==========================

window.renderTasks = renderTasks;

