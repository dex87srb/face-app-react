import React from "react";
import { Modal } from "../../Modal/Modal";
import { Redirect, Link, Route } from "react-router-dom";

export class User extends React.Component {
  constructor(props) {
    super();
    this.state = {
      user: {
        name: props.user.name,
        age: props.user.age,
        gender: props.user.gender,
        id: props.user.id,
        url: props.user.url
      },
      modal: false,
      redirect: null
    };
  }

  modal = (user) => {

    if (user) {
      this.setState(
        { user: user, modal: !this.state.modal, redirect: "/" }

      );
      setTimeout(() => { this.props.edit(this.state.user) }, 1000)
        ;
    } else {
      this.setState({ ...this.state, modal: !this.state.modal, redirect: "/" });
    }
  };

  showModal = () =>
    this.state.modal ? (
      <Route path={"/EditUser"}><Modal close={this.modal} user={this.state.user} /></Route>
    ) : null;

  render() {
    return (
      <article className={`${this.props.view ? "list-layout" : ""} clearfix`}>

        <img src={this.state.user.url} alt="" />
        <div className="info">
          <p>
            Name: <span>{this.state.user.name}</span>
          </p>
          <p>Age: {this.state.user.age}</p>
          <p>Gender: {this.state.user.gender}</p>
        </div>
        <div className="buttons">
          <Link to="./EditUser"><button
            onClick={() =>
              this.setState({ ...this.state, modal: !this.state.modal, redirect: "./EditUser" })
            }
          >

            EDIT
          </button></Link>{this.state.redirect === "/" && <Redirect to={"/"} />}
          <button onClick={() => this.props.clone(this.state.user)}>
            CLONE
          </button>
          <button onClick={() => this.props.delete(this.state.user.id)}>
            DELETE
          </button>
        </div>
        {this.showModal()}
      </article >
    );
  }
}
