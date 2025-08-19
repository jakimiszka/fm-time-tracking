const buttons = document.querySelectorAll(".daily, .weekly, .monthly");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(b => {
            b.classList.remove("active");
            b.classList.add("disabled");
        });
        btn.classList.add("active");
        btn.classList.remove("disabled");

        if (btn.classList.contains("daily")) {
            console.log("daily");
        } else if (btn.classList.contains("weekly")) {
            console.log("weekly");
        } else if (btn.classList.contains("monthly")) {
            console.log("monthly");
        }
    });
});