import React from "react";
import "./App.scss";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import { reducer } from "./store/reducers/reducer"
import thunk from 'redux-thunk';
import "./scss/general.scss";
import firebase from "firebase";

import { Header } from "./components/Header/Header";
import { Users } from "./components/Users/Users";
import { Container } from "./store/container";


export class App extends React.Component {
  constructor() {
    super();

    this.state = {
      value: "",
    };
  }

  search = (value) => this.setState({ value: value });

  store = createStore(reducer, applyMiddleware(thunk));

  render() {
    return (<>
      <Header search={this.search} />
      <Provider store={this.store}><Container> <Users searchUser={this.state.value.toLowerCase()} /></Container> </Provider>
    </>


    );
  }
}

