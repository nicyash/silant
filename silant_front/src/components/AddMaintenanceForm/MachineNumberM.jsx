import React, { useState } from "react";
import axios from "axios";

function MachineNumberM( props ) {
    const [response1, setResponse] = useState([]);
    const [requested, machineReq] = useState(false);
    const [valueM, setValueM] = useState('');
    const [machines, setMachines] = useState([]);

    const LINK = `http://127.0.0.1:8000/api/machines/?client=${props.user}&service_company=${props.servc}`;
    
    let machine_numbers = [];
    let first_machine = [];

    async function ReqMachine(){
        let response = await axios.get(LINK);
        setMachines(response.data.results);
        return response.data.results;
    }
     
    if (requested === false) {
        ReqMachine().then(data => {setResponse(data)});
        machineReq(true);
    }

    for (let i=0; i < response1.length; i+=1){
        let model = response1[i];
        machine_numbers.push(model.machine_factory_number);
        first_machine = response1[0];
    }

    // if(requested === true){
    //     props.handleMachinesChange(machines);
    // };

    machine_numbers.unshift(' ---------------- ');

    const options = machine_numbers.map(
        (text, index) => {
            return <option key={index}>{text}</option>;
        }
    );

    const handleMachineChange = (event) => {
        setValueM(event.target.value);
        if ('----------------' === event.target.value) {
            props.onChange('');
        } else {
            for (let i=0; i < response1.length; i+=1) {
                let model = response1[i];
                if (model.machine_factory_number === event.target.value) {
                    props.onChange(model.id);
                }
            }
        }
    };


    return (
        <>
            <select value={valueM} onChange={handleMachineChange}>
                {options}
            </select>
        </>
    );
}

export default MachineNumberM;
