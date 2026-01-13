// ==========================
// ANIMAÇÃO NO SCROLL
// ==========================
(function () {
    const els = document.querySelectorAll(".scroll-animate");
    if (!("IntersectionObserver" in window)) {
        els.forEach(e => e.classList.add("visible"));
        return;
    }

    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add("visible");
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });

    els.forEach(e => obs.observe(e));
})();

// ==========================
// TEMA CLARO / ESCURO
// ==========================
const botaoTema = document.getElementById("toggle-tema");
if (botaoTema) {
    botaoTema.onclick = () => {
        document.body.classList.toggle("dark");
        botaoTema.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    };
}

// ==========================
// FORMULÁRIO DE CONTACTO
// ==========================
(function () {
    const form = document.getElementById("form-contato");
    const feedback = document.getElementById("contato-feedback");
    if (!form) return;

    form.addEventListener("submit", e => {
        e.preventDefault();
        feedback.textContent = "Obrigado pela mensagem! Entraremos em contacto em breve.";
        form.reset();
    });
})();

// ==========================
// SISTEMA DE RESERVAS
// ==========================
(function () {
    const STORAGE_KEY = "reservas-neca";
    const form = document.getElementById("form-reserva");
    const diaInput = document.getElementById("dia");
    const horaInput = document.getElementById("hora");

    if (!form || !diaInput || !horaInput) return;

    // Horários: 0=Domingo ... 6=Sábado
    const horarios = {
        2: [["09:00", "12:30"], ["14:00", "19:30"]], // Terça
        3: [["09:00", "12:30"], ["14:00", "19:30"]], // Quarta
        4: [["09:00", "12:30"], ["14:00", "19:30"]], // Quinta
        5: [["09:00", "12:30"], ["14:00", "19:30"]], // Sexta
        6: [["09:00", "13:00"]]                       // Sábado
    };

    // Bloquear datas passadas
    const hoje = new Date().toISOString().split("T")[0];
    diaInput.min = hoje;

    // Utilitários
    const getReservas = () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const saveReservas = r => localStorage.setItem(STORAGE_KEY, JSON.stringify(r));

    const gerarHoras = (ini, fim, step = 30) => {
        const res = [];
        let [h, m] = ini.split(":").map(Number);
        const [endH, endM] = fim.split(":").map(Number);
        while (h * 60 + m <= endH * 60 + endM) {
            res.push(`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`);
            m += step;
            if (m >= 60) { h++; m = 0; }
        }
        return res;
    };

    // ==========================
    // GERAR HORÁRIOS DISPONÍVEIS
    // ==========================
    diaInput.addEventListener("change", () => {
        horaInput.innerHTML = "";

        let valor = diaInput.value;

        // Converter para YYYY-MM-DD
        if (valor.includes("/")) {
            const [d, m, a] = valor.split("/").map(Number);
            valor = `${a.toString().padStart(4,"0")}-${m.toString().padStart(2,"0")}-${d.toString().padStart(2,"0")}`;
        } else if (valor.includes("-")) {
            const [d, m, a] = valor.split("-").map(Number);
            if (a < 100) a += 2000;
            valor = `${a.toString().padStart(4,"0")}-${m.toString().padStart(2,"0")}-${d.toString().padStart(2,"0")}`;
        }

        diaInput.value = valor;

        const [ano, mes, dia] = valor.split("-").map(Number);
        const data = new Date(ano, mes - 1, dia);
        const diaSemana = data.getDay();

        if (!horarios[diaSemana]) {
            alert("⛔ Encerrado neste dia.");
            diaInput.value = "";
            return;
        }

        let horas = [];
        horarios[diaSemana].forEach(i => horas = horas.concat(gerarHoras(i[0], i[1])));

        const reservasDia = getReservas().filter(r => r.dia === valor);
        horas = horas.filter(h => !reservasDia.some(r => r.hora === h));

        if (horas.length === 0) {
            alert("⛔ Não há horários disponíveis para este dia.");
            return;
        }

        horas.forEach(h => {
            const opt = document.createElement("option");
            opt.value = h;
            opt.textContent = h;
            horaInput.appendChild(opt);
        });
    });

    // ==========================
    // SUBMISSÃO DA RESERVA
    // ==========================
    form.addEventListener("submit", e => {
        e.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const servico = document.getElementById("servico").value;
        const barbeiro = document.getElementById("barbeiro").value;
        const dia = diaInput.value;
        const hora = horaInput.value;

        if (!dia || !hora) {
            alert("Por favor, escolha o dia e a hora.");
            return;
        }

        const [ano, mes, diaNum] = dia.split("-").map(Number);
        const [horaNum, minNum] = hora.split(":").map(Number);
        const dataReserva = new Date(ano, mes - 1, diaNum, horaNum, minNum);
        const agora = new Date();
        if (dataReserva <= agora) {
            alert("⛔ Não é possível reservar no passado.");
            return;
        }

        const reservas = getReservas();
        if (reservas.some(r => r.dia === dia && r.hora === hora && r.barbeiro === barbeiro)) {
            alert("⛔ Horário já reservado.");
            return;
        }

        reservas.push({ nome, email, servico, barbeiro, dia, hora });
        saveReservas(reservas);

        alert("✅ Reserva confirmada!");
        form.reset();

        // Atualiza lista de reservas se estivermos na página "Minhas Reservas"
        mostrarMinhasReservas();
    });
})();

