import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const ProtectedRoute = (props) => {
    
  return (
    <Route>
      {() =>
        props.loggedIn ? <props.component {...props} /> : <Redirect to="./sign-in" />
      }
    </Route>
  );
};

export default withRouter(ProtectedRoute);
