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
      original: this.state.matchingDonation,
      history: {},
      show: false,
    }
    arr.push(matchingDonation);
    this.setState({
      matchingDonation: '',
      matchingDonationList: arr
    });
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
      if (!donation.history[user] && donation.value) {
        if (donation.value < value) {
          donation.history[user] = donation.value
          donation.value = 0;
        } else {
          donation.value -= value; 
          donation.history[user] = value;
        }
      }
      return donation;
    });
    let total = this.state.totalDonatedSum + value;
    console.log('donate', total);
    this.setState({
      'matchingDonationList': arr,
      'donationAmount': '',
      'email': '',
      'totalDonatedSum': total,
    }, this.calculate(total));
    e.preventDefault();
  }
  calculate(n) {
    let sum = 0;
    for (let donation of this.state.matchingDonationList) {
      sum += (donation.original - donation.value);
    }
    this.setState((prevState) => ({
      totalSum: sum + n,
    }));
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Matching donations site</h2>
        </div>
        <br/>
        <form>
          <label>Matching Donations </label>
          <input  type="number" placeholder="e.g. 987.65" step="0.01" min="0.01" required onChange={this.matchingDonateOnChange.bind(this)} value={this.state.matchingDonation} />
          <button onClick={this.matchingDonate.bind(this)}>Submit</button>
        </form>
        <div>
          {this.state.matchingDonationList.map((ele, index) =>
            <div key={index}>
              <h3>{ele.value} of {ele.original} left</h3>
              <p>{Object.keys(ele.history).map(user => 
                <p key={user}>{user} donated ${ele.history[user]}</p>
              )}</p>
            </div>    
          )}
        </div>
        <br/>
        <form onSubmit={this.donate.bind(this)}>
          <label>Email: </label>
          <input type="email" placeholder="123@abc.com" required onChange={this.emailOnChange.bind(this)} value={this.state.email}/>
          <br/>
          <label>Donate </label>
          <input type="number" placeholder="e.g. 123.45" step="0.01" min="0.01" required onChange={this.donationOnChange.bind(this)} value={this.state.donationAmount}/>
          <button type="submit">Submit</button>
        </form>
        <h3> Total so far</h3>
        <p> ${this.state.totalSum.toFixed(2)}</p>
      </div>
    );
  }
}

export default App;
