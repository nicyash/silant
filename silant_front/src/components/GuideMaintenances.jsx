import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import BridgeModel from "./BridgeModel";

function GuidesMaintenances() {
    const params = useParams();
    const [response, setResponse] = useState([]);
    const [requested, maintenanceReq] = useState(false);

    const LINK = `http://127.0.0.1:8000/api/maintenances/`;

    let maintenance = [];
    // console.log(params)
    function ReqMaintenances(){
        axios.get(LINK).then(res => {
            setResponse(res.data.results);
            
        });
    }


    for (let i = 0; i < response.length; i+=1) {
        let req = response[i];
        if (String(req.id) === params.id) {
            maintenance = req;
        }
    }
    

    if (requested === false) {
        ReqMaintenances();
        maintenanceReq(true);
    }

    return (
        <>
            <p>Справочники ТО</p>
            <div className='guides'>
                <BridgeModel
                    label="Вид ТО"
                    machineBridgeModel={maintenance?.type}
                    bridgeModelLink="type_maintenance"
                    nameTitle="Название"
                />
                <BridgeModel
                    label="Сервисная компания"
                    machineBridgeModel={maintenance?.service_company}
                    bridgeModelLink="service_companies"
                    nameTitle="Название"
                />
            </div>
        </> 
    );
}

export default GuidesMaintenances;
