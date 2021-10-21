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
    useEffect(  () => {
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
              <CardDetail detail={{name:"Total No Of Banners",number:12,percent:"11%",last:"Since Last 2 months"}}/>

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