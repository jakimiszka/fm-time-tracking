const buttons = document.querySelectorAll(".daily, .weekly, .monthly");
const currentFields = document.querySelectorAll(".time-value-current");
const previousFields = document.querySelectorAll(".time-value-previous");
const timeUnits = document.querySelectorAll(".time-unit");

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
const fields = prepareObject();

function chooseTimeUnit(num){
    return num === 1 ? 'hr' : 'hrs';
}
function updateFields(fields, data, category, timeframe) {
    console.log(fields);
    console.log(data);
}

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

                    if (btn.classList.contains("daily")) {
                        updateFields(fields, data, "Work", "daily");
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