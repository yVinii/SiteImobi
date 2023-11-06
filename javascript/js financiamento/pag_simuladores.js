import { Financiamento } from "./financiamentos.js";
import { FinanciamentoCarencia } from "./financiamentocarencia.js";

// Seleção de elementos do DOM
const comCarencia = document.querySelector('#comCarencia');
const listaSuspensa = document.querySelector('#listaSuspensa');
const corpoTabela = document.querySelector('#corpoTabela');
const botaoCalcular = document.querySelector('#botaoCalcular');
const textoEntrada = document.querySelector('#textoEntrada');
const textoTaxaJuros = document.querySelector('#textoTaxaJuros');
const textoPrazo = document.querySelector('#textoPrazo');

/**
 * Limpa o conteúdo do corpo da tabela.
 */
function limpaCorpoDaTabela() {
    while (corpoTabela.firstChild) {
        corpoTabela.removeChild(corpoTabela.firstChild);
    }
}

/**
 * Adiciona ou remove a visibilidade da lista suspensa com base na seleção do checkbox comCarencia.
 */
comCarencia.addEventListener('change', function() {
    if (this.checked) {
        listaSuspensa.removeAttribute('hidden');
    } else {
        listaSuspensa.setAttribute('hidden', 'hidden');
    }
});

/**
 * Evento de clique no botão Calcular.
 */
botaoCalcular.addEventListener('click', function() {
    limpaCorpoDaTabela();
    const valor = parseFloat(textoValor.value);
    const entrada = parseFloat(textoEntrada.value);
    const taxaJuros = parseFloat(textoTaxaJuros.value);
    const prazo = parseFloat(textoPrazo.value);
    let simulacao;

    // Criação do objeto de simulação com ou sem carência, dependendo da seleção do checkbox.
    if (comCarencia.checked) {
        const carencia = parseInt(listaSuspensa.value);
        simulacao = new FinanciamentoCarencia(valor, entrada, taxaJuros, prazo, carencia); 
    } else {
        simulacao = new Financiamento(valor, entrada, taxaJuros, prazo);
    }

    simulacao.calcParcelasMensais(); // Calcula as parcelas mensais do financiamento.
    simulacao.exibeParcelas(); // Exibe as parcelas na tabela do HTML.
});
