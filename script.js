//E importante verificar como a api retorna os dados, pois pode ser que ela retorne um array de objetos, ou um objeto com arrays dentro, ou um objeto com objetos dentro, etc. Nesse caso a api retorna um array com varios objetos, cada objeto mostra um text value um author value.
const quoteContainer = document.getElementById('quote-container'); //Variavel que vai receber o elemento com o id quote-container. Vai ser usado para colocar o texto e o autor no html.
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// Get Quote From API
let apiQuotes = []; //Variavel que vai receber os dados da api. Vai ser um array de objetos. Estou usando o let porque vou mudar o valor dessa variavel mais tarde.

//Show Loading - vai mostrar o loader e esconder o quote container
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading - vai esconder o loader e mostrar o quote container
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote 
function newQuote() { //Function com o operador new vai retornar um objeto com as propriedades que eu quero.
    loading(); //Chama a funcao loading quando a pagina carregar.
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];//math.randon() vai gerar um numero aleatorio entre 0 e 1. Multiplicando por apiQuotes.length vai gerar um numero aleatorio entre 0 e o numero de objetos que tem no array apiQuotes. Math.floor vai arredondar o numero para baixo, e vai retornar um numero inteiro.
    //console.log(quote);

    //Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    //Check Quote length to determine styling - tamanho de fonte
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //Set quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}



//async que vai fazer a chamada da api. Async significa assincrono, ou seja, ele vai fazer a chamada e vai continuar executando o codigo, e quando a chamada terminar ele vai retornar o resultado.
async function getQuotes() {
    loading(); //Chama a funcao loading quando a pagina carregar.
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl); //fetch vai fazer a chamada da api. Fetch e um metodo do js que faz a chamada da api. Ele vai pegar a url da api e vai fazer a chamada. Fetch e uma promise, ou seja, ele vai fazer a chamada e vai continuar executando o codigo, e quando a chamada terminar ele vai retornar o resultado.
        apiQuotes = await response.json(); //Aqui vai pegar o resultado json da chamada da api como resposta (const response), vai tornar a resposta em json objeto e vai colocar na variavel apiQuotes. 

        newQuote(); //
    } catch (error) {
        alert('No quotes found');
    } // Try catch vai tentar fazer a chamada da api, e se der erro ele vai mostrar o erro no console. 
}

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`; //Variavel que vai receber a url do twitter. Vai pegar o texto do quote e o texto do author e vai colocar na url do twitter.
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes(); //Chama a funcao getQuotes quando a pagina carregar.
