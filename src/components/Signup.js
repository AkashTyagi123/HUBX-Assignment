import React, { Component } from 'react';
import { Container,Row,Col,Button,Alert, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class Signup extends Component{
    state = {
        name:'',
        email:'',
        password:'',
        msg:'',
        status:'',
        redirect:''

    }
    onChangeHandler(e){
        this.setState({
            ...this.state,
            [e.target.name]:e.target.value
        });
     
     }
     onSubmitHandler(e){
         e.preventDefault();
         
         axios.post('http://localhost:5000/api/user/',{name:this.state.name,email:this.state.email,password:this.state.password})
         .then(res=>{
            
             
            
             this.setState({
                 name:'',
                 email:'',
                 password:'',
                 status:res.status,
                 msg:res.data.msg,
                 redirect:'/login'
             });
             
         })
         .catch(error=>{
             this.setState({
                 name:'',
                 email:'',
                 password:'',
                 status:error.response.status,
                 msg:error.response.data.msg,
                 redirect:'/signup'
             });
             
             
         });

        
 
         
     }
    render(){
        
        let color="success";
       if(this.state.status !== 200)
            color="danger"

        return(
            <div className="signup">
           <Container>
           <h1 className="pt-5 text-center" style={{color:"#fff"}}>Meet the Most Excited and Amazing Audience</h1>
              
           <Form className="pt-5" onSubmit={this.onSubmitHandler.bind(this)}>
               
               

                {
                
                this.state.msg ? <Alert color={color}>{this.state.msg}</Alert>:null }
               
                   <FormGroup className="mt-5">
                       <Label className="form-label" for="username">Name</Label>
                       <Input className="form-input" value={this.state.name} required onChange={this.onChangeHandler.bind(this)} type="text" name="name" id="username" placeholder="" />
                   </FormGroup>
                   <FormGroup className="mt-5">
                       <Label className="form-label" for="email">Email</Label>
                       <Input className="form-input" value={this.state.email} required onChange={this.onChangeHandler.bind(this)} type="email" name="email" id="email" placeholder="" />
                   </FormGroup>
                   
                   <FormGroup className="mt-5">
                       <Label className="form-label" for="password">Password</Label>
                       <Input className="form-input" value={this.state.password} required minLength="6" onChange={this.onChangeHandler.bind(this)} type="password" name="password" id="password" placeholder="" />
                   </FormGroup>
                   <Button className="mt-5" type="submit" color="success"  block>Sign Up</Button>
                   <hr></hr>
                   <FormText>By signing up for Evento, you agree to Evento's <a className="imp-links" href="/terms">Terms of Service</a> & <a className="imp-links" href="policy">Privacy Policy</a>.</FormText>
               </Form>
          
           </Container>
               
        </div>
        );
    }
}
export default Signup;