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

const Roles = (props) => { 
  const [modaldetail, setModal] = useState(false);
  const toggle = () =>  setModal(!modaldetail);  
  
 const [popoverOpen, setPopoverOpen] = useState(false);
 const [popoveredit, setPopoveredit] = useState(false);
 const togglepopoveredit = () => setPopoveredit(!popoveredit);
 const togglepopover = () => setPopoverOpen(!popoverOpen);

 const [tabledata, settabledata]= useState([]);
 const [newstaff,setnewstaff]=useState({"staffname":"","phonenumber":"","password":""});

  const [currentindex,setcurrentindex]=useState(0);
 useEffect( () => {
   if( tabledata.length==0){
   props.data.forEach(item=>{
    //  setrepairdata([...repairdata,item.data()]);
    console.log("Props:",props.data);
     settabledata(state => [...state, item]);
   })
   
  }
     

 },[]);
 
 async function handleSubmit(e) {
  e.preventDefault()
  if(newstaff.phonenumber.length!=10 || newstaff.password.length<4){
    NotificationManager.error("Error! \n Enter Correct Phone Number and Stronger Password ");
    return;
  }
  
  
  await db.collection("IDs").doc("Staff").get().then((value)=>{
        
    let id=value.data().nextid
    newstaff.staffid=id;
    id=id+1;
    db.collection("IDs").doc("Staff").update({
      "nextid":id
    }
    )
  })
  console.log(newstaff);
    await db.collection("Roles").doc(newstaff.staffid+"_"+newstaff.staffname).set(
    newstaff
    )
    .then(() => {
      NotificationManager.success ('Staff Created');
      setnewstaff({"staffname":"","phonenumber":"","password":""});
        console.log("Document successfully written!");
    })
    .catch((error) => {
      NotificationManager.error(error);
      setnewstaff({"staffname":"","phonenumber":"","password":""});

        console.error("Error writing document: ", error);
    });

  
}
async function savedata(){
  tabledata.map((data, index)=> {
   db.collection("Roles").doc(data.ID).update(
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
  db.collection("Roles").doc(tabledata[index].ID).delete().then(() => {
    NotificationManager.success("Deleted")
}).catch((error) => {
    NotificationManager.error(error)
});
}
async function edit(index){
  
 await db.collection("Roles").doc(tabledata[index].ID).update(
    { "staffname":newstaff.staffname,
      "phone":newstaff.phonenumber,
      "password":newstaff.password,
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
        
  {/* ********************Detail modal*********************************************************************** */}

     
      {/* *************************To Add Delivery Boy***************************** */}
      <Modal isOpen={modaldetail} toggle={toggle} >
        <ModalHeader toggle={toggle}>Add Staff</ModalHeader>
        <ModalBody>
         <>
         <Form role="form" onSubmit={handleSubmit}>
         <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-mobile-button" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Name"
                    type="text"
                    onChange={(e)=>{newstaff.staffname=e.target.value}}
                  />
                </InputGroup>
              </FormGroup>
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
                    onChange={(e)=>{newstaff.phonenumber=e.target.value}}
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
                    
                    onChange={(e)=>{newstaff.password=e.target.value}}

                  />
                </InputGroup>
              </FormGroup>
              <Button color="primary" size="sm" onClick={toggle}>Cancel</Button>
        <Button color="primary" size="sm" type="submit" onClick={toggle}>Add</Button>
        </Form>
         </>
        </ModalBody>
      </Modal>

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
                      href="#pablo"
                      onClick={(e) => toggle()}
                      size="sm"
                    >
                      Add A Staff
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
                    <th scope="col"> Staff ID</th>
                    <th scope="col">Staff Name</th>
                    <th scope="col">Permission Given</th>
                    <th scope="col">Staff Phone</th>
                    <th scope="col">Staff Password</th>
                    <th scope="col">Action</th>
                    
                    
                  </tr>
                </thead>
                <tbody>
                {tabledata && tabledata.map((data, index)=> {
                    data=data.tabledata;
                    return(
                  <tr>
                    <td>
                      {data.staffid}
                          
                    </td>
                    <td>{data.staffname}</td>
                    
                    <td>
                      {data.permission}
                    </td>
                    <td>
                      {data.phonenumber}
                    </td>
                    <td >
                    {data.password}
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
                                  placeholder={data.staffname}
                                  type="text"
                                  
                                  onChange={(e)=>{newstaff.staffname=e.target.value}}
                                />
                              </InputGroup>
                            </FormGroup>
                            <FormGroup className="mb-3">
                              <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-mobile-button" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  placeholder={data.phonenumber}
                                  type="tel"
                                  pattern= "[0-9]{10}"
                                  onChange={(e)=>{newstaff.phonenumber=e.target.value}}
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
                                  
                                  onChange={(e)=>{newstaff.password=e.target.value}}

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
export default Roles;