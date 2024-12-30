import React, { useState } from "react";

import Maintenances from "./Maintenances"
import FilterSelect from "./FilterSelect";

function MaintenanceFilterForm(props) {
    const [valueToM, setValueToM] = useState('');
    const [valueM, setValueM] = useState('');
    const [valueSC, setValueSC] = useState('');
    const [machines, setMachines] = useState([]);
    const [touch, setTouch] = useState(false);

    const handleTypeOfMaintenanceChange = (valueToM) => {
        setValueToM(valueToM);
    };

    const handleMachineChange = (value) => {
        setValueM(value);
    };

    const handleServiceCompanyChange = (valueSC) => {
        setValueSC(valueSC);
    };

    const handleMachinesChange = (machines) => {
        setMachines(machines);
    };

    const userMashinesFiltered =
        machines.filter(({ client }) => client === props.userName);


    return(
        <>
            <span>Ваши машины:</span>
            <form>
                <span>
                    <label>
                        Вид ТО:
                        <FilterSelect
                            apiUrl='http://127.0.0.1:8000/api/type_maintenance/'
                            onChange={handleTypeOfMaintenanceChange}
                        />
                    </label>
                </span>
                <span>
                    <label>
                        Зав. номер машины:
                        <FilterSelect
                            apiUrl={`http://127.0.0.1:8000/api/machines/?client=${props.userId}&service_company=${props.serviceCompanyId}`}
                            onChange={handleMachineChange}
                            additionalHandler={handleMachinesChange}
                        />
                    </label>
                </span>
                <span>
                    <label>
                        Сервисная компания:
                        <FilterSelect
                            apiUrl='http://127.0.0.1:8000/api/service_companies/'
                            onChange={handleServiceCompanyChange}
                        />
                    </label>
                </span>
            </form>
            <div>
                <Maintenances
                    userMashinesFiltered={userMashinesFiltered}
                    valueToM={valueToM}
                    valueM={valueM}
                    valueSC={valueSC}
                    machines={machines}
                    touch={touch}
                    setTouch={setTouch}
                    role={props.role}
                />
            </div>
        </>
    );
}

export default MaintenanceFilterForm;