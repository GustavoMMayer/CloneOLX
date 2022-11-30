import React from "react";
import { Route, redirect } from "react-router-dom";

import { isLogged } from "../helpers/AuthHandler";


const Routes =({children, ...rest})=>{
    let logged = isLogged();
    let authorized = (rest.private && !logged) ? false: true;
    return(
        <Route
        {...rest}
        render={()=>
            authorized ? children : <redirect to='/signin'/>
        }
        />

    );

}

export default Routes