import React, { Component } from 'react';
import {browserHistory} from  'react-router';

export default class Signup extends Component {

    constructor(props){
        super(props);        
        this.state = {
            login : '',
            senha : '',
            confirmacao : '',
            url : '',
            msg : this.props.location.query.msg
        };
    }

    cadastra(event){
        event.preventDefault();

        const signupInfo = {
            method:'POST',
            body:JSON.stringify({login:this.login.value,senha:this.senha.value,urlPerfil:this.url.value}),
            headers:new Headers({
                'Content-type' : 'application/json',
                'X-AUTH-TOKEN' : ''
            })
        };

        fetch('http://localhost:8080/usuarios', signupInfo)
            .then(response => {
                if(response.ok) {
                    browserHistory.push('/');
                    return response.text(); //continua?!
                } else {
                    this.setState({login : '', senha : '', confirmacao : '', url : ''})
                    throw new Error('Não foi possivel realizar o cadastro.');
                }
            })
            .catch(error => {
                this.setState({msg:error.message});
            });
    }

    submit(event){
        if(this.state.login == this.state.senha){
            this.setState({msg:"Senha igual ao login."})
        } else {
            if(this.state.senha == this.state.confirmacao){
                this.cadastra.bind(this, event)
            } else {
                this.setState({msg:"Senha não confere."})
            }
        }
    }

    render(){
        return (
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.msg}</span>
                <form onSubmit={this.submit.bind(this)}>
                    <input type="text" ref={(input) => this.state.login = input} label="Login"  required/>
                    <input type="password" ref={(input) => this.state.senha = input} label="Senha" required/>
                    <input type="password" ref={(input) => this.state.confirmacao = input} label="Confirmação" required/>
                    <input type="text" ref={(input) => this.state.url = input} label="Url do Perfil" placeholder="http://endereco.com" required/>
                    <input type="submit" value="Signup"/>
                </form>
            </div>
        );
    }
}