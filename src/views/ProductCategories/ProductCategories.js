import React, { useState,useEffect } from "react";



import{ DropdownButton,
Dropdown,ButtonGroup,} from 'react-bootstrap';
import {
   
    Button,
    Card,
    CardHeader,
    CardFooter,
    //DropdownButton,
    //Dropdown,
    
   
    Pagination,
    PaginationItem,
    PaginationLink,
    
    Table,
    Container,
    Row,
   
  } from "reactstrap";
  // import CustomModal from "views/Cards/modal";
  import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
  import {db} from "../../Firebase";


 
  
const ProductCategories = (props) => {
 
    

   
  
  const [modaldetail, setModal] = useState(false);
  const [modaldelievery, setModaldelievery] = useState(false);
  const [status,setstatus]=useState('Default');
 const toggle = () =>  setModal(!modaldetail);  
 const toggledelievery = () =>  setModaldelievery(!modaldelievery); 
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

export default ProductCategories;