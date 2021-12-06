import { data } from "jquery";
import React, { useState,useEffect } from "react";
import { NotificationManager } from "react-notifications";
import ReactToExcel from "react-html-table-to-excel";
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
 const [cards,setcards]=useState({})
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
 function saverequest(index){
  db.collection("RepairRequest").doc(tabledata[index].ID).update(
    tabledata[index].tabledata
  )
  .then(() => {
    console.log("Document successfully updated!");
  }).catch((error) => {
        console.error("Error writing document: ", error);
    });
  db.collection("users").doc(tabledata[index].tabledata.userId).collection("RepairRequests").doc(tabledata[index].ID).update(
    tabledata[index].tabledata
  

  ).then(() => {
    console.log("Document users updated !");
  }).catch((error) => {
        console.error("Error writing document: ", error);
    });
}
// delivery boy
async function getdeliveryboy(index){
  setcurrentindex(index);
  const response= db.collection('users');
      const data=await response.where('type', '==', "DeliveryBoy").get();
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
          <td>{data.tabledata["Full Name"]}</td>
          <td>{data.tabledata["Phone Number"]}</td>
          <td>{data.tabledata.orderdelivered}</td>
          <td><Button
                      color="primary"
                      href="#pablo"
                      onClick={()=>{
                        let temp = [...tabledata];    
                        let tempdeliveryboy=[...deliveryboydata]

                        temp[currentindex].tabledata.deliveryBoyId = data.ID;
                        temp[currentindex].tabledata.deliveryBoyName = data.tabledata["Full Name"];    
                        temp[currentindex].tabledata.deliveryBoyPhoneNumber = data.tabledata["Phone Number"];

                        tempdeliveryboy[index].tabledata.orderdelivered=tempdeliveryboy[index].tabledata.orderdelivered+1;
                        //add delivery cost
                        db.collection("IDs").doc("PerDeliveryCost").get().then((value)=>{
                          console.log("DeliveryCost:",value.data().DeliveryCost);
                          temp[currentindex].tabledata.DeliveryCost=value.data().DeliveryCost;
                          tempdeliveryboy[index].tabledata.TotalEarning=tempdeliveryboy[index].tabledata.TotalEarning+value.data().DeliveryCost;
                          
                        settabledata(temp);
                        setdeliveryboydata(tempdeliveryboy);
                        //updating repair request
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
                          saverequest(currentindex);
                          //save delivery boy data
                          db.collection("users").doc(deliveryboydata[index].ID).update(
                            {
                              "TotalEarning":tempdeliveryboy[index].tabledata.TotalEarning,
                              "orderdelivered":tempdeliveryboy[index].tabledata.orderdelivered,
                              
                            }
                          )
                          .then(() => {
                            console.log("DeliveryBoy successfully updated!");
                          }).catch((error) => {
                                console.error("Error writing document: ", error);
                            });
                          //save deliveryboy data collection
                          db.collection("users").doc(data.ID).collection("MyOrders").doc(tabledata[currentindex].ID).set(
                            tabledata[currentindex].tabledata
                          
                        
                          ).then(() => {
                            console.log("Document DeliveryBoy updated !");
                          }).catch((error) => {
                                console.error("Error writing document: ", error);
                            });
                        })    
                      
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
                  <ReactToExcel
                     className="btn"
                     table="excel"
                     filename="excel file"
                     sheet="sheet 1"
                     buttonText="Export to excel"
                    />
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
                    <th scope="col">Status</th>
                    <th scope="col">PhoneNumber</th>
                    <th scope="col">PaymentMode</th>
                    <th scope="col">Mobile Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Details</th>  
                    
                    <th scope="col">AssignDelieveryBoy</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {displaydata && displaydata.map((data, index)=> {
                    var id =data.ID;
                    data=data.tabledata;
                    return(
                  <tr>
                    <td>
                      {id}
                          
                    </td>
                    <td>{data.userName}</td>
                    <td>
                      {/* {data.setprice==="Not Decided"? 
                      <Button
                      color="primary"
                      size="sm"
                    >Set Price</Button>: data.setprice */}
                    <div className="width:100px">
                    <InputGroup>
                      <Input
                    placeholder={data.repairCost}
                    className="width:100"
                    type="text"
                    onChange={
                      (e)=>{
                        
                        let temp = [...tabledata];    
                        temp[index].tabledata.repairCost = e.target.value;                  
                        settabledata(temp);
                      }
                    }
                  />
                  </InputGroup>
                  {data.OrderStatus!=="Accepted"?
                  <ul className="list-inline m-0">
                  <li className="list-inline-item">
                    <button className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Accept" onClick={()=>{
                        let temp = [...tabledata];     // create the copy of state array
                        temp[index].tabledata.OrderStatus = 'Accepted';                  //new value
                        settabledata(temp); 
                        saverequest(index);
                    }}>Set <i className="fa fa-check" /></button>
                  </li>
                  </ul>
                  :
                  <></>
                }
                  </div>

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
                          {data.OrderStatus}
                          {/* <i className="fas fa-ellipsis-v" /> */}
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={()=>{
                              let temp = [...tabledata];     // create the copy of state array
                              temp[index].tabledata.OrderStatus = 'Pending';                  //new value
                              settabledata(temp);
                              saverequest(index);
                            }}
                          >
                            Pending
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={()=>{
                              let temp = [...tabledata];     // create the copy of state array
                              temp[index].tabledata.OrderStatus = 'Accepted';                  //new value
                              settabledata(temp);
                              saverequest(index);
                            }}
                          >
                            Accepted
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={()=>{
                              let temp = [...tabledata];     // create the copy of state array
                              temp[index].tabledata.OrderStatus = 'Cancelled';                  //new value
                              settabledata(temp);
                              saverequest(index);
                            }}
                          >
                            Cancelled
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                    <td>
                      {data.userPhoneNumber}
                    </td>
                    <td>
                      {data.paymentmode}
                    </td>
                    <td >
                      {data.phoneBrandName}
                    </td>
                    <td>
                      {data.OrderDate}
                    </td>
                    <td>
                    <Button
                      color="primary"
                      
                      onClick={toggle}
                      size="sm"
                    >Show Details</Button>
                    </td>
                    
                    <td>
                      {data.OrderStatus==="Accepted"?
                      data.deliveryBoyId!=undefined ?
                      <><Badge color="" className="badge-dot mr-4">
                      <i className="bg-success" />
                      {data.deliveryBoyId}
                    </Badge></>:
                      <Button
                      color="primary"
                      
                      onClick={()=>{toggledelievery(); getdeliveryboy(index);}}
                      size="sm"
                    >Assign DeliveryBoy</Button>
                    :
                    <>Pending Approval</>
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