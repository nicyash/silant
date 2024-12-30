import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import BridgeModel from "./BridgeModel";

function GuideComplaints() {
    const params = useParams();
    const [response, setResponse] = useState([]);
    const [requested, complaintReq] = useState(false);
  
    const LINK = `http://127.0.0.1:8000/api/complaints/`;

    let complaint = [];
    

    function ReqComplaints(){
        axios.get(LINK).then(res => {
            setResponse(res.data.results);
            
        });
    }

    for (let i = 0; i < response.length; i+=1) {
        let req = response[i];
        if (String(req.id) === params.id) {
            complaint = req;
        }
    }

    if (requested === false) {
        ReqComplaints();
        complaintReq(true);
    }

    return (
        <>
            <p>Справочники рекламаций</p>
            <div className='guides'>
                <BridgeModel
                    label="Узел отказа"
                    machineBridgeModel={complaint?.failure_node}
                    bridgeModelLink="failure_nodes"
                    nameTitle="Название"
                />
                <BridgeModel
                    label="Способ восстановления"
                    machineBridgeModel={complaint?.recovery_method}
                    bridgeModelLink="recovery_methods"
                    nameTitle="Название"
                />
                <BridgeModel
                    label="Сервисная компания"
                    machineBridgeModel={complaint?.service_company}
                    bridgeModelLink="service_companies"
                    nameTitle="Название"
                />
            </div>
        </> 
    );
}

export default GuideComplaints;
