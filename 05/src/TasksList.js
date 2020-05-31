import React from "react";
import { Link } from "react-router-dom";
import "./css/bootstrap.css";

function TasksList() {
  return (
    <div className="m-3">
      <h1>Laboratorium 5</h1>
      <h3>React.js</h3>

      <h2 className="mt-4">Zadania</h2>
        <ol className="list-group">
          <Link
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            to="/home_page"
          >
            Strona powitalna
            <span className="badge badge-primary badge-pill">home_page</span>
          </Link>
          <Link
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            to="/button"
          >
            Przyciski, formularze i zdarzenia
            <span className="badge badge-primary badge-pill">button</span>
          </Link>
          <Link
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            to="/list"
          >
            Komponent listy
            <span className="badge badge-primary badge-pill">list</span>
          </Link>
          <Link
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            to="/web_portal"
          >
            Portal WWW z wykorzystaniem biblioteki React.js
            <span className="badge badge-primary badge-pill">web_portal</span>
          </Link>
        </ol>
    </div>
  );
}

export default TasksList;
