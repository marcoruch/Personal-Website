import React, { useState, useEffect } from 'react'
import axios from 'axios';
import API_HOST from '../../environment'
import { Form, Button, Icon } from 'semantic-ui-react'

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';


import PropTypes, { array } from 'prop-types'

import "./TopLevelEntryFormular.scss";

function TopLevelEntryFormular(props) {

    const [NewObject, SetNewObject] = useState(new FormData());
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

    const getImageUploadField = (name, readableName) => {
        let fileInputRef = React.createRef();
        return <React.Fragment>
            <Button className={"input-image"} animated onClick={() => fileInputRef.current.click()}>
                <Button.Content visible>{`${NewObject[name] == null ? "Hochladen" : "Datei bereit für Upload"}`}</Button.Content>
                <Button.Content hidden> {NewObject[name] == null ? <Icon name='upload' /> : <Icon color='green' name='check'></Icon>} </Button.Content>
            </Button>
            <input ref={fileInputRef} type="file" hidden onChange={(fileChange) => (fileChange.target.files ? setImageToProps(name, fileChange.target.files[0]) : console.log("Cancel"))} />
        </React.Fragment>
    }

    const getNumericInputField = (name, readableName) => {
        return <Form.Input className={"input-string"} onChange={(event, { value }) => ValidateNumeric(event, value, () => setConfigValueToProps(name, value))} placeholder={readableName}></Form.Input>
    }

    const getDateInput = (name) => {
        return <DayPicker className={"datepicker-react"} onDayClick={(data) => setConfigValueToProps(name, data)} />;
    }


    const getFieldByConfig = (name, config) => {
        switch (config.type) {
            case "string": return getLineWithField(getStringInputField(name, config.info), config.info);
            case "image": return getLineWithField(getImageUploadField(name, config.info), config.info);
            case "number": return getLineWithField(getNumericInputField(name, config.info), config.info);
            case "date": return getLineWithField(getDateInput(name), config.info);
            default:
                break;
        }
    }

    const setImageToProps = (configKey, file) => {
        SetNewObject(({ ...NewObject, [configKey]: file }));
    }

    const setConfigValueToProps = (configKey, configValue) => {
        SetNewObject(({ ...NewObject, [configKey]: configValue }));
    }

    const handleSubmit = async () => {
        let data = new FormData();

        let array = [];
        Object.keys(NewObject).forEach(key => {
            if (FormConfiguration.configFields[key].type === "image") {
                array.push({key: key, obj: NewObject[key], name: NewObject[key].fileName})
            } else {
                data.set(key, NewObject[key])
            }
        });

        array.forEach(item => {
            data.append(item.key, item.obj, item.name);
        });

        let postedObject;
        let postTopLevelEntryUrl = `${API_HOST}/api/topLevelEntry`;
        axios.post(postTopLevelEntryUrl, data, { headers: {  'Content-Type': 'application/json',}}).then(res => {
            console.log(res);
            console.log(res.data);
        });
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
    EntryKey: PropTypes.string,
}

export default TopLevelEntryFormular;
