import React, { useState, useEffect } from 'react'
import axios from 'axios';
import API_HOST from '../../environment'
import { Form } from 'semantic-ui-react'

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';


import PropTypes from 'prop-types'

import "./TopLevelEntryFormular.scss";

function TopLevelEntryFormular(props) {

    const [NewObject, SetNewObject] = useState({});
    const [ConfigurationKey, setConfigurationKey] = useState(props.EntryKey)
    const [FormConfiguration, setFormConfiguration] = useState(null)
    const [CantLoad, setCantLoad] = useState(false)


    /* Fetch Projects Max Retries */
    const maxRetries = 3;
    const [retriedFetching, setRetriedFetching] = useState(0);

    const getLineWithField = (Field, Title) => {
        return <div className="input-line"><h4>{Title}</h4>{Field}</div>
    }


    const getStringInputField = (name, readableName) => {
        return <Form.Input className={"input-string"} onChange={(_, { value }) => setConfigValueToProps(name, value)} placeholder={readableName}></Form.Input>
    }

    const ValidateNumeric = (event, data, next) => {
        if (isNaN(data)) {
            event.target.value = event.target.value.substring(0, event.target.value.length - 1);
        } else {
            next();
        }
    }
    
    const getNumericInputField = (name, readableName) => {
        return <Form.Input className={"input-string"} onChange={(event, { value }) => ValidateNumeric(event,value, () => setConfigValueToProps(name, value))} placeholder={readableName}></Form.Input>
    }

    const getDateInput = (name) => {
        return <DayPicker className={"datepicker-react"} onDayClick={(data)=> setConfigValueToProps(name, data)}/>;
    }

    const getFieldByConfig = (name, config) => {
        switch (config.type) {
            case "string": return getLineWithField(getStringInputField(name, config.info), config.info);
            case "image": break;
            case "number": return getLineWithField(getNumericInputField(name, config.info), config.info);
            case "date": return getLineWithField(getDateInput(name), config.info);
            default:
                break;
        }
    }

    const setConfigValueToProps = (configKey, configValue) => {
        console.log(configValue);
        SetNewObject(({ ...NewObject, [configKey]: configValue }));
    }

    const handleSubmit = async () => {
        // Get History Parts

        let postedObject;
        let postTopLevelEntryUrl = `${API_HOST}/api/topLevelEntry`;


        console.log(NewObject);
        return;

    }

    async function fetchConfiguration() {

        // Get History Parts

        let fetchedConfiguration;
        let configurationUrl = `${API_HOST}/api/topLevelEntry/${ConfigurationKey}`;

        await axios.get(configurationUrl)
            .then(res => {
                fetchedConfiguration = res.data;
            }).catch((error => {
                console.error(`Error when fetching ${configurationUrl}...`);
                console.log(error.response);
                return;
            }))

        if (fetchedConfiguration) {
            setFormConfiguration(fetchedConfiguration);
        } else {
            setRetriedFetching(retriedFetching + 1);
        }

    }

    useEffect(() => {
        if (retriedFetching <= maxRetries) {
            fetchConfiguration();
        }
        else {
            setCantLoad(true);
        }
    }, [retriedFetching])

    return (
        <div className="toplevel-form">
            {FormConfiguration != null
                ? <React.Fragment>
                    <h3>Neues Objekt</h3>
                    {Object.keys(FormConfiguration.configFields).map(propName => getFieldByConfig(propName, FormConfiguration.configFields[propName]))}
                    <Form.Button name="Add Object" onClick={() => handleSubmit()}>Objekt hinzufügen</Form.Button>
                </React.Fragment> : ""}
        </div>
    )
}

TopLevelEntryFormular.propTypes = {

}

export default TopLevelEntryFormular;
