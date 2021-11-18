import React,{useState,useEffect} from "react";
import {
   
    Card,
    Spinner,
    Container,
    Row,
   
  } from "reactstrap";
import CardDetail from "views/Cards/CardDetail";
//import Header from "components/Headers/Header.js";
import {  CardBody, CardTitle,  Col } from "reactstrap";
import DeliveryBoy from "views/DeliveryBoy/DeliveryBoyTable";
import {db} from "../../Firebase";

  const Delivery = () => {
    const [deliveryboydata, setdeliveryboydata] = useState([]);
    const [totalrows,settotalrows]=useState(0);
    const [delivery,setDelivery]=useState([])
    const [active,setActive]=useState([])
    const [blocked,setBlocked]=useState([])
    const fetchBlogs=async()=>{
      const response=db.collection('DeliveryBoy');
      const data=await response.get();
      const data1=await response.where('status', '==', "Active").get();
      const data2=await response.where('status', '==', "Blocked").get();
      const d=data.docs;
      const c=data1.docs;
      const b=data2.docs;
      
      // console.log(d.length)
      data.docs.forEach(item=>{
        let x=item.data();
        console.log(item.id);
        setDelivery([...delivery,{"ID":d.length}])
        setActive([...active,{"ID":c.length}])
        setBlocked([...blocked,{"ID":b.length}])
       })
     
    }
    function total() {
      return (
       <div className="App">
         {delivery&&delivery.map(x=>{
            return(
                 <div>
                 <h4>{x["ID"]}</h4>
                </div>
             )
           })
           }
       </div>
     );
   }
   function Active() {
    return (
     <div className="App">
       {active&&active.map(x=>{
          return(
               <div>
               <h4>{x["ID"]}</h4>
              </div>
           )
         })
         }
     </div>
   );
 }
 function Blocked() {
  return (
   <div className="App">
     {blocked&&blocked.map(x=>{
        return(
             <div>
             <h4>{x["ID"]}</h4>
            </div>
         )
       })
       }
   </div>
 );
}

    useEffect(  () => {
      fetchBlogs();
      if(deliveryboydata.length==0){
      (async ()=>{
      const response= db.collection('users');
      const data=await response.where('type', '==', "DeliveryBoy").get();
      // console.log("data.docs",data.docs);
      const arraydata=data.docs;
      
      settotalrows(arraydata.length);
      arraydata.forEach(item=>{
        
        let tabledata=item.data();
        //  setrepairdata([...repairdata,item.data()]);
         setdeliveryboydata(state => [...state, {tabledata,"ID":item.id}]);
        
        
       })
      
      })() 
    }
    },[]);




    return deliveryboydata.length==totalrows  ?

     (
        <>
        {/* Cards above Table */}
        <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total No of Delivery Boys
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {total()}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                   
                  </CardBody>
                </Card>
              </Col>

              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Blocked
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{Blocked()}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Active
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{Active()} </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
    {/* ****************************************************Table ****************************************** */}
     <DeliveryBoy data={deliveryboydata}/>
        
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
  export default Delivery;