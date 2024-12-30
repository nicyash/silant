import React, { useState } from 'react';
import axios from 'axios';

import Complaint from './Complaint';
import Table from 'react-bootstrap/Table';

import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Complaints.css"

function Complaints(props) {
    const [response, setResponse] = useState([]);
    const [requested, complaintReq] = useState(false);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const LINK = `http://127.0.0.1:8000/api/complaints/?failure_node=${props.valueFN}&recovery_method=${props.valueRM}&service_company=${props.valueSC}`;

    let complaints = [];

    function ReqComplaints(){
        axios.get(LINK).then(res => {
            setResponse(res.data.results);
        });
    }

    for (let i = 0; i < response.length; i+=1) {
        complaints.push(response[i]);
    }

    if (requested === false) {
        ReqComplaints();
        complaintReq(true);
    }

    const handleSubmitChange = () => {
        ReqComplaints();
    };

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

    const userMashinesFiltered = props.machines.filter(({ client }) => client === props.formUsername);
    const filteredMaintenances = complaints.filter(complaints =>
       userMashinesFiltered.some(userMachine => userMachine.machine_SN === complaints.machine)
    );

    
    return (
        <>
            <div className='button'><button onClick={handleSubmitChange}>Найти</button></div>
            <p>Информация о рекламациях</p>
        {!complaints.length ?
                <p className='nothing_found'>По вашему запросу ничего не найдено</p> :
                <Table variant='' striped bordered hover className='complaints'>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('machine')}>
                                    Зав. № машины
                                    {sortColumn === 'machine' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('date_refusal')}>
                                    Дата отказа
                                    {sortColumn === 'date_refusal' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('development')}>
                                    Наработка, м/час
                                    {sortColumn === 'development' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('failure_node')}>
                                    Узел отказа
                                    {sortColumn === 'failure_node' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('description_failure')}>
                                    Описание отказа
                                    {sortColumn === 'description_failure' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('recovery_method')}>
                                    Способ восстановления
                                    {sortColumn === 'recovery_method' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('used_spare_parts')}>
                                Запасные части
                                {sortColumn === 'used_spare_parts' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('date_restoration')}>
                                Дата восстановления
                                {sortColumn === 'date_restoration' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('downtime')}>
                                Время простоя техники
                                {sortColumn === 'downtime' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('service_company')}>
                                    Сервисная компания
                                    {sortColumn === 'service_company' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMaintenances.map((complaint) => <Complaint key={complaint.id} complaint={complaint} />)}
                    </tbody>
                </Table>
            }
        </> 
    );
}

export default Complaints;