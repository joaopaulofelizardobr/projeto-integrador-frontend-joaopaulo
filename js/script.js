// =====================================================
// CATHOLIC POINT
// SISTEMA DE SANTOS - CALENDÁRIO E BUSCA
// =====================================================
 
 
// =====================================================
// JUNTA TODOS OS SANTOS EM UM ÚNICO ARRAY
// =====================================================
 
const todosOsSantos = [
    ...santosPrimeirosSeculos,
    ...santosMedievais,
    ...santosModernos,
    ...santosContemporaneos,
    ...titulosMarianos
];
 
 
// =====================================================
// MESES DO ANO
// =====================================================
 
const nomesMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril",
    "Maio", "Junho", "Julho", "Agosto",
    "Setembro", "Outubro", "Novembro", "Dezembro"
];
 
// Quantidade de dias por mês (fevereiro com 29 para
// não deixar nenhum santo de fora, caso exista)
const diasPorMes = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
 
let mesAtual = 0; // 0 = Janeiro
 
 
// =====================================================
// ELEMENTOS DO HTML
// =====================================================
 
const tituloMes = document.getElementById("titulo-mes");
const gradeDias = document.getElementById("grade-dias");
const resultadoCalendario = document.getElementById("resultado-calendario");
 
const campoBusca = document.getElementById("campo-busca");
const resultadoBusca = document.getElementById("resultado-busca");
 
 
// =====================================================
// CRIAÇÃO DE CARD (REUTILIZÁVEL PARA CALENDÁRIO E BUSCA)
// =====================================================
 
function criarCard(item) {
 
    const card = document.createElement("article");
 
    card.classList.add("card-santo");
 
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
 
    return card;
}
 
 
// =====================================================
// CALENDÁRIO - RENDERIZA O MÊS ATUAL
// =====================================================
 
function renderizarMes() {
 
    tituloMes.textContent = nomesMeses[mesAtual];
 
    gradeDias.innerHTML = "";
 
    const totalDias = diasPorMes[mesAtual];
 
    for (let dia = 1; dia <= totalDias; dia++) {
 
        const botaoDia = document.createElement("button");
 
        botaoDia.classList.add("botao-dia");
        botaoDia.textContent = dia;
        botaoDia.type = "button";
 
        botaoDia.addEventListener("click", () => {
            selecionarDia(dia, botaoDia);
        });
 
        gradeDias.appendChild(botaoDia);
    }
}
 
 
// =====================================================
// CALENDÁRIO - MOSTRA OS SANTOS DE UM DIA ESPECÍFICO
// =====================================================
 
function selecionarDia(dia, botaoClicado) {
 
    // Remove destaque de todos os botões e aplica só no clicado
    const todosOsBotoes = gradeDias.querySelectorAll(".botao-dia");
    todosOsBotoes.forEach(botao => botao.classList.remove("botao-dia-ativo"));
    botaoClicado.classList.add("botao-dia-ativo");
 
    const diaFormatado = String(dia).padStart(2, "0");
    const mesFormatado = String(mesAtual + 1).padStart(2, "0");
    const dataFormatada = `${diaFormatado}/${mesFormatado}`;
 
    const resultados = todosOsSantos.filter(
        santo => santo.dataCelebracao === dataFormatada
    );
 
    resultadoCalendario.innerHTML = "";
 
    if (resultados.length === 0) {
 
        const mensagem = document.createElement("p");
        mensagem.classList.add("mensagem-vazia");
        mensagem.textContent = `Nenhum santo cadastrado para o dia ${dataFormatada}.`;
 
        resultadoCalendario.appendChild(mensagem);
 
        return;
    }
 
    resultados.forEach(santo => {
        resultadoCalendario.appendChild(criarCard(santo));
    });
}
 
 
// =====================================================
// CALENDÁRIO - NAVEGAÇÃO ENTRE MESES
// =====================================================
 
function mesAnterior() {
 
    mesAtual = (mesAtual - 1 + 12) % 12;
 
    renderizarMes();
 
    resultadoCalendario.innerHTML = "";
}
 
function proximoMes() {
 
    mesAtual = (mesAtual + 1) % 12;
 
    renderizarMes();
 
    resultadoCalendario.innerHTML = "";
}
 
 
// =====================================================
// BARRA DE PESQUISA
// =====================================================
 
function buscarSantos() {
 
    const termo = campoBusca.value.trim().toLowerCase();
 
    resultadoBusca.innerHTML = "";
 
    if (termo === "") {
        return;
    }
 
    const encontrados = todosOsSantos.filter(
        santo => santo.nome.toLowerCase().includes(termo)
    );
 
    if (encontrados.length === 0) {
 
        const mensagem = document.createElement("p");
        mensagem.classList.add("mensagem-vazia");
        mensagem.textContent = "Nenhum santo encontrado.";
 
        resultadoBusca.appendChild(mensagem);
 
        return;
    }
 
    encontrados.forEach(santo => {
        resultadoBusca.appendChild(criarCard(santo));
    });
}
 
 
// =====================================================
// INICIALIZAÇÃO
// =====================================================
 
function iniciarPagina() {
 
    renderizarMes();
 
    campoBusca.addEventListener("input", buscarSantos);
}
 
document.addEventListener("DOMContentLoaded", iniciarPagina);
 