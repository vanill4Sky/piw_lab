import React from "react";
import "../css/bootstrap.css";
import { Link } from "react-router-dom";
import logo from "./img/logo.png";

function HomePage(props) {
  return (
    <div className="mx-2">
      <div className="container jumbotron mt-3">
        <div className="row">
          <div className="col-sm-6 d-flex flex-column ">
            <div className="row">
              <div className="col">
                <h1 className="ml-0">{props.title}</h1>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>
                    Strona miała pozwalać na zapisywanie notatek skojarzonych z kontem użytkownika. Wszystkie dane byłyby trzymane w localstorage. Udało się zrealizować tylko część założeń: logowanie, rejestrację i przechowywanie danych aktulanego użytkownika w kontekście. 
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col mb-3">
                <Link to="/yellow_notes/register" className="btn btn-lg btn-success btn-block">
                  Zarejestruj się
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-6 mb-3">
            <img className="img-fluid" src={logo} alt="logo"></img>
          </div>
        </div>
      </div>

      <div className="container jumbotron mt-3">
        <blockquote className="blockquote text-center">
          <h3 className="mb-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante.
          </h3>
          <footer className="blockquote-footer">
            Jan Kowalski <cite>Tytuł dzieła</cite>
          </footer>
        </blockquote>

        <div className="row text-center pt-4">
          <div className="col">
            <h4>
              Sed eget porttitor leo, vitae porttitor velit. Nunc fringilla
              sodales lacus ut gravida.
            </h4>
          </div>
          <div className="col">
            <h4>Vestibulum varius turpis enim, et gravida est viverra quis.</h4>
          </div>
          <div className="col">
            <h4>
              Nam sagittis id augue quis dapibus. Mauris vitae ligula eget felis
              interdum scelerisque.{" "}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;