const buttons = document.querySelectorAll(".daily, .weekly, .monthly");
const dataFields = document.querySelectorAll(".grid__main--card__content--data");

dataFields.forEach(element => {
    console.log(element.children[0].textContent)
    console.log(element.children[1].textContent)
})

new Promise((resolve, reject) => {
fetch('./data.json')
    .then(respond => {
        resolve(respond.json().then(data => {
            const data2 = data;
            // process data per time schedule - daily, weekly, monthly

            buttons.forEach(btn => {
                btn.addEventListener("click", () => {
                    buttons.forEach(b => {
                        b.classList.remove("active");
                        b.classList.add("disabled");
                    });
                    btn.classList.add("active");
                    btn.classList.remove("disabled");

                    if (btn.classList.contains("daily")) {
                        console.log(data2);
                        console.log("daily");
                    } else if (btn.classList.contains("weekly")) {
                        console.log("weekly");
                    } else if (btn.classList.contains("monthly")) {
                        console.log("monthly");
                    }
                });
            });
        }))
    }).catch(err => {
        reject(err)
    })
});