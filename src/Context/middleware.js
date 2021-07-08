import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { useAuth } from "Context/AuthContext";
const Middleware = (props) => {
    const { currentUser } = useAuth()

    return (
        <div>
        <Switch>
        {currentUser ? (
            <Redirect from="*" to="/admin/index" />
         ) : (
           <Redirect from="*" to="/auth/login" />
          
         )}
         </Switch>
        </div>
    );

}
export default Middleware