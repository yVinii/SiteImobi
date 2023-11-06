import { Financiamento } from "./financiamentos.js";
import { Parcela } from "./parcela.js";

/**
 * Uma classe derivada de Financiamento que inclui um período de carência antes do início do pagamento das parcelas.
 */
export class FinanciamentoCarencia extends Financiamento {
    #carencia; // Armazena o período de carência.
    #taxaJuros; // Armazena a taxa de juros durante o período de carência.
    #parcelas = []; // Armazena as parcelas do financiamento, incluindo o período de carência.

    /**
     * Cria uma instância de FinanciamentoCarencia.
     * @param {number} valor - O valor total do financiamento.
     * @param {number} entrada - O valor da entrada inicial.
     * @param {number} taxaJuros - A taxa de juros do financiamento.
     * @param {number} prazo - O prazo, em meses, para pagar o financiamento.
     * @param {number} carencia - O período de carência antes do início do pagamento das parcelas.
     */
    constructor(valor, entrada, taxaJuros, prazo, carencia) {
        super(valor, entrada, taxaJuros, prazo);
        this.#taxaJuros = taxaJuros;
        this.#parcelas = super.getParcelas(); // Obtém as parcelas do financiamento base.
        this.#carencia = carencia;
    }

    /**
     * Calcula as parcelas mensais do financiamento, considerando o período de carência.
     */
    calcParcelasMensais() {
        let saldo = this.#parcelas[0].getSaldo();

        // Adiciona as parcelas correspondentes ao período de carência ao início do financiamento.
        for (let i = 0; i < this.#carencia; i++) {
            const numero = this.#parcelas.length;
            saldo += Financiamento.calcJuros(saldo, this.#taxaJuros);
            this.#parcelas.push(new Parcela(numero, 0, 0, 0, saldo));
        }

        // Calcula as parcelas restantes após o período de carência.
        super.calcParcelasMensais();
    }
}