let listaDeNumerosSecretosSorteados = [];
// Eu criei uma lista responsável por guardar os números sercretos sorteados
let memoriaDaLista = 10;
// Eu criei uma variável que recebe a quantidade máxima de números secretos sorteados que serão salvos antes da lista ser limpa
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, `Brazilian Portuguese Female`, {rate:1.2});
    // Usei uma função própria para que o programa leia o texto que está aparecendo na tela (resposiveVoice.speka), com ele eu informo os parâmetros que  ele precisa como: o texto que será lido, em qual linguagem que o texto será lido e a velocidade da fala.
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroGerado = parseInt(Math.random() * memoriaDaLista + 1);
    // crio uma variável para guardar o número aleatório;
    let quantidadeDeElementosNaLista = listaDeNumerosSecretosSorteados.length;
    // eu criei a variável quantidadeDeElementosNaLista para receber o tamanho (.length) da lista ListaDeNumerosSecretosSorteados

    if (quantidadeDeElementosNaLista == memoriaDaLista) {
    // se a variável quantdadeDeElementosNaLista for igual a 3
        listaDeNumerosSecretosSorteados = [];
        // a lista listaDeNumerosSecretosSorteados será limpa
    }

    if (listaDeNumerosSecretosSorteados.inludes(numeroGerado)) {
    // se a lista tiver (.inludes) o número gerado
        return gerarNumeroAleatorio();
        // se o if for positivo, ele vai chamar novamente a função de gerar o número aleatório
    } else{
        listaDeNumerosSecretosSorteados.push(numeroGerado);
        // caso o if seja negativo, insiro o número gerado na lista (.push)
        return numeroGerado;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}