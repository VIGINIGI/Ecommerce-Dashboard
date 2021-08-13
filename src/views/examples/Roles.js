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
import Roles from "views/Roles/RolesTable";
import {db} from "../../Firebase";
  const Role = () => {
    const [roles, setroles] = useState([]);
    const [totalrows,settotalrows]=useState(0);
    useEffect(  () => {
      if(roles.length==0){
      (async ()=>{
      const response= db.collection('Roles');
      const data=await response.get();
      // console.log("data.docs",data.docs);
      const arraydata=data.docs;
      console.log("Testing:",arraydata);
      settotalrows(arraydata.length);
      arraydata.forEach(item=>{
        console.log(item.id);
        let tabledata=item.data();
        //  setrepairdata([...repairdata,item.data()]);
         setroles(state => [...state, {tabledata,"ID":item.id}]);
        
        
       })
      
      })() 
    }
    },[]);
    return roles.length==totalrows  ?  
     (
        <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
           
          </div>
        </Container>
      </div>
        <>
      
    </>
    {/* ****************************************************Table ****************************************** */}
    <Roles  data={roles} />
        
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
  export default Role;