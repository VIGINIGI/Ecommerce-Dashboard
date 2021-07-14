import React,{ useEffect,useState } from "react";
import {
   
    Card,
    Spinner,
    Container,
    Row,
   
  } from "reactstrap";
  import CardDetail from "views/Cards/CardDetail";
  //import Header from "components/Headers/Header.js";
  import {  CardBody, CardTitle,  Col } from "reactstrap";
import ProductCategories from "views/ProductCategories/ProductCategories";

import {db} from "../../Firebase";
  const ProductCat = () => {
     

      
    const [ProductCatdata, setProductCatdata] = useState([]);
    const [totalrows,settotalrows]=useState(0);
    useEffect(  () => {
      if(ProductCatdata.length==0){
      (async ()=>{
      const response= db.collection('ProductCat');
      const data=await response.get();
      // console.log("data.docs",data.docs);
      const arraydata=data.docs;
      console.log("Testing:",arraydata);
      settotalrows(arraydata.length);
      arraydata.forEach(item=>{
        console.log(item.id);
        let tabledata=item.data();
        //  setrepairdata([...repairdata,item.data()]);
         setProductCatdata(state => [...state, {tabledata,"ID":item.id}]);
        
        
       })
      
      })() 
    }
    },[]);

    return ProductCatdata.length==totalrows && ProductCatdata.length!=0  ?  
    (
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
    <ProductCategories  data={ProductCatdata}/>
        
          </>
    ):
    <div>
    <span>Loading Data...</span>

    <Spinner color="success" />
    <Spinner color="success" />
    <Spinner color="success" />
    <Spinner color="success" />
    <Spinner color="success" />
    </div>

  }
  export default ProductCat;