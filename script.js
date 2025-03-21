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

        limparLinhaDot();

        carregarEventos();

        inserirLinhaDot();
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
        const dataFim = new Date(evento.data_fim);

        const startOfWeek = new Date(currentDate);

        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); 

        function resetTime(date) {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate());
        }
        
        const dataInicioSemHora = resetTime(dataInicio);
        const startOfWeekSemHora = resetTime(startOfWeek);
        const endOfWeekSemHora = resetTime(endOfWeek);
        
        if (dataInicioSemHora < startOfWeekSemHora || dataInicioSemHora > endOfWeekSemHora) {
            return;
        }

        const dia = dataInicio.getDate();
        const horaInicio = dataInicio.getHours();
        const horaFim = dataFim.getHours();

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
            }
        });

        if (indiceLinha === -1) {
            return;
        }

        function escurecerHex(corHex, reducao = 30) {
            if (!corHex.startsWith("#") || (corHex.length !== 7 && corHex.length !== 4)) {
                console.warn("Formato de cor inválido:", corHex);
                return corHex;
            }
        
            if (corHex.length === 4) {
                corHex = `#${corHex[1]}${corHex[1]}${corHex[2]}${corHex[2]}${corHex[3]}${corHex[3]}`;
            }
        
            let r = parseInt(corHex.substring(1, 3), 16);
            let g = parseInt(corHex.substring(3, 5), 16);
            let b = parseInt(corHex.substring(5, 7), 16);
        
            r = Math.max(0, r - reducao);
            g = Math.max(0, g - reducao);
            b = Math.max(0, b - reducao);
        
            return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
        }

        const celula = document.querySelectorAll('.calendar__unit')[indiceLinha * 8 + (indiceColuna + 1)];

        if (celula) {
            const eventoElemento = document.createElement('div');
            eventoElemento.classList.add('event');
            eventoElemento.style.backgroundColor = evento.cor;

            const corTexto = escurecerHex(evento.cor, 180);

            eventoElemento.innerHTML = `<p class="event__title" style="color: ${corTexto};">${evento.nome}</p>`;

            const duracaoHoras = (dataFim - dataInicio) / (1000 * 60 * 60);
            eventoElemento.style.height = `${duracaoHoras * 64 - 32}px`; 

            if (dataInicio.getMinutes() === 30) {
                eventoElemento.style.marginTop = "16px";
                eventoElemento.style.height = `${duracaoHoras * 64}px`; 
            }

            if (dataFim.getMinutes() === 30) {
                eventoElemento.style.height = `${duracaoHoras * 32 + 32}px`;  
            }

            celula.appendChild(eventoElemento);
        } else {
            console.warn("Célula do calendário não encontrada para o evento:", evento);
        }
    }

    function limparLinhaDot() {
        const LinhaElements = document.querySelectorAll('.line');
        LinhaElements.forEach(evento => evento.remove());
        const DotElements = document.querySelectorAll('.line__dot');
        DotElements.forEach(evento => evento.remove());
    }

    function inserirLinhaDot() {
        const agora = new Date();
        const diaAtual = agora.getDate();
        const horaAtual = agora.getHours();
    
        const colunasDia = document.querySelectorAll('.calendar__top_number');
        let indiceColuna = -1;
    
        colunasDia.forEach((elemento, index) => {
            const diaElement = elemento;
            const mesElement = diaElement.parentElement.querySelector(".calendar__top_month");

            const mesTexto = mesElement.textContent.trim();
            const mesIndex = monthNames.indexOf(mesTexto);

            if (
                parseInt(diaElement.textContent.trim()) === diaAtual &&
                mesIndex === agora.getMonth()
            ) {
                indiceColuna = index;
            }
        });
    
        if (indiceColuna === -1) {
            return;
        } else {
    
        const linhasHora = document.querySelectorAll('.calendar__unit_hour');
        let indiceLinha = -1;
    
        linhasHora.forEach((elemento, index) => {
            const horaTexto = elemento.textContent.trim();
            const horaFormatada = (horaAtual % 12 === 0 ? 12 : horaAtual % 12);
            const sufixo = horaAtual < 12 ? ' AM' : ' PM';
            const horaNoCalendario = `${horaFormatada}${sufixo}`;

            if (horaTexto === horaNoCalendario) {
                indiceLinha = index;
            }
        });
    
        if (indiceLinha === -1) {
            console.warn("Não foi possível encontrar a linha para a hora:", horaAtual);
            return;
        }

        const proximaUnit = document.querySelectorAll('.calendar__unit')[indiceLinha * 8 + 1];

        const linhaNova = document.createElement("div");
        linhaNova.classList.add("line");
        proximaUnit.appendChild(linhaNova);

        const lineBall = document.querySelectorAll('.calendar__unit')[indiceLinha * 8 + (indiceColuna + 1)];

        const bolaNova = document.createElement("div");
        bolaNova.classList.add("line__dot");
        lineBall.appendChild(bolaNova);
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
    inserirLinhaDot();
    updateCalendar();
});
