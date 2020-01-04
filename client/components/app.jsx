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
    fetch(`http://localhost:8080/latest?username=${this.state.username}`)
      .then(res => res.text())
      .then(time => this.setState({timeSinceLastActive: time}))
      .catch(err => console.error(err));
  }

  render () {
    return (
      this.state.timeSinceLastActive
        ? <h1>{this.state.timeSinceLastActive}</h1>
        : <form onSubmit={this.getTime}>
            <input type="text" name="username" placeholder="GitHub Username" value={this.state.username} onChange={this.handleInputChange}/>
            <input type="submit" value="Submit"/>
          </form>
    );
  }
}
