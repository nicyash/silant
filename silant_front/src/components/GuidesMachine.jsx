import * as React from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

import BridgeModel from "./BridgeModel";

function GuidesMachine() {
    const params = useParams();
    const [response, setResponse] = React.useState([]);
    const [requested, machinesReq] = React.useState(false);

    const LINK = `http://127.0.0.1:8000/api/machines/`;

    let machine = [];

    const reqMachines = () => {
        axios.get(LINK).then(res => {
            setResponse(res.data.results);
        });
    }

    for (let i = 0; i < response.length; i+=1) {
        let technic = response[i];

        if(String(technic.id) === params.id){
            machine = technic;
        }
    }


    if (requested === false) {
        reqMachines();
        machinesReq(true);
    }

    return (
        <>
            <p>Справочники машины</p>
            <div className='guides'>
                <BridgeModel
                    label="Модель техники"
                    machineBridgeModel={machine?.model_equipment}
                    bridgeModelLink="model_equipment"
                />
                <BridgeModel
                    label="Модель двигателя"
                    machineBridgeModel={machine?.engine_model}
                    bridgeModelLink="engine_models"
                />
                <BridgeModel
                    label="Модель трансмисии"
                    machineBridgeModel={machine?.transmission_model}
                    bridgeModelLink="transmission_models"
                />
                <BridgeModel
                    label="Модель ведущего моста"
                    machineBridgeModel={machine?.drive_axle_model}
                    bridgeModelLink="model_drive_axle"
                />
                <BridgeModel
                    label="Модель управляемого моста"
                    machineBridgeModel={machine?.controlled_bridge_model}
                    bridgeModelLink="controlled_bridge_models"
                />
                <BridgeModel
                    label="Клиент"
                    nameTitle="Название"
                    machineBridgeModel={machine?.client}
                    bridgeModelLink="clients"
                />
                <BridgeModel
                    label="Сервисная компания"
                    nameTitle="Название"
                    machineBridgeModel={machine?.service_company}
                    bridgeModelLink="service_companies"
                />
            </div>
        </> 
    );
}

export default GuidesMachine;