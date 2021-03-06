import React, {useState,useEffect} from "react";
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
    Spinner,
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
  import ReactToExcel from "react-html-table-to-excel";
const Orders = (props) => { 
  const [modaldetail, setModal] = useState(false);
  const [modaldelievery, setModaldelievery] = useState(false);
  const [status,setstatus]=useState('Default');
 const toggle = () =>  setModal(!modaldetail);  
 const toggledelievery = () =>  setModaldelievery(!modaldelievery); 
 const [tabledata, settabledata]= useState([]);
  const [deliveryboydata,setdeliveryboydata]=useState([]);
  const [totalrows,settotalrows]=useState(0);
  const [currentindex,setcurrentindex]=useState(0);
  // for sorting
  const sorttype=["None","Start","End"];
  var sortnum=0;
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


    function saveorder(index){
      db.collection("Orders").doc(tabledata[index].ID).update(
        tabledata[index].tabledata
      )
      .then(() => {
        console.log("Document successfully updated!");
      }).catch((error) => {
            console.error("Error writing document: ", error);
        });
      
    }
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
          if  (stringSimilarity.compareTwoStrings(search, item.tabledata.ProductName)>=0.7 || stringSimilarity.compareTwoStrings(search, item.tabledata.OrderID.toString())>=0.8){
          //  setsearchresult(state => [...state, item]);
          searchresult.push(item);
           }
           
         })
         setdisplaydata(searchresult);
      }
      function sort(attr){
          console.log(attr);
        //   function isgreater(date1,date2){

        //   }
        //   function sortdata(data){
        //     var i, j;
        //     for (i = 0; i < data.length-1; i++)
        //     {
        //         for (j = 0; j < data.length-i-1; j++)
        //         {
        //             if (arr[j] > arr[j+1])
        //             {
        //               var temp = data[j];
        //               data[j] = data[j+1];
        //               data[j+1] = temp;
        //             }
        //         }
        //     }
        //     return data;
        //   }
        //   setdisplaydata(prevState => {
        //     let prevarray = [...prevState];
        //     let data= sortdata(prevarray)
        //     return  data ;
        // })
          
      }


    return tabledata.length!=0  ? (  
        <>
        <div>
      {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
      <Modal isOpen={modaldetail} toggle={toggle} >
        <ModalHeader toggle={toggle}>BILL</ModalHeader>
        <ModalBody>
        <>
         
          Order No:{tabledata[currentindex].tabledata.OrderID}
          <br></br>
          Customer Address:
          <br></br>
          Customer Name:
          <br></br>
          Customer Id:
          <br></br>
          Phone No:{tabledata[currentindex].tabledata.phonenumber}
          <br></br>
          Pincode:400060
          <br></br>
          City:Mumbai
          <br></br>
          PaymentMode:{tabledata[currentindex].tabledata.paymentmode}
          <br></br>
          Product Name:{tabledata[currentindex].tabledata.ProductName}
          <br></br>
          Product Price:
          <br></br>
          Quantity:{tabledata[currentindex].tabledata.quantity}
          <br></br>

           </>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>

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
                        
                        db.collection("Orders").doc(tabledata[currentindex].ID).update(
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

        <Container className="mt--7" fluid>
        <div className="col">
          
            <Card className="shadow">
              <CardHeader className="border-0">
              <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Orders</h3>
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
                      onClick={(e) => {e.preventDefault();sort(sorttype[(++sortnum)%3]);}}
                      size="sm"
                    >
                      Sort
                    </Button>
                    
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">PhoneNumber</th>
                    <th scope="col">PaymentMode</th>
                    <th scope="col">Date</th>
                    <th scope="col">View Bill</th>
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
                      {data.OrderID}
                          
                    </td>
                    <td>{data.ProductName}</td>
                    <td>
                     {data.quantity}
                    </td>
                    <td>
                      {data.phonenumber}
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
                          {data.paymentmode}
                          {/* <i className="fas fa-ellipsis-v" /> */}
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={()=>{
                              let temp = [...tabledata];     // create the copy of state array
                              temp[index].tabledata.paymentmode = 'Online';                  //new value
                              settabledata(temp);
                              saveorder(index);
                            }}
                          >
                            Online
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={()=>{
                              let temp = [...tabledata];     // create the copy of state array
                              temp[index].tabledata.paymentmode = 'COD';                  //new value
                              settabledata(temp);
                              saveorder(index);
                            }}
                          >
                            COD
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                
                    <td>
                      {data.Date}
                    </td>
                    <td>
                    <Button
                      color="primary"
                      
                      onClick={toggle}
                      size="sm"
                    >Bill</Button>
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
                              saveorder(index);
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
                              saveorder(index);
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
                              saveorder(index);
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
export default Orders;