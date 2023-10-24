import React from 'react';

class Quote extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div class="quote-content">
            <div id="text">
         <p>
          {this.props.quote}
          </p>
        </div>
        <div id="author">
        <p>
            {this.props.author}
          </p>
        </div>
            </div>
        );
    }
}

export default Quote;