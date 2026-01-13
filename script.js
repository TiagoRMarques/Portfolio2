/* =========================
   MODAL DE PROJETOS COM CARROSSEL
========================= */

const modal = document.getElementById("modal");
const modalTitulo = document.getElementById("modal-titulo");
const modalImg = document.getElementById("carousel-img");
const btnClose = document.querySelector(".modal-close");
const btnsModal = document.querySelectorAll(".btn-vermais");
const btnPrev = document.querySelector(".prev");
const btnNext = document.querySelector(".next");
const btnAbrirProjeto = document.getElementById("abrir-projeto");

let imagensAtuais = [];
let indexAtual = 0;

/* =========================
   DADOS DOS PROJETOS (COM TEXTOS COMPLETOS)
========================= */
const detalhesProjetos = {
    projeto1: {
        titulo: "Barbearia NECA",
        descricao: "Desenvolvimento de uma plataforma digital completa para uma barbearia moderna. O projeto tem como principal objetivo melhorar a experiência do utilizador (UX), através de um design moderno, profissional e totalmente responsivo. O site inclui uma galeria de cortes de cabelo e barba, bem como uma interface simples e intuitiva para a consulta dos serviços disponíveis. Este projeto foi desenvolvido com o objetivo de integrar o meu portefólio pessoal, com especial atenção à performance, organização do conteúdo e estética visual, de forma a demonstrar as minhas competências na criação de uma presença digital apelativa e funcional para uma barbearia.",
        imagens: [
            "/imagens/barba1.png",
            "/imagens/barba2.png",
            "/imagens/Captura de ecrã 2026-01-07 141452.png",
            "/imagens/Captura de ecrã 2026-01-07 141504.png",
            "/imagens/Captura de ecrã 2026-01-07 141512.png"
        ],
        link: "barbeiro/index.html"
    },
    projeto2: {
        titulo: "TFootShop",
        descricao: "Este projeto consiste num simulador de loja online focado na venda de equipamentos desportivos, oferecendo uma experiência de navegação fluida e intuitiva. A plataforma demonstra a implementação de um catálogo dinâmico com a integração de produtos associados às principais ligas europeias, permitindo uma organização visual clara e eficiente. O desenvolvimento destaca-se pela utilização avançada de lógica de programação para a gestão de um carrinho de compras em tempo real, um sistema personalizado de marcação de favoritos e filtros inteligentes por cada liga, garantindo que o utilizador encontre o seu clube de forma rápida e interativa.",
        imagens: [
            "/imagens/loja (1).png",
            "/imagens/loja (2).png",
            "/imagens/loja (3).png",
            "/imagens/loja (4).png",
            "/imagens/loja (5).png",
            "/imagens/loja (6).png",
            "/imagens/loja (7).png",
            "/imagens/loja (8).png",
            "/imagens/loja (9).png"
        ],
        link: "site original/html/index.html"
    },
    projeto3: {
        titulo: "Carteira de Ações",
        descricao: "Este projeto consiste numa plataforma avançada de simulação financeira, desenvolvida em contexto académico, destinada à gestão e acompanhamento de ativos em tempo real. O sistema disponibiliza uma interface robusta que permite ao utilizador visualizar um catálogo completo de ações e criptomoedas, consultar cotações atualizadas e simular operações de compra e venda, com cálculo automático de variações e do total investido.",
        imagens: [
            "/imagens/acoes1.png",
            "/imagens/acoes2.png",
            "/imagens/acoes3.png",
            "/imagens/acooes4.png",
            "/imagens/acoes5.png",
            "/imagens/acoes6.png"
        ],
        link: "http://localhost:4200/"
    }
};

/* =========================
   ATUALIZAR IMAGEM DO CARROSSEL
========================= */
function atualizarImagem() {
    modalImg.src = imagensAtuais[indexAtual];
}

/* =========================
   ABRIR MODAL
========================= */
btnsModal.forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.dataset.projeto;
        const projeto = detalhesProjetos[id];
        if (!projeto) return;

        imagensAtuais = projeto.imagens;
        indexAtual = 0;

        modalTitulo.textContent = projeto.titulo;
        modalImg.src = imagensAtuais[0];
        btnAbrirProjeto.href = projeto.link;

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    });
});

/* =========================
   CONTROLOS DO CARROSSEL
========================= */
btnNext.addEventListener("click", () => {
    indexAtual = (indexAtual + 1) % imagensAtuais.length;
    atualizarImagem();
});

btnPrev.addEventListener("click", () => {
    indexAtual = (indexAtual - 1 + imagensAtuais.length) % imagensAtuais.length;
    atualizarImagem();
});

/* =========================
   FECHAR MODAL
========================= */
function fecharModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
}

btnClose.addEventListener("click", fecharModal);

modal.addEventListener("click", e => {
    if (e.target === modal) fecharModal();
});

/* =========================
   HEADER COM SCROLL
========================= */
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (header) {
        header.classList.toggle("scrolled", window.scrollY > 50);
    }
});
