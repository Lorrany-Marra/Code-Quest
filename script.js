const perguntas = [
    {
        pergunta: "Qual comando Git cria um novo repositório local?",
        opcoes: ["git clone", "git init", "git push", "git commit"],
        respostaCorreta: "git init"
    },
    {
        pergunta: "Qual arquivo usamos para ignorar arquivos no Git?",
        opcoes: [".env", "README.md", ".gitignore", "package.json"],
        respostaCorreta: ".gitignore"
    },
    {
        pergunta: "Qual comando envia commits para o GitHub?",
        opcoes: ["git fetch", "git push", "git merge", "git clone"],
        respostaCorreta: "git push"
    },
    {
        pergunta: "Como desfazemos um commit mantendo o histórico?",
        opcoes: ["git reset --hard", "git revert", "git rm", "git remove"],
        respostaCorreta: "git revert"
    },
    {
        pergunta: "Qual extensão de arquivo usamos para o README no GitHub?",
        opcoes: [".txt", ".readme", ".doc", ".md"],
        respostaCorreta: ".md"
    }
]

let indiceAtual = 0;
let pontuacao = 0;

const perguntaEl = document.getElementById('pergunta');
const opcoesEl = document.getElementById('opcoes');
const resultadoEl = document.getElementById('resultado');
const botaoProxima = document.getElementById('proxima');
const placarEl = document.getElementById('placar');

function carregarPergunta() {
    resultadoEl.textContent = "";
    botaoProxima.style.display = 'none';
    const perguntaAtual = perguntas[indiceAtual];

    perguntaEl.textContent = perguntaAtual.pergunta;
    opcoesEl.innerHTML = '';

    perguntaAtual.opcoes.forEach(opcao => {
        const botao = document.createElement('button');
        botao.classList.add('opcao');
        botao.textContent = opcao;
        botao.onclick = () => verificarResposta(opcao);
        opcoesEl.appendChild(botao);
    });
}

function verificarResposta(resposta) {
    const correta = perguntas[indiceAtual].respostaCorreta;
    if (resposta === correta) {
        resultadoEl.textContent = "✅ Acertou!";
        pontuacao++;
    } else {
        resultadoEl.textContent = `❌ Errou! A resposta correta era: ${correta}`;
    }

    placarEl.textContent = `Pontuação: ${pontuacao} / ${perguntas.length}`;
    botaoProxima.style.display = 'block';
    Array.from(opcoesEl.children).forEach(btn => btn.disabled = true);
}

function proximaPergunta() {
    indiceAtual++;
    if (indiceAtual < perguntas.length) {
        carregarPergunta();
    } else {
        finalizarJogo();
    }
}

function finalizarJogo() {
    perguntaEl.textContent = "🏁 Fim do Code Quest!";
    opcoesEl.innerHTML = '';
    resultadoEl.textContent = `Você acertou ${pontuacao} de ${perguntas.length} perguntas.`;
    botaoProxima.style.display = 'none';
    const reiniciar = document.createElement('button');
    reiniciar.textContent = '🔁 Jogar Novamente';
    reiniciar.onclick = reiniciarJogo;
    opcoesEl.appendChild(reiniciar);
}

function reiniciarJogo() {
    indiceAtual = 0;
    pontuacao = 0;
    placarEl.textContent = "";
    carregarPergunta();
}

// Inicializar o jogo ao carregar a página
document.addEventListener('DOMContentLoaded', carregarPergunta);
botaoProxima.addEventListener('click', proximaPergunta);
