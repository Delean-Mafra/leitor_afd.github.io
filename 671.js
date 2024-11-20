// 671.js - Código de validação para o tipo 671

function processFile671(content) {
    const output = document.getElementById('output');
    output.innerHTML = "Processando arquivo 671...";

    const linhas = content.split("\n");
    const registros = {};
    const linhas_invalidas = [];

    for (let i = 0; i < linhas.length; i++) {
        const linha = linhas[i].trim();
        if (linha.length < 10) continue;

        const tipo_registro = linha[9];
        let tamanho_registro;

        if (tipo_registro === '7') {
            tamanho_registro = 137;
        } else if (tipo_registro === '3') {
            tamanho_registro = 50;
        } else {
            continue;
        }

        if (linha.length !== tamanho_registro) {
            linhas_invalidas.push({ linha: i + 1, erros: ["Tamanho do registro inválido"], conteudo: linha });
            continue;
        }

        const numero_documento = linha.substring(35, 46);
        if (!/^\d+$/.test(numero_documento)) {
            linhas_invalidas.push({ linha: i + 1, erros: ["Número do documento inválido"], conteudo: linha });
            continue;
        }

        if (!registros[numero_documento]) {
            registros[numero_documento] = [];
        }
        registros[numero_documento].push(linha);
    }

    if (linhas_invalidas.length > 0) {
        let invalidOutput = "<h3>Linhas inválidas:</h3>";
        linhas_invalidas.forEach(item => {
            invalidOutput += `<div class="erro">
                <p>Linha ${item.linha}: ${item.conteudo}</p>
                ${item.erros.map(erro => `<p>- ${erro}</p>`).join('')}
            </div>`;
        });
        output.innerHTML = invalidOutput;
    } else {
        output.innerHTML = "<p>Nenhum erro encontrado.</p>";
    }
}
