export class Parcela {
    #numero; // Número da parcela
    #valor; // Valor da parcela
    #juros; // Valor dos juros na parcela
    #amortizacao; // Valor da amortização na parcela
    #saldo; // Saldo restante após a parcela

    /**
     * Cria uma instância de Parcela.
     * @param {number} numero - Número da parcela.
     * @param {number} valor - Valor da parcela.
     * @param {number} juros - Valor dos juros na parcela.
     * @param {number} amortizacao - Valor da amortização na parcela.
     * @param {number} saldo - Saldo restante após a parcela.
     */
    constructor(numero, valor, juros, amortizacao, saldo) {
        this.#numero = numero;
        this.#valor = valor;
        this.#juros = juros;
        this.#amortizacao = amortizacao;
        this.#saldo = saldo;
    }

    /**
     * Obtém o saldo restante após a parcela.
     * @returns {number} - O saldo restante após a parcela.
     */
    getSaldo() {
        return this.#saldo;
    }

    /**
     * Obtém os dados da parcela formatados para exibição.
     * @returns {Array} - Um array com os dados da parcela formatados para exibição.
     */
    getDadosFormatados() {
        const dados = [];
        dados.push(this.#numero);
        dados.push(this.#valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
        dados.push(this.#amortizacao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
        dados.push(this.#juros.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
        dados.push(this.#saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
        return dados;
    }
}
