const monthYear = document.getElementById("monthYear");
const dates = document.getElementById("dates");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentDate = new Date();

function renderCalendar() {

    dates.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();

    const lastDate = new Date(year, month + 1, 0).getDate();

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    monthYear.innerText = `${monthNames[month]} ${year}`;

    for (let i = 0; i < firstDay; i++) {

        const empty = document.createElement("div");
        dates.appendChild(empty);
    }

    for (let day = 1; day <= lastDate; day++) {

        const date = document.createElement("div");

        date.innerText = day;

        const today = new Date();

        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            date.classList.add("today");
        }

        dates.appendChild(date);
    }
}

prevBtn.addEventListener("click", () => {

    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextBtn.addEventListener("click", () => {

    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar();