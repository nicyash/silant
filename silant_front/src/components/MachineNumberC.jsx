import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function MachineNumberC(props) {
    const [response1, setResponse] = React.useState([]);
    let [requested, machineReq] = React.useState(false);

    const LINK = props.machine;

    var machine = [];

    async function ReqMachine(){
        let response = await axios.get(LINK);
        return response.data;
    };
     
    machine = response1;

    if(requested === false){
        ReqMachine().then(data => {setResponse(data)});
        machineReq(true);
    }

    return(
        <>
            {machine.machine_SN}
        </>
    );
}

export default MachineNumberC;