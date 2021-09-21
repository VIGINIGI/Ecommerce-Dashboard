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
import Customer from "views/Customer/CustomerTable";
import {db} from "../../Firebase";
  const Custom = () => {
    const [customer, setcustomer] = useState([]);
    const [totalrows,settotalrows]=useState(0);

   
    useEffect(  () => {
      if(customer.length==0){
      (async ()=>{
      const response= db.collection('Customer');
      const data=await response.get();
      // console.log("data.docs",data.docs);
      const arraydata=data.docs;
      console.log("Testing:",arraydata);
      settotalrows(arraydata.length);
      arraydata.forEach(item=>{
        console.log(item.id);
        let tabledata=item.data();
        //  setrepairdata([...repairdata,item.data()]);
         setcustomer(state => [...state, {tabledata,"ID":item.id}]);
        
         
          

         
        
        
       })
      
      })() 
    }
    },[])

    function Dates(){
      //const response= db.collection('Customer');
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      return(<span>{date}</span>)
    }
    
   
    
    
    
      


   
    return customer.length==totalrows && customer.length!=0  ?  
     (
        <>
        {/* Cards above Table */}
        <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid >
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <CardDetail detail={{name:"No Of Users Registered Today",number:123,percent:"12%",last:"Since Last 2 months"}}/>
              <CardDetail detail={{name:"No Of User Blocked ",number:12,percent:"11%",last:"Since Last 2 months"}}/>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0 ">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total No Of Users
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {Dates()}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>


            </Row>
          </div>
        </Container>
      </div>
    </>
    {/* ****************************************************Table ****************************************** */}
    <Customer  data={customer} />
        
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
  export default Custom;