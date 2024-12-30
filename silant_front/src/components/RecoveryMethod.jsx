import React, { useState } from "react";
import axios from "axios";

function RecoveryMethod( {onChange} ) {
    const [response1, setResponse] = useState([]);
    const [requested, recoveryMethodReq] = useState(false);
    const [valueRM, setValueRM] = useState('');

    const LINK = 'http://127.0.0.1:8000/api/recovery_methods/';

    var recovery_method_name = [];

    async function ReqRecoveryMethod(){
        let response = await axios.get(LINK);
        return response.data.results;
    }
     
    if (requested === false) {
        ReqRecoveryMethod().then(data => {setResponse(data)});
        recoveryMethodReq(true);
    }

    for (let i=0; i < response1.length; i+=1) {
        let model = response1[i];
        recovery_method_name.push(model.name);
    }

    recovery_method_name.unshift(' ---------------- ');

    const options = recovery_method_name.map(
        (text, index) => {
            return <option key={index}>{text}</option>;
        }
    );

    const handleRecoveryMethodChange = (event) => {
        setValueRM(event.target.value);
        if('----------------' === event.target.value){
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
            <select value={valueRM} onChange={handleRecoveryMethodChange}>
                {options}
            </select>
        </>
    );
}

export default RecoveryMethod;