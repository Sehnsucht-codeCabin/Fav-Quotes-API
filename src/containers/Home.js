/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-filename-extension */
import React, { Component, Link } from 'react';
import { connect } from 'react-redux';
import "./Home.scss";
import axios from '../../axios-config';
import ToolBar from './ToolBar';
import NavigationItem from '../containers/NavigationItem';

class Home extends Component {

  constructor() {
    super();
    
    this.quoteBody = React.createRef();
    this.quoteAuthor = React.createRef();
  }

  componentDidMount() {
    if (!this.props.isAuthenticated) {
      axios.get('/qotd')
        .then((response) => {
          // handle success
          
          this.quoteBody.current.innerHTML = response.data.quote.body;
          this.quoteAuthor.current.innerHTML = response.data.quote.author;
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    } else {
      // axios.get('/quotes')
      //   .then((response) => {
      //     // handle success
      //     this.quoteBody.current.innerHTML = response.data.quote.body;
      //     this.quoteAuthor.current.innerHTML = response.data.quote.author;
      //   })
      //   .catch((error) => {
      //     // handle error
      //     console.log(error);
      //   });
    }

  }

  render() {
    return (
      <main className="container">
        <div>
          <ToolBar />
          {!this.props.isAuthenticated ? (
            <div className="quoteWrapper">
              <p id="quoteBody" ref={this.quoteBody}></p>
              <p id="quoteAuthor" ref={this.quoteAuthor}></p>
            </div>
          ) : (
              <div className="quoteWrapper">Another Content</div>
            )}


        </div>
        {/* <ul className="left">
            <li>
            <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="/about">About</Link>
            </li>
        </ul> */}
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  };
};

export default connect(mapStateToProps)(Home);