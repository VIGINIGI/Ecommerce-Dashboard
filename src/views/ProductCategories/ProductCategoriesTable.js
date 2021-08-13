import React, { useState,useEffect } from "react";



import{ DropdownButton,
Dropdown,ButtonGroup,} from 'react-bootstrap';
import { NotificationManager} from 'react-notifications';

import {
   
    Button,
    Card,
    CardHeader,
    CardFooter,
    //DropdownButton,
    //Dropdown,
    Popover,
    PopoverHeader,
    PopoverBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Pagination,
    PaginationItem,
    PaginationLink,
    Spinner,
    Table,
    Container,
    Row,
   
  } from "reactstrap";
  import {db} from "../../Firebase";


 
  
const ProductCategories = (props) => {
 
  const [popoverOpen, setPopoverOpen] = useState(false);
  const togglepopover = () => setPopoverOpen(!popoverOpen);
  const [newcategory,setcategory]=useState({"CatName":""});
  const [popoveredit, setPopoveredit] = useState(false);
 const togglepopoveredit = () => setPopoveredit(!popoveredit);

 const [tabledata, settabledata]= useState([]);
  const [tdata,settdata] = useState();
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
    console.log(newcategory);
      await db.collection("IDs").doc("Category").get().then((value)=>{
        
        let id=value.data().nextid
        newcategory.CatId=id;
        console.log(id);
        id=id+1;
        db.collection("IDs").doc("Category").update({
          "nextid":id
        }
        )
      })

      
    
      await db.collection("ProductCat").doc(newcategory.CatId+"_"+newcategory.CatName).set(
      newcategory
      )
      .then(() => {
        NotificationManager.success ('Category Created');
          console.log("Document successfully written!");
          setcategory({"CatName":""});
      })
      .catch((error) => {
        NotificationManager.error(error);
          console.error("Error writing document: ", error);
          setcategory({"CatName":""});

      });
  
    
  }
  async function savedata(){
    tabledata.map((data, index)=> {
     db.collection("ProductCat").doc(data.ID).update(
      data.tabledata
    )
    .then(() => {
      console.log("Document successfully updated!");
    }).catch((error) => {
          console.error("Error writing document: ", error);
      });
    })
    }
    async function del(index){
      db.collection("ProductCat").doc(tabledata[index].ID).delete().then(() => {
        NotificationManager.success("Deleted")
    }).catch((error) => {
        NotificationManager.error(error)
    });
    }
    async function edit(index){
  
      await db.collection("ProductCat").doc(tabledata[index].ID).update(
         {
           "CatName":newcategory.CatName,
           
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
      {/* *************************To Add Category***************************** */}
    <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={togglepopover}>
        <PopoverHeader>ADD a New Category</PopoverHeader>
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
                    placeholder="Category"
                    type="text"
                    onChange={(e)=>{newcategory.CatName=e.target.value}}
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
                      Add Category
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
                    <th scope="col">Category Id</th>
                    <th scope="col">Category Name</th>
                    <th scope="col">No Of Products </th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                {tabledata && tabledata.map((data, index)=> {
                    data=data.tabledata;
                    return(
                  <tr>
                    <td>
                    {data.CatId}
                          
                    </td>
                    <td> {data.CatName}</td>
                    
                    <td>
                    {data.quantity}
                    {/* {async ()=>{return await db.collection("Product").where('category', '==', data.CatName).get().length}} */}
                    </td>
                    
                   
                    
                    <td>
                      {/* **************************************Category********************* */}
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
                                  placeholder={data.CatName}
                                  type="Text"
                                  onChange={(e)=>{newcategory.CatName=e.target.value}}
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
          <button className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit" id="Popover2"><i className="fa fa-edit" /></button>
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

export default ProductCategories;