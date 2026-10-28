//SCRIPT PRINCIPAL
const datasSecretas = {
    "2023-05-27": "surpresas/data1.html",
    "2004-05-19": "surpresas/data2.html",
    "2024-12-25": "surpresas/data3.html",
    "2023-10-23": "surpresas/data4.html",
    "2022-02-21": "surpresas/data5.html",
    "2023-05-17": "surpresas/data6.html",
    "2004-12-03": "surpresas/data7.html"
};

const CHAVE = "jogoDasDatasProgresso";

const campoData = document.getElementById("date");
const botao = document.getElementById("botao");
const mensagem = document.getElementById("mensagem");
const estrelas = document.querySelectorAll(".pontuacao i");
const botaoFinal = document.getElementById("botaoFinal");

// Recupera as datas já coletadas
function carregarProgresso() {
    try {
        const salvo = localStorage.getItem(CHAVE);
        const progresso = salvo ? JSON.parse(salvo) : [];

        if (!Array.isArray(progresso)) return [];

        // Aceita apenas datas válidas que existem no jogo
        return [...new Set(progresso.filter(
            data => Object.hasOwn(datasSecretas, data)
        ))];
    } catch {
        return [];
    }
}

let datasColetadas = carregarProgresso();

// Atualiza as estrelas e o botão final
function atualizarInterface() {
    estrelas.forEach((estrela, indice) => {
        const coletada = indice < datasColetadas.length;

        estrela.classList.toggle("fa-solid", coletada);
        estrela.classList.toggle("fa-regular", !coletada);
    });

    botaoFinal.hidden = datasColetadas.length !== 7;
}

// Verifica a data escolhida
function verificarData() {
    const data = campoData.value;

    if (!data) {
        mensagem.textContent = "Escolha uma data primeiro! 💗";
        return;
    }

    const surpresa = datasSecretas[data];

    if (!surpresa) {
        mensagem.textContent = "Hmm... não é essa data! Tente novamente. 💕";
        return;
    }

    // Só pontua se for uma data inédita
    if (!datasColetadas.includes(data)) {
        datasColetadas.push(data);

        try {
            localStorage.setItem(
                CHAVE,
                JSON.stringify(datasColetadas)
            );
        } catch {
            datasColetadas.pop();
            mensagem.textContent =
                "Não foi possível salvar seu progresso neste navegador.";
            return;
        }

        atualizarInterface();
    }

    // Uma data já coletada não concede outra estrela
    mensagem.textContent = "Você encontrou uma lembrança! ❤️";

    // Redireciona para a surpresa correspondente
    window.location.href = surpresa;
}

botao.addEventListener("click", verificarData);

// Libera o botão final somente após os sete acertos
botaoFinal.addEventListener("click", () => {
    if (datasColetadas.length === 7) {
        window.location.href = "surpresas/final.html";
    }
});

// Restaura a pontuação quando a página é aberta
atualizarInterface();

// BOTÃO DE LIGAR E DESLIGAR A MÚSICA
const musicaFundo = document.getElementById("musicaFundo");
const botaoMusica = document.getElementById("botaoMusica");

botaoMusica.addEventListener("click", () => {
    if (musicaFundo.paused) {
        musicaFundo.play();
        botaoMusica.innerHTML =
            '<i class="fa-solid fa-volume-high"></i>';
    } else {
        musicaFundo.pause();
        botaoMusica.innerHTML =
            '<i class="fa-solid fa-volume-xmark"></i>';
    }
});