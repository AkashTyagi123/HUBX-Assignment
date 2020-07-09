import React from 'react';
import {Navbar} from 'reactstrap';
import '../App.css'
const topBar = ()=>{
    return(
        <Navbar className="top-navbar" expand="md">
           <h5 className="ml-auto mr-auto">Made with love in India</h5>
        </Navbar>
    );
}
export default topBar;