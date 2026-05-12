let habits = JSON.parse(localStorage.getItem("habits")) || [];

// ==========================
// ELEMENTS
// ==========================
const habitGrid = document.querySelector(".habit-grid");
const allHabitsBtn = document.getElementById("allHabitsBtn");
const habitModal = document.getElementById("habitModal");
const habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabitBtn");
const closeHabitModal = document.getElementById("closeHabitModal");

// ==========================
// INIT
// ==========================
renderHomeHabits();

// ==========================
// SAVE
// ==========================
function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

// ==========================
// HOME RENDER (SMART 4 SLOT)
// ==========================
function renderHomeHabits() {
  habitGrid.innerHTML = "";

  const pinned = habits.filter(h => h.pinned && !h.done);
  const unpinned = habits.filter(h => !h.pinned && !h.done);
  const done = habits.filter(h => h.done);

  const homeList = [...pinned, ...unpinned, ...done].slice(0, 4);

  for (let i = 0; i < 4; i++) {
    const habit = homeList[i];

    const box = document.createElement("div");
    box.className = "habit-box";

    // empty slot
    if (!habit) {
      box.innerHTML = `<div class="empty-habit">+</div>`;
      habitGrid.appendChild(box);
      continue;
    }

    box.innerHTML = `
      <div class="habit-name">${habit.name}</div>
      <button class="tick">${habit.done ? "✓" : "○"}</button>
    `;

    // DONE TOGGLE (MOVE TO END + UNPIN)
    box.querySelector(".tick").addEventListener("click", () => {

      habit.done = !habit.done;

      if (habit.done) {
        habits = habits.filter(h => h.id !== habit.id);
        habits.push(habit);
        habit.pinned = false;
      }

      saveHabits();
      renderHomeHabits();
      renderAllHabits();
    });

    habitGrid.appendChild(box);
  }
}

// ==========================
// OPEN MODAL
// ==========================
if (allHabitsBtn) {
  allHabitsBtn.addEventListener("click", () => {
    habitModal.classList.add("active");
    renderAllHabits();
  });
}

// CLOSE MODAL
if (closeHabitModal) {
  closeHabitModal.addEventListener("click", () => {
    habitModal.classList.remove("active");
  });
}

// ==========================
// ADD HABIT
// ==========================
if (addHabitBtn) {
  addHabitBtn.addEventListener("click", () => {

    const value = habitInput.value.trim();
    if (!value) return;

    habits.push({
      id: Date.now(),
      name: value,
      done: false,
      pinned: false
    });

    habitInput.value = "";

    saveHabits();
    renderHomeHabits();
    renderAllHabits();
  });
}

// ==========================
// RENDER ALL HABITS MODAL
// ==========================
function renderAllHabits() {
  const list = habitModal.querySelector(".habit-list");
  list.innerHTML = "";

  habits.forEach(habit => {

    const item = document.createElement("div");
    item.className = "habit-item";

    item.innerHTML = `
      <span>${habit.name}</span>

      <button class="pin">${habit.pinned ? "📌" : "📍"}</button>
      <button class="tick">${habit.done ? "✓" : "○"}</button>
      <button class="delete">🗑</button>
    `;

    // ==========================
    // PIN (MAX 4 ACTIVE)
    // ==========================
    item.querySelector(".pin").addEventListener("click", () => {

      const activePinned = habits.filter(h => h.pinned && !h.done);

      if (!habit.pinned && activePinned.length >= 4) {
        alert("Only 4 active habits can be pinned");
        return;
      }

      habit.pinned = !habit.pinned;

      saveHabits();
      renderHomeHabits();
      renderAllHabits();
    });

    // ==========================
    // DONE (MOVE TO END)
    // ==========================
    item.querySelector(".tick").addEventListener("click", () => {

      habit.done = !habit.done;

      if (habit.done) {
        habits = habits.filter(h => h.id !== habit.id);
        habits.push(habit);
        habit.pinned = false;
      }

      saveHabits();
      renderHomeHabits();
      renderAllHabits();
    });

    // ==========================
    // DELETE
    // ==========================
    item.querySelector(".delete").addEventListener("click", () => {

      habits = habits.filter(h => h.id !== habit.id);

      saveHabits();
      renderHomeHabits();
      renderAllHabits();
    });

    list.appendChild(item);
  });
}