import { data } from "jquery";
import React, { useState,useEffect } from "react";
import{ DropdownButton,
Dropdown,ButtonGroup,} from 'react-bootstrap';
import {
   
    Button,
    Card,
    CardHeader,
    CardFooter,
    InputGroup,
    Input,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
   
    Pagination,
    PaginationItem,
    PaginationLink,
    FormGroup,
    Form,
    InputGroupAddon,
    InputGroupText,
    Table,
    Container,
    Row,
    Popover,
    PopoverHeader,
    PopoverBody,
    Spinner,
   
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
   }
    setdisplaydata(tabledata);  
 
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
    await db.collection("IDs").doc("Customer").get().then((value)=>{
        
      let id=value.data().nextid
      newcustomer.userid=id;
      id=id+1;
      db.collection("IDs").doc("Customer").update({
        "nextid":id
      }
      )
    })
      await db.collection("Customer").doc(newcustomer.userid+"_"+newcustomer.phonenumber).set(
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

    function showdetail(index){
      setcurrentindex(index);
      setModal(!modaldetail);  
    
    }
    async function del(index){
      db.collection("Customer").doc(tabledata[index].ID).delete().then(() => {
        NotificationManager.success("Deleted")
    }).catch((error) => {
        NotificationManager.error(error)
    });
    }
    async function edit(index){
      
     await db.collection("Customer").doc(tabledata[index].ID).update(
        {
          "phonenumber":newcustomer.phonenumber,
          "password":newcustomer.password,
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
    function searchdata(param){
      setsearchresult([]);
      // var matches= stringSimilarity.findBestMatch(search, tabledata);
      // console.log("Matches:",matches);
      if (param===""){
        setdisplaydata(tabledata);
        return
      }

      tabledata.forEach(item=>{      
        if  (stringSimilarity.compareTwoStrings(search, item.tabledata.username)>=0.7 || stringSimilarity.compareTwoStrings(search, item.tabledata.userid.toString())>=0.8){
        //  setsearchresult(state => [...state, item]);
        searchresult.push(item);
         }
         
       })
       setdisplaydata(searchresult);
       console.log(displaydata);
    }
    return tabledata.length!=0  ? (
        <>
        <div>
      {/* *********************************Detail Modal************************************ */}
      <Modal isOpen={modaldetail} toggle={toggle} >
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
        <>
          {tabledata[currentindex].tabledata.username}
          <br></br>
          {tabledata[currentindex].tabledata.phonenumber}
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
                {displaydata && displaydata.map((data, index)=> {
                    data=data.tabledata;
                    return(
                  <tr>
                    <td id="userid">
                    {data.userid}

                   
                
                          
                    </td>
                    <td id="username">{data.username}</td>
                    
                    <td id="phonenumber">
                    {data.phonenumber}
                    </td>
                    <td id="Date">
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
                      {/* **************************************Customer Edit********************* */}
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
                                  placeholder={data.phonenumber}
                                  type="tel"
                                  pattern= "[0-9]{10}"
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
                            
                      
                      <Button color="primary" size="sm" onClick={togglepopoveredit}>Cancel</Button>
                      <Button color="primary" size="sm"  onClick={()=>edit(index)}>Add</Button>
                      </Form>
                      </PopoverBody>
                    </Popover>
                      </>
                    <ul className="list-inline m-0">
        <li className="list-inline-item">
          <button className="btn btn-primary btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Info" onClick={()=>{toggle()}}><i className="fa fa-info" /></button>
        </li>
        <li className="list-inline-item">
          <button className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit" id="Popover2" ><i className="fa fa-edit" /></button>
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
export default Customer;