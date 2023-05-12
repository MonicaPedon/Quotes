//E importante verificar como a api retorna os dados, pois pode ser que ela retorne um array de objetos, ou um objeto com arrays dentro, ou um objeto com objetos dentro, etc. Nesse caso a api retorna um array com varios objetos, cada objeto mostra um text value um author value.

// Get Quote From API
//async que vai fazer a chamada da api. Async significa assincrono, ou seja, ele vai fazer a chamada e vai continuar executando o codigo, e quando a chamada terminar ele vai retornar o resultado.

async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl); //fetch vai fazer a chamada da api. Fetch e um metodo do js que faz a chamada da api. Ele vai pegar a url da api e vai fazer a chamada. Fetch e uma promise, ou seja, ele vai fazer a chamada e vai continuar executando o codigo, e quando a chamada terminar ele vai retornar o resultado.
        apiQuotes = await response.json();
    } catch (error) {
        alert('No quotes found');
    }
    // Try catch vai tentar fazer a chamada da api, e se der erro ele vai mostrar o erro no console.
}
