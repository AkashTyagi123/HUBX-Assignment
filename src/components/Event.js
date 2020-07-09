import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle,Col,Badge
  } from 'reactstrap';
const event = (props)=>{
    return (
        <Col className="mt-5" lg="4" md="4" sm="12">
          <Card>
            <CardImg top width="100%" src={props.source} alt="Card image cap" />
            <CardBody>
            <span><Badge  color="danger">{props.category}</Badge></span>
            <CardTitle className="card-title"><strong>{props.name}</strong></CardTitle>
            <CardSubtitle>{props.date}</CardSubtitle>
             <CardText className="text-muted">{props.info}</CardText>
             
            </CardBody>
            
          </Card>
        </Col>
      );
}
export default event;