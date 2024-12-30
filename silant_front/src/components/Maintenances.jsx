import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Maintenance from './Maintenance';

import { Table } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Maintenances.css"

function Maintenances(props) {
    const [response, setResponse] = useState([]);
    const [requested, maintenanceReq] = useState(false);
    const [nothing, setNothing] = useState(false);
    const [click, setClick] = useState(false);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    
    const LINK = `http://127.0.0.1:8000/api/maintenances/?type=${props.valueToM}&car=${props.valueM}&service_company=${props.valueSC}`;

    let maintenances = [];
    
    useEffect(() => {
        ReqMaintenances();
        maintenanceReq(true);
    }, []);
    
    function ReqMaintenances() {
        axios.get(LINK).then(res => {
            setResponse(res.data.results);
        });
    }
    
    for (let i = 0; i < response.length; i += 1) {
        maintenances.push(response[i]);
    }
    
    
    if (requested === false) {
        ReqMaintenances();

    }
    
    const handleSubmitChange = () =>{
        ReqMaintenances();
    };
    
    
    if (props.touch === true ) {
        ReqMaintenances();
    }
    
    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
        const sorted = [...response].sort((a, b) => {
            const multi = sortColumn === 'asc' ? 1 : -1;
            return multi * (a[column] - b[column]);
        });

        setResponse(sorted);
    };
    
    
    const filteredMaintenances = maintenances.filter(maintenances =>
        props.userMashinesFiltered.some(userMachine => userMachine.machine_SN === maintenances.car)
    );


    console.log(filteredMaintenances);
    

        return (
            <>
                <div className='button'><button onClick={handleSubmitChange}>Найти</button></div>
                {!maintenances.length ?
                        <p className='nothing_found'>По вашему запросу ничего не найдено</p>
                        :
                        <>
                            <p>Информация о проведеных ТО Вашей техники</p>
                            <Table variant='' striped bordered hover className='maintenances'>
                                <thead>
                                <tr>
                                    <th onClick={() => handleSort('car')}>
                                        Зав. № машины
                                        {sortColumn === 'car' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                    </th>
                                    <th onClick={() => handleSort('type')}>
                                        Вид ТО
                                        {sortColumn === 'type' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                    </th>
                                    <th onClick={() => handleSort('date')}>
                                        Дата проведения ТО
                                        {sortColumn === 'date' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                    </th>
                                    <th onClick={() => handleSort('development')}>
                                        Наработка, м/час
                                        {sortColumn === 'development' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                    </th>
                                    <th onClick={() => handleSort('work_order_number')}>
                                        № заказ-наряда
                                        {sortColumn === 'work_order_number' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                    </th>
                                    <th onClick={() => handleSort('work_order_date')}>
                                        Дата заказ-наряда
                                        {sortColumn === 'work_order_date' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                    </th>
                                    <th onClick={() => handleSort('service_company')}>
                                        Сервисная компания
                                        {sortColumn === 'service_company' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredMaintenances.map((maintenance) => <Maintenance key={maintenance.id} maintenance={maintenance}  />)}
                                </tbody>
                            </Table>
                        </>
                }
            </>
        );


}

export default Maintenances;