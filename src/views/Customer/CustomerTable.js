import { data } from "jquery";
import React, { useState,useEffect } from "react";
import{ DropdownButton,
Dropdown,ButtonGroup,} from 'react-bootstrap';
import {
   
    Button,
    Card,
    CardHeader,
    CardFooter,
    
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
   
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
    Popover,
    PopoverHeader,
    PopoverBody,
   
  } from "reactstrap";
  // import CustomModal from "views/Cards/modal";
  import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
  import {db} from "../../Firebase";
  import { NotificationManager} from 'react-notifications';

const Customer = (props) => { 
  const [popoverOpen, setPopoverOpen] = useState(false);
  const togglepopover = () => setPopoverOpen(!popoverOpen);
  const [popoveredit, setPopoveredit] = useState(false);
  const togglepopoveredit = () => setPopoveredit(!popoveredit);

  const [modaldetail, setModal] = useState(false);
  
  const [status,setstatus]=useState('Default');
 const toggle = () =>  setModal(!modaldetail);  

 const [tabledata, settabledata]= useState([]);
  const [tdata,settdata] = useState();
  const [newcustomer,setnewcustomer]=useState({});

  const [currentindex,setcurrentindex]=useState(0);

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
    if(newcustomer.phonenumber.length!=10 || newcustomer.password.length<4){
      NotificationManager.error("Error! \n Enter Correct Phone Number and Stronger Password ");
      return;
    }
    console.log(newcustomer);
    
    newcustomer.status="Active";
    newcustomer.Date="12/03/21";
    newcustomer.username="NULL";
    newcustomer.userid=12;
      await db.collection("Customer").doc().set(
      newcustomer
      )
      .then(() => {
        NotificationManager.success ('Customer Created');
          console.log("Document successfully written!");
      })
      .catch((error) => {
        NotificationManager.error(error);
          console.error("Error writing document: ", error);
      });
  
    
  }
  async function savedata(){
    tabledata.map((data, index)=> {
     db.collection("Customer").doc(data.ID).update(
      data.tabledata
    )
    .then(() => {
      NotificationManager.success("Details Saved")
      console.log("Document successfully updated!");
    }).catch((error) => {
      NotificationManager.error(error);
          console.error("Error writing document: ", error);
      });
    })
    }

    // function showdetail(index){
    //   setcurrentindex(index);
    //   setModal(!modaldetail);  
    
    // }
    async function del(index){
      db.collection("Customer").doc(tabledata[index].ID).delete().then(() => {
        NotificationManager.success("Deleted")
    }).catch((error) => {
        NotificationManager.error(error)
    });
    }
    // async function edit(index){
      
    //  await db.collection("DeliveryBoy").doc(tabledata[index].ID).update(
    //     {
    //       "phone":newdeliveryboy.phone,
    //       "password":newdeliveryboy.password,
    //     }
    //   )
    //   .then(() => {
    //     console.log("Document successfully updated!");
    //     NotificationManager.success("Details Saved");
    //     setPopoveredit(!popoveredit)
    //   }).catch((error) => {
    //         console.error("Error writing document: ", error);
    //         NotificationManager.error("Error ",error);
    //     });
    // }
    return(  
        <>
        <div>
      {/* *********************************Detail Modal************************************ */}
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
     {/* *************************To Add Delivery Boy***************************** */}
    <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={togglepopover}>
        <PopoverHeader>ADD Customer</PopoverHeader>
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
                    onChange={(e)=>{newcustomer.phonenumber=e.target.value}}
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
                    
                    onChange={(e)=>{newcustomer.password=e.target.value}}

                  />
                </InputGroup>
              </FormGroup>
              
         
        <Button color="primary" size="sm" onClick={togglepopover}>Cancel</Button>
        <Button color="primary" size="sm" type="submit" onClick={togglepopover}>Add</Button>
        </Form>
        </PopoverBody>
      </Popover>
   </div>

   
    <Button
                      color="primary"
                      size="sm"
                      onClick={()=>{console.log(tabledata)}}
                    >State</Button>

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
                      Add A Customer
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
                    <th scope="col">User Id</th>
                    <th scope="col">UserName</th>
                    <th scope="col">User PhoneNo</th>
                    <th scope="col">Date Of Registered</th>
                    <th scope="col">Status </th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                {tabledata && tabledata.map((data, index)=> {
                    data=data.tabledata;
                    return(
                  <tr>
                    <td>
                    {data.userid}
                          
                    </td>
                    <td>{data.username}</td>
                    
                    <td>
                    {data.phonenumber}
                    </td>
                    <td>
                    {data.Date}
                    </td>
                    <td >
                    <div>
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
                              temp[index].tabledata.status = 'Inactive';                  //new value
                              settabledata(temp);
                            }}
                          >
                            Inactive
                          </DropdownItem>
                          
                        </DropdownMenu>
                      </UncontrolledDropdown>
  </div>
                    </td>
                    <td>
                    <ul className="list-inline m-0">
        <li className="list-inline-item">
          <button className="btn btn-primary btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Info"><i className="fa fa-info" /></button>
        </li>
        <li className="list-inline-item">
          <button className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i className="fa fa-edit" /></button>
        </li>
        <li className="list-inline-item">
          <button className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete" onClick={()=>{del(index)}}><i className="fa fa-trash" /></button>
        </li>
      </ul>
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
export default Customer;