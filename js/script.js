const buttons = document.querySelectorAll(".daily, .weekly, .monthly");
const currentFields = document.querySelectorAll(".time-value-current");
const previousFields = document.querySelectorAll(".time-value-previous");
const timeUnits = document.querySelectorAll(".time-unit");
const fields = prepareObject();

new Promise((resolve, reject) => {
fetch('./data.json')
    .then(respond => {
        resolve(respond.json().then(data => {
            buttons.forEach(btn => {
                btn.addEventListener("click", () => {
                    buttons.forEach(b => {
                        b.classList.remove("active");
                        b.classList.add("disabled");
                    });
                    btn.classList.add("active");
                    btn.classList.remove("disabled");

                    switch (btn.classList[0]) {
                        case "daily":
                            updateFields(fields, data, "daily");
                            break;
                        case "weekly":
                            updateFields(fields, data, "weekly");
                            break;
                        case "monthly":
                            updateFields(fields, data, "monthly");
                            break;
                        }
                });
            });
        }))
    }).catch(err => {
        reject(err)
    })
});

function prepareObject(){
    let object = {};
    for (let i = 0; i < currentFields.length; i++) {
        object[currentFields[i].dataset.cat] = {
            current: currentFields[i],
            previous: previousFields[i],
            unit: Array.from(timeUnits).filter(unit => unit.dataset.cat === currentFields[i].dataset.cat)
        }
    }
    return object;
}

function updateFields(fields, data, timeframe) {
    for (let key in fields) {
        const num_current = data[key].timeframes[timeframe].current;
        const num_previous = data[key].timeframes[timeframe].previous;
        fields[key].current.textContent = num_current
        fields[key].previous.textContent = num_previous
        fields[key].unit[0].textContent = num_current === 1 ? 'hr' : 'hrs';
        fields[key].unit[1].textContent = num_previous === 1 ? 'hr' : 'hrs';
    }
}