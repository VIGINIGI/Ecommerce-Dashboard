import React from "react";
import {
   
    Card,
    
    Container,
    Row,
   
  } from "reactstrap";
  import CardDetail from "views/Cards/CardDetail";
  //import Header from "components/Headers/Header.js";
  import {  CardBody, CardTitle,  Col } from "reactstrap";
import ProductCategories from "views/ProductCategories/ProductCategories";
  const ProductCat = () => {
    return (
        <>
        {/* Cards above Table */}
        <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <CardDetail detail={{name:"Total No Of Categories ",number:123,percent:"12%",last:"Since Last 2 months"}}/>
              
              </Row>
          </div>
        </Container>
      </div>
    </>
    {/* ****************************************************Table ****************************************** */}
    <ProductCategories/>
        
          </>
    );

  }
  export default ProductCat;