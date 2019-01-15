import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import {
  Switch,
  Route,
  Link } from 'react-router-dom';


const Transfer = (props) => {
  return <div className="transfer">
    <div className="transfer__description">this.props.description</div>
    <div className="transfer__amount">this.props.amount</div>
  </div>
}

const List = (props) => {
  return <div className="transfers-list">
    props.transfers.map(transfer =>
      <Transfer {...props}
        // description={transfer.description}
        // amount={transfer.amount}
      />)
    )
  </div>
}

const Menu = (props) => <div className="menu"></div>;
const Config = (props) => <div className="config"></div>;
const Header = (props) => <nav className="navigation"></nav>;

const Main = (props) => (
  <div>
    <Switch>
        <Route exact path='/' render={(props) => <List {...props}/>} />
        <Route path='/config' component={Config}/>
    </Switch>
  </div>
)

class App extends Component {
  state = {
    transfers: [],
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
    //if config is empty - redirect to config page
    axios.get('/transfers')
      .then(res => res.data)
      .then(transfers => this.setState({ transfers }))
      .catch(this.handleError);
  }

  // addTransfer(description, amount) {
  //   axios.post('/transfers', { description, amount})
  // }
  render() {
    return (
      <div>
        <Header />
        <Main {...this.state}/>
      </div>
    );
  }
}

export default App;
