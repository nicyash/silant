import React, { useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

function BridgeModel ({
	label,
	nameTitle = "Модель",
	machineBridgeModel,
	bridgeModelLink
}) {
	const [response1, setResponse] = useState([]);
	const [requested, controlledBridgeReq] = useState(false);
	
	const LINK = `http://127.0.0.1:8000/api/${bridgeModelLink}/`;
	
	let bridgeModel = [];
	
	const ReqBridge = async () => {
		let response = await axios.get(LINK);
		return response.data.results;
	};
	
	if (requested === false) {
		ReqBridge().then(data => {setResponse(data)});
		controlledBridgeReq(true);
	}
	
	for (let i=0; i < response1.length; i+=1) {
		let model = response1[i];
		if (machineBridgeModel === model.name) {
			bridgeModel = model;
		}
	}
	
	return(
		<Table>
			<thead>
				<tr>
					<th>{label}</th>
				</tr>
			</thead>
			<tbody>
				<tr><td>{nameTitle}: {bridgeModel?.name}</td></tr>
				<tr><td>Описание: {bridgeModel?.description}</td></tr>
			</tbody>
		</Table>
	);
}

export default BridgeModel;
