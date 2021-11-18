import React, { useEffect,useState } from "react";
import {
    Badge,
    Button,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    Spinner,
    UncontrolledTooltip,
  } from "reactstrap";
  import CardDetail from "views/Cards/CardDetail";
  import Header from "components/Headers/Header.js";
  import {  CardBody, CardTitle,  Col } from "reactstrap";
  import ReqTable from "views/RepairRequest/ReqTable";
  
  //Database
  import {db} from "../../Firebase";

  const RepairRequest = () => {


    const [repairdata, setrepairdata] = useState([]);
    const [totalrows,settotalrows]=useState(0);
    const [sb,setSb]=useState([])
    const [fx,setFx]=useState([])
    const [lx,setLx]=useState([])
    const [ax,setAx]=useState([])
    const [nx,setNx]=useState([])
    const [rx,setRx]=useState([])
    const [ux,setUx]=useState([])
    const [mx,setMx]=useState([])

    const fetchBlogs=async()=>{
      const s=[]
      const response= db.collection('RepairRequest');
      const data=await response.get();
      const data1=await response.where('OrderStatus', '==', "Accepted").get();
      const data2=await response.where('OrderStatus', '==', "Cancelled").get();
      const p=data1.docs
      const u=data2.docs
     
      data.docs.forEach(item=>{
        let x=item.data().OrderDate;
        let y=item.data().OrderStatus;
        setNx([...nx,{"ID":p.length}])
        setUx([...ux,{"ID":u.length}])
        //console.log(x)
        let r=item.id;
        s.push([r,x,y])
        console.log(s)
        setRx([...rx,{"ID":s.length}])
       })
       setSb([...sb,{"ID":s}])
       var f=0;
       var l=0;
       var a=0;
       var m=0;
       s.forEach(j=>{
        let currentDate = new Date();
        let cDay = currentDate.getDate();
        let cMonth = currentDate.getMonth() +1 ;
        let cYear = currentDate.getFullYear();
        //console.log(j)
          if(j[0]!==" " && j[1]===""+cDay  + "/" + cMonth + "/" + cYear +"")
           {
              f=f+1;
           }
         }
         )
         console.log(f)
         setFx([...fx,{"ID":f}])

         s.forEach(j=>{
          //    //console.log(j)
          let currentDate = new Date();
          let cDay = currentDate.getDate();
         
          let cMonth = currentDate.getMonth() +1 ;
          let cYear = currentDate.getFullYear();
          console.log(j) 
            if(j[2]==="Accepted" && j[1]===""+cDay  + "/" + cMonth + "/" + cYear +"")
             {
              
              a=a+1;
             }
           }
           )
           console.log(a)
           setAx([...ax,{"ID":a}])


           s.forEach(j=>{
            //    //console.log(j)
            let currentDate = new Date();
            let cDay = currentDate.getDate();
           
            let cMonth = currentDate.getMonth() +1 ;
            let cYear = currentDate.getFullYear();
            console.log(j) 
              if(j[2]==="Cancelled" && j[1]===""+cDay  + "/" + cMonth + "/" + cYear +"")
               {
                
                m=m+1;
               }
             }
             )
             console.log(m)
             setMx([...mx,{"ID":m}])

         s.forEach(j=>{
          //    //console.log(j)
          let currentDate = new Date();
          let cDay = currentDate.getDate();
         
          let cMonth = currentDate.getMonth() +1 ;
          let cYear = currentDate.getFullYear();
          console.log(j) 
            if(j[2]==="Pending" && j[1]===""+cDay  + "/" + cMonth + "/" + cYear +"")
             {
              
              l=l+1;
             }
           }
           )
           console.log(l)
           setLx([...lx,{"ID":l}])
        }

        function Today() {
      
          return (
           <div className="App">
             {fx&&fx.map(repairrequest=>{
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
    
       function Total() {
          
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
    
     function Totalcancelled() {
          
      return (
       <div className="App">
         {ux&&ux.map(repairrequest=>{
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
    
       function Processing() {
          
        return (
         <div className="App">
           {lx&&lx.map(repairrequest=>{
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
    
     function Cancelled() {
          
      return (
       <div className="App">
         {mx&&mx.map(repairrequest=>{
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
    
     function Accepted() {
          
      return (
       <div className="App">
         {ax&&ax.map(repairrequest=>{
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
    
    function Totalaccepted() {
          
      return (
       <div className="App">
         {nx&&nx.map(repairrequest=>{
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


    useEffect(  () => {
      fetchBlogs();
      if(repairdata.length==0){
      (async ()=>{
      const response= db.collection('RepairRequest');
      const data=await response.get();
      // console.log("data.docs",data.docs);
      const arraydata=data.docs;
      settotalrows(arraydata.length);
      arraydata.forEach(item=>{
        let tabledata=item.data();
        //  setrepairdata([...repairdata,item.data()]);
         setrepairdata(state => [...state, {tabledata,"ID":item.id}]);
        
        
       })
      
      })() 
    }
    },[]);
    // async function savedata(){
    //   await db.collection("RepairRequest").doc().set({
    //     repairdata
    // })
    // .then(() => {
    //     console.log("Document successfully written!");
    // })
    // .catch((error) => {
    //     console.error("Error writing document: ", error);
    // });
    // }
    return repairdata.length==totalrows   ?  
    
    
    (
        <>
        {/* Cards above Table */}
        <>
        
        {console.log("repairRequest:",repairdata)}
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
                          No Of Request Today 
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                        {Today()}
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
                          No Of Processing Request Today 
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                        {Processing()}
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
                          No Of Accepted Request 
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                        {Totalaccepted()}
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
                          No Of Completed Request Today
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{Accepted()}</span>
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
                          Total No Of Request
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{Total()}</span>
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
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total No Of Cancelled Request
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{Totalcancelled()}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
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
                          No Of Cancelled Request Today
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{Cancelled()}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
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
    
     <ReqTable data={repairdata} />
        
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
  export default RepairRequest;