import React,{ useEffect,useState } from "react";
import {
    Spinner,
    Card,
    
    Container,
    Row,
   
  } from "reactstrap";
  import CardDetail from "views/Cards/CardDetail";
  //import Header from "components/Headers/Header.js";
  import {  CardBody, CardTitle,  Col } from "reactstrap";
import Orders from "views/Orders/Orders";
import {db} from "../../Firebase";
  const Order = () => {
    const [orderdata, setorderdata] = useState([]);
    const [totalrows,settotalrows]=useState(0);
    useEffect(  () => {
      if(orderdata.length==0){
      (async ()=>{
      const response= db.collection('Orders');
      const data=await response.get();
      // console.log("data.docs",data.docs);
      const arraydata=data.docs;
      settotalrows(arraydata.length);
      arraydata.forEach(item=>{
        let tabledata=item.data();
        //  setrepairdata([...repairdata,item.data()]);
         setorderdata(state => [...state, {tabledata,"ID":item.id}]);
        
        
       })
      
      })() 
    }
    },[]);

    return orderdata.length==totalrows && orderdata.length!=0  ?   (
        <>
        {/* Cards above Table */}
        <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <CardDetail detail={{name:"Orders Online Payment Today ",number:123,percent:"12%",last:"Since Last 2 months"}}/>
              
              <CardDetail detail={{name:"Orders COD Today ",number:12,percent:"11%",last:"Since Last 2 months"}}/>
              
              <CardDetail detail={{name:"Orders Completed Today",number:12,percent:"11%",last:"Since Last 2 months"}}/>
              
              <CardDetail detail={{name:"Orders Cancelled Today ",number:12,percent:"11%",last:"Since Last 2 months"}}/>
              
              <CardDetail detail={{name:"Orders Pending Today ",number:12,percent:"11%",last:"Since Last 2 months"}}/>
             
              <CardDetail detail={{name:"New Orders Today ",number:12,percent:"11%",last:"Since Last 2 months"}}/>
              
              <CardDetail detail={{name:"Total Earning From Todays Orders ",number:12,percent:"11%",last:"Since Last 2 months"}}/>
              
              <CardDetail detail={{name:"Total Earning From Lifetime Orders  ",number:12,percent:"11%",last:"Since Last 2 months"}}/>
              
              <CardDetail detail={{name:"No Of Orders Out For Delivery Today ",number:12,percent:"11%",last:"Since Last 2 months"}}/>
              
              
            </Row>
          </div>
        </Container>
      </div>
    </>
    {/* ****************************************************Table ****************************************** */}
    <Orders data={orderdata} />
        
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
  export default Order;