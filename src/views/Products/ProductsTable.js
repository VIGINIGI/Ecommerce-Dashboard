import React,{ useState,useEffect } from "react"; 
import {db} from "../../Firebase";
import {storageRef} from "../../Firebase";
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
   
    Pagination,
    PaginationItem,
    PaginationLink,
    Spinner,
    Table,
    Container,
    Row,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Label,
   
  } from "reactstrap";
  // import CustomModal from "views/Cards/modal";
  import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import NotificationManager from "react-notifications/lib/NotificationManager";

const Products= (props) => { 
  const [modaldetail, setModal] = useState(false);
  const [modalproduct, setModalproduct] = useState(false);
  const [status,setstatus]=useState('Default');
 const toggle = () =>  setModal(!modaldetail);  
 const toggleproduct = () =>  setModalproduct(!modalproduct); 
 const [tabledata, settabledata]= useState([]);

 const [newproduct,setnewproduct]=useState({});
 const [category,setcategory]=useState([]);
 //for search 
 var stringSimilarity = require("string-similarity");
 const [search, setsearch]=useState("");
 const [searchresult, setsearchresult]=useState([]);
 const [displaydata,setdisplaydata]=useState([]);

 const [currentindex,setcurrentindex]=useState(0);
 newproduct.isfeatured=false;
 newproduct.isOnSale=false;
 newproduct.type="New";
 newproduct.category=[];
  

  useEffect( () => {
    if( tabledata.length==0){
      db.collection("ProductCat").get().then((value)=>{
        value.docs.forEach(item=>{
          let cat=item.data();
           setcategory(state => [...state, cat]);
          
          
         })
      }

      )
    console.log("Props:",props.data);
      
    props.data.forEach(item=>{
     //  setrepairdata([...repairdata,item.data()]);
      // settabledata(state => [...state, item]);
      tabledata.push(item);
     
     
    })
    setdisplaydata(tabledata);
   }

      
 
  },[]);
  async function handleSubmit() {
    console.log(newproduct.category);
    if(isNaN(newproduct.MRP) && isNaN(newproduct.DiscPrice) ){
      NotificationManager.error("Enter Correct Price");
      return;
    }
    if(newproduct.name==="" ){
      NotificationManager.error("Enter Product Name");
      return;
    }
    var patt=/.jpg|.png/i;
    if(!patt.test(setnewproduct.Image.name)){
      NotificationManager.error("Upload a Image");
      return;
    }
    await db.collection("IDs").doc("Product").get().then((value)=>{
        
      let id=value.data().nextid
      newproduct.ProductID=id;
      id=id+1;
      db.collection("IDs").doc("Product").update({
        "nextid":id
      }
      )
    })
    newproduct.status="Active";
    const fileRef = storageRef.child('Products/'+  '$'+newproduct.ProductID+"/" +setnewproduct.Image.name)
    fileRef.put(setnewproduct.Image).then((upload) => {
      storageRef.child('Products/'+  '$'+newproduct.ProductID+"/" +setnewproduct.Image.name).getDownloadURL().then((url)=>{
        newproduct.Image=url;
        db.collection("Product").doc(newproduct.ProductID+"_"+newproduct.name).set(
          newproduct
          )
          .then(() => {
            
             
            NotificationManager.success ('Product Created');
              console.log("Document successfully written!");
              setnewproduct({});
          })
          .catch((error) => {
            NotificationManager.error(error);
              console.error("Error writing document: ", error);
              setnewproduct({})
          });
      })
      console.log("Uploaded a file");

    }) 
      
  
    
  }
  async function savedata(){
    tabledata.map((data, index)=> {
     db.collection("Product").doc(data.ID).update(
      data.tabledata
    )
    .then(() => {
      console.log("Document successfully updated!");
      NotificationManager.success("Saved");
    }).catch((error) => {
          console.error("Error writing document: ", error);
          NotificationManager.error("Error");
      });
    })
    }
    function showdetail(index){
      setcurrentindex(index);
      setModal(!modaldetail);  
    
    }
    
     
      
    async function del(index){
      db.collection("Product").doc(tabledata[index].ID).delete().then(() => {
        NotificationManager.success("Deleted")
    }).catch((error) => {
        NotificationManager.error(error)
    });
    }
    function onFileChange (event) {
    
      // Update the state
      setnewproduct.Image= event.target.files[0] ;
      console.log(event.target.files);
      console.log(event.target.files[0]);       
        
           
    };
    // async function edit(index){
      
    //  await db.collection("DeliveryBoy").doc(tabledata[index].ID).update(
    //     {
    //       "phone":newproduct.phone,
    //       "password":newproduct.password,
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
    function searchdata(param){
      setsearchresult([]);
      // var matches= stringSimilarity.findBestMatch(search, tabledata);
      // console.log("Matches:",matches);
      if (param===""){
        setdisplaydata(tabledata);
        return
      }

      tabledata.forEach(item=>{
        console.log("Simililarity",stringSimilarity.compareTwoStrings(search, item.tabledata.name));
        console.log(item);
          item.tabledata.category.forEach(cat=>{
            if (stringSimilarity.compareTwoStrings(search, cat)>0.8){
              // setsearchresult(state => [...state, item]);
              searchresult.push(item);
              console.log("Similar cat",item);
              return;
            }
          })
      
        if  (stringSimilarity.compareTwoStrings(search, item.tabledata.name)>=0.7 || stringSimilarity.compareTwoStrings(search, item.tabledata.ProductID.toString())>=0.8){
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
      <Modal isOpen={modaldetail} toggle={toggle} >
        <ModalHeader toggle={toggle}>Detail</ModalHeader>
        <ModalBody>
        <>
          {tabledata[currentindex].tabledata.name}
          <br></br>
          {tabledata[currentindex].tabledata.category}
          </>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>

    <div>
      {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
      <Modal isOpen={modalproduct} toggle={toggleproduct} >
        <ModalHeader toggle={toggleproduct}>Add a Product</ModalHeader>
        <ModalBody>
           
        <Form role="form" onSubmit={handleSubmit}>
        <Input
                    placeholder="Product Name"
                    type="text"
                    onChange={(e)=>{newproduct.name=e.target.value}}
                  />
              <Input
                    placeholder="Product Description"
                    rows="2"
                    type="textarea"
                    onChange={(e)=>{newproduct.description=e.target.value}}
                  />
              {/* <Input
                    className="custom-control-input"
                    id="customCheck1"
                    type="checkbox"
                  /> */}
               
               {category && category.map((data, index)=> {
                 return(
                  
              <div className="custom-control custom-checkbox mb-3">
          <input
            className="custom-control-input"
            id={data.CatId}
            type="checkbox"
            value={data.CatName}
            onChange={(e)=>{if(e.target.checked){
              newproduct.category.push(e.target.value);
            }
            else{
              newproduct.category = newproduct.category.filter(item => item !== e.target.value);
            }
          }}
          />  
          <label className="custom-control-label" htmlFor={data.CatId}>
            {data.CatName}
          </label>  
          </div> 
         
          )})
}
          
        
          

              
              <FormGroup className="mb-3">
              <Label for="file">Upload Image</Label>
                  <Input type="file" id="file" onChange={(event)=>{onFileChange(event)}} />
               
                
              </FormGroup>
              <FormGroup>
        <Label for="type">Product Type</Label>
        <Input type="select"  id="type" onChange={(e)=>{newproduct.type=e.target.value}}>
          <option>New</option>
          <option>Refurbrished</option>
        </Input>
      </FormGroup>
      <div className="custom-control custom-checkbox mb-3">
          <input
            className="custom-control-input"
            id="isfeatured"
            type="checkbox"
            onChange={(e)=>{newproduct.isfeatured=e.target.checked;}}
          />  
          <label className="custom-control-label" htmlFor="isfeatured">
            Is Featured?
          </label>
          </div> 
          <div className="custom-control custom-checkbox mb-3">
          <input
            className="custom-control-input"
            id="isonsale"
            type="checkbox"
            onChange={(e)=>{newproduct.isOnSale=e.target.checked;}}
          />  
          <label className="custom-control-label" htmlFor="isonsale">
            Is On Sale?
          </label>
          </div> 
      <Input
                    placeholder="Product MRP"
                    type="text"
                    onChange={(e)=>{newproduct.MRP=e.target.value}}
                  /> 
      <Input
                    placeholder="Product Discounted Price"
                    type="text"
                    onChange={(e)=>{newproduct.DiscPrice=e.target.value}}
                  /> 
      <Input
                    placeholder="Product Dimension"
                    type="text"
                    onChange={(e)=>{newproduct.dimension=e.target.value}}
                  />
        <Input
                    placeholder="Product Manufacturer"
                    type="text"
                    onChange={(e)=>{newproduct.manufacturer=e.target.value}}
                  />

        <Input
                    placeholder="Model Number"
                    type="text"
                    onChange={(e)=>{newproduct.model=e.target.value}}
                  />
        <Input
                    placeholder="Operating System"
                    type="text"
                    onChange={(e)=>{newproduct.os=e.target.value}}
                  />
        <Input
                    placeholder="Cellular Technology"
                    type="text"
                    onChange={(e)=>{newproduct.CellularTechnology=e.target.value}}
                  />
        <Input
                    placeholder="RAM"
                    type="text"
                    onChange={(e)=>{newproduct.RAM=e.target.value}}
                  />
        <Input
                    placeholder="Storage"
                    type="text"
                    onChange={(e)=>{newproduct.storage=e.target.value}}
                  />
        <Input
                    placeholder="Battery Capacity"
                    type="text"
                    onChange={(e)=>{newproduct.battery=e.target.value}}
                  />
        <Input
                    placeholder="Screen Size"
                    type="text"
                    onChange={(e)=>{newproduct.screensize=e.target.value}}
                  />
        <Input
                    placeholder="Camera"
                    type="text"
                    onChange={(e)=>{newproduct.camera=e.target.value}}
                  />
        <Input
                    placeholder="What's In The Box"
                    rows="2"
                    type="textarea"
                    onChange={(e)=>{newproduct.box=e.target.value}}
                  />
        <Input
                    placeholder="Color"
                    type="text"
                    onChange={(e)=>{newproduct.color=e.target.value}}
                  />   
        <Input
                    placeholder="Sim Type"
                    type="text"
                    onChange={(e)=>{newproduct.sim=e.target.value}}
                  />                                   
        
        <Button color="primary"  onClick={()=>{handleSubmit()}}>Add</Button>
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleproduct}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>

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

                 
                  


                  
      
                  

                  <div className="col text-right ">
                  
                  <Button
                      color="primary"
                      size="sm"
                      onClick={()=>{toggleproduct()}} 
                      type="button"
                    >
                      
                      Add A Product
                    </Button>


                    {/*<Button 
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Export to Excel
                    </Button>*/}

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
              <Table className="align-items-center table-flush" id="excel" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Product Id</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Product Quantity</th>
                    <th scope="col">Product Category</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>

                
                
                {displaydata && displaydata.map((data, index)=> {

                    data=data.tabledata;
                    return(
                      
                  <tr>
                    <td>
                    {data.ProductID}
                    </td>
                    <td>
                    {data.name}
                    </td>
                    <td>
                    {data.quantity}
                    </td>
                    <td>
                      
                    
                    {data.category}
                    </td>
                    <td>
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
          <button className="btn btn-primary btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Info" onClick={()=>showdetail(index)}><i className="fa fa-info" /></button>
        </li>
        <li className="list-inline-item">
          <button className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i className="fa fa-edit" /></button>
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
    <span>No result</span>

    <Spinner color="success" />
    <Spinner color="success" />
    <Spinner color="success" />
    <Spinner color="success" />
    <Spinner color="success" />
    </div>
}
export default Products;