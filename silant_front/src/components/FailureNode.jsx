import React, { useState } from "react";
import axios from "axios";

function FailureNode( {onChange} ){
    const [response1, setResponse] = useState([]);
    const [requested, failureNodeReq] = useState(false);
    const [valueFN, setValueFN] = useState('');

    const LINK = 'http://127.0.0.1:8000/api/failure_nodes/';

    let failure_node_name = [];

    async function ReqFailureNode(){
        let response = await axios.get(LINK);
        return response.data.results;
    }
     
    if (requested === false){
        ReqFailureNode().then(data => {setResponse(data)});
        failureNodeReq(true);
    }

    for (let i=0; i < response1.length; i+=1) {
        let model = response1[i];
        failure_node_name.push(model.name);
    }

    failure_node_name.unshift(' ------------------------------- ');

    const options = failure_node_name.map(
        (text, index) => {
            return <option key={index}>{text}</option>;
        }
    );

    const handleFailureNodeChange = (event) => {
        setValueFN(event.target.value);
        if('-------------------------------' === event.target.value){
            onChange('');
        }else{
            for(let i=0; i < response1.length; i+=1){
                let model = response1[i];
                if(model.name === event.target.value){
                    onChange(model.id);
                };
            };
        };
    };

    return(
        <>
            <select value={valueFN} onChange={handleFailureNodeChange}>
                {options}
            </select>
        </>
    );
}

export default FailureNode;
