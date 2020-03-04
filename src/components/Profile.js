import React, { Component} from 'react';

const localValue = {
  username: "Zihao",
  email: "horus@bu.edu",
  phone: "8574138570",
};

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      email: this.props.email,
      phone: this.props.phone,
      isEdit: false,
    };
    this.changeInputValue = this.changeInputValue.bind(this);
    this.submitValue = this.submitValue.bind(this);
  }

  changeInputValue(e) {
    localValue[e.target.name] = e.target.value;
  }

  submitValue(k) {

    for (k in localValue) {
      if(localValue[k]){
        this.setState({
          [k]:localValue[k],
        });}
      else {localValue[k] = this.state[k];}
    }
  }

  render() {
    return (
      <div>
        <h2>Profile</h2>
        <h3>
          Username: {localValue.username}<br/>
          <input
            type="text"
            name="username"
            placeholder="change username"
            onChange={this.changeInputValue}
          /><br/>
          Email: {localValue.email}<br/>
          <input
            type="text"
            name="email"
            placeholder="change email"
            onChange={this.changeInputValue}
          /><br/>
          Phone: {localValue.phone}<br/>
          <input
            type="text"
            name="phone"
            placeholder="change phone"
            onChange={this.changeInputValue}
          /><br/>
        </h3>
        <button onClick={this.submitValue}>update</button>

      </div>
    )
  }
}
export default Chat;
