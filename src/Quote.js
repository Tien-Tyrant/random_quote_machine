import React from 'react';

class Quote extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="quote-content">
                <div className='quote-text'>
                    <i className="fa fa-quote-left"></i>
                    <span id="text"> {this.props.quote}</span>
                </div>
                <div id="author">
                    <p>
                        - {this.props.author}
                    </p>
                </div>
            </div>
        );
    }
}

export default Quote;