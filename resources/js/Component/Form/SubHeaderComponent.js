import React from "react";

const SubHeaderComponent = (props) => {
    return(
        <div>
            <button className={props.action.class} onClick={props.action.uri}>
                {props.action.title}
            </button>
            
        </div>
    )
};

export default SubHeaderComponent;