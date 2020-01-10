import React from 'react';
import '../styles/app.css';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      timeSinceLastActive: '',
      username: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getTime = this.getTime.bind(this);
  }

  handleInputChange ({ target: { name, value } }) {
    let state = { ...this.state };
    state[name] = value;
    this.setState(state);
  }

  getTime (e) {
    e.preventDefault();
    document.querySelector('.loader').classList.add('loader-active');
    fetch(`http://localhost:8080/latest?username=${this.state.username}`)
      .then(res => res.text())
      .then(time => this.setState({timeSinceLastActive: time, username: ''}))
      .catch(err => console.error(err));

  }

  render () {
    if ( this.state.timeSinceLastActive ) {
      setTimeout( () => {
        document.querySelector('.loader').classList.remove('loader-active');
        document.querySelector('.time').classList.remove('hide');
      }, 750);
    }
    return (
      <>
        <div className="loader"></div>
        <div className="container">
          <h1 className="title">
            LastActive:<b className="company">GitHub</b>
          </h1>
          <form className="input-form" onSubmit={this.getTime}>
            <input className="input-box"
              type="text"
              name="username"
              placeholder="GitHub Username"
              value={this.state.username}
              onChange={this.handleInputChange}
              required />
            <input className="submit-btn" type="submit" value="Search" />
          </form>
          <h1 className="time hide">{this.state.timeSinceLastActive}</h1>
        </div>
      </>
      )
    ;
  }
}