// ==========================
// FUNÇÃO PARA MOSTRAR RESERVAS NA PÁGINA "Minhas Reservas"
// ==========================
function mostrarMinhasReservas() {
    const lista = document.getElementById("lista-reservas");
    if (!lista) return;

    const reservas = JSON.parse(localStorage.getItem("reservas-neca")) || [];
    lista.innerHTML = "";

    if (reservas.length === 0) {
        lista.innerHTML = `<p class="sem-reservas">Ainda não tens reservas marcadas.</p>`;
        return;
    }

    reservas.forEach((r, index) => {
        const div = document.createElement("div");
        div.className = "reserva";

        div.innerHTML = `
            <h3>Reserva ${index + 1}</h3>
            <p><strong>Nome:</strong> ${r.nome}</p>
            <p><strong>Serviço:</strong> ${r.servico}</p>
            <p><strong>Barbeiro:</strong> ${r.barbeiro}</p>
            <p><strong>Dia:</strong> ${r.dia}</p>
            <p><strong>Hora:</strong> ${r.hora}</p>
        `;

        lista.appendChild(div);
    });
}

// Executa ao carregar qualquer página que tenha #lista-reservas
window.addEventListener("DOMContentLoaded", mostrarMinhasReservas);
function mostrarMinhasReservas() {
    const lista = document.getElementById("lista-reservas");
    if (!lista) return;

    const reservas = JSON.parse(localStorage.getItem("reservas-neca")) || [];
    lista.innerHTML = "";

    if (reservas.length === 0) {
        lista.innerHTML = `<p class="sem-reservas">Ainda não tens reservas marcadas.</p>`;
        return;
    }

    reservas.forEach((r, index) => {
        const div = document.createElement("div");
        div.className = "reserva";

        div.innerHTML = `
            <h3>Reserva ${index + 1}</h3>
            <p><strong>Nome:</strong> ${r.nome}</p>
            <p><strong>Serviço:</strong> ${r.servico}</p>
            <p><strong>Barbeiro:</strong> ${r.barbeiro}</p>

            <label>Dia:</label>
            <input type="date" class="editar-dia" value="${r.dia}">
            <label>Hora:</label>
            <input type="time" class="editar-hora" value="${r.hora}">

            <div class="botoes-reserva">
                <button class="btn-editar">💾 Salvar Alteração</button>
                <button class="btn-eliminar">🗑️ Eliminar</button>
            </div>
        `;

        lista.appendChild(div);

        // Botão de eliminar
        div.querySelector(".btn-eliminar").addEventListener("click", () => {
            if (confirm(`Deseja eliminar a reserva de ${r.nome} no dia ${r.dia} às ${r.hora}?`)) {
                reservas.splice(index, 1);
                localStorage.setItem("reservas-neca", JSON.stringify(reservas));
                mostrarMinhasReservas();
            }
        });

        // Botão de editar
        div.querySelector(".btn-editar").addEventListener("click", () => {
            const novoDia = div.querySelector(".editar-dia").value;
            const novaHora = div.querySelector(".editar-hora").value;

            if (!novoDia || !novaHora) {
                alert("⛔ Dia e hora não podem estar vazios.");
                return;
            }

            // Verifica se já existe reserva no mesmo dia/hora/barbeiro
            if (reservas.some((res, i) => i !== index && res.dia === novoDia && res.hora === novaHora && res.barbeiro === r.barbeiro)) {
                alert("⛔ Já existe uma reserva para este barbeiro neste dia e hora.");
                return;
            }

            reservas[index].dia = novoDia;
            reservas[index].hora = novaHora;
            localStorage.setItem("reservas-neca", JSON.stringify(reservas));
            alert("✅ Alteração salva!");
            mostrarMinhasReservas();
        });
    });
}
