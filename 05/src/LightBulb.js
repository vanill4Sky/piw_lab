import React from "react";
import "./css/bootstrap.css";
import lightOnImg from "./img/light-on.png";
import lightOffImg from "./img/light-off.png";

function LightSwitch(props) {
  return (
    <button
      className={`mt-3 mx-auto d-block btn btn-lg ${
        props.isLightOn ? "btn-warning" : "btn-secondary"
      }`}
      onClick={props.onClick}
    >
      {props.isLightOn ? "Wyłącz" : "Włącz"} światło
    </button>
  );
}

class LightBulb extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLightOn: false };
  }

  handleClick = () => {
    this.setState({ isLightOn: !this.state.isLightOn });
  };

  render() {
    return (
      <div className="contatiner m-3">
        <img
          src={this.state.isLightOn ? lightOnImg : lightOffImg}
          className="mx-auto d-block"
          width="300px"
          alt="Zgaszona żarówka"
        ></img>

        <LightSwitch
          isLightOn={this.state.isLightOn}
          onClick={this.handleClick}
        ></LightSwitch>

        <div className="mt-5 text-center text-muted">
          Light bulb picture:{" "}
          <a className="text-white" href="http://www.freepik.com">
            Designed by rawpixel.com / Freepik
          </a>
        </div>
      </div>
    );
  }
}

export default LightBulb;
