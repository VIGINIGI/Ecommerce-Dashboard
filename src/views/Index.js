/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React,{ useEffect,useState } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import {db} from "../Firebase";
// node.js library that concatenates classes (strings)



// core components

import Header from "components/Headers/Header.js";


const Index = () => {
  const[user1,setUser1]=useState([])
  const[todays,setTodays]=useState([])
  const [rx,setRx]=useState([])
  const [mx,setMx]=useState([])
  const [outofstock,setOutofstock]=useState([])
  const fetchBlogs=async()=>{
    const response=db.collection('users');
    const data=await response.get();
    const response1= db.collection('RepairRequest');
    const data1=await response1.get();
    const response2= db.collection('SellRequest');
    const data2=await response2.get();
    const response3=db.collection('Product');
    const data3=await response3.where('quantity', '==', "0").get();
    const d=data.docs;
    const c=data1.docs;
    const b=data2.docs;
    const e=data3.docs;

    const s=[]
    data.docs.forEach(item=>{
      let x=item.data()
      const y=[]
      y.push([x])
      let g=y[0][0]['Registered On']
      var currentDate=new Date(g)
      let cDay = currentDate.getDate();
      let cMonth = currentDate.getMonth() + 1;
      let cYear = currentDate.getFullYear();
      var f=""+cDay + "/" + cMonth + "/" + cYear +""
      s.push(f)
      console.log(s)
      //console.log(g)
      //let y=item.data().
      console.log(item.id);
      setUser1([...user1,{"ID":d.length}])
      console.log(d.length)

      var i=0;
      s.forEach(j=>{
         let currentDate = new Date();
         let cDay = currentDate.getDate();
         let cMonth = currentDate.getMonth() + 1;
         let cYear = currentDate.getFullYear();
         if( j===""+cDay + "/" + cMonth + "/" + cYear +"")
            {
             i=i+1;
          }
         }
         )
          setTodays([...todays,{"ID":i}]) 
      


})

const q=[]
data1.docs.forEach(item=>{
  let r=item.id;
  q.push([r])
  console.log(s)
  setRx([...rx,{"ID":q.length}])
 })

const f=[]
data2.docs.forEach(item=>{
  let r=item.id;
  f.push([r])
  console.log(s)
  setMx([...mx,{"ID":f.length}])
 })

 data3.docs.forEach(item=>{
  setOutofstock([...outofstock,{"ID":e.length}])
})

}

function Outofstock() {
  return (
   <div className="App">
     {outofstock&&outofstock.map(x=>{
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
function Totalsell() {
  return (
   <div className="App">
     {mx&&mx.map(sellrequest=>{
        return(
             <div>
             <h3>{sellrequest["ID"]}</h3>
            </div>
         )
       })
       }
   </div>
 );
}
function Totalrepair() {
  return (
   <div className="App">
     {rx&&rx.map(repairrequest=>{
        return(
             <div>
             <h3>{repairrequest["ID"]}</h3>
            </div>
         )
       })
       }
   </div>
 );
}
function total() {
  return (
   <div className="App">
     {user1&&user1.map(users=>{
        return(
             <div>
             <h4>{users["ID"]}</h4>
            </div>
         )
       })
       }
   </div>
 );
}
function today(){
  return (
    <div className="App">
      {todays&&todays.map(users=>{
       
         return(
              <div>
              <h4>{users["ID"]}</h4>
             </div>
          )
        })
        }
    </div>
  );
}
useEffect(  () => {
  fetchBlogs();
},[])
  
  return (
    
    <>
     <Header/>
      
      {/* Page content */}
      <div className="header bg-gradient-info pb-0 pt-3 pt-md-3">
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
                          Total users
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
                          Daily Users Register
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{today()}</span>
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
                          Total Cash Earning
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0"></span>
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
                          Total Online Payment Earning
                          
                        </CardTitle>
                        <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow ">
                          <i className="fas fa-percent  " />
                        </div>
                        </Col>
                        </div>
                        <span className="h2 font-weight-bold mb-0  "></span>
                        
                        
                      
                      
                      </div>
                      
                    </Row>
                  
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>


      <div className="header bg-gradient-info pb-5 pt-5 pt-md-5">
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
                          Out Of Stock Product Count
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {Outofstock()}
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
                          No Of Mobile Repair Request
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{Totalrepair()} </span>
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
                          No Of Mobile Sell Request
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{Totalsell()}</span>
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
                      
  );
};


export default Index;