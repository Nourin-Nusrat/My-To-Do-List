fetch("components/sidebar.html")
  .then(response => response.text())
  .then(data => {

    // Insert sidebar HTML
    document.getElementById("sidebar-container").innerHTML = data;

    // Get elements AFTER sidebar exists
    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const overlay = document.getElementById("overlay");

    // Open sidebar
    menuBtn.addEventListener("click", () => {

      sidebar.classList.add("active");
      overlay.classList.add("active");

    });

    // Close sidebar button
    closeBtn.addEventListener("click", closeSidebar);

    // Close when clicking overlay
    overlay.addEventListener("click", closeSidebar);

    function closeSidebar() {

      sidebar.classList.remove("active");
      overlay.classList.remove("active");

    }

  });