import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { useAuth } from "Context/AuthContext";
const Middleware = (props) => {
    const { currentUser } = useAuth()
    const {staff}=useAuth()

    return (
        <div>
            {console.log("Middleware:",props.brandText)}
            {console.log("currentuser:",currentUser)}
            {console.log("Staff:",staff)}
            
            <Switch>
        {currentUser ? <></> : (
           
           <Redirect from="*" to="/auth/login" />
           
         )}
         </Switch>
        </div>
    );

}
export default Middleware