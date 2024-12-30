import React from "react";

import { useNavigate } from "react-router-dom";

function Maintenance(props) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/guides/maintenances/${props.maintenance.id}`);
    };

    return(
        <>
            <tr key={props.maintenance.id} onClick={handleClick}>
                <td>{props.maintenance.car}</td>
                <td>{props.maintenance.type}</td>
                <td>{props.maintenance.date}</td>
                <td>{props.maintenance.development}</td>
                <td>{props.maintenance.work_order_number}</td>
                <td>{props.maintenance.work_order_date}</td>
                <td>{props.maintenance.service_company}</td>
            </tr>
        </>
    );
}

export default Maintenance;
