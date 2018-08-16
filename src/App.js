import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'email': '',
      'matchingDonation': '',
      'matchingDonationList': [],
      'donationAmount': '',
      'totalDonatedSum': 0,
      'totalSum': 0,
    }
  }
  emailOnChange(e) {
    this.setState({'email': e.target.value});
  }
  matchingDonate(e) {
    let arr = this.state.matchingDonationList.slice();
    let matchingDonation = {
      value: this.state.matchingDonation,
      history: {},
      show: false,
    }
    arr.push(matchingDonation);
    this.setState({
      matchingDonation: '',
      matchingDonationList: arr
    });
    console.log(matchingDonation);
    e.preventDefault();
  }
  matchingDonateOnChange(e) {
    this.setState({'matchingDonation': e.target.value});
  }
  donationOnChange(e) {
    this.setState({'donationAmount': e.target.value});
  }
  donate(e) {
    let user = this.state.email;
    let arr = this.state.matchingDonationList;
    let value = +this.state.donationAmount;
    arr = arr.map(donation => {
      if (!donation.history[user]) {
        if (donation.value < value) {
          donation.value = 0;
        } else {
          donation.value -= value; 
        }
        donation.history[user] = value;
      }
      return donation;
    });
    this.setState({
      'matchingDonationList': arr,
      'donationAmount': '',
      'totalDonatedSum': this.state.totalDonatedSum + value,
    });
    this.calculateTotal();
    e.preventDefault();
  }
  calculateTotal() {
    console.log('test');
    let num = this.state.totalDonatedSum + this.state.totalDonatedSum * this.state.matchingDonationList.length;
    this.setState({totalSum: num});
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Matching donations site</h2>
        </div>
        <label>Email:</label>
        <input type="email" required onChange={this.emailOnChange.bind(this)} value={this.state.email}/>
        <form>
          <label>Matching Donations</label>
          <input onChange={this.matchingDonateOnChange.bind(this)} value={this.state.matchingDonation} placeholder="Donation amount" />
          <button onClick={this.matchingDonate.bind(this)}>Submit</button>
        </form>
        <div>
          {this.state.matchingDonationList.map(ele =>
            <div>
            <p>{ele.value}</p>
            <p>{Object.keys(ele.history).map(user => 
              <p>{user} donated {ele.history[user]}</p>
            )}</p>
            </div>    
          )}
        </div>
        <form>
          <label>Donate</label>
          <input type="number" step="0.01" min="0" required onChange={this.donationOnChange.bind(this)} value={this.state.donationAmount}/>
          <button onClick={this.donate.bind(this)}>Submit</button>
        </form>
        <h3> Total so far</h3>
        <p> {this.state.totalSum}</p>
      </div>
    );
  }
}

export default App;
