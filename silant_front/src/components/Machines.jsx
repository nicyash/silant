import React, { useState } from "react";
import axios from 'axios';

import Machine from './Machine';
import Table from 'react-bootstrap/Table';

import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Machines.css"

function Machines(props) {
    const [response, setResponse] = useState([]);
    const [requested, machineReq] = useState(false);
    const [nothing, setNothing] = useState(false);
    const [MFN, setMFN] = useState('');
    const [search, setSearch] = useState(false);

    const LINK = `http://127.0.0.1:8000/api/machines/?machine_SN=${MFN}`;

    let machines = [];

    function ReqMachines(){
        axios.get(LINK).then(res => {
            setResponse(res.data.results);
            if(res.data.results.length === 0 && requested === true){
                setNothing(true);
            }else{
                setNothing(false);
            }
        });
    }

    for(let i = 0; i < response.length; i+=1) {
        machines.push(response[i]);
    }

    if(requested === false){
        ReqMachines();
        machineReq(true);
    }

    const handleSubmitChange = (event) =>{
        setMFN(event.target.value);
    };


    const handleReset = () =>{
        setMFN('');
        setSearch(false);
    };


    const handleSearch = () => {
        if (MFN !== '') {
            ReqMachines();
            setSearch(true);
        }
    };

    return (
        <>
            <p>Проверьте комплектацию и технические характеристики техники Силант</p>
            <div className="machineForm">
                <input className="inputSearch" type="text" name="machine_SN" value={MFN} onChange={handleSubmitChange} placeholder="Заводской номер машины"/>
                <input className="buttonSearch" type="submit" name="submit" value="Найти"  onClick={handleSearch} />
                <input className="buttonSearch" type="submit" name="submit" value="Сбросить"  onClick={handleReset} />
            </div>
            {nothing ?
                <p className='nothing_found'>По вашему запросу ничего не найдено</p>:
                search?
                <>
                    <p>Информация о комплектации и технических характеристиках Вашей техники</p>
                    <p>Результаты поиска:</p>
                    <Table variant='' striped bordered hover className='machines'>
                        <thead>
                            <tr>
                                <th>Модель техники</th>
                                <th>Зав. № машины</th>
                                <th>Модель двигателя</th>
                                <th>Зав. № двигателя</th>
                                <th>Модель трансмисии (производитель, артикул)</th>
                                <th>Зав. № трансмисии</th>
                                <th>Модель ведущего моста</th>
                                <th>Зав. № ведущего моста</th>
                                <th>Модель управляемого моста</th>
                                <th>Зав. № управляемого моста</th>
                            </tr>
                        </thead>
                        <tbody>
                            {machines.map((machine) => <Machine key={machine.id} machine={machine}/>)}
                        </tbody>
                    </Table>
                </>: null
            }
        </> 
    );
}

export default Machines;