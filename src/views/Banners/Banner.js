import {db} from "../../Firebase";
import {storageRef} from "../../Firebase";
import NotificationManager from "react-notifications/lib/NotificationManager";
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
  const Banner= (props) => { 
    const [modaldetail, setModal] = useState(false);
    const toggleview = () =>  setModal(!modaldetail); 

    const [display, setdisplay] = useState(false);
    const toggledisplay = () =>  setdisplay(!display);
  
    const [banner, setbanner]=useState(false);
    const togglecreate=()=>setbanner(!banner);
    const [currentindex,setcurrentindex]=useState(0);
    const [newbanner, setnewbanner]=useState({"type":"User"})
    const [tabledata, settabledata]= useState([]);
 
    useEffect( () => {
        
         if( tabledata.length==0){
         props.data.forEach(item=>{
          //  setrepairdata([...repairdata,item.data()]);
           settabledata(state => [...state, item]);
         })
        }
           
      
       },[]);
    function onFileChange (event) {

    // Update the state
    newbanner.Image= event.target.files[0] ;
    console.log(event.target.files);
    console.log(event.target.files[0]);       
        
            
    };
    function viewbanner(index){
      setcurrentindex(index);
      toggledisplay();
    }
    function createbanner(){

        if(!(newbanner.type==="User"||newbanner.type==="DeliveryBoy")){
            NotificationManager.error("Enter Correct Type");
            console.log(newbanner.type);
            setnewbanner({"type":"User"});
            return;
          } 
          var patt=/.jpg|.png/i;
        if(newbanner.Image===undefined){
        NotificationManager.error("Upload a Image");
        return;
        }
        if(!patt.test(newbanner.Image.name)){
        NotificationManager.error("Upload a Image");
        setnewbanner({"type":"User"});
        return;
        }
        db.collection("IDs").doc("Banner").get().then((value)=>{
    
        let id=value.data().nextid
        newbanner.id=id;
        id=id+1;
        db.collection("IDs").doc("Banner").update({
            "nextid":id
        }
        )

        const fileRef = storageRef.ref().child('Banners/'+newbanner.type+ '/'+ '$'+newbanner.id+newbanner.Image.name)
    fileRef.put(newbanner.Image).then((upload) => {
      storageRef.ref().child('Banners/'+newbanner.type+ '/'+ '$'+newbanner.id+newbanner.Image.name).getDownloadURL().then((url)=>{
        newbanner.url=url;
        
            
            //save the values
            db.collection("Banners").doc(newbanner.id+"_"+newbanner.Image.name).set({
              "url":newbanner.url,
              "type":newbanner.type
            })
              .then(() => {
              
             
                NotificationManager.success ('Banner Stored');
                  console.log("Document successfully written!");
                  setnewbanner({"type":"User"});
              })
              .catch((error) => {
                NotificationManager.error(error);
                  console.error("Error writing document: ", error);
                  setnewbanner({"type":"User"})
              });
          
        });

    }) 
        })
        
    }
    function del(index){
      let pictureRef = storageRef.refFromURL(tabledata[index].tabledata.url);
    pictureRef.delete()
      .then(() => {
        db.collection("Banners").doc(tabledata[index].ID).delete().then(() => {
          NotificationManager.success("Deleted")
      }).catch((error) => {
          NotificationManager.error(error)
      });
        
      })
      .catch((err) => {
        NotificationManager.error("err")
      });
      
    }
    return tabledata.length!=0 ? (
        <>
        <div>
          {/* ***************************To Add a Banner *************************8 */}
        <Modal isOpen={banner} toggle={togglecreate} >
        <ModalHeader toggle={togglecreate}>Detail</ModalHeader>
        <ModalBody>
         <>
         <FormGroup className="mb-3">
              <Label for="file">Upload Image</Label>
                  <Input type="file" id="file" onChange={(event)=>{onFileChange(event)}} />
               
                
              </FormGroup>
              <FormGroup>
        <Label for="type">Product Type</Label>
        <Input type="select"  onChange={(e)=>{newbanner.type=e.target.value}}>
          <option value="User">User</option>
          <option value="DeliveryBoy">DeliveryBoy</option>
        </Input>
      </FormGroup>
           </>
        </ModalBody>
        <ModalFooter>
        <Button color="success" onClick={()=>{createbanner();togglecreate();}}>add</Button>
          <Button color="secondary" onClick={togglecreate}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
    <div>
    <Modal isOpen={display} toggle={toggledisplay} >
        <ModalHeader toggle={toggledisplay}>Detail</ModalHeader>
        <ModalBody>
         <>
         <img src={tabledata[currentindex].tabledata.url} class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt="">
         </img>
         </>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggledisplay}>Cancel</Button>
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
                  <div className="col text-right">

                  <Button
                      color="primary"
                      size="sm"
                      onClick={togglecreate}
                      type="button"
                    >
                      Add A Banner
                    </Button>
                  
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Filter
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    
                    <th scope="col">Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">Type</th>   
                    <th scope="col">Delete</th>   
           
                    
                  </tr>
                </thead>
                <tbody>
                {tabledata && tabledata.map((data, index)=> {
                    let id=data.ID;
                    data=data.tabledata;
                    return(
                  
                  <tr>
                    <td>
                      {id}
                  </td>
                  <td>
                  <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => {viewbanner(index);}}
                      size="sm"
                    >
                      View Banner
                    </Button>
                  {/* <img src={data.url} alt="Image"></img> */}
                  </td>
                  <td>
                      {data.type}
                  </td>
                  <td>
                  <ul className="list-inline m-0">
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
export default Banner;