import React, { useState } from "react";
import axios from "axios";

function Organization( {onChange} ) {
    const [response1, setResponse] = useState([]);
    const [requested, technicReq] = useState(false);
    const [valueO, setValueO] = useState('');

    const LINK = 'http://127.0.0.1:8000/api/organizations/';

    let organization_name = [];

    async function ReqOrganization(){
        let response = await axios.get(LINK);
        return response.data.results;
    }

    if (requested === false) {
        ReqOrganization().then(data => {setResponse(data)});
        technicReq(true);
    }

    for (let i=0; i < response1.length; i+=1) {
        let organization = response1[i];
        organization_name.push(organization.name);
    }

    organization_name.unshift(' ------------------------------------------ ');

    const options = organization_name.map(
        (text, index) => {
            return <option key={index}>{text}</option>;
        }
    );

    const handleOrganizationChange = (event) => {
        setValueO(event.target.value);
        if ('------------------------------------------' === event.target.value) {
            onChange('');
        } else {
            for (let i=0; i < response1.length; i+=1) {
                let organization = response1[i];
                if (organization.name === event.target.value) {
                    onChange(organization.id);
                }
            }
        }
    };
    
    return(
        <>
            <select value={valueO} onChange={handleOrganizationChange}>
                {options}
            </select>
        </>
    );
}

export default Organization;