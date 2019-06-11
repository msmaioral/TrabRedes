import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class App extends Component {
  teste = () =>{
    alert('voce foi redirecinado');
  }
  conexao = () =>{
    // axios.get('http://localhost:8082/Exemplos/TrabRedes/filaru/src/api/')
    // .then(response =>{
    //   console.log(response.data)
    // });

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
            <div className="alert alert-warning" onClick={this.conexao}>Quero colaborar</div>
            <input type="text" name="dia"></input>
            <input type="submit"></input>
            <div className="alert alert-warning" onClick={this.teste}>Quero me informar</div>
          </div>
        </div>
      </div>   
    );
  }
}

export default App;
