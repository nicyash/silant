import React from "react";

function Machine(props) {
    return(
        <>
            <tr key={props.machine.id}>
                <td>{props.machine.model_equipment}</td>
                <td>{props.machine.machine_SN}</td>
                <td>{props.machine.engine_model}</td>
                <td>{props.machine.engine_SN}</td>
                <td>{props.machine.transmission_model}</td>
                <td>{props.machine.transmission_SN}</td>
                <td>{props.machine.drive_axle_model}</td>
                <td>{props.machine.drive_axle_SN}</td>
                <td>{props.machine.controlled_bridge_model}</td>
                <td>{props.machine.controlled_bridge_SN}</td>
            </tr>
        </>
    );
}

export default Machine;
