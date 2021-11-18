import React,{ useEffect,useState } from "react";
import {
    Spinner,
    Card,
    
    Container,
    Row,
    ToastBody,
   
  } from "reactstrap";
  import CardDetail from "views/Cards/CardDetail";
  //import Header from "components/Headers/Header.js";
  import {  CardBody, CardTitle,  Col } from "reactstrap";
import Orders from "views/Orders/OrdersTable";
import {db} from "../../Firebase";
  const Order = () => {
    const [orderdata, setorderdata] = useState([]);
    const [totalrows,settotalrows]=useState(0);
    const [online,setOnline]=useState([])
    const [date,setDate]=useState([])
    const [sb,setSb]=useState([])
    const [mx,setMx]=useState([])
    const [lx,setLx]=useState([])
    const [px,setPx]=useState([])
    const [gx,setGx]=useState([])
    const [ux,setUx]=useState([])
    const [vx,setVx]=useState([])
    const [ix,setIx]=useState([])
    const fetchBlogs=async()=>{
        
      
      const response=db.collection('Orders');
      const data=await response.get();
      //const data1=await response.where('Date', '==', "Online").get();



      //let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(currentTimestamp)
     const d=data.docs
     //const c=data1.docs
      // console.log(d.length)
      const s=[];
     
      data.docs.forEach(item=>{
        let x=item.data().paymentmode;
        //console.log(m)
        let y=item.data().Date;
        let z=item.data().status;
        let w=item.data().deliveryboy;
        s.push([x,y,z,w])
        //console.log(y);
        console.log(s);
        //console.log(item.id);
        setOnline([...online,{"ID":d.length}])
        setDate([...date,{"ID":y}])
      
        
       })
      
       setSb([...sb,{"ID":s}])
       
var f=0;
var l=0;
var p=0;
var g=0;
var u=0;
var v=0;
var i=0;
s.forEach(j=>{
//    //console.log(j)
let currentDate = new Date();
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();
  if(j[0]==="Online" && j[1]===""+cDay + "/" + cMonth + "/" + cYear +"")
   {
      f=f+1;
   }
 }
 )
 console.log(f)
 setMx([...mx,{"ID":f}])
       //console.log(s)
      
    
       //return s;
       s.forEach(j=>{
        //    //console.log(j)
        let currentDate = new Date();
        let cDay = currentDate.getDate();
        let cMonth = currentDate.getMonth() + 1;
        let cYear = currentDate.getFullYear();
          if(j[2]==="Cancelled" && j[1]===""+cDay + "/" + cMonth + "/" + cYear +"")
           {
              p=p+1;
           }
         }
         )
         //console.log(l)
         setPx([...px,{"ID":p}]) 


         s.forEach(j=>{
          //    //console.log(j)
          let currentDate = new Date();
          let cDay = currentDate.getDate();
          let cMonth = currentDate.getMonth() + 1;
          let cYear = currentDate.getFullYear();
            if( j[1]===""+cDay + "/" + cMonth + "/" + cYear +"")
             {
                v=v+1;
             }
           }
           )
           //console.log(l)
           setVx([...vx,{"ID":v}]) 
         

           s.forEach(j=>{
            let currentDate = new Date();
            let cDay = currentDate.getDate();
            let cMonth = currentDate.getMonth() + 1;
            let cYear = currentDate.getFullYear();
            //    //console.log(j)
              if( j[3]!=="" && j[1]===""+cDay + "/" + cMonth + "/" + cYear +"")
               {
                  i=i+1;
               }
             }
             )
             //console.log(l)
             setIx([...ix,{"ID":i}]) 
           
         

         s.forEach(j=>{
          //    //console.log(j)
          let currentDate = new Date();
          let cDay = currentDate.getDate();
          let cMonth = currentDate.getMonth() + 1;
          let cYear = currentDate.getFullYear();
            if(j[2]==="Accepted" && j[1]===""+cDay + "/" + cMonth + "/" + cYear +"")
             {
                g=g+1;
             }
           }
           )
           //console.log(l)
           setGx([...gx,{"ID":g}]) 


           s.forEach(j=>{
            //    //console.log(j)
            let currentDate = new Date();
            let cDay = currentDate.getDate();
            let cMonth = currentDate.getMonth() + 1;
            let cYear = currentDate.getFullYear();
              if(j[2]==="Pending" && j[1]===""+cDay + "/" + cMonth + "/" + cYear +"")
               {
                  u=u+1;
               }
             }
             )
             //console.log(l)
             setUx([...ux,{"ID":u}]) 
         
         
         s.forEach(j=>{
          //    //console.log(j)
          let currentDate = new Date();
          let cDay = currentDate.getDate();
          let cMonth = currentDate.getMonth() + 1;
          let cYear = currentDate.getFullYear();
            if(j[0]==="COD" && j[1]===""+cDay + "/" + cMonth + "/" + cYear +"")
             {
                l=l+1;
             }
           }
           )
           //console.log(l)
           setLx([...lx,{"ID":l}])  

}
    function Online() {
      
      return (
       <div className="App">
         {mx&&mx.map(orders=>{
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

   function COD() {
      
    return (
     <div className="App">
       {lx&&lx.map(orders=>{
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
     {gx&&gx.map(orders=>{
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
 function Cancelled() {
      
  return (
   <div className="App">
     {px&&px.map(orders=>{
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

function Pending() {
      
  return (
   <div className="App">
     {ux&&ux.map(orders=>{
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

function deliveryboy() {
      
  return (
   <div className="App">
     {ix&&ix.map(orders=>{
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

            <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0 ">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                           Orders Online Payment Today
                          {Online()}
                        </CardTitle>
                        
                        
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
                <Card className="card-stats mb-4 mb-xl-0 ">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Orders COD Today
                          {COD()}
                        </CardTitle>
                        
                        
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
                <Card className="card-stats mb-4 mb-xl-0 ">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                         Orders Completed Today
                          {Completed()}
                        </CardTitle>
                        
                        
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
                <Card className="card-stats mb-4 mb-xl-0 ">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                         Orders Cancelled Today
                         {Cancelled()}
                        </CardTitle>
                        
                        
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
                <Card className="card-stats mb-4 mb-xl-0 ">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                         Orders Pending Today
                         {Pending()}
                        </CardTitle>
                        
                        
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
                <Card className="card-stats mb-4 mb-xl-0 ">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          New Orders Today
                         {New()}
                        </CardTitle>
                        
                        
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

              {/* <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0 ">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                         Total Earning From Todays Orders
                         
                        </CardTitle>
                        
                        
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col> */}

              {/* <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0 ">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Earning From Lifetime Orders
                         
                        </CardTitle>
                        
                        
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col> */}

              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0 ">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          No Of Orders Out For Delivery Today
                           {deliveryboy()}
                        </CardTitle>
                        
                        
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