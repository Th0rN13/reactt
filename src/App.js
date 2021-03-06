import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import {
  Switch,
  Route,
  Link } from 'react-router-dom';


const Transfer = (props) => {
  return <div className="transfer">
    <div className="transfer__description">{props.description}</div>
    <div className="transfer__amount">{props.amount}</div>
  </div>
}

class List extends Component {
  state = {
    transfers: []
  }
  componentDidMount() {
    axios.get('/transfers')
      .then(res => res.data)
      .then(transfers => this.setState({ transfers }))
      .catch(this.handleError);
  }
  render () {
    return <div className="transfers-list">
      {this.state.transfers.map((transfer) =>
        <Transfer
          description={transfer.description}
          amount={transfer.amount}
        />)}
    </div>
  }
}

const Config = (props) => <div className="config"></div>;
const HeaderMenu = (props) => <nav className="navigation"></nav>;

const Main = (props) => (
  <div>
    <Switch>
        <Route exact path='/' component={List} />
        <Route path='/config' component={Config}/>
    </Switch>
  </div>
)

class App extends Component {
  state = {
    config: {
      budget: "150000",
      currency: "rub"
    }
  }
  componentDidMount() {
    axios.get('/config')
      .then(res => res.data)
      .then(config => this.setState({ config }))
      .catch(this.handleError);
  }

  // addTransfer(description, amount) {
  //   axios.post('/transfers', { description, amount})
  // }
  render() {
    return (
      <div>
        <HeaderMenu />
        <Main {...this.state}/>
      </div>
    );
  }
}

export default App;
