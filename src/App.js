import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import QrReader from 'react-qr-reader'
import 'react-html5-camera-photo/build/css/index.css';
// import Webcam from "react-webcam";
// import Camera from 'react-html5-camera-photo';

class App extends Component {

  state = {
    entrada:{
    NmrPilastra : null ,
    diaSemana : null,
    prato : null,
    horario : null
  },
    saida:{
    NmrPilastra : null ,
    diaSemana : null,
    prato : null,
    horario : null
    },
    verifyAlteracao : false,
    verifyCamera :false,
    verifySolicitacao:false,
    verifyEnvio : false,
    result : null
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result : data
      })
    }
  }
  handleError = err => {
    console.error(err)
  }

  handleCamera = () =>{
    this.setState({
      verifyCamera: !this.state.verifyCamera
    })
  }
  handleSolicitacao = () =>{
    this.setState({
      verifySolicitacao: !this.state.verifySolicitacao
    })
  }


  enviarInfo = () =>{
    
    axios.get('https://pratodia-01.firebaseio.com/PratoDia.json')
    .then(response =>{
      const date = new Date()
      const dias = ['Domingo','Segunda','Terca','Quarta','Quinta','Sexta','Sabado']
      const hora = date.getHours() + ':' + date.getMinutes()

      this.setState({
        entrada:{
        NmrPilastra : this.state.result,  
        diaSemana : dias[date.getDay()],
        prato : response.data,
        horario : hora
      },
      verifyAlteracao : true
      })
    })
    .catch(error=>{
      console.log(error)
    });
  }

  solicitarInfo = () =>{

    axios.get('https://ruviewer-1.firebaseio.com/.json')
    .then(response =>{
      // console.log(response.data)
      let array = Object.keys(response.data).map(key=> response.data[key]);
      this.setState({
        saida: array[array.length - 1],
        verifySolicitacao:true
      })
      // console.log(this.state.saida)
    })
    .catch(error=>{
      console.log(error)
    });
  }
  render() {
    if(this.state.verifyAlteracao){
      // console.log(this.state.entrada)
      axios.post('https://ruviewer-1.firebaseio.com/.json',this.state.entrada)
      .then(response =>{
        // console.log(response)
        this.setState({
          result : null,
          verifyAlteracao : false,
          verifyEnvio : false
        }
        )
      })
      .catch(error=>{
        console.log(error)
      })
    }
    let main
    if(this.state.verifyCamera && !this.state.verifySolicitacao){
      main = (
        <div>
        <div className="alert alert-warning" onClick={this.handleCamera}>Voltar</div>
          <QrReader
              delay={300}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: '100%' ,marginLeft :'auto',marginRight:'auto'}}
          />
        </div>
      )
    }else if(!this.state.verifyCamera & !this.state.verifySolicitacao){
      main = (
        <div>
        <div className="menu-group container">
            <img className="logo-ufpa" src='logo_ufpa.png' alt="ufpa.png"></img>
            <img className="logo" src="logoViewer5.png" alt="logoViewer.png"></img>
            </div>
            <div className="alert alert-warning" onClick={this.handleCamera}>Quero colaborar</div>
            <div className="alert alert-warning " onClick={this.solicitarInfo}>Quero me informar</div>
            <div className="spacer"></div>
        </div>
      )
    }else if(!this.state.verifyCamera && this.state.verifySolicitacao){
      main = (
        <div>
          <div className="alert alert-warning" onClick={this.handleSolicitacao}>Voltar</div>
          <div className="response">
          <p>A fila esta na pilastra : {this.state.saida.NmrPilastra}</p>
          <p>Útilma atualização feita {this.state.saida.diaSemana} ás {this.state.saida.horario} para o prato {this.state.saida.prato}</p>
          </div>
        </div>
      )
    }

    if(this.state.result != null && !this.state.verifyEnvio ){
      this.enviarInfo()
      alert('Obrigado por colaborar!')
      this.setState({
        verifyEnvio: true
      })
      this.handleCamera()
    }

    
    return (
      <div className="App">
        <div className="container main">
        {main}
        </div>
        <div className="footer"></div>
      </div>   
    );
  }
}

export default App;
