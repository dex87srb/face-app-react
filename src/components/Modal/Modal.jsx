import React from "react";
import { storage } from "../../index"


export class Modal extends React.Component {
  constructor(props) {
    super();

    this.state = {
      name: "",
      age: "",
      gender: "",
      errorMessage: false,
      id: props.user.id,
      file: "",
      url: "",
      tempUrl: false,
    };
  }

  handleUpload(e) {
    e.preventDefault();

    this.setState({
      tempUrl: false
    })

    const ref = storage.ref(`/images/${this.state.file.name}`);
    const uploadTask = ref.put(this.state.file);
    if (this.state.file !== "")
      uploadTask.on("state_changed", console.log, console.error, () => {
        ref
          .getDownloadURL()
          .then((url) => {
            this.setState({ ...this.state, file: "", url: url, tempUrl: true })

          });
      })
  }

  storeData = (data, stateProp) =>
    this.setState({ ...this.state, [stateProp]: data });


  errorImgUp = () => {

    if (this.state.tempUrl)
      return <p>Upload successful</p>
  }

  displayError = () =>
    this.state.errorMessage ? (
      <div className="error-message">
        You didn't enter all data!<button onClick={this.validator}>X</button>
      </div>
    ) : null;

  validator = () => {
    if (
      this.state.name === "" ||
      this.state.age === "" ||
      this.state.gender === "" ||
      this.state.file === {}) {

      this.storeData(!this.state.errorMessage, "errorMessage");
    }
    else {
      this.setState({ tempUrl: false })
      this.props.close(this.state)

    }
  };


  render() {
    return (
      <section className="modal">
        <div className="container">
          <p>Create New User</p>
          <label className="name  clearfix">
            Name:
            <input
              id="input-name"
              type="text"
              onChange={(e) => this.storeData(e.target.value, "name")}
              name="name"
              value={this.state.name}
            />
          </label>
          <label className="age  clearfix">
            Age:
            <input
              id="input-age"
              type="number"
              onChange={(e) => this.storeData(e.target.value, "age")}
              name="age"
              min="0"
              value={this.state.age}
            />
          </label>
          <div className="gender  clearfix">
            Gender:
            <span>
              <input
                className="radio"
                onChange={(e) => this.storeData(e.target.value, "gender")}
                type="radio"
                name="gender"
                value="Male"
              />
              Male
            </span>
            <span>
              <input
                className="radio"
                onChange={(e) => this.storeData(e.target.value, "gender")}
                type="radio"
                name="gender"
                value="Female"
              />
              Female
            </span>

          </div>
          <div className="upload  clearfix">
            <span>
              <input
                id="open-file"
                onChange={(e) => (this.storeData(e.target.files[0], "file"))}
                type="file"
                name="file"
              />
            </span>
            <button id="myButton" onClick={(e) => {

              this.handleUpload(e);

            }}>Upload</button></div >
          {this.errorImgUp()}
          {this.displayError()}
          < button onClick={() => this.props.close(null)}>CLOSE</button>
          <button className={`${this.state.tempUrl === false ? 'disabled' : null}`} onClick={
            this.validator
          }>SAVE</button>
        </div>
      </section >
    );
  }
}
