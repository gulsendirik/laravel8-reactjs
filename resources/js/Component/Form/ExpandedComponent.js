import React from "react";


export default ({ data, field}) => <div dangerouslySetInnerHTML>{{ __html: data[field]}}</div>