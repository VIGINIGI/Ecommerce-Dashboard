import React, { useState,useEffect } from "react";

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
    Popover,
    PopoverHeader,
    PopoverBody,
    Pagination,
    PaginationItem,
    PaginationLink,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Table,
    Container,
    Row,
    Spinner,
   
  } from "reactstrap";
  // import CustomModal from "views/Cards/modal";
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {db} from "../../Firebase";
import { NotificationManager} from 'react-notifications';

const DeliveryBoy = (props) => { 
  const [modaldetail, setModal] = useState(false);
  const toggle = () =>  setModal(!modaldetail);  
  
 const [popoverOpen, setPopoverOpen] = useState(false);
 const [popoveredit, setPopoveredit] = useState(false);
 const togglepopoveredit = () => setPopoveredit(!popoveredit);
 const togglepopover = () => setPopoverOpen(!popoverOpen);

 const [tabledata, settabledata]= useState([]);
 const [newdeliveryboy,setnewdeliveryboy]=useState({});

  const [currentindex,setcurrentindex]=useState(0);
 useEffect( () => {
   if( tabledata.length==0){
   props.data.forEach(item=>{
    //  setrepairdata([...repairdata,item.data()]);
     settabledata(state => [...state, item]);
   })
  }
     

 },[]);
 async function handleSubmit(e) {
  e.preventDefault()
  if(newdeliveryboy.phone.length!=10 || newdeliveryboy.password.length<4){
    NotificationManager.error("Error! \n Enter Correct Phone Number and Stronger Password ");
    return;
  }
  console.log(newdeliveryboy);
  newdeliveryboy.orderdelivered=0;
  newdeliveryboy.status="Active";
  newdeliveryboy.kycstatus="Not Decided";
  newdeliveryboy.name="NULL";
  newdeliveryboy.id=12;
    await db.collection("DeliveryBoy").doc().set(
    newdeliveryboy
    )
    .then(() => {
      NotificationManager.success ('Delievery Boy Created');
        console.log("Document successfully written!");
    })
    .catch((error) => {
      NotificationManager.error(error);
        console.error("Error writing document: ", error);
    });

  
}
async function savedata(){
  tabledata.map((data, index)=> {
   db.collection("DeliveryBoy").doc(data.ID).update(
    data.tabledata
  )
  .then(() => {
    console.log("Document successfully updated!");
    NotificationManager.success("Details Saved");
  }).catch((error) => {
        console.error("Error writing document: ", error);
        NotificationManager.error("Error ",error);
    });
  })
  }
function showdetail(index){
  setcurrentindex(index);
  setModal(!modaldetail);  

}
async function del(index){
  db.collection("DeliveryBoy").doc(tabledata[index].ID).delete().then(() => {
    NotificationManager.success("Deleted")
}).catch((error) => {
    NotificationManager.error(error)
});
}
async function edit(index){
  
 await db.collection("DeliveryBoy").doc(tabledata[index].ID).update(
    {
      "phone":newdeliveryboy.phone,
      "password":newdeliveryboy.password,
    }
  )
  .then(() => {
    console.log("Document successfully updated!");
    NotificationManager.success("Details Saved");
    setPopoveredit(!popoveredit)
  }).catch((error) => {
        console.error("Error writing document: ", error);
        NotificationManager.error("Error ",error);
    });
}

return tabledata.length!=0  ? (
        <>
        <div>
  {/* ********************Detail modal*********************************************************************** */}
      <Modal isOpen={modaldetail} toggle={toggle} >
        <ModalHeader toggle={toggle}>Detail</ModalHeader>
        <ModalBody>
         <>
         <div className="d-flex justify-content-center">General INFO</div>
          Name:{tabledata[currentindex].tabledata.name}
          <br></br>
          PhoneNo:{tabledata[currentindex].tabledata.phone}
          <br></br>
          City:Mumbai
          <br></br>
          Pincode:400091
          <br></br>
          <br></br>
          <div className="d-flex justify-content-center">KYC: {tabledata[currentindex].tabledata.status} </div>
          Name(As per Aadhar):
          <br></br>
          Aadhar Number:9082654321
          <br></br>
          Front-Image:<img src=""></img>
          <br></br>
          Back-Image:<img></img>
          <br></br>


         

          </>
        </ModalBody>
        <ModalFooter>
          
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>

    <div>
      {/* *************************To Add Delivery Boy***************************** */}
    <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={togglepopover}>
        <PopoverHeader>ADD Delivery Boy</PopoverHeader>
        <PopoverBody>
          
        <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-mobile-button" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Phone"
                    type="tel"
                    onChange={(e)=>{newdeliveryboy.phone=e.target.value}}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="text"
                    
                    onChange={(e)=>{newdeliveryboy.password=e.target.value}}

                  />
                </InputGroup>
              </FormGroup>
              
         
        <Button color="primary" size="sm" onClick={togglepopover}>Cancel</Button>
        <Button color="primary" size="sm" type="submit" onClick={togglepopover}>Add</Button>
        </Form>
        </PopoverBody>
      </Popover>
    </div>

        <Container className="mt--7" fluid>
        <div className="col">
          
            <Card className="shadow">
              <CardHeader className="border-0">
              <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Page visits</h3>
                  </div>
                  <div className="col text-right">
                  <Button
                      color="primary"
                      size="sm"
                      id="Popover1" 
                      type="button"
                    >
                      Add A Delivery Boy
                    </Button>
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
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">OrdersDelivered</th>
                    <th scope="col">KYC Status</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                    <th scope="col">View Details</th>
                    
                    
                  </tr>
                </thead>
                <tbody>
                {tabledata && tabledata.map((data, index)=> {
                    data=data.tabledata;
                    return(
                  <tr>
                    <td>
                      {data.id}
                          
                    </td>
                    <td>{data.name}</td>
                    
                    <td>
                      {data.phone}
                    </td>
                    <td>
                      {data.orderdelivered}
                    </td>
                    <td >
                    <UncontrolledDropdown>
                        <DropdownToggle
                          
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          {data.kycstatus}
                          {/* <i className="fas fa-ellipsis-v" /> */}
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e)=>{
                              e.preventDefault();
                              let temp = [...tabledata];     // create the copy of state array
                              temp[index].tabledata.kycstatus = 'Success';                  //new value
                              settabledata(temp);
                            }}
                          >
                            Success
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e)=>{
                              e.preventDefault();
                              let temp = [...tabledata];     // create the copy of state array
                              temp[index].tabledata.kycstatus = 'Rejected';                  //new value
                              settabledata(temp);
                            }}
                          >
                            Rejected
                          </DropdownItem>
                          
                        </DropdownMenu>
                      </UncontrolledDropdown>
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
                            onClick={(e)=>{
                              e.preventDefault();
                              let temp = [...tabledata];     // create the copy of state array
                              temp[index].tabledata.status = 'Active';                  //new value
                              settabledata(temp);
                            }}
                          >
                            Active
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e)=>{
                              e.preventDefault();
                              let temp = [...tabledata];     // create the copy of state array
                              temp[index].tabledata.status = 'Blocked';                  //new value
                              settabledata(temp);
                            }}
                          >
                            Blocked
                          </DropdownItem>
                          
                        </DropdownMenu>
                      </UncontrolledDropdown> 
                    </td>
                    <td>
                      {/* **************************************Delivery Boy********************* */}
                      <>
                      <Popover placement="bottom" isOpen={popoveredit} target="Popover2" toggle={togglepopoveredit}>
                      <PopoverHeader>Edit</PopoverHeader>
                      <PopoverBody>
                        
                      <Form role="form" >
                            <FormGroup className="mb-3">
                              <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-mobile-button" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  placeholder={data.phone}
                                  type="tel"
                                  pattern= "[0-9]{10}"
                                  onChange={(e)=>{newdeliveryboy.phone=e.target.value}}
                                />
                              </InputGroup>
                            </FormGroup>
                            <FormGroup>
                              <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-lock-circle-open" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  placeholder="Password"
                                  type="text"
                                  
                                  onChange={(e)=>{newdeliveryboy.password=e.target.value}}

                                />
                              </InputGroup>
                            </FormGroup>
                            
                      
                      <Button color="primary" size="sm" onClick={togglepopoveredit}>Cancel</Button>
                      <Button color="primary" size="sm"  onClick={()=>edit(index)}>Add</Button>
                      </Form>
                      </PopoverBody>
                    </Popover>
                      </>
                    <ul className="list-inline m-0">
                    
                    <li className="list-inline-item">
                      <button className="btn btn-success btn-sm rounded-0" type="button" id="Popover2"  data-toggle="tooltip" data-placement="top" title="Edit"><i className="fa fa-edit" /></button>
                    </li>
                    <li className="list-inline-item">
                      <button className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete" onClick={()=>del(index)}><i className="fa fa-trash" /></button>
                    </li>
                    </ul>
                    </td>
                    <td>
                    <Button
                      color="primary"
                      
                      onClick={()=>showdetail(index)}
                      size="sm"
                    >Show Details</Button>
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
export default DeliveryBoy;