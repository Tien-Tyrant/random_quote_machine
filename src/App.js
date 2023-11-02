import $ from 'jquery';
import React from 'react';
import './App.css';
import Quote from './Quote';

//https://random-quote-machine.freecodecamp.rocks/

class App extends React.Component 
{
  constructor(props) {
    super(props);
    

    this.colorBank =  [
      '#16a085',
      '#27ae60',
      '#2c3e50',
      '#f39c12',
      '#e74c3c',
      '#9b59b6',
      '#FB6964',
      '#342224',
      '#472E32',
      '#BDBB99',
      '#77B1A9',
      '#73A857'
    ];
    
    this.state = {
      error: null,
      isLoaded: false,
      quotes: [],
      quote: '',
      author: ''
    }
    
    this.newQuote = this.newQuote.bind(this);
  }
  
  componentDidMount(){
    this.setColor(this.colorBank[0]);

    fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
    .then(res => res.json())
    .then((result) => {
      this.setState({
        isLoaded: true,
        quotes: result.quotes,
        quote: result.quotes[0].quote,
        author: result.quotes[0].author,
      });
    },
    // Note: it's important to handle errors here
    // instead of a catch() block so that we don't swallow
    // exceptions from actual bugs in components.
    (error) => {
      this.setState({
        isLoaded: true,
        error
      });
    })
  }

  newQuote() {
    const randQuote = this.randomQuoteIndex();
    const randColor =  this.randomColorIndex();
    this.setColor(this.colorBank[randColor]);
    this.setState(state => ({
      quote: state.quotes[randQuote].quote,
      author: state.quotes[randQuote].author,
    }))    
  }

  setColor(color){
    // $("html body").css('background-color', color);
    // $("html body").css('color', color);
    $('html body').animate(
      {
        backgroundColor: color,
        color: color
      },
      1000
    );
    $("#new-quote").css('background-color', color);
    $("#tweet-quote").css('background-color', color);
  }

  randomQuoteIndex() {
    return this.randomIndex(this.state.quotes.length);
  }

  randomColorIndex() {
    return this.randomIndex(this.colorBank.length);
  }

  randomIndex(length) {
    let max = length;
    let min = 0;
    let excluded = max;
    var n = Math.floor(Math.random() * (max-min) + min);
    if (n >= excluded) n++;
    return n;
  }

  render(){
    return (
      <div className="App">
      <div id="quote-box">
        <Quote quote={this.state.quote} author={this.state.author}/>
        <div className='buttons'>
          <a className='button' id="tweet-quote" title='Tweet this quote!' href={'https://twitter.com/intent/tweet?text='+encodeURIComponent('"' + this.state.quote + '" ' + this.state.author)} target="_top" rel="noreferrer">
            <i className='fa fa-twitter'></i>
          </a>
          <button className='button' id="new-quote" onClick={this.newQuote}>New quote</button>
        </div>
      </div>

      <footer>
       by <a href="https://www.linkedin.com/in/zhao-tian/" target="_blank" rel="noreferrer">tien0103</a>
      </footer>
    </div>
  );
}
}

export default App;
