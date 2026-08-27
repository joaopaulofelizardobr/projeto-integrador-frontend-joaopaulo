// =====================================================
// SANTO DO DIA
// =====================================================

// Junta todos os santos cadastrados no santos.js
const todosOsSantos = [
    ...santosPrimeirosSeculos,
    ...santosMedievais,
    ...santosModernos,
    ...santosContemporaneos
];

// -----------------------------------------------------
// CONFIGURAÇÃO
// -----------------------------------------------------

const nomeElemento = document.getElementById("nome-santo");
const imagemElemento = document.getElementById("imagem-santo");
const dataElemento = document.getElementById("data-santo");
const descricaoElemento = document.getElementById("descricao-santo");

// -----------------------------------------------------
// DATA ATUAL
// -----------------------------------------------------

const hoje = new Date();

const dia = String(hoje.getDate()).padStart(2, "0");
const mes = String(hoje.getMonth() + 1).padStart(2, "0");

const dataHoje = `${dia}/${mes}`;

// -----------------------------------------------------
// PROCURA O SANTO DO DIA
// -----------------------------------------------------

const santoDoDia = todosOsSantos.find(
    santo => santo.dataCelebracao === dataHoje
);

// -----------------------------------------------------
// MOSTRA O SANTO
// -----------------------------------------------------

if (santoDoDia) {

    nomeElemento.textContent = santoDoDia.nome;

    dataElemento.textContent =
        `Celebrado em ${santoDoDia.dataCelebracao}`;

    descricaoElemento.textContent =
        santoDoDia.descricao;

    imagemElemento.src =
        santoDoDia.imagem;

    imagemElemento.alt =
        santoDoDia.nome;

} else {

    nomeElemento.textContent =
        "Santo do Dia";

    dataElemento.textContent =
        "Não há santo cadastrado para esta data.";

    descricaoElemento.textContent =
        "";

    imagemElemento.src =
        "assets/images/santo-generico.jpg";

    imagemElemento.alt =
        "Santo do Dia";
}