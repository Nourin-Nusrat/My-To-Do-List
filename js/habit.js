let habits = JSON.parse(localStorage.getItem("habits")) || [];

// ==========================
// SAVE
// ==========================
function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

// ==========================
// ELEMENTS
// ==========================
const habitList = document.querySelector(".habit-list");
const habitGrid = document.querySelector(".habit-grid");
const addBtn = document.querySelector(".add-habit-btn");

// ==========================
// ADD HABIT
// ==========================
if (addBtn) {
  addBtn.addEventListener("click", () => {

    const input = document.getElementById("habitInput");
    const name = input.value.trim();

    if (!name) return;

    habits.push({
      id: Date.now(),
      name,
      done: false
    });

    saveHabits();
    renderHabits();

    input.value = "";
  });
}

// ==========================
// RENDER ALL HABITS PAGE
// ==========================
function renderHabits() {

  if (!habitList) return;

  habitList.innerHTML = "";

  habits.sort((a, b) => a.done - b.done);

  habits.forEach(h => {

    const div = document.createElement("div");
    div.className = "habit-card";

    div.innerHTML = `
      <span>${h.name}</span>
      <button>${h.done ? "✓" : "○"}</button>
      <button>🗑</button>
    `;

    div.querySelector("button").onclick = () => {
      h.done = !h.done;
      saveHabits();
      renderHabits();
      renderHomeHabits();
    };

    div.querySelectorAll("button")[1].onclick = () => {
      habits = habits.filter(x => x.id !== h.id);
      saveHabits();
      renderHabits();
      renderHomeHabits();
    };

    habitList.appendChild(div);
  });
}

// ==========================
// HOME PAGE (ONLY 4 HABITS)
// ==========================
function renderHomeHabits() {

  if (!habitGrid) return;

  habitGrid.innerHTML = "";

  const top4 = habits.slice(0, 4);

  top4.forEach(h => {

    const box = document.createElement("div");
    box.className = "habit-box";

    box.innerHTML = `
      <span>${h.name}</span>
      <button>${h.done ? "✓" : "○"}</button>
    `;

    box.querySelector("button").onclick = () => {
      h.done = !h.done;
      saveHabits();
      renderHomeHabits();
      renderHabits();
    };

    habitGrid.appendChild(box);
  });
}

// ==========================
// INIT
// ==========================
renderHabits();
renderHomeHabits();