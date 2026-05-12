let editTaskId = null;

// ==========================
// SIDEBAR
// ==========================

const sidebar = document.getElementById("sidebar");

const menuBtn = document.getElementById("menuBtn");

const closeBtn = document.getElementById("closeBtn");

const overlay = document.getElementById("overlay");


menuBtn.addEventListener("click", () => {

  sidebar.classList.add("active");

  overlay.classList.add("active");

});


closeBtn.addEventListener("click", closeSidebar);

overlay.addEventListener("click", closeSidebar);


function closeSidebar(){

  sidebar.classList.remove("active");

  overlay.classList.remove("active");

}



// ==========================
// TASK SYSTEM
// ==========================

const addBtn = document.querySelector(".add-btn");

const modal = document.getElementById("taskModal");

const cancelBtn = document.getElementById("cancelBtn");

const saveTaskBtn = document.getElementById("saveTaskBtn");

const taskList = document.querySelector(".task-list");


// Main Task Array
let tasks = [];

// Current Active View
let currentView = "today";



// ==========================
// OPEN MODAL
// ==========================

// addBtn.addEventListener("click", () => {

//   modal.classList.add("active");

// });

addBtn.addEventListener("click", () => {

  // Reset Edit Mode
  editTaskId = null;

  // Clear Old Inputs
  clearInputs();

  // Open Modal
  modal.classList.add("active");

});



// ==========================
// CLOSE MODAL
// ==========================

cancelBtn.addEventListener("click", () => {

  modal.classList.remove("active");

});



// ==========================
// SAVE TASK
// ==========================

// saveTaskBtn.addEventListener("click", () => {

//   const taskName =
//     document.getElementById("taskName").value;

//   const startDateTime =
//     document.getElementById("startDateTime").value;

//   const endDateTime =
//     document.getElementById("endDateTime").value;

//   const taskNotes =
//     document.getElementById("taskNotes").value;

//   const taskColor =
//     document.getElementById("taskColor").value;



//   // Validation
//   if(
//     taskName === "" ||
//     startDateTime === "" ||
//     endDateTime === ""
//   ){

//     alert("Please fill all fields");

//     return;

//   }



//   // Create Task Object
//   const task = {

//     id: Date.now(),

//     name: taskName,

//     start: startDateTime,

//     end: endDateTime,

//     notes: taskNotes,

//     color: taskColor,

//     done: false,

//     starred: false

//   };


//   // Save Into Array
//   tasks.push(task);
//   console.log(tasks);


//   // Re-render Tasks
//   renderTasks(currentView);


//   // Close Modal
//   modal.classList.remove("active");


//   // Clear Inputs
//   clearInputs();



// });

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



  // VALIDATION
  if(
    taskName === "" ||
    startDateTime === "" ||
    endDateTime === ""
  ){

    alert("Please fill all fields");

    return;

  }



  // ==========================
  // EDIT EXISTING TASK
  // ==========================

  if(editTaskId !== null){

    const task =
      tasks.find(t => t.id === editTaskId);

    task.name = taskName;

    task.start = startDateTime;

    task.end = endDateTime;

    task.notes = taskNotes;

    task.color = taskColor;


    // Reset Edit Mode
    editTaskId = null;

  }


  // ==========================
  // CREATE NEW TASK
  // ==========================

  else{

    const task = {

      id: Date.now(),

      name: taskName,

      start: startDateTime,

      end: endDateTime,

      notes: taskNotes,

      color: taskColor,

      done: false,

      starred: false

    };

    tasks.push(task);

  }



  // Re-render
  renderTasks(currentView);


  // Close Modal
  modal.classList.remove("active");


  // Clear Inputs
  clearInputs();

});



// ==========================
// CLEAR INPUTS
// ==========================

function clearInputs(){

  document.getElementById("taskName").value = "";

  document.getElementById("startDateTime").value = "";

  document.getElementById("endDateTime").value = "";

  document.getElementById("taskNotes").value = "";

}



// ==========================
// FORMAT DATE & TIME
// ==========================

function formatDateTime(dt) {

  const date = new Date(dt);

  const time = date.toLocaleTimeString([], {

    hour: "2-digit",

    minute: "2-digit"

  });


  const day = date.getDate();

  const month =
    date.toLocaleString("en-US", {
      month: "short"
    });

  const year = date.getFullYear();


  return {

    time,

    date: `${day} ${month} ${year}`

  };

}



// ==========================
// RENDER TASKS
// ==========================

