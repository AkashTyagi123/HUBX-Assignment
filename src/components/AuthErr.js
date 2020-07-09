import React from 'react';
import {Container} from 'reactstrap';
const authErr= ()=>{
  return(
    <Container>
        <h1 className="text-center mt-5">Please login to see this page</h1>
    </Container>
  );
}
export default authErr;
