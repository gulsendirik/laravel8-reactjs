import React from "react";

const SubHeaderComponent = (props) => {
    return(
        <div style={{display:'flex'}}>
            <button className={props.action.class} onClick={props.action.uri}>
                {props.action.title}
            </button>
            <input placeholder={"ara"} onChange={props.filter} style={{flex:1}} type="text" className="form-control ml-1" />
        </div>
    )
};

export default SubHeaderComponent;