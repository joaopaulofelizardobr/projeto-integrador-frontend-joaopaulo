// =====================================================
// CATHOLIC POINT
// SISTEMA DE SANTOS
// =====================================================
 
 
// =====================================================
// CATEGORIAS
// =====================================================
 
const categorias = [
    {
        id: "primeiros-seculos",
        titulo: "Santos dos Primeiros Séculos",
        lista: santosPrimeirosSeculos
    },
    {
        id: "medievais",
        titulo: "Santos Medievais",
        lista: santosMedievais
    },
    {
        id: "modernos",
        titulo: "Santos Modernos",
        lista: santosModernos
    },
    {
        id: "contemporaneos",
        titulo: "Santos Contemporâneos",
        lista: santosContemporaneos
    },
    {
        id: "titulos-marianos",
        titulo: "Títulos Marianos",
        lista: titulosMarianos
    }
];
 
 
// =====================================================
// QUANTIDADE INICIAL
// =====================================================
 
const quantidadeInicial = 20;
 
 
// =====================================================
// QUANTIDADE ATUAL DE CADA CATEGORIA
// =====================================================
 
const quantidadeExibida = {};
 
categorias.forEach(categoria => {
    quantidadeExibida[categoria.id] = quantidadeInicial;
});
 
 
// =====================================================
// CRIAÇÃO DOS CARDS
// =====================================================
 
function criarCard(item, categoria) {
 
    const card = document.createElement("article");
 
    card.classList.add("card-santo");
 
 
    // -------------------------------------------------
    // IMAGEM
    // -------------------------------------------------
 
    if (categoria.id === "titulos-marianos") {
 
        card.innerHTML = `
            <h3>${item.nome}</h3>
 
            <img
                src="${item.imagem}"
                alt="${item.nome}"
                class="imagem-santo"
                onerror="this.style.display='none';"
            >
 
            <div class="card-conteudo">
 
                <p>
                    ${item.descricao || ""}
                </p>
 
                ${
                    item.dataCelebracao
                        ? `<p><strong>Data:</strong> ${item.dataCelebracao}</p>`
                        : ""
                }
 
                ${
                    item.origem
                        ? `<p><strong>Origem:</strong> ${item.origem}</p>`
                        : ""
                }
 
            </div>
        `;
 
    } else {
 
        card.innerHTML = `
            <h3>${item.nome}</h3>
 
            <img
                src="${item.imagem}"
                alt="${item.nome}"
                class="imagem-santo"
                onerror="this.style.display='none';"
            >
 
            <div class="card-conteudo">
 
                ${
                    item.dataCelebracao
                        ? `<p><strong>Celebrado em:</strong> ${item.dataCelebracao}</p>`
                        : ""
                }
 
                <p>
                    ${item.descricao || ""}
                </p>
 
            </div>
        `;
    }
 
    return card;
}
 
 
// =====================================================
// RENDERIZA UMA CATEGORIA
// =====================================================
 
function renderizarCategoria(categoria) {
 
    const container = document.getElementById(
        `lista-${categoria.id}`
    );
 
    const botao = document.getElementById(
        `ver-mais-${categoria.id}`
    );
 
 
    // Se a categoria não existir no HTML,
    // simplesmente não faz nada.
 
    if (!container) {
        return;
    }
 
 
    // Limpa os cards antes de renderizar
 
    container.innerHTML = "";
 
 
    // Quantidade que deve aparecer
 
    const quantidade = quantidadeExibida[categoria.id];
 
 
    // Pega somente os itens necessários
 
    const itens = categoria.lista.slice(
        0,
        quantidade
    );
 
 
    // Cria os cards
 
    itens.forEach(item => {
 
        const card = criarCard(
            item,
            categoria
        );
 
        container.appendChild(card);
 
    });
 
 
    // -------------------------------------------------
    // BOTÃO VER MAIS
    // -------------------------------------------------
 
    if (botao) {
 
        if (quantidade >= categoria.lista.length) {
 
            botao.style.display = "none";
 
        } else {
 
            botao.style.display = "block";
 
        }
    }
}
 
 
// =====================================================
// VER MAIS
// =====================================================
 
function adicionarMais(categoriaId) {
 
    quantidadeExibida[categoriaId] += 20;
 
 
    const categoria = categorias.find(
        categoria => categoria.id === categoriaId
    );
 
 
    if (categoria) {
 
        renderizarCategoria(categoria);
 
    }
}
 
 
// =====================================================
// INICIALIZAÇÃO
// =====================================================
 
function iniciarPagina() {
 
    categorias.forEach(categoria => {
 
        renderizarCategoria(categoria);
 
    });
 
}
 
 
// =====================================================
// INICIA QUANDO O HTML ESTIVER CARREGADO
// =====================================================
 
document.addEventListener(
    "DOMContentLoaded",
    iniciarPagina
);
 























