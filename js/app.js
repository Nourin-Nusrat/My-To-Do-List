
// // renderTasks(currentView);
// const habitSection = document.querySelector(".habit-section");
// function setHomeView() {
//   currentView = "home";
//   renderTasks(currentView);
//   updateTitle("home");

//   habitSection.style.display = "block";
// }

// setHomeView();

// document.querySelectorAll(".menu-item").forEach(item => {
//   item.addEventListener("click", () => {

//     currentView = item.dataset.page;

//     renderTasks(currentView);
//     updateTitle(currentView);

//     if ( currentView === "all" ||
//         currentView === "important") {
//       habitSection.style.display = "none";
//     } else {
//       habitSection.style.display = "block";
//     }

//     closeSidebar();
//   });
// });

// // renderTasks(currentView);

const habitSection =
  document.querySelector(".habit-section");

// ==========================
// HOME VIEW
// ==========================
function setHomeView() {

  currentView = "home";

  renderTasks("today");

  updateTitle("today");

  if (habitSection) {
    habitSection.style.display = "block";
  }

}

// initial load
setHomeView();

// ==========================
// SIDEBAR
// ==========================
document.querySelectorAll(".menu-item")
  .forEach(item => {

    item.addEventListener("click", () => {

      currentView = item.dataset.page;

      renderTasks(currentView);

      updateTitle(currentView);

      // hide habits
      if (
        currentView === "all" ||
        currentView === "important"
      ) {

        if (habitSection) {
          habitSection.style.display = "none";
        }

      }

      // show habits
      else {

        if (habitSection) {
          habitSection.style.display = "block";
        }

      }

      if (window.closeSidebar) {
        closeSidebar();
      }

    });

  });
