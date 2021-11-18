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
import firebase from "../../Firebase";
import { data } from "jquery";


  const Custom = () => {
    const [customer, setcustomer] = useState([]);
    const [totalrows,settotalrows]=useState(0);
    const [user,setUser]=useState([])
    const[user1,setUser1]=useState([])
    const[todays,setTodays]=useState([])
    const[block,setBlock]=useState([])
    const fetchBlogs=async()=>{
      const response=db.collection('users');
      const data=await response.get();
      const data1=await response.where('isBlocked', '==', true).get();
     
      //let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(currentTimestamp)
      const d=data.docs;
      const b=data1.docs;
      const s=[];
      // console.log(d.length)
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
        console.log(f)
        //console.log(g)
        //let y=item.data().
        console.log(item.id);
        setUser1([...user1,{"ID":d.length}])
        setUser([...user,x])
        setBlock([...block,{"ID":b.length}])
        
       

       
      })
      //console.log(s)

      var i=0;
      s.forEach(j=>{
         let currentDate = new Date();
         let cDay = currentDate.getDate();
         let cMonth = currentDate.getMonth() + 1;
         let cYear = currentDate.getFullYear();
         //console.log(j)
         if( j===""+cDay + "/" + cMonth + "/" + cYear +"")
            {
             i=i+1;
          }
         }
         )
         //console.log(l)
          setTodays([...todays,{"ID":i}]) 
     
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


    function blocked(){
      return (
        <div className="App">
          {block&&block.map(users=>{
           
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
      if(customer.length==0){

       
      (async ()=>{
      const response= db.collection('users');
      const data=await response.where('type', '==', "User").get();
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
    
    
  
  return customer.length==totalrows && customer.length!=0 ?  
     (
        <>
        {/* Cards above Table */}
        <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid >
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
                           No Of Users Registered Today
                          {today()}
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
                          No of Users Blocked
                          {blocked()}
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
                          Total No Of Users
                          {total()}
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