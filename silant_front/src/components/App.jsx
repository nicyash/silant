import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../styles/App.css';

import Group from "./Group";
import MachineFilterForm from "./MachineFilterForm";
import ComplaintFilterForm from "./ComplaintFilterForm";
import MaintenanceFilterForm from "./MaintenanceFilterForm";
import GuidesMachine from "./GuidesMachine";
import GuidesMaintenances from "./GuideMaintenances";
import GuideComplaints from "./GuideComplaints";
import Login from "./Login";
import AddMaintenanceForm from "./AddMaintenanceForm/AddMaintenanceForm";

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

function App () {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(false);
    const [formUsername, setFormUsername] = useState();
    const [formPassword, setFormPassword] = useState();
    const [firstName, setFirstName] = useState('');
    const [groups, setGroups] = useState('');
    const [error, setError] = useState('');
    const [logined, setLogined] = useState(false);
    const [role, setRole] = useState('');
    const [idsResponse, setIdsResponse] = useState({});
    const [userId, setUserId] = useState("");
    const [serviceCompanyId, setServiceCompanyId] = useState("");
    const [machines, setMachines] = useState([]);

    const navigate = useNavigate();

    const LINK_CLIENT = '/api/clients/';
    const LINK_SERVICE = '/api/service_companies/';

    const handleRequest = async () => {
        const userIdRequest = await client.get(LINK_CLIENT)
        const serviceCompanyIdRequest = await client.get(LINK_SERVICE);

        return {
            userIdResponse: userIdRequest?.data?.results,
            serviceCompanyIdResponse: serviceCompanyIdRequest?.data?.results,
        };
    };

    useEffect(() => {
        const { userIdResponse, serviceCompanyIdResponse } = idsResponse || {}

        if (userIdResponse?.length) {
            for(let i=0; i < userIdResponse.length; i+=1) {
                let model = userIdResponse[i];
                if (firstName === model.name) {
                    setUserId(model.id);
                }
            }
        }

        if (serviceCompanyIdResponse?.length) {
            for(let i=0; i < serviceCompanyIdResponse.length; i+=1) {
                let model = serviceCompanyIdResponse[i];
                if (firstName === model.name) {
                    setServiceCompanyId(model.id);
                }
            }
        }
    }, [idsResponse]);

    const handleRole = (groups) => {
        if (groups[0] === 4) return 'Сервисная компания';
        if (groups[0] === 2) return 'Клиент';
        return 'Менеджер';
    };

    const fetchUserData = (token) => {
        fetch('http://127.0.0.1:8000/api/user', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Не удалось загрузить данные');
                }
            })
            .then(({ data }) => {
                setFirstName(data.first_name);
                setFormUsername(data.username)
                setGroups(data.groups);
                setRole(handleRole(data.groups));
                setError(null);
                // console.log('data: ', data);
            })
            .catch(() => setError('Ошибка получения данных о пользователе'));
    };

    useEffect(() => {
        if (token) {
            fetchUserData(token);
        }
    }, [token]);

    const submitHandler = event => {
        event.preventDefault();
        setLoading(true);

        handleRequest().then(data => {setIdsResponse(data)});

        client.post(
            "/api/login",
            {
                username: formUsername,
                password: formPassword
            }
        )
            .then(response => {
                if (response.status === 200) {
                    const { key } = response.data;
                    localStorage.setItem('token', key);
                    setToken(key);
                    setError(null);
                    navigate("/");
                } else {
                    throw Error(`Что-то пошло не так: код ${response.status}`);
                }
            })
            .catch(error => {
                setError('Ошибка с входом в аккаунт')
            })
            .finally(() => setLoading(false));
    };

    const handleLogout = () =>
        client.post("/api/logout", {})
            .then(() => {
                setToken(null);
                setLogined(false);
                setRole(null);
                setFirstName(null);
                localStorage.removeItem('token');
                navigate("/login");
            });

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            setLogined(true);
        }
    }, []);

    return (
        <div className="app-container">
        <Routes>

            <Route
                path="/"
                element={
                    <Group
                        token={token}
                        role={role}
                        firstName={firstName}
                        handleLogout={handleLogout}
                    />
                }
            >
                <Route
                    index
                    path="/"
                    element={
                        <MachineFilterForm
                            role={role}
                            logined={logined}
                            firstName={firstName}
                            groups={groups}
                            user={userId}
                            servc={serviceCompanyId}
                            formUsername={formUsername}
                            token={token}
                            machines={machines}
                            setMachines={setMachines}
                        />
                    }
                />
                <Route
                    path="/maintenances"
                    element={
                        <MaintenanceFilterForm
                            formUsername={formUsername}
                            userName={firstName}
                            user={userId}
                            role={role}
                            servc={serviceCompanyId}
                            userId={userId}
                            serviceCompanyId={serviceCompanyId}
                        />
                    }
                />
                <Route
                    path="/complaints"
                    element={
                        <ComplaintFilterForm
                            firstName={firstName}
                            user={userId}
                            role={role}
                            servc={serviceCompanyId}
                            machines={machines}
                            formUsername={formUsername}
                        />
                    }
                />
                <Route path="/guides/machines/:id" element={<GuidesMachine />} />
                <Route path="/guides/maintenances/:id" element={<GuidesMaintenances />} />
                <Route path="/guides/complaints/:id" element={<GuideComplaints />} />
                <Route
                    path="/login"
                    element={
                        <Login
                            formUsername={formUsername}
                            formPassword={formPassword}
                            token={token}
                            setToken={setToken}
                            role={role}
                            firstName={firstName}
                            error={error}
                            loading={loading}
                            setFormUsername={setFormUsername}
                            setFormPassword={setFormPassword}
                            setLogined={setLogined}
                            submitHandler={submitHandler}
                        />
                    }
                />
                <Route
                    path="/maintenances/add"
                    element={
                        <AddMaintenanceForm
                            firstName={firstName}
                            user={userId}
                            role={role}
                            servc={serviceCompanyId}
                        />
                    }
                />
            </Route>
        </Routes>
        </div>
    );
}

export default App;
