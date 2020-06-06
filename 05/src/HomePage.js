import React from "react";
import "./css/bootstrap.css";
import logo from "./img/example-logo.png";

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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam risus eros, mollis a sagittis a, pulvinar ac libero.
                  Pellentesque eu dolor tellus. Mauris ac venenatis felis.
                </p>
                <p>
                  Phasellus aliquet lorem at est pretium, at vehicula nisl
                  ultricies. Ut semper diam a lorem posuere, consectetur
                  tincidunt felis imperdiet. Sed erat orci, condimentum id urna
                  sed, efficitur commodo nisl. Fusce sed egestas lorem. Aenean
                  at fringilla odio, a dictum nulla.
                </p>
                <p>
                  Sed libero lorem, tincidunt faucibus faucibus laoreet,
                  accumsan sit amet eros. Sed ex mi, aliquam id odio id, congue
                  sagittis justo. Sed mattis eget risus sit amet tincidunt.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col mb-3">
                <button className="btn btn-lg btn-success btn-block">
                  Zarejestruj się
                </button>
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
