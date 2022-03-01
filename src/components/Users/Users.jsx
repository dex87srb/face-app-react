import React from "react";
import uuid from "react-uuid";
import { User } from "./User/User";
import { Modal } from "../Modal/Modal";
import { Link, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

const baseUrl = "https://face-app-react-default-rtdb.firebaseio.com/data";

export class Users extends React.Component {
  constructor(props) {
    super();

    this.state = {
      filterUsers: [],
      modal: false,
      user: {
        name: "",
        age: "",
        gender: "",
        url: "",
      },
      change: false,
      searching: "",
      listLayout: false,
      redirect: null
    };
  }

  componentDidMount() {
    this.getUsers();
  }


  getUsers = () => {
    fetch(`${baseUrl}.json`)
      .then((data) => data.json())
      .then((results) => {
        const newUsers = [];
        for (const res in results) {
          newUsers.push({ ...results[res], id: res });
        }

        this.props.getData(newUsers);
      });
  };

  static getDerivedStateFromProps(props, state) {
    if (props.searchUser !== state.searching) {
      return { ...state, searching: props.searchUser };
    }
    return null;
  }

  showUsers = () => {

    const filterUsers = this.filterUsers();

    let users;

    if (filterUsers !== null) {
      users = filterUsers
    }

    if (this.props.users !== undefined && users.length === 0) {
      users = this.props.users
    }

    if (users.length !== 0) {
      return (
        <section className={`${this.state.listLayout ? "list-layout-container" : "users"} clearfix`}>
          {users.map((user, index) => (
            <User
              key={uuid()}
              user={user}
              edit={this.editUser}
              clone={this.addUser}
              delete={this.deleteUser}
              view={this.state.listLayout}
            />
          ))}
        </section>
      );
    } else {
      return <p>X Empty data</p>;
    }
  };

  filterUsers = () => {
    if (this.state.searching !== "") {
      const filterUsers = this.props.users.filter(
        (user) => user.name.toLowerCase().indexOf(this.state.searching) > -1
      );

      return filterUsers;
    } else {
      return null;
    }
  };

  editUser = (user) => {

    fetch(`${baseUrl}/${user.id}.json`, {
      method: "PATCH",
      body: JSON.stringify(user),
    }).then((data) => data.status === 200 && this.getUsers());
  };

  deleteUser = (id) => {
    fetch(`${baseUrl}/${id}.json`, { method: "DELETE" }).then(
      (data) => data.status === 200 && this.getUsers()
    );
  };

  addUser = (user) => {
    fetch(`${baseUrl}.json`, {
      method: "POST",
      body: JSON.stringify(user),
    }).then((data) => {

      data.status === 200 && this.getUsers()
    })
  };

  modal = (user) => {

    if (user) {
      this.props.appendData(user);
      this.setState({ ...this.state, modal: !this.state.modal, redirect: "/" }, () => {

        this.addUser(user)
      }
      );
    } else {

      this.setState({ ...this.state, modal: !this.state.modal, redirect: "/" });
    }
  };

  showModal = () =>
    this.state.modal ? (
      <Route path={"/UserCreate"}><Modal close={this.modal} user={this.state.user} /></Route>
    ) : null;


  sort = () => {
    this.props.users.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    this.setState({ ...this.state });
  };

  changeLayout = (view) => this.setState({ listLayout: view });

  render() {

    const { users } = this.props
    return (
      <main>
        <div className="wrapper">
          <div id="list" className="clearfix">
            <Link to={"./UserCreate"}><button
              className="header-button"
              onClick={

                () => {
                  this.setState({ ...this.state, modal: !this.state.modal, redirect: "/UserCreate" })
                }
              }
            >
              ADD NEW USER
            </button></Link>{this.state.redirect === "/" && <Redirect to={"/"} />}
            <button className="header-button" id="sort" onClick={this.sort}>
              SORT USERS BY NAME
            </button>
            <div className="layouts">
              <button
                className="header-button"
                onClick={() => this.changeLayout(false)}
              >
                GRID LAYOUT
              </button>
              <button
                className="header-button"
                onClick={() => this.changeLayout(true)}
              >
                LIST LAYOUT
              </button>
            </div>
          </div>
          {users !== undefined ? this.showUsers() : null}
          {this.showModal()}
        </div>
      </main >
    );
  }
}

