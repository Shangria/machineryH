window.addEventListener('load', function () {
    let dropdowns = document.querySelectorAll(".hover-dropdown");
    let menus = document.querySelectorAll(".hover-dropdown__menu");
    if (window.innerWidth < 992) {
        for (let i = 0; i < dropdowns.length; i++) {
            let dropdown = dropdowns[i];
            let menu = menus[i];
            dropdown.addEventListener("click", function () {
                menu.classList.toggle("shown");
            });
        }
    }
});


