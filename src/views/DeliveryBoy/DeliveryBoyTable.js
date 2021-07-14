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
   
  } from "reactstrap";
  // import CustomModal from "views/Cards/modal";
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {db} from "../../Firebase";
import { NotificationManager} from 'react-notifications';

const DeliveryBoy = (props) => { 
  const [modaldetail, setModal] = useState(false);
  const [modaldelievery, setModaldelievery] = useState(false);
 const toggle = () =>  setModal(!modaldetail);  
 const toggledelievery = () =>  setModaldelievery(!modaldelievery); 
 const [popoverOpen, setPopoverOpen] = useState(false);
 const togglepopover = () => setPopoverOpen(!popoverOpen);
 const [tabledata, settabledata]= useState([]);
  const [newdeliveryboy,setnewdeliveryboy]=useState({});
 useEffect( () => {
   if( tabledata.length==0){
   console.log("Props:",props.data);
   props.data.forEach(item=>{
    //  setrepairdata([...repairdata,item.data()]);
     settabledata(state => [...state, item]);
   })
  }
     

 },[]);
 async function handleSubmit(e) {
  e.preventDefault()
  NotificationManager.success ('Delievery Boy Created');
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
        console.log("Document successfully written!");
    })
    .catch((error) => {
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
  }).catch((error) => {
        console.error("Error writing document: ", error);
    });
  })
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

    <div>
      {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
      <Modal isOpen={modaldelievery} toggle={toggledelievery} >
        <ModalHeader toggle={toggledelievery}>Modal title</ModalHeader>
        <ModalBody>
          hi
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggledelievery}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggledelievery}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
    <div>
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
                    pattern="[0-9]{10}" required
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
                        Success/reject
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
                              temp[index].tabledata.status = 'Active';                  //new value
                              settabledata(temp);
                            }}
                          >
                            Active
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={()=>{
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
                    <ul className="list-inline m-0">
                    
                    <li className="list-inline-item">
                      <button className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i className="fa fa-edit" /></button>
                    </li>
                    <li className="list-inline-item">
                      <button className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash" /></button>
                    </li>
                    </ul>
                    </td>
                    <td>
                    <Button
                      color="primary"
                      
                      onClick={toggle}
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
    );
}
export default DeliveryBoy;