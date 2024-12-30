import React, { useState } from "react";
import TypeOfMaintenance from "../AddMaintenanceForm/TypeOfMaintenance";
import MachineNumberM from "../AddMaintenanceForm/MachineNumberM";
import ServiceCompany from "../AddMaintenanceForm/ServiceCompany";
import Organization from '../AddMaintenanceForm/Organization';
import "../../styles/AddMaintenanceForm.css";

import { useNavigate } from "react-router-dom";

function AddMaintenanceForm(props) {
    const [formDateofmaintenance, setFormDateofmaintenance] = useState('');
    const [formOperatingTime, setFormOperatingTime] = useState('');
    const [formOrderNumber, setFormOrderNumber] = useState('');
    const [formDateoforder, setFormDateoforder] = useState('');
    const [valueToM, setValueToM] = useState('');
    const [valueM, setValueM] = useState('');
    const [valueSC, setValueSC] = useState('');
    const [valueO, setValueO] = useState('');

    const navigate = useNavigate();

    const postMaintenance = e => {
        e.preventDefault();
        fetch(
            'http://127.0.0.1:8000/api/maintenances/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    date_of_maintenance: formDateofmaintenance,
                    operating_time: formOperatingTime,
                    order_number: formOrderNumber,
                    data_of_order: formDateoforder,
                    organization: `http://127.0.0.1:8000/api/organizations/${valueO}/`,
                    type_of_maintenance: `http://127.0.0.1:8000/api/types_of_maintenance/${valueToM}/`,
                    machine: `http://127.0.0.1:8000/api/machines/${valueM}/`,
                    service_company: `http://127.0.0.1:8000/api/service_companies/${valueSC}/`
                })
            }
        )
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw Error(`Something went wrong: code ${response.status}`)
                }
            })
    };
    
    
    const handleDateOfMaintenance = (e) => {
        setFormDateofmaintenance(e.target.value);
    };
    
    
    const handleOperatingTime = (e) => {
        setFormOperatingTime(e.target.value);
    };
    
    
    const handleOrderNumber = (e) => {
        setFormOrderNumber(e.target.value);
    };
    
    
    const handleDateOfOrder = (e) => {
        setFormDateoforder(e.target.value);
    };
    
    
    const handleTypeOfMaintenanceChange = (valueToM) => {
        setValueToM(valueToM);
    };
    
    
    const handleMachineChange = (valueM) => {
        setValueM(valueM);
    };
    
    
    const handleServiceCompanyChange = (valueSC) => {
        setValueSC(valueSC);
    };
    
    const handleOrganizationChange = (valueO) => {
        setValueSC(valueO);
    };
    
    const handleRedirect = () => {
        navigate('/maintenances')
    };
    
    
    return(
        <>
            <form className="data" onSubmit={postMaintenance}>
                <p>
                    <label>
                        Дата ТО:
                        <input className="inputSearch" type="date" name="date_of_maintenance" value={formDateofmaintenance} onChange={handleDateOfMaintenance}/>
                    </label>
                </p>
                <p>
                    <label>
                        Наработка м/час:
                        <input className="inputSearch" type="text" name="operating_time" value={formOperatingTime} onChange={handleOperatingTime} placeholder="Время наработки"/>
                    </label>
                </p>
                <p>
                    <label>
                        Заказ-наряд:
                        <input className="inputSearch" type="text" name="order_number" value={formOrderNumber} onChange={handleOrderNumber} placeholder="Номер заказ-наряда"/>
                    </label>
                </p>
                <p>
                    <label>
                        Дата заказ-наряда:
                        <input className="inputSearch" type="date" name="date_of_order" value={formDateoforder} onChange={handleDateOfOrder}/>
                    </label>
                </p>
                <p>
                    <label>
                        Вид ТО:
                        <TypeOfMaintenance onChange={handleTypeOfMaintenanceChange} />
                    </label>
                </p>
                <p>
                    <label>
                        Зав. номер машины:
                        <MachineNumberM onChange={handleMachineChange} user={props.user} servc={props.servc} />
                    </label>
                </p>
                <p>
                    <label>
                        Организация проводившая ТО:
                        <Organization onChange={handleOrganizationChange} />
                    </label>
                </p>
                <p>
                    <label>
                        Сервисная компания:
                        <ServiceCompany onChange={handleServiceCompanyChange} />
                    </label>
                </p>
                <input className="buttonEnter" type="submit" name="submit" value="Добавить"   />
            </form>
        </>
    );
}

export default AddMaintenanceForm;