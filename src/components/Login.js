import React, { Component } from 'react';
import { Container, Row, Col, Button, Alert, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class Login extends Component {
    state = {

        email: '',
        password: '',
        msg: '',
        status: '',
        loggedIn:false



    }
    onChangeHandler(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });

    }

    onLogin(token) {
        console.log('login')
        this.props.handleLogin(token);
        
    }

    onSubmitHandler(e) {
        e.preventDefault();

        axios.post('http://localhost:5000/api/user/login', { email: this.state.email, password: this.state.password })
            .then(res => {
                this.setState({
                    email: '',
                    password: '',
                    status: res.status,
                    msg: res.data.msg,
                    loggedIn:true
                });
                //console.log(res.data);
                this.onLogin(res.data.token,this);
            })
            .catch(error => {
                console.log('error',error.response);
                this.setState({
                    email: '',
                    password: '',
                    status: error.response.status,
                    msg: error.response.data.msg
                });

            });

    }
    render() {
        
        let color = "success";
        if (this.state.status !== 200)
            color = "danger";
        if(this.state.loggedIn){
            return <Redirect to="/list-event"/>
        }
        return (
            <div className="login">
                <Container>
                    <h1 className="pt-5 text-center" style={{ color: "#fff" }}>Organise Events that Inspire</h1>

                    <Form className="pt-5" onSubmit={this.onSubmitHandler.bind(this)}>

                        {

                            this.state.msg ? <Alert color={color}>{this.state.msg}</Alert> : null}

                        <FormGroup className="mt-5">
                            <Label className="form-label" for="email">Email</Label>
                            <Input className="form-input" value={this.state.email} required onChange={this.onChangeHandler.bind(this)} type="email" name="email" id="email" placeholder="" />
                        </FormGroup>

                        <FormGroup className="mt-5">
                            <Label className="form-label" for="password">Password</Label>
                            <Input className="form-input" value={this.state.password} required minLength="6" onChange={this.onChangeHandler.bind(this)} type="password" name="password" id="password" placeholder="" />
                        </FormGroup>
                        <Button className="mt-5" type="submit" style={{ backgroundColor: "#F65858", border: "none" }} block>Login Up</Button>
                        <hr></hr>

                    </Form>

                </Container>

            </div>
        );
    }
}
export default Login;