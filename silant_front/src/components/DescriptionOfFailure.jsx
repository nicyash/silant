import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function DescriptionOfFailure(props) {
    const [response1, setResponse] = React.useState([]);
    let [requested, descriptionOfFailureReq] = React.useState(false);

    const LINK = props.description_failure;

    var description_of_failure = [];

    async function ReqDescriptionOfFailure(){
        let response = await axios.get(LINK);
        return response.data;
    };
     
    description_of_failure = response1;

    if(requested === false){
        ReqDescriptionOfFailure().then(data => {setResponse(data)});
        descriptionOfFailureReq(true);
    }

    return(
        <>
            {description_of_failure.name}
        </>
    );
}

export default DescriptionOfFailure;