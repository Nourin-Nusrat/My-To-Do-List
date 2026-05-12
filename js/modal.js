const addBtn = document.querySelector(".add-btn");
const modal = document.getElementById("taskModal");
const cancelBtn = document.getElementById("cancelBtn");

window.modal = modal; // IMPORTANT

addBtn.addEventListener("click", () => {

  window.editTaskId = null;

  window.clearInputs();

  modal.classList.add("active");

});

cancelBtn.addEventListener("click", () => {

  modal.classList.remove("active");

});

function clearInputs() {

  document.getElementById("taskName").value = "";
  document.getElementById("startDateTime").value = "";
  document.getElementById("endDateTime").value = "";
  document.getElementById("taskNotes").value = "";

}

window.clearInputs = clearInputs;