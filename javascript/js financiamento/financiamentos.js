import { Parcela } from "./parcela.js";

/**
 * Classe que representa um financiamento com cálculo de parcelas mensais.
 */
export class Financiamento {   
    #taxaJuros; // Taxa de juros mensais.
    #prazo; // Prazo em meses para o financiamento.
    #parcelas = []; // Armazena as parcelas do financiamento.

    /**
     * Cria uma instância de Financiamento.
     * @param {number} valor - O valor total do financiamento.
     * @param {number} entrada - O valor da entrada inicial.
     * @param {number} taxaJuros - A taxa de juros do financiamento.
     * @param {number} prazo - O prazo, em meses, para pagar o financiamento.
     */
    constructor(valor, entrada, taxaJuros, prazo){
        this.#taxaJuros = taxaJuros;
        this.#prazo = prazo;
        this.#parcelas.push(new Parcela(0, 0, 0, 0, valor - entrada)); // Adiciona a primeira parcela (referente à entrada).
    }

    /**
     * Calcula os juros mensais com base no valor e na taxa de juros.
     * @param {number} valor - O valor sobre o qual calcular os juros.
     * @param {number} taxaJuros - A taxa de juros a ser aplicada.
     * @returns {number} - O valor dos juros calculado.
     */
    static calcJuros(valor, taxaJuros) {
        return valor * (taxaJuros / 100);
    }

    /**
     * Calcula as parcelas mensais do financiamento.
     */
    calcParcelasMensais() {
        let saldo = this.#parcelas[this.#parcelas.length - 1].getSaldo();
        let prazo = this.#prazo - (this.#parcelas.length - 1);
        let amortizacao = saldo / prazo;

        for (let i = 0; i < prazo; i++) {
            const numero = this.#parcelas.length;
            const juros = Financiamento.calcJuros(saldo, this.#taxaJuros);
            const valor = juros + amortizacao;
            saldo -= amortizacao;

            if (saldo < 0) {
                saldo = 0;
            }

            this.#parcelas.push(new Parcela(numero, valor, juros, amortizacao, saldo));
        }
    }

    /**
     * Exibe as parcelas do financiamento.
     * @param {HTMLTableElement} corpoTabela - O corpo da tabela onde as parcelas serão exibidas.
     */
    exibeParcelas(corpoTabela) {
        const parcelas = this.#parcelas.slice(1); // Ignora a primeira parcela (entrada).

        for (const parcela of parcelas) {
            const linha = corpoTabela.insertRow(-1);

            for (const dado of parcela.getDadosFormatados()) {
                const celula = linha.insertCell(-1);
                celula.textContent = dado;
            }
        }
    }

    /**
     * Obtém as parcelas do financiamento.
     * @returns {Array} - As parcelas do financiamento.
     */
    getParcelas() {
        return this.#parcelas;
    }
}