function renderTasks(view = "today") {

  // Clear Screen
  taskList.innerHTML = "";


  // Copy Tasks
  let filteredTasks = [...tasks];


  // Today's Date
//   const today =
//     new Date().toISOString().split("T")[0];
    const now = new Date();

    const today =
    `${now.getFullYear()}-${
        String(now.getMonth() + 1).padStart(2,"0")
    }-${
        String(now.getDate()).padStart(2,"0")
    }`;

    console.log("Current View:", view);
    console.log("Today:", today);
    console.log(tasks);

  // ==========================
  // TODAY FILTER
  // ==========================

  if(view === "today"){

    filteredTasks = tasks.filter(task => {

      const taskStartDate =
        task.start.split("T")[0];

      const taskEndDate =
        task.end.split("T")[0];


      return (
        today >= taskStartDate &&
        today <= taskEndDate
      );

    });

  }



  // ==========================
  // IMPORTANT FILTER
  // ==========================

  if(view === "important"){

    filteredTasks =
      tasks.filter(task => task.starred);

  }



  // ==========================
  // SORT BY END TIME
  // ==========================

  filteredTasks.sort((a,b) => {

    return new Date(a.end) - new Date(b.end);

  });



  // ==========================
  // RENDER CARDS
  // ==========================

  filteredTasks.forEach(task => {

    const taskCard =
      document.createElement("div");

    taskCard.classList.add("task-card");



    // Done Style
    if(task.done){

      taskCard.style.opacity = "0.5";

    }



    // Left Color Border
    taskCard.style.borderLeft =
      `8px solid ${task.color}`;



    // Format Date
    const start =
      formatDateTime(task.start);

    const end =
      formatDateTime(task.end);



    // Card HTML
taskCard.innerHTML = `

  <div class="task-top">

    <!-- LEFT -->
    <div class="task-left">

      <button class="star-btn">
        ${task.starred ? "★" : "☆"}
      </button>

      <div class="task-info">

        <h3 class="task-title">
          ${task.name}
        </h3>

        <div class="start-date">
          Start: ${start.date} • ${start.time}
        </div>

        <p class="task-notes">
          ${task.notes}
        </p>

      </div>

    </div>


    <!-- RIGHT -->
    <div class="task-right">

      <div class="end-label">
        Ends In
      </div>

      <div class="remaining-time">
        ${getRemainingTime(task.end)}
      </div>

      <div class="end-date">
        ${end.time}
      </div>

      <div class="end-date">
        ${end.date}
      </div>

    </div>

  </div>


  <div class="task-actions">

    <button class="done-btn">
      ${task.done ? "Undo" : "Done"}
    </button>
    <button class="edit-btn">
        Edit
    </button>
    <button class="delete-btn">
      Delete
    </button>

  </div>

`;



    // ==========================
    // STAR BUTTON
    // ==========================

    const starBtn =
      taskCard.querySelector(".star-btn");


    starBtn.addEventListener("click", () => {

      task.starred = !task.starred;

      renderTasks(currentView);

    });




    // ==========================
    // DONE BUTTON
    // ==========================

    const doneBtn =
      taskCard.querySelector(".done-btn");


    doneBtn.addEventListener("click", () => {

      task.done = !task.done;

      renderTasks(currentView);

    });

    const editBtn =
    taskCard.querySelector(".edit-btn");


    editBtn.addEventListener("click", () => {

    // Store Editing ID
    editTaskId = task.id;


    // Open Modal
    modal.classList.add("active");


    // Fill Existing Data
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
    // DELETE BUTTON
    // ==========================

    const deleteBtn =
      taskCard.querySelector(".delete-btn");


    deleteBtn.addEventListener("click", () => {

      tasks =
        tasks.filter(t => t.id !== task.id);

      renderTasks(currentView);

    });




    // Add Card To Screen
    taskList.appendChild(taskCard);

  });

}



// ==========================
// SIDEBAR MENU
// ==========================

document.querySelectorAll(".menu-item")
  .forEach(item => {

    item.addEventListener("click", () => {

      currentView =
        item.dataset.page;

      renderTasks(currentView);

      closeSidebar();

    });

  });

function getRemainingTime(endDate){

  const now = new Date();

  const end = new Date(endDate);

  const diff = end - now;


  if(diff <= 0){
    return "Expired";
  }


  const hours =
    Math.floor(diff / (1000 * 60 * 60));

  const minutes =
    Math.floor(
      (diff % (1000 * 60 * 60))
      / (1000 * 60)
    );


  return `${hours}h ${minutes}m`;

}


// ==========================
// INITIAL RENDER
// ==========================

renderTasks(currentView);