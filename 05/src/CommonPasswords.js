import React from "react";
import "./css/bootstrap.css";
import { commonPasswordList } from "./passwords";

function ListItem(props) {
  if (props.index) {
    return (
      <li
        className={`list-group-item d-flex justify-content-between align-items-center ${props.className}`}
      >
        <span class="badge badge-primary badge-pill">{props.index}</span>
        {props.value}
        <span></span>
      </li>
    );
  } else {
    return (
      <li className={`list-group-item align-items-center ${props.className}`}>
        {props.value}
      </li>
    );
  }
}

class PasswordList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const listItems = commonPasswordList.map((password, index) => {
      return <ListItem value={password} index={index + 1} key={password} />;
    });

    return (
      <ul className={`list-group ${this.props.className}`}>{listItems}</ul>
    );
  }
}

function CommonPasswords(props) {
  return (
    <div className="container my-3">
      <div className="row ">
        <div className="col-auto mx-auto">
          <h3 className="text-break">100 najpopularniejszych haseł</h3>
          <PasswordList className="m-3 text-center" />
        </div>
      </div>
    </div>
  );
}

export default CommonPasswords;
