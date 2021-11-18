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
import ProductCategories from "views/ProductCategories/ProductCategoriesTable";

import {db} from "../../Firebase";
  const ProductCat = () => {
    const [ProductCatdata, setProductCatdata] = useState([]);
    const [totalrows,settotalrows]=useState(0);
    const [cat,setcat]=useState([])

    const fetchBlogs=async()=>{
      const response=db.collection('ProductCat');
      const data=await response.get();
      const d=data.docs;
      // console.log(d.length)
      data.docs.forEach(item=>{
        let x=item.data();
        console.log(item.id);
        setcat([...cat,{"ID":d.length}])
        
       

       
      })
     
    }

    function total() {
      return (
       <div className="App">
         {cat&&cat.map(cats=>{
            return(
                 <div>
                 <h4>{cats["ID"]}</h4>
                </div>
             )
           })
           }
       </div>
     );
   }
    useEffect(  () => {
      fetchBlogs();
      if(ProductCatdata.length==0){
      (async ()=>{
      const response= db.collection('ProductCat');
      const data=await response.get();
      // console.log("data.docs",data.docs);
      const arraydata=data.docs;
      console.log("Testing:",arraydata);
      settotalrows(arraydata.length);
      arraydata.forEach(item=>{
        
        db.collection("Product").where('category', '==', item.data().CatName).get().then((value)=>{
          let tabledata=item.data();
          tabledata.quantity=value.docs.length;
          setProductCatdata(state => [...state, {tabledata,"ID":item.id}]);
        })
        // let tabledata=item.data();
        // setProductCatdata(state => [...state, {tabledata,"ID":item.id}]);
        
        
       })
      
      })() 
    }
    },[]);

    return ProductCatdata.length==totalrows   ?  
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
                <Card className="card-stats mb-4 mb-xl-0 ">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                           Total No Of Categories
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