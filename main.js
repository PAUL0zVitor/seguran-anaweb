document.addEventListener('DOMContentLoaded', function() {
    const campoSenha = document.getElementById('campo-senha');
    const minusculoCheckbox = document.querySelector('input[name="minusculo"]');
    const maiusculoCheckbox = document.querySelector('input[name="maiusculo"]');
    const numeroCheckbox = document.querySelector('input[name="numero"]');
    const simboloCheckbox = document.querySelector('input[name="simbolo"]');
    const parametroSenhaBotaoMinus = document.querySelector('.parametro-senha-botoes button:first-of-type');
    const parametroSenhaBotaoPlus = document.querySelector('.parametro-senha-botoes button:last-of-type');
    const barraForcaSenha = document.querySelector('.barra');
    const forcaSenha = document.querySelector('.forca');
    const entropiaTexto = document.querySelector('.entropia');

    const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
    const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';
    const simbolos = '!@#$%^&*()-_=+[{]}|;:,<.>/?';

    // Função para gerar a senha
    function gerarSenha() {
        const caracteres = [];
        let caracteresPermitidos = '';

        if (minusculoCheckbox.checked) {
            caracteresPermitidos += letrasMinusculas;
        }
        if (maiusculoCheckbox.checked) {
            caracteresPermitidos += letrasMaiusculas;
        }
        if (numeroCheckbox.checked) {
            caracteresPermitidos += numeros;
        }
        if (simboloCheckbox.checked) {
            caracteresPermitidos += simbolos;
        }

        for (let i = 0; i < 12; i++) {
            caracteres.push(caracteresPermitidos.charAt(Math.floor(Math.random() * caracteresPermitidos.length)));
        }

        campoSenha.value = caracteres.join('');
        calcularForcaSenha();
    }

    // Função para calcular a força da senha
    function calcularForcaSenha() {
        const forca = calcularEntropia() / 4;
        if (forca < 25) {
            forcaSenha.style.width = '25%';
            forcaSenha.classList.remove('media', 'forte');
            forcaSenha.classList.add('fraca');
        } else if (forca >= 25 && forca < 50) {
            forcaSenha.style.width = '50%';
            forcaSenha.classList.remove('fraca', 'forte');
            forcaSenha.classList.add('media');
        } else {
            forcaSenha.style.width = '100%';
            forcaSenha.classList.remove('fraca', 'media');
            forcaSenha.classList.add('forte');
        }
        entropiaTexto.textContent = `Entropia: ${calcularEntropia().toFixed(2)}`;
    }

    // Função para calcular a entropia da senha
    function calcularEntropia() {
        let entropia = 0;
        if (minusculoCheckbox.checked) entropia += Math.log2(letrasMinusculas.length);
        if (maiusculoCheckbox.checked) entropia += Math.log2(letrasMaiusculas.length);
        if (numeroCheckbox.checked) entropia += Math.log2(numeros.length);
        if (simboloCheckbox.checked) entropia += Math.log2(simbolos.length);
        return entropia * 12;
    }

    // Event listener para botões de incremento/decremento de caracteres
    parametroSenhaBotaoMinus.addEventListener('click', function() {
        const textoParametroSenha = document.querySelector('.parametro-senha__texto');
        let valor = parseInt(textoParametroSenha.textContent);
        if (valor > 1) {
            valor--;
            textoParametroSenha.textContent = valor;
            gerarSenha();
        }
    });

    parametroSenhaBotaoPlus.addEventListener('click', function() {
        const textoParametroSenha = document.querySelector('.parametro-senha__texto');
        let valor = parseInt(textoParametroSenha.textContent);
        valor++;
        textoParametroSenha.textContent = valor;
        gerarSenha();
    });

    // Event listener para checkbox de opções de senha
    [minusculoCheckbox, maiusculoCheckbox, numeroCheckbox, simboloCheckbox].forEach(function(checkbox) {
        checkbox.addEventListener('change', gerarSenha);
    });

    // Gerar a senha inicial
    gerarSenha();
});
