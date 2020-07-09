import React, { Component } from 'react';

import {Container,Row} from 'reactstrap';
import Event from './Event';
import axios from 'axios';

class AllEvent extends Component{
   

    state = {
        event:[]
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/event')
        .then((res)=>{
            this.setState({
                event:res.data
            })
        }
            
        )
        .catch(err=>console.log(err));
    }
    render(){
        
     
        return(
            
            
         
        
        <Container className="mt-5">
        <Row>
        
        {
            this.state.event.map(e=>{
                return <Event key={e._id} info={e.info} name={e.name} date={e.date} source={e.source} category={e.category}/>
            })
        }
        
        </Row>
        </Container>
    
        );
    }
}

export default AllEvent;