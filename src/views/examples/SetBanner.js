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
  import Banner from "views/Banners/Banner.js";
  import {db} from "../../Firebase";
  const SetBanner = () => {
    const [banner, setbanner] = useState([]);
    const [totalrows,settotalrows]=useState(0);
    const[banners,setBanners]=useState([])
    const fetchBlogs=async()=>{
      const response=db.collection('Banners');
      const data=await response.get();
      const d=data.docs;
      console.log(d.length)
      data.docs.forEach(item=>{
        let x=item.data();
        console.log(item.id);
        setBanners([...banners,{"ID":d.length}])
       
       

       
      })
     
    }
    function total() {
      return (
       <div className="App">
         {banners&&banners.map(x=>{
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
      if(banner.length==0){
      (async ()=>{
      const response= db.collection('Banners');
      const data=await response.get();
      // console.log("data.docs",data.docs);
      const arraydata=data.docs;
      console.log("Testing:",arraydata);
      settotalrows(arraydata.length);
      arraydata.forEach(item=>{
        console.log(item.id);
        let tabledata=item.data();
        //  setrepairdata([...repairdata,item.data()]);
         setbanner(state => [...state, {tabledata,"ID":item.id}]);
        
        
       })
      
      })() 
    }
    },[]);
    return banner.length==totalrows  ?  (
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
                           Total No Of Banners
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
    <Banner  data={banner} />
        
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
  export default SetBanner;