 import React from 'react';
 import ReactDOM from 'react-dom';

 // Higher Order Component (HOC) - A component that renders other components
// goal: reuse code
// render hijacking
// prop manipulation
// abstract state 

 const Info = (props) => (
     <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
     </div>
 );

 const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.isAdmin && <p>This is private info. Please do not share </p> }
            <WrappedComponent {...props}/>
        </div>
    );
 };

 const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.isAuthenticated ? <WrappedComponent {...props} /> : <p>Please login to see this info</p> }
        </div>
    );
 };

 const AdminInfo = withAdminWarning(Info);
 const AuthInfo = requireAuthentication(Info);







 



//  ReactDOM.render(<AdminInfo isAdmin={true} info="These are the details"></AdminInfo>, document.getElementById('app'));
 ReactDOM.render(<AuthInfo isAuthenticated={true} info="These are the details"></AuthInfo>, document.getElementById('app'));