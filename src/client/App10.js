import React, { Component } from "react";
import "./app.css";
import axios from "axios";
import ReactImage from "./react.png";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activeDoctors: [] };
  }

  // componentDidMount() {
  //   fetch("/api/getUsername")
  //     .then((res) => res.json())
  //     .then((user) => this.setState({ username: user.username }));
  // }

  componentDidMount() {
    axios.get("/api/getDoctors").then((res) => {
      const activeDoctors = res.data;
      this.setState({ activeDoctors });
      console.log(this.state.activeDoctors);
    });
  }

  render() {
    const { activeDoctors } = this.state;
    return (
      <div>
        {activeDoctors.length !== 0 ? (
          <ul>
            {activeDoctors.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        ) : (
          <h1>Loading..</h1>
        )}
        <img src={ReactImage} alt="react" />
      </div>
    );
  }
}
