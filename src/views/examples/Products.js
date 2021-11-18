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
  import Products from "views/Products/ProductsTable";
  import {db} from "../../Firebase";
  const Prod = () => {
    const [product, setproduct] = useState([]);
    const [totalrows,settotalrows]=useState(0);
    const [products,setProducts]=useState([])
    const [active,setActive]=useState([])
    const [inactive,setInactive]=useState([])
    const [outofstock,setOutofstock]=useState([])
    const fetchBlogs=async()=>{
      const response=db.collection('Product');
      const data=await response.get();
      const data1=await response.where('status', '==', "Active").get();
      const data2=await response.where('status', '==', "Inactive").get();
      const data3=await response.where('quantity', '==', "0").get();

      const d=data.docs;
      const a=data1.docs;
      const b=data2.docs;
      const c=data3.docs;
      // console.log(a.length)
      // console.log(d.length)
      data.docs.forEach(item=>{
        let x=item.data();
        console.log(item.id);
        setProducts([...products,{"ID":d.length}])
        setActive([...active,{"ID":a.length}])
        setInactive([...inactive,{"ID":b.length}])
        setOutofstock([...outofstock,{"ID":c.length}])
       
       

       
      })
     
    }
    function total() {
      return (
       <div className="App">
         {products&&products.map(x=>{
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

 function Inactive() {
  return (
   <div className="App">
     {inactive&&inactive.map(x=>{
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
    useEffect(  () => {
      fetchBlogs();
      if(product.length==0){
      (async ()=>{
      const response= db.collection('Product');
      const data=await response.get();
      // console.log("data.docs",data.docs);
      const arraydata=data.docs;
      console.log("Testing:",arraydata);
      settotalrows(arraydata.length);
      arraydata.forEach(item=>{
        console.log(item.id);
        let tabledata=item.data();
        //  setrepairdata([...repairdata,item.data()]);
         setproduct(state => [...state, {tabledata,"ID":item.id}]);
        
        
       })
      
      })() 
    }
    },[]);
   
    return product.length==totalrows  ?  (
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
                          Total No Of Products
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
                <Card className="card-stats mb-4 mb-xl-0 ">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total No Of Product Active 
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {Active()}
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
                <Card className="card-stats mb-4 mb-xl-0 ">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total No Of Product Inactive 
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {Inactive()}
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
                <Card className="card-stats mb-4 mb-xl-0 ">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total No Of Product Out Of Stock 
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
             

            </Row>
          </div>
        </Container>
      </div>
    </>
    {/* ****************************************************Table ****************************************** */}
    <Products  data={product} />
        
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
  export default Prod;