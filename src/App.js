import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class App extends Component {

  state = {
    entrada:{
    NmrPilastra : null ,
    diaSemana : null,
    prato : null,
    horario : null
  },
    verify : false
  }

  teste = () =>{
    alert('voce foi redirecinado');
    this.setState({
      NmrPilastra : 2
    }
    )
    console.log(this.state.NmrPilastra);
  }

  enviarInfo = () =>{
    
    axios.get('https://teste2-46731.firebaseio.com/CardapioDia.json')
    .then(response =>{
      const date = new Date()
      const dias = ['Domingo','Segunda','Terca','Quarta','Quinta','Sexta','Sabado']
      const hora = date.getHours() + ':' + date.getMinutes()

      this.setState({
        entrada:{
        NmrPilastra : 2 ,
        diaSemana : dias[date.getDay()],
        prato : response.data,
        horario : hora
      },
      verify : true
      })
    })
    .catch(error=>{
      console.log(error)
    });
  }

  solicitarInfo = () =>{

    axios.get('https://react-test-7f727.firebaseio.com/.json')
    .then(response =>{
      console.log(response.data)
    })
    .catch(error=>{
      console.log(error)
    });
    this.setState({
      verify : false
    }
    )

  }
  render() {
    if(this.state.verify){
      console.log(this.state.entrada)
      axios.post('https://react-test-7f727.firebaseio.com/.json',this.state.entrada)
      .then(response =>{
        console.log(response)
        this.setState()
      })
      .catch(error=>{
        console.log(error)
      })
    }

    return (
      <div className="App">
        <div className="container main">
          <div>
            <div className="menu-group container">
            <img className="logo" src='logo_ufpa.png' alt="ufpa.png"></img>
            <div className="Viewer"><h1>RU Viewer</h1></div>
            </div>
            <div className="alert alert-warning" onClick={this.enviarInfo}>Quero colaborar</div>
            <div className="alert alert-warning" onClick={this.solicitarInfo}>Quero me informar</div>
          </div>
        </div>
      </div>   
    );
  }
}

export default App;
