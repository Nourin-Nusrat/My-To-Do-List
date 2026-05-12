function initializeNavigation() {

  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach(item => {

    item.addEventListener("click", () => {

      // Get target page
      const page = item.dataset.page;

      // Redirect to page
      window.location.href = page;

    });

  });

}