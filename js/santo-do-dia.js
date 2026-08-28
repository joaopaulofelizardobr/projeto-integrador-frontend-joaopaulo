// Junta todos os santos em um único array
const todosOsSantos = [
    ...santosPrimeirosSeculos,
    ...santosMedievais,
    ...santosModernos,
    ...santosContemporaneos,
    ...titulosMarianos
];

const container = document.getElementById("santos-do-dia");

const hoje = new Date();
const dia = String(hoje.getDate()).padStart(2, "0");
const mes = String(hoje.getMonth() + 1).padStart(2, "0");
const dataHoje = dia + "/" + mes;

// Procura TODOS os santos que celebram na data de hoje
const resultados = [];

for (let i = 0; i < todosOsSantos.length; i++) {
    if (todosOsSantos[i].dataCelebracao === dataHoje) {
        resultados.push(todosOsSantos[i]);
    }
}

// Limpa o container antes de inserir o conteúdo
container.innerHTML = "";

if (resultados.length === 0) {
    const titulo = document.createElement("h3");
    titulo.textContent = "Santo do Dia";

    const mensagem = document.createElement("p");
    mensagem.textContent = "Não há santo cadastrado para esta data.";

    container.appendChild(titulo);
    container.appendChild(mensagem);
} else {
    for (let i = 0; i < resultados.length; i++) {
        const santo = resultados[i];

        const card = document.createElement("div");

        const nome = document.createElement("h3");
        nome.textContent = santo.nome;

        const imagem = document.createElement("img");
        imagem.src = santo.imagem;
        imagem.alt = santo.nome;

        const data = document.createElement("p");
        data.textContent = "Celebrado em " + santo.dataCelebracao;

        const descricao = document.createElement("p");
        descricao.textContent = santo.descricao;

        card.appendChild(nome);
        card.appendChild(imagem);
        card.appendChild(data);
        card.appendChild(descricao);

        container.appendChild(card);
    }
}