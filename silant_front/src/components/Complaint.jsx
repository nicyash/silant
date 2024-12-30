import React from "react";
import { useNavigate } from "react-router-dom";

function Complaint(props) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/guides/complaints/${props.complaint.id}`);
    };

    return(
        <>
            <tr key={props.complaint.id} onClick={handleClick}>
                <td>{props.complaint.machine}</td>
                <td>{props.complaint.date_refusal}</td>
                <td>{props.complaint.development}</td>
                <td>{props.complaint.failure_node}</td>
                <td>{props.complaint.description_failure}</td>
                <td>{props.complaint.recovery_method}</td>
                <td>{props.complaint.used_spare_parts}</td>
                <td>{props.complaint.date_restoration}</td>
                <td>{props.complaint.downtime}</td>
                <td>{props.complaint.service_company}</td>
            </tr>
        </>
    );
}

export default Complaint;
