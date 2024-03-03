let listaNumerosEscolhidos = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let contadorTentativas = 1

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function mensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

mensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Parabéns!');
        let palavraTentativa = contadorTentativas > 1 ? 'Tentativas' : 'Tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${contadorTentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', `O número secreto é menor que ${chute}`);
        } else {
            exibirTextoNaTela('p', `O número secreto é maior que ${chute}`);
        } contadorTentativas++;
        limparCampo();
    }
}

iniciarNovoJogo();

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let numeroDeElementosNaLista = listaNumerosEscolhidos.length;
    if (numeroDeElementosNaLista == numeroLimite) { 
        listaNumerosEscolhidos = [];
    }
    if (listaNumerosEscolhidos.includes(numeroEscolhido)) {  
        return gerarNumeroAleatorio();
    } else {
        listaNumerosEscolhidos.push(numeroEscolhido); 
        console.log(listaNumerosEscolhidos);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function iniciarNovoJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    contadorTentativas = 1;
    limparCampo();
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
