import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  teste = () =>{
    alert('voce foi redirecinado');
  }
  render() {
    return (
      <div className="App">
        <div className="container main">
          <div>
            <div className="menu-group container">
            <img className="logo" src='logo_ufpa.png' alt="ufpa.png"></img>
            <div className="Viewer"><h1>RU Viewer</h1></div>
         
            </div>
            <div className="alert alert-warning" onClick={this.teste}>Quero coloborar</div>
            <div className="alert alert-warning" onClick={this.teste}>Quero me informar</div>
          </div>
        </div>
      </div>   
    );
  }
}

export default App;
