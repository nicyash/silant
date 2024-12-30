import React, { useEffect, useState } from 'react';
import axios from 'axios';

import MachineA from './MachineA';
import Table from 'react-bootstrap/Table';

import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/AuthMachines.css";

function AuthMachines(props) {
    const [response, setResponse] = useState([]);
    const [requested, machineReq] = useState(false);
    const [nothing, setNothing] = useState(false);
    const [sortColumn, setSortColumn] = useState("asc");
    const [sortDirection, setSortDirection] = useState('asc');

    const LINK = `http://127.0.0.1:8000/api/machines/?machine_SN=&model_equipment=${props.valueTM}&engine_model=${props.valueEM}&transmission_model=${props.valueTrM}&drive_axle_model=${props.valueDBM}&controlled_bridge_model=${props.valueCBM}&client=${props.user}&service_company=${props.servc}`;

    function ReqMachines(){
        axios.get(LINK).then(res => {
            setResponse(res.data.results);
            if (res.data.results.length === 0 && requested === true) {
                setNothing(true);
            } else {
                setNothing(false);
            }
        });
    }

    useEffect(() => {
        const newMachines = response.filter(responseMachine =>
            !props.machines.some(machine => machine.id === responseMachine.id)
        );
        props.setMachines(prevMachines => [...prevMachines, ...newMachines]);
    }, [response]);

    if (requested === false) {
        ReqMachines();
        machineReq(true);
    }

    const handleSubmitChange = () =>{
        ReqMachines();
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

    const userMashinesFiltered = response.filter(({ client }) => client === props.firstName);



    return (
        <>
            <div className='button'><button onClick={handleSubmitChange}>Найти</button></div>
            <p>Информация о комплектации и технических характеристиках Вашей техники</p>
            {nothing ?
                <p className='nothing_found'>По вашему запросу ничего не найдено</p>
            :
                <Table variant='' striped bordered hover className='machines'>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('model_equipment')}>
                                    Модель техники
                                    {sortColumn === 'model_equipment' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('machine_SN')}>
                                    Зав. № машины
                                    {sortColumn === 'machine_SN' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('engine_model')}>
                                    Модель двигателя
                                    {sortColumn === 'engine_model' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('engine_SN')}>
                                    Зав. № двигателя
                                    {sortColumn === 'engine_SN' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('transmission_model')}>
                                    Модель трансмиссии
                                    {sortColumn === 'transmission_model' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('transmission_SN')}>
                                    Зав. № трансмиссии
                                    {sortColumn === 'transmission_SN' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('drive_axle_model')}>
                                    Модель ведущего моста
                                    {sortColumn === 'drive_axle_model' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('drive_axle_SN')}>
                                    Зав. № ведущего моста
                                    {sortColumn === 'drive_axle_SN' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('controlled_bridge_model')}>
                                    Модель управляемого моста
                                    {sortColumn === 'controlled_bridge_model' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('controlled_bridge_SN')}>
                                    Зав. № управляемого моста
                                    {sortColumn === 'controlled_bridge_SN' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('delivery_contract')}>
                                    Договор поставки №, дата
                                    {sortColumn === 'delivery_contract' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('shipping_date')}>
                                    Дата отгрузки с завода
                                    {sortColumn === 'shipping_date' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('client')}>
                                    Клиент
                                    {sortColumn === 'client' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('consignee')}>
                                    Грузополучатель
                                    {sortColumn === 'consignee' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('delivery_address')}>
                                    Адрес поставки
                                    {sortColumn === 'delivery_address' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('equipment')}>
                                    Комплектация
                                    {sortColumn === 'equipment' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('service_company')}>
                                    Сервисная компания
                                    {sortColumn === 'service_company' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userMashinesFiltered.map((machine) => <MachineA key={machine.id} machine={machine} firstName={props.firstName} role={props.role} />)}
                    </tbody>
                </Table>
            }
        </>
    );
}

export default AuthMachines;