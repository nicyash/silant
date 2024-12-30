import React, { useState } from "react";
import axios from "axios";

function Clients ( props ) {
    const [response1, setResponse] = useState([]);
    const [requested, clientReq] = useState(false);

    const LINK1 = 'http://127.0.0.1:8000/api/clients/';

    let client = [];

    async function ReqClient(){
        let response = await axios.get(LINK1);
        return response.data.results;
    }

    if (requested === false) {
        ReqClient().then(data => {setResponse(data)});
        clientReq(true);
    }

    for(let i=0; i < response1.length; i+=1){
        let model = response1[i];
        if (props.firstName === model.name) {
            client = model;
        }
    }

    return(
        <>
           
        </>
    );
}

export default Clients;