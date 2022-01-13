import React, { useState,useEffect } from "react";
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
import {storageRef} from "../../Firebase";
import { NotificationManager} from 'react-notifications';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const DeliveryBoy = (props) => { 
  const [modaldetail, setModal] = useState(false);
  const toggle = () =>  setModal(!modaldetail); 

  const [kycmodal, setkycmodal]=useState(false);
  const togglekyc=()=>setkycmodal(!kycmodal);
  const [startDate, setStartDate] = useState(new Date());
 const [popoverOpen, setPopoverOpen] = useState(false);
 const [popoveredit, setPopoveredit] = useState(false);
 const togglepopoveredit = () => setPopoveredit(!popoveredit);
 const togglepopover = () => setPopoverOpen(!popoverOpen);

 const [popovertransaction, setPopovertransaction] = useState(false);
 const togglepopovertransaction = () => setPopovertransaction(!popovertransaction);

 const [tabledata, settabledata]= useState([]);
 const [delcost,setdelcost]=useState();
 const [newdeliveryboy,setnewdeliveryboy]=useState({"Phone Number":"","Password":""});
 const [newtransaction,setnewtransaction]=useState({"amount":"","date":startDate});
 const [kycdetail,setkycdetail]=useState({"front":"","back":""});
  const [currentindex,setcurrentindex]=useState(0);
 useEffect( () => {
  db.collection("IDs").doc("PerDeliveryCost").get().then((value)=>{
        
    setdelcost(value.data());
    console.log("delost:",value.data());
  })
              
   if( tabledata.length==0){
   props.data.forEach(item=>{
    //  setrepairdata([...repairdata,item.data()]);
     settabledata(state => [...state, item]);
   })
  }
     

 },[]);
 async function handleSubmit(e) {
  e.preventDefault()
  if(newdeliveryboy["Phone Number"].length!=13 || newdeliveryboy.Password.length<4){
    NotificationManager.error("Error! \n Enter Correct Phone Number(add +91) or Stronger Password ");
    return;
  }
  console.log(newdeliveryboy);
  newdeliveryboy.orderdelivered=0;
  newdeliveryboy.status="Active";
  newdeliveryboy.kycstatus="false";
  newdeliveryboy["Full Name"]="NULL";
  newdeliveryboy.type="DeliveryBoy";
  newdeliveryboy.TotalEarning=0;
  var today = new Date(),
  date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
  newdeliveryboy["Registered On"]=date;
  await db.collection("IDs").doc("DeliveryBoy").get().then((value)=>{
        
    let id=value.data().nextid
    newdeliveryboy.id=id;
    id=id+1;
    db.collection("IDs").doc("DeliveryBoy").update({
      "nextid":id
    }
    )
  })
  
    // await db.collection("DeliveryBoy").doc(newdeliveryboy.id+"_"+newdeliveryboy.phone).set(
    // newdeliveryboy
    // )
    // .then(() => {
    //   NotificationManager.success ('Delievery Boy Created');
    //     console.log("Document successfully written!");
    //     setnewdeliveryboy({"phone":"","password":""});
    // })
    // .catch((error) => {
    //   NotificationManager.error(error);
    //     console.error("Error writing document: ", error);
    //     setnewdeliveryboy({"phone":"","password":""});

    // });
    await db.collection("users").doc(newdeliveryboy["Phone Number"]).set(
      newdeliveryboy
      )
      .then(() => {
        NotificationManager.success ('Delievery Boy Created');
          console.log("Document successfully written!");
          db.collection("users").doc(newdeliveryboy["Phone Number"]).collection.set()
          setnewdeliveryboy({"Phone Number":"","Password":""});
      })
      .catch((error) => {
        NotificationManager.error(error);
          console.error("Error writing document: ", error);
          setnewdeliveryboy({"Phone Number":"","Password":""});
  
      });

  
}
async function savedata(index){
  // tabledata.map((data, index)=> {
  //  db.collection("DeliveryBoy").doc(data.ID).update(
  //   data.tabledata
  // )
  // .then(() => {
  //   console.log("Document successfully updated!");
  //   NotificationManager.success("Details Saved");
  // }).catch((error) => {
  //       console.error("Error writing document: ", error);
  //       NotificationManager.error("Error ",error);
  //   });
  // })
  db.collection("users").doc(tabledata[index].ID).update(
    tabledata[index].tabledata
  )
  .then(() => {
    NotificationManager.success("Details Saved");
    console.log("Document successfully updated!");
  }).catch((error) => {
    NotificationManager.error(error);
        console.error("Error writing document: ", error);
    });
  }
function showdetail(index){
  setcurrentindex(index);
  setModal(!modaldetail);  

}
function addtransaction(index){
  db.collection("IDs").doc("Transaction").get().then((value)=>{
    let id=value.data().nextid
    newtransaction.id=id;
    newtransaction.senderId="Admin";
    newtransaction.receiverId=tabledata[index].ID;
    var today = new Date();
    newtransaction.timestamp= today.getFullYear()+'-'+(today.getMonth() + 1)+'-'+today.getDate()+" "+today.toTimeString() ;
    id=id+1;
    db.collection("IDs").doc("Transaction").update({
      "nextid":id
    })
    db.collection("users").doc(tabledata[index].ID).collection("MyTransaction").doc(newtransaction.id+"_T").set(
      newtransaction
    ).then(() => {
      let temp = [...tabledata]; 
      temp[index].tabledata.TotalEarning=temp[index].tabledata.TotalEarning-newtransaction.amount;
      db.collection("users").doc(tabledata[index].ID).update(
        {
          "TotalEarning":temp[index].tabledata.TotalEarning,
        }
      )
      .then(() => {
        NotificationManager.success("Transaction added successfully!");
        setnewtransaction({"amount":"","date":""});
        console.log("DeliveryBoy successfully updated!");
      }).catch((error) => {
            console.error("Error writing document: ", error);
        });
  })



      console.log("Document Transaction updated !");
      
    }).catch((error) => {
          setnewtransaction({"amount":"","date":""});
          console.error("Error writing document: ", error);
      });
  togglepopovertransaction();
}
async function del(index){
  db.collection("users").doc(tabledata[index].ID).delete().then(() => {
    NotificationManager.success("Deleted")
}).catch((error) => {
    NotificationManager.error(error)
});
}
async function edit(index){
  
 await db.collection("users").doc(tabledata[index].ID).update(
    {
      "phone":newdeliveryboy["Phone Number"],
      "password":newdeliveryboy.Password,
    }
  )
  .then(() => {
    console.log("Document successfully updated!");
    NotificationManager.success("Details Saved");
    setPopoveredit(!popoveredit)
    setnewdeliveryboy({});
  }).catch((error) => {
        console.error("Error writing document: ", error);
        NotificationManager.error("Error ",error);
        setnewdeliveryboy({});
    });
}
function kycfunction(index){
  setcurrentindex(index);
  storageRef.ref().child('users/kyc/aadhar/'+  tabledata[index].ID+"/" +"front").getDownloadURL().then((url)=>{
    kycdetail.front=url;
    console.log("Front url:",url);
    storageRef.ref().child('users/kyc/aadhar/'+  tabledata[index].ID+"/" +"back").getDownloadURL().then((url)=>{
      kycdetail.back=url;
      console.log("KYCdtail:",kycdetail);
      togglekyc();
      })
    })
    
      
  
}

return tabledata.length!=0 && delcost!=undefined ? (
        <>
        <div>
  {/* ********************Detail modal*********************************************************************** */}
      <Modal isOpen={modaldetail} toggle={toggle} >
        <ModalHeader toggle={toggle}>Detail</ModalHeader>
        <ModalBody>
         <>
         <div className="d-flex justify-content-center">General INFO</div>
         <Table className="align-items-center table-flush" responsive>
           <thead className="thead-light">
             <tr>
               <th>Feild </th>
               <th>Value</th>
             </tr> 
           </thead>
           <tbody>
         {Object.keys(tabledata[currentindex].tabledata).map((key, index) => {
           return(
           <tr>
               <td>{key}</td>
               <td>{tabledata[currentindex].tabledata[key]}</td>
            </tr>) 
         })}
         </tbody>
         </Table>
          
           </>
        </ModalBody>
        <ModalFooter>
          
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
    {/* **********************************KYC Modal************************************ */}
    <Modal isOpen={kycmodal} toggle={togglekyc} >
        <ModalHeader toggle={togglekyc}>KYC Details</ModalHeader>
        <ModalBody>
         <>
         <div className="d-flex justify-content-center">General INFO</div>
          Name:{tabledata[currentindex].tabledata["Full Name"]}
          <br></br>
          PhoneNo:{tabledata[currentindex].tabledata["Phone Number"]}
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
          Front-Image:<img src={kycdetail.front} alt="Front Image"></img>
          <br></br>
          Back-Image:<img src={kycdetail.back} alt="Back Image"></img>
          <br></br>
           </>
        </ModalBody>
        <ModalFooter>
        <Button color="success" onClick={(e)=>{
          let temp = [...tabledata];     // create the copy of state array
          temp[currentindex].tabledata.isKYC = 'True';                  //new value
          settabledata(temp);
          savedata(currentindex);
          togglekyc();
          NotificationManager.success ('KYC APPROVED');
          }}>Approve</Button>
          <Button color="danger" onClick={togglekyc}>Cancel</Button>
        </ModalFooter>
      </Modal>
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
                    onChange={(e)=>{newdeliveryboy["Phone Number"]=e.target.value}}
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
                    
                    onChange={(e)=>{newdeliveryboy.Password=e.target.value}}

                  />
                </InputGroup>
              </FormGroup>
              
         
        <Button color="primary" size="sm" onClick={togglepopover}>Cancel</Button>
        <Button color="primary" size="sm" type="submit" onClick={togglepopover}>Add</Button>
        </Form>
        </PopoverBody>
      </Popover>
    </div>
    {/* *********************************Transaction**********************/}
    <>
    <Popover placement="bottom" isOpen={popovertransaction} target="Popover3" toggle={togglepopovertransaction}>
        <PopoverHeader>ADD Transaction</PopoverHeader>
        <PopoverBody>
          
        <Form role="form">
        <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-mobile-button" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="tel"
                    value={tabledata[currentindex].tabledata["Full Name"]}
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
                    placeholder="Amount"
                    type="tel"
                    onChange={(e)=>{newtransaction.amount=e.target.value}}
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
                  <DatePicker dateFormat="yy-mm-dd" selected={startDate} onChange={(date) => {setStartDate(date);newtransaction.date=date;}} />
                </InputGroup>
              </FormGroup>
              
              
        <Button color="primary" size="sm" onClick={()=>{togglepopovertransaction();}}>Cancel</Button>
        <Button color="primary" size="sm"  onClick={()=>{addtransaction(currentindex)}}>Add</Button>
        </Form>
        </PopoverBody>
      </Popover>
    </>

        <Container className="mt--7" fluid>
        <div className="col">
          
            <Card className="shadow">
              <CardHeader className="border-0">
              <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">DeliveryBoy</h3>
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
                <Row className="align-items-center">
                <div className="col-3 align-items-right">
                <Form role="form" >
                            <FormGroup className="mb-3">
                              <InputGroup className="input-group-alternative">
                                
                                <Input
                                  placeholder={delcost.DeliveryCost===undefined?"Loading":delcost.DeliveryCost}
                                  type="tel"
                                  pattern= "[0-9]+"
                                  onChange={(e)=>{
                                    delcost.DeliveryCost=e.target.value;
                                  }}
                                  required
                                />
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                  <button  onClick={(e)=>{
                                    e.preventDefault();
                                    db.collection("IDs").doc("PerDeliveryCost").update(
                                      delcost
                                    ).then(()=>{
                                      NotificationManager.success("Updated")
                                    }).catch((error) => {
                                      NotificationManager.error("Error ",error);
                                  });
                                  }
                                  }>
                                    <i className="ni ni-check-bold" />
                                    </button>
                                  </InputGroupText>
                                </InputGroupAddon>
                              </InputGroup>
                            </FormGroup>
                            </Form>
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
                    <th scope="col">Add Transaction</th>
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
                    <td>{data["Full Name"]}</td>
                    
                    <td>
                      {data["Phone Number"]}
                    </td>
                    <td>
                      {data.orderdelivered}
                    </td>
                    <td >
                    {data.isKYC==="false"?    
                      <Button
                      color="primary"
                      
                      onClick={()=>{kycfunction(index); }}
                      size="sm"
                    >KYC</Button>
                    :
                    <><><Badge color="" className="badge-dot mr-4">
                    <i className="bg-success" />
                    KYC APPROVED
                  </Badge></></>
                    }
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
                                  placeholder={data["Phone Number"]}
                                  type="tel"
                                  pattern= "[0-9]{10}"
                                  onChange={(e)=>{newdeliveryboy["Phone Number"]=e.target.value}}
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
                                  
                                  onChange={(e)=>{newdeliveryboy.Password=e.target.value}}

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
                      id="Popover3"
                      onClick={()=>{setcurrentindex(index);togglepopovertransaction();}}
                      size="sm"
                    >Transaction</Button>
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