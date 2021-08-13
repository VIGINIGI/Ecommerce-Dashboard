import { data } from "jquery";
import React, { useState,useEffect } from "react";
import { NotificationManager } from "react-notifications";
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
    Input,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Container,
    Row,
    FormGroup,
    Form,
    InputGroupAddon,
    InputGroupText,
    InputGroup,

  
  } from "reactstrap";
  // import CustomModal from "views/Cards/modal";
  import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
  import {db} from "../../Firebase";

const ReqTable = (props) => { 
  const [modaldetail, setModal] = useState(false);
  const [modaldelievery, setModaldelievery] = useState(false);
  const [status,setstatus]=useState('Default');
 const toggle = () =>  setModal(!modaldetail);  
 const toggledelievery = () =>  setModaldelievery(!modaldelievery); 
  const [tabledata, settabledata]= useState([]);
  const [deliveryboydata,setdeliveryboydata]=useState([]);
  const [totalrows,settotalrows]=useState(0);
  const [currentindex,setcurrentindex]=useState(0);
  //for search 
 var stringSimilarity = require("string-similarity");
 const [search, setsearch]=useState("");
 const [searchresult, setsearchresult]=useState([]);
 const [displaydata,setdisplaydata]=useState([]);
 useEffect( () => {
   if( tabledata.length==0){
   console.log("Props:",props.data);
   props.data.forEach(item=>{
    //  setrepairdata([...repairdata,item.data()]);
     tabledata.push(item);

   })
   setdisplaydata(tabledata);
  }
     

 },[]);
// async function adddata(){
  
//   console.log("saving:",props.data[0]);
//   const data= tabledata[0];
  
  
//   console.log("State:",tabledata);
//   await db.collection("RepairRequest").doc().set(
//     tabledata[0]
// )
// .then(() => {
//     console.log("Document successfully written!");
// })
// .catch((error) => {
//     console.error("Error writing document: ", error);
// });
// }
async function savedata(){
tabledata.map((data, index)=> {
 db.collection("RepairRequest").doc(data.ID).update(
  data.tabledata
)
.then(() => {
  console.log("Document successfully updated!");
}).catch((error) => {
      console.error("Error writing document: ", error);
  });
})
}
// delivery boy
async function getdeliveryboy(index){
  setcurrentindex(index);
  const response= db.collection('DeliveryBoy');
      const data=await response.get();
      const arraydata=data.docs;
      console.log("Testing:",arraydata);
      settotalrows(arraydata.length);
      if(arraydata.length != deliveryboydata.length){
      arraydata.forEach(item=>{
        console.log(item.id);
        let tabledata=item.data();
        //  setrepairdata([...repairdata,item.data()]);
         setdeliveryboydata(state => [...state, {tabledata,"ID":item.id}]);
        
        
       })
      }
  }
  function searchdata(param){
    setsearchresult([]);
    // var matches= stringSimilarity.findBestMatch(search, tabledata);
    // console.log("Matches:",matches);
    if (param===""){
      setdisplaydata(tabledata);
      return
    }

    tabledata.forEach(item=>{
       
      if  (stringSimilarity.compareTwoStrings(search, item.tabledata.username)>=0.7 ||stringSimilarity.compareTwoStrings(search, item.tabledata.mobilename)>=0.7|| stringSimilarity.compareTwoStrings(search, item.tabledata.requestid.toString())>=0.8){
      //  setsearchresult(state => [...state, item]);
      searchresult.push(item);
       }
       
     })
     setdisplaydata(searchresult);
     console.log(displaydata);
  }
    return(  
        <>
        <div>
          
      {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
      <Modal isOpen={modaldetail} toggle={toggle} >
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
{/* ****************************DELIVERY BOY MODAL*************************************************/}
    <div>
      
      <Modal isOpen={modaldelievery} toggle={toggledelievery} >
        <ModalHeader toggle={toggledelievery}>Select Delivery Boy</ModalHeader>
        <ModalBody>
          <>
          <Table className="align-items-center table-flush" responsive>
      <thead className="thead-light">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Contact</th>
          <th>OrdersDelivered</th>
          <th></th>
        </tr> 
      </thead>
      <tbody>
        {deliveryboydata && deliveryboydata.map((data, index)=> {
          data=data;
          return( 
        <tr>
          <th scope="row">{data.tabledata.id}</th>
          <td>{data.tabledata.name}</td>
          <td>{data.tabledata.phone}</td>
          <td>{data.tabledata.orderdelivered}</td>
          <td><Button
                      color="primary"
                      href="#pablo"
                      onClick={()=>{
                        let temp = [...tabledata];    
                        temp[currentindex].tabledata.deliveryboy = data.ID;                  
                        settabledata(temp);
                        
                        db.collection("RepairRequest").doc(tabledata[currentindex].ID).update(
                          tabledata[currentindex].tabledata
                        )
                        .then(() => {
                          console.log("Document successfully updated!");
                          NotificationManager.success("DeliveryBoy Assigned");
                        }).catch((error) => {
                              console.error("Error writing document: ", error);
                              NotificationManager.Error("Error In Delivery Boy Assignment");
                          });
                        setModaldelievery(!modaldelievery);

                      }}
                      size="sm"
                    >
                      Assign
                    </Button></td>
        </tr>
        );
        })}
        </tbody>
    </Table>
        </>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggledelievery}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
    <Button
                      color="primary"
                      size="sm"
                      onClick={()=>{console.log("table data:",tabledata,"deliveryboydata:",deliveryboydata)}}
                    >State</Button>
        <Container className="mt--7" fluid>
        <div className="col">
          
            <Card className="shadow">
              <CardHeader className="border-0">
              <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Page visits</h3>
                  </div>
                  {/* ************************Search Bar************************** */}
                <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  
                  <Input
                    placeholder="Search...."
                    type="text"
                    onChange={(e)=>{setsearch(e.target.value);setsearchresult([]);}}
                  />
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    <button onClick={()=>{searchdata(search)}}><i className="ni ni-zoom-split-in" /></button>
                    <button onClick={()=>{searchdata("")}}><i className="ni ni-fat-remove" /></button>
                    
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
                  <div className="col text-right">
                  <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Export To Excel
                    </Button>
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Filter
                    </Button>
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => savedata()}
                      size="sm"
                    >
                      SAVE
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Request Number</th>
                    <th scope="col">UserName</th>
                    <th scope="col">Set Price</th>
                    <th scope="col">PhoneNumber</th>
                    <th scope="col">PaymentMode</th>
                    <th scope="col">Mobile Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Details</th>  
                    <th scope="col">Status</th>
                    <th scope="col">AssignDelieveryBoy</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {displaydata && displaydata.map((data, index)=> {
                    data=data.tabledata;
                    return(
                  <tr>
                    <td>
                      {data.requestid}
                          
                    </td>
                    <td>{data.username}</td>
                    <td>
                      {/* {data.setprice==="Not Decided"? 
                      <Button
                      color="primary"
                      size="sm"
                    >Set Price</Button>: data.setprice */}
                    <div className="width:100px">
                    <InputGroup>
                      <Input
                    placeholder={data.setprice}
                    className="width:100"
                    type="text"
                    onChange={
                      (e)=>{
                        let temp = [...tabledata];    
                        temp[index].tabledata.setprice = e.target.value;                  
                        settabledata(temp);
                      }
                    }
                  />
                  </InputGroup>
                  </div>

                    </td>
                    <td>
                      {data.phonenumber}
                    </td>
                    <td>
                      {data.paymentmode}
                    </td>
                    <td >
                      {data.mobilename}
                    </td>
                    <td>
                      {data.Date}
                    </td>
                    <td>
                    <Button
                      color="primary"
                      
                      onClick={toggle}
                      size="sm"
                    >Show Details</Button>
                    </td>
                    <td>
                    <UncontrolledDropdown>
                        <DropdownToggle
                          
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          {data.status}
                          {/* <i className="fas fa-ellipsis-v" /> */}
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={()=>{
                              let temp = [...tabledata];     // create the copy of state array
                              temp[index].tabledata.status = 'Pending';                  //new value
                              settabledata(temp);
                            }}
                          >
                            Pending
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={()=>{
                              let temp = [...tabledata];     // create the copy of state array
                              temp[index].tabledata.status = 'Accepted';                  //new value
                              settabledata(temp);
                            }}
                          >
                            Accepted
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={()=>{
                              let temp = [...tabledata];     // create the copy of state array
                              temp[index].tabledata.status = 'Cancelled';                  //new value
                              settabledata(temp);
                            }}
                          >
                            Cancelled
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                    <td>
                      {data.deliveryboy!="" ?
                      <><Badge color="" className="badge-dot mr-4">
                      <i className="bg-success" />
                      Assigned
                    </Badge></>:
                      <Button
                      color="primary"
                      
                      onClick={()=>{toggledelievery(); getdeliveryboy(index);}}
                      size="sm"
                    >Assign DeliveryBoy</Button>
                    }
                    
                    
                    </td>
                  </tr>
                  
                  )})}

                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
          </Container>
        </>
    );
}
export default ReqTable;