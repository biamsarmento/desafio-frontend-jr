// document.addEventListener("DOMContentLoaded", function () {
//     const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
//     const calendarDays = document.querySelectorAll(".calendar__top");
//     const leftArrow = document.querySelector(".nav__left-arrow");
//     const rightArrow = document.querySelector(".nav__right-arrow");
//     const todayButton = document.querySelector(".nav__today");

//     let currentDate = new Date();

//     function updateCalendar() {
//         let startOfWeek = new Date(currentDate);
//         startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); 

//         calendarDays.forEach((dayElement, index) => {
//             let dayDate = new Date(startOfWeek);
//             dayDate.setDate(startOfWeek.getDate() + index); 

//             let month = monthNames[dayDate.getMonth()];
//             let dayNumber = dayDate.getDate();
//             let dayName = dayNames[dayDate.getDay()];

//             dayElement.querySelector(".calendar__top_month").textContent = month;
//             dayElement.querySelector(".calendar__top_number").textContent = dayNumber;
//             dayElement.querySelector(".calendar__top_day").textContent = dayName;

//             dayElement.classList.remove("today");

//             let today = new Date();
//             if (
//                 dayDate.getDate() === today.getDate() &&
//                 dayDate.getMonth() === today.getMonth() &&
//                 dayDate.getFullYear() === today.getFullYear()
//             ) {
//                 dayElement.classList.add("today");
//             }
//         });

//         limparEventos();

//         carregarEventos();
//     }

//     function limparEventos() {
//         const eventoElements = document.querySelectorAll('.event');
//         eventoElements.forEach(evento => evento.remove());
//     }

//     async function carregarEventos() {
//         try {
//             const response = await fetch('./eventos.json');
//             const data = await response.json();

//             const eventos = data.eventos;

//             if (Array.isArray(eventos)) {
//                 eventos.forEach(evento => {
//                     inserirEventoNoCalendario(evento);
//                 });
//             } else {
//                 console.error("Os eventos não são um array:", eventos);
//             }
//         } catch (error) {
//             console.error("Erro ao carregar eventos:", error);
//         }
//     }

//     function inserirEventoNoCalendario(evento) {
//         const dataInicio = new Date(evento.data_inicio);
//         const dataFim = new Date(evento.data_fim);

//         const startOfWeek = new Date(currentDate);
//         startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
//         const endOfWeek = new Date(startOfWeek);
//         endOfWeek.setDate(startOfWeek.getDate() + 6); 

//         if (dataInicio < startOfWeek || dataInicio > endOfWeek) {
//             console.log(`Evento "${evento.nome}" não está na semana exibida.`);
//             return;
//         }

//         const dia = dataInicio.getDate();
//         const horaInicio = dataInicio.getHours();
//         const horaFim = dataFim.getHours();

//         const colunasDia = document.querySelectorAll('.calendar__top_number');
//         let indiceColuna = -1;

//         colunasDia.forEach((elemento, index) => {
//             if (parseInt(elemento.textContent.trim()) === dia) {
//                 indiceColuna = index + 1;
//             }
//         });

//         if (indiceColuna === -1) {
//             console.warn("Não foi possível encontrar a coluna para o dia:", dataInicio);
//             return;
//         }

//         const linhasHora = document.querySelectorAll('.calendar__unit_hour');
//         for (let hora = horaInicio; hora < horaFim; hora++) {
//             let indiceLinha = -1;

//             linhasHora.forEach((elemento, index) => {
//                 const horaTexto = elemento.textContent.trim();
                
//                 const horaFormatada = (hora % 12 === 0 ? 12 : hora % 12); 
//                 const sufixo = hora < 12 ? ' AM' : ' PM';
//                 const horaNoCalendario = `${horaFormatada}${sufixo}`;
            
//                 if (horaTexto === horaNoCalendario) {
//                     indiceLinha = index;
//                     console.log("ACHEI: ", horaTexto, horaNoCalendario);
//                 }
//             });
            

//             if (indiceLinha === -1) {
//                 console.warn("Não foi possível encontrar a linha para a hora:", hora);
//                 continue;
//             }

//             const celula = document.querySelectorAll('.calendar__unit')[indiceLinha * 8 + indiceColuna];

//             if (celula) {
//                 const eventoElemento = document.createElement('div');
//                 eventoElemento.classList.add('event');
//                 eventoElemento.style.backgroundColor = evento.cor;
//                 eventoElemento.innerHTML = `<p class="event__title">${evento.nome}</p>`;

//                 celula.appendChild(eventoElemento);
//             } else {
//                 console.warn("Célula do calendário não encontrada para o evento:", evento);
//             }
//         }
//     }

//     // Event Listeners
//     leftArrow.addEventListener("click", function () {
//         currentDate.setDate(currentDate.getDate() - 7);
//         updateCalendar();
//     });

//     rightArrow.addEventListener("click", function () {
//         currentDate.setDate(currentDate.getDate() + 7);
//         updateCalendar();
//     });

//     todayButton.addEventListener("click", function () {
//         currentDate = new Date();
//         updateCalendar();
//     });

//     carregarEventos();
//     updateCalendar();
// });





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

        limparEventos();

        carregarEventos();
    }

    function limparEventos() {
        const eventoElements = document.querySelectorAll('.event');
        eventoElements.forEach(evento => evento.remove());
    }

    async function carregarEventos() {
        try {
            const response = await fetch('./eventos.json');
            const data = await response.json();
    
            const eventos = data.eventos;
    
            if (Array.isArray(eventos)) {
                limparEventos();
                eventos.forEach(evento => {
                    inserirEventoNoCalendario(evento);
                });
            } else {
                console.error("Os eventos não são um array:", eventos);
            }
        } catch (error) {
            console.error("Erro ao carregar eventos:", error);
        }
    }

    function inserirEventoNoCalendario(evento) {
        const dataInicio = new Date(evento.data_inicio);

        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); 

        if (dataInicio < startOfWeek || dataInicio > endOfWeek) {
            console.log(`Evento "${evento.nome}" não está na semana exibida.`);
            return;
        }

        const dia = dataInicio.getDate();
        const horaInicio = dataInicio.getHours();

        const colunasDia = document.querySelectorAll('.calendar__top_number');
        let indiceColuna = -1;

        colunasDia.forEach((elemento, index) => {
            if (parseInt(elemento.textContent.trim()) === dia) {
                indiceColuna = index;
            }
        });

        if (indiceColuna === -1) {
            console.warn("Não foi possível encontrar a coluna para o dia:", dataInicio);
            return;
        }

        const linhasHora = document.querySelectorAll('.calendar__unit_hour');
        let indiceLinha = -1;

        linhasHora.forEach((elemento, index) => {
            const horaTexto = elemento.textContent.trim();
            
            const horaFormatada = (horaInicio % 12 === 0 ? 12 : horaInicio % 12); 
            const sufixo = horaInicio < 12 ? ' AM' : ' PM';
            const horaNoCalendario = `${horaFormatada}${sufixo}`;
        
            if (horaTexto === horaNoCalendario) {
                indiceLinha = index;
                console.log("ACHEI: ", horaTexto, horaNoCalendario);
            }
        });

        if (indiceLinha === -1) {
            console.warn("Não foi possível encontrar a linha para a hora:", horaInicio);
            return;
        }

        const celula = document.querySelectorAll('.calendar__unit')[indiceLinha * 8 + (indiceColuna + 1)];

        if (celula) {
            console.log("Adicionando evento na célula: ", celula);
            const eventoElemento = document.createElement('div');
            eventoElemento.classList.add('event');
            eventoElemento.style.backgroundColor = evento.cor;
            eventoElemento.innerHTML = `<p class="event__title">${evento.nome}</p>`;

            celula.appendChild(eventoElemento);
        } else {
            console.warn("Célula do calendário não encontrada para o evento:", evento);
        }
    }

    // Event Listeners
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

    carregarEventos();
    updateCalendar();
});
