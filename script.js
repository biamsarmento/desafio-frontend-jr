
document.addEventListener("DOMContentLoaded", function () {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const calendarDays = document.querySelectorAll(".calendar__top");
    const leftArrow = document.querySelector(".nav__left-arrow");
    const rightArrow = document.querySelector(".nav__right-arrow");
    const todayButton = document.querySelector(".nav__today");
    
    let currentDate = new Date();
    
    function updateCalendar() {
        let startOfWeek = new Date(currentDate);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); 

        calendarDays.forEach((dayElement, index) => {
            let dayDate = new Date(startOfWeek);
            dayDate.setDate(startOfWeek.getDate() + index); 

            let month = monthNames[dayDate.getMonth()];
            let dayNumber = dayDate.getDate();
            let dayName = dayNames[dayDate.getDay()];

            dayElement.querySelector(".calendar__top_month").textContent = month;
            dayElement.querySelector(".calendar__top_number").textContent = dayNumber;
            dayElement.querySelector(".calendar__top_day").textContent = dayName;

            dayElement.classList.remove("today");

            let today = new Date();
            if (
                dayDate.getDate() === today.getDate() &&
                dayDate.getMonth() === today.getMonth() &&
                dayDate.getFullYear() === today.getFullYear()
            ) {
                dayElement.classList.add("today");
            }
        });
    }

    leftArrow.addEventListener("click", function () {
        currentDate.setDate(currentDate.getDate() - 7);
        updateCalendar();
    });

    rightArrow.addEventListener("click", function () {
        currentDate.setDate(currentDate.getDate() + 7);
        updateCalendar();
    });

    todayButton.addEventListener("click", function () {
        currentDate = new Date();
        updateCalendar();
    });

    const style = document.createElement("style");
    style.innerHTML = `
        .today {
            color: #5856D6;
        }
    `;
    document.head.appendChild(style);

    updateCalendar();
});
