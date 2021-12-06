import React ,{ useEffect,useState }from "react";
import {db} from "../../Firebase";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = () => {
 const [vx,setVx]=useState([])
 const [bx,setBx]=useState([])
  const fetchBlogs=async()=>{
      const response=db.collection('Orders');
      const data=await response.get();
      const data1=await response.where('status', '==', "Accepted").get();
      const b=data1.docs;
      const s=[];
      data.docs.forEach(item=>{
       let y=item.data().Date;
       s.push([y])
       setBx([...bx,{"ID":b.length}])
      })
      var v=0;
      s.forEach(j=>{
       let currentDate = new Date();
       let cDay = currentDate.getDate();
       let cMonth = currentDate.getMonth() + 1;
       let cYear = currentDate.getFullYear();
       if( j[0]===""+cDay + "/" + cMonth + "/" + cYear +"")
          {
           v=v+1;
          }
        }
      )
       setVx([...vx,{"ID":v}]) 

  


}
        
      
  

   function New() {
      
         return (
          <div className="App">
            {vx&&vx.map(orders=>{
               return(
                    <div>
                    <h3>{orders["ID"]}</h3>
                   </div>
                )
              })
              }
          </div>
        );
       }
       function Completed() {
      
        return (
         <div className="App">
           {bx&&bx.map(orders=>{
              return(
                   <div>
                   <h3>{orders["ID"]}</h3>
                  </div>
               )
             })
             }
         </div>
       );
      }


   useEffect(  () => {
     fetchBlogs();
    

   },[]);
  
  return (
    <>
      <div className="header bg-gradient-info pb-4 pt-7 pt-md-7">
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
                          View Daily Revenue
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                         
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
                          Total Earning
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0"></span>
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
                          Todays New Order
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{New()}</span>
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
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col d-flex flex-column  ">
                        <div className="d-flex">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                         Total Completed Orders
                          
                        </CardTitle>
                        <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow ">
                          <i className="fas fa-percent  " />
                        </div>
                        </Col>
                        </div>
                        <span className="h2 font-weight-bold mb-0  ">{Completed()}</span>
                        
                        
                      
                      
                      </div>
                      
                    </Row>
                  
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
     

  );
};

export default Header;
