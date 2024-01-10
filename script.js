let apiQuotes = [];

//Loading animation
function loading(){
    document.querySelector(".quote-container").style.display = "none"
    document.querySelector(".loader").style.display = "block"
}
//Complete loading
function completeLoading(){
    document.querySelector(".quote-container").style.display = "block"
    document.querySelector(".loader").style.display = "none"
}

//Show new quote
function newQuote(){
    // Getting a random quote from array
    loading();
    let quote = apiQuotes[Math.floor(Math.random()*Math.floor(apiQuotes.length))];
    console.log(quote.text.length);
    if(quote.author === 'Anonymous'){
        genAgain();
    }
    if(quote.text.length > 150){
        document.querySelector('span').classList.add('long-text');
    }
    else{
        document.querySelector('span').classList.remove('long-text');
    }
    document.querySelector('span').innerHTML = quote.text;
    document.querySelector('.author-name').innerHTML ='~'+quote.author;
    completeLoading();
}

function genAgain(){
    newQuote();
}
//Get Quotes from API
async function getQuotes(){
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
    } catch (error) {
        // Write errors here
        console.error('Error in writing to clipboard: ', err);
    }
}

// Share the quote on Twitter
function tweet(){
    const tweetUrl = `https://twitter.com/intent/tweet?text=${document.querySelector('span').innerHTML} - ${document.querySelector('.author-name').innerHTML}`;
    window.open(tweetUrl, '_blank');
}

// Copy quote and Author to clipboard
function addToClipboard(text) {
    // Copying text to clipboard
    navigator.clipboard.writeText(text)
      .then(() => {
      })
      .catch(err => {
        console.error('Error in writing to clipboard: ', err);
      });
  }
  
  
 // Used to copy Quote and Author
  document.querySelector('.copy-quote-btn').addEventListener("click",()=>{
    let textToCopy = `"${document.querySelector('span').innerHTML}"  ${document.querySelector('.author-name').innerHTML}`;
    addToClipboard(textToCopy)
  });
  
// Getting a random quote onload
getQuotes();
loading();