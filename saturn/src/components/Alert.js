import React from 'react'

function Alert(props) {
    return (
       <>
        {props.alert && <div >
          <div class= {`alert alert-${props.alert.type} alert-dismissible fade show `} role="alert">
               {props.alert.msg}
            </div>
        </div>}
        </>
           )
}

export default Alert
