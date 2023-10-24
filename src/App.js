import React from 'react';
import './App.css';
import Quote from './Quote';

class App extends React.Component 
{
  constructor(props) {
    super(props);
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
    fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
    .then(res => res.json())
    .then((result) => {
      this.setState({
        isLoaded: true,
        quotes: result.quotes,
        quote: result.quotes[0].quote,
        author: result.quotes[0].author
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
    const rand = this.randomIndex();
    this.setState(state => ({
      quote: state.quotes[rand].quote,
      author: state.quotes[rand].author
    }))    
  }

  randomIndex() {
    let max = this.state.quotes.length;
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
        <a id="tweet-quote" href="https://twitter.com/intent/tweet" target="_blank" rel="noreferrer">tweet_logo</a>
        <button onClick={this.newQuote}>New quote</button>
      </div>

      <footer>
        <p>by <a href="https://www.linkedin.com/in/zhao-tian/" target="_blank" rel="noreferrer">tien0103</a></p>
      </footer>
    </div>
  );
}
}

export default App;
