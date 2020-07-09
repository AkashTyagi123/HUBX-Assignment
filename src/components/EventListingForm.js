import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input,Container, FormText, Alert } from 'reactstrap';
import axios from 'axios';

class EventListingForm extends Component{
    state = {
       
        name:'',
        info:'',
        date:'',
        category:'',
        source:'',
        contact:'',
        location:'',
        dateErr:'',
        contactErr:'',
        nameErr:'',
        descriptionErr:'',
        categoryErr:''
        

    }
    onChangeHandler(e){
        console.log(e.target);
        
        this.setState({
            ...this.state,
            [e.target.name]:e.target.value
        });
        
        
     
     }

    
     onSubmitHandler(e){
        let isValid = true;
         e.preventDefault();
         if(Date.parse(this.state.date)< Date.now()){
             isValid=false;
             this.setState({
                 dateErr:'Time machine is yet to be invented!!Enter a future date'
             })
         
         }

        else if(this.state.contact.length !== 10 ){
            isValid=false;
             this.setState({
                 contactErr:'Ahh!!Mobile numbers are of 10 digit'
             })
         }

          else if(this.state.contact.match('[0-9]{10}')==null){
            isValid=false;
            this.setState({
                contactErr:'Only Numeric digits are allowed in number field'
            })
         }

        if(isValid){
            const {name,info,date,category,source,contact,location} = {...this.state};
           axios.post('http://localhost:5000/api/event',{
               name,
               info,
               date,
               category,
               source,
               contact,
               location

           })
           .then(()=>alert("Event Added"))
           .catch(()=>alert("Please login first to post an event"));
        }

        
     }
     render(){
        return(
        <Container fluid>
        <h1 className="pt-5 text-center">Organise Events that mesemerize</h1>
        <hr className="mt-5" style={{width:"50%",border:"1px solid black"}}></hr>
           
        <Form  className="pt-5" onSubmit={this.onSubmitHandler.bind(this)}>
            
       

             
            
               
                <FormGroup className="mt-5">
                    <Label style={{color:"#000"}} for="name">Name</Label>
                    <Input  value={this.state.name} required onChange={this.onChangeHandler.bind(this)} type="text" name="name" id="name" placeholder="" />
                </FormGroup>

                <FormGroup className="mt-5">
                    <Label for="info">Description</Label>
                    <Input  value={this.state.info} required onChange={this.onChangeHandler.bind(this)} type="text" name="info" id="info" placeholder="" />
                </FormGroup>

                <FormGroup>
        <Label for="date">Date</Label>
        <Input
          type="date"
          name="date"
          id="date"
          placeholder=""
          onChange={this.onChangeHandler.bind(this)}
        />
       {this.state.dateErr ?  <Alert className="mt-3" color="danger">{this.state.dateErr}</Alert>:null}
      </FormGroup>

                <FormGroup>
                <Label for="category-list">Category</Label>
                <Input onChange={this.onChangeHandler.bind(this)}  type="text" name="category" id="category-list">
                    
                    
            </Input>
            </FormGroup>
            <FormGroup className="mt-5">
                   {/* Validate me for a mobile number */}
                    <Label for="contact">Contact</Label>
                    <Input  value={this.state.contact} required onChange={this.onChangeHandler.bind(this)} type="tel" name="contact" id="contact" placeholder="" />
                    {this.state.contactErr ?  <Alert className="mt-5" color="danger">{this.state.contactErr}</Alert>:null}
                </FormGroup>

                <FormGroup className="mt-5">
                    <Label for="location">Location</Label>
                    <Input  value={this.state.location} required onChange={this.onChangeHandler.bind(this)} type="text" name="location" id="location" placeholder="" />
                </FormGroup>

                <FormGroup className="mt-5">
                    <Label for="source">Image Poster URL</Label>
                    <Input  value={this.state.source} required onChange={this.onChangeHandler.bind(this)} type="url" name="source" id="source" placeholder="" />
                </FormGroup>
                



     

                       


                
                
                <Button className="mt-5" type="submit" color="success"  block>Submit</Button>
                <hr></hr>
               
            </Form>
       
        </Container>
        );
            
    
     }


}
export default EventListingForm;