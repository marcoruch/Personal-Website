import React, { useState, useEffect } from 'react'
import axios from 'axios';
import API_HOST from '../../environment'
import { Form, Button, Icon, Accordion } from 'semantic-ui-react'
import Swal from 'sweetalert2'
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import NumberInput from 'semantic-ui-react-numberinput';



import PropTypes from 'prop-types'

import "./TopLevelEntryFormular.scss";

function TopLevelEntryFormular(props) {

    const [ConfigurationKey] = useState(props.EntryKey)
    const [NewObject, SetNewObject] = useState({});
    const [FormConfiguration, setFormConfiguration] = useState(null)
    const [AccordionOpen, SetAccordionOpen] = useState(false);


    /* Fetch Projects Max Retries */
    const maxRetries = 3;
    const [retriedFetching, setRetriedFetching] = useState(0);

    const getLineWithField = (Field, Title) => {
        return <div className="input-line"><h4>{Title}</h4>{Field}</div>
    }

    const getStringInputField = (name, readableName) => {
        return <Form.Input className={"input-string"} onChange={(_, { value }) => setConfigValueToProps(name, value)} placeholder={readableName}></Form.Input>
    }

    const getImageUploadField = (name, readableName) => {
        let fileInputRef = React.createRef();
        return <React.Fragment>
            <Button className={"input-image"} animated onClick={() => fileInputRef.current.click()}>
                <Button.Content visible>{`${NewObject[name] == null ? "Hochladen" : "Datei bereit für Upload"}`}</Button.Content>
                <Button.Content hidden> {NewObject[name] == null ? <Icon name='upload' /> : <Icon color='green' name='check'></Icon>} </Button.Content>
            </Button>
            <input ref={fileInputRef} type="file" hidden onChange={(fileChange) => (fileChange.target.files ? setImageToProps(name, fileChange.target.files[0], readableName) : console.log("Cancel"))} />
        </React.Fragment>
    }

    const getNumericInputField = (name, readableName) => {
        let standardValue = 1;
        return <NumberInput value={NewObject[name] ? NewObject[name] : standardValue} onChange={(changeValue) => setConfigValueToProps(name, changeValue)} placeholder={readableName} />

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

    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const setImageToProps = async (configKey, file, readableName) => {
        const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        if (file) {
            if (!acceptedImageTypes.includes(file['type'])) {
                Swal.fire(`Fehler beim Hochladen von ${readableName}`, `Kein Bildtyp für die Datei ${file.name} erkannt.`, 'error')
            } else {
                let fileBase64 = await toBase64(file);
                SetNewObject(({ ...NewObject, [configKey]: { file: fileBase64, fileName: file.name, type: file.type } }));
            }
        } else {
            console.log(`Fehler beim Hochladen von ${readableName}`);
            console.log(`Keine Datei gefunden`);
        }
    }

    const setConfigValueToProps = (configKey, configValue) => {
        SetNewObject(({ ...NewObject, [configKey]: configValue }));
    }


    const onObjectPosted = (postedObject) => {
        if (props.onObjectPosted) {
            props.onObjectPosted(postedObject);
        }
    }


    const handleSubmit = async () => {
        let postTopLevelEntryUrl = `${API_HOST}/api/topLevelEntry`;
        axios.post(postTopLevelEntryUrl, NewObject).then(res => {
            if (res.data) {
                Swal.fire(`Hochladen von ${ConfigurationKey} erfolgreich.`, `Erfolgreich hochgeladen!`, 'success')

                onObjectPosted(res.data);
            }
        });
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
            SetNewObject(({ ...NewObject, "configFields": fetchedConfiguration.configFields, "entryKey": ConfigurationKey }));
        } else {
            setRetriedFetching(retriedFetching + 1);
        }

    }

    useEffect(() => {
        if (retriedFetching <= maxRetries) {
            fetchConfiguration();
        }
    }, [retriedFetching])

    return (
        <div className="toplevel-form">
            {FormConfiguration != null
                ? <React.Fragment>

<Accordion styled className={"accordion"}>
        <Accordion.Title
          active={AccordionOpen}
          index={0}
          onClick={() => SetAccordionOpen(!AccordionOpen)}
        >
          <Icon name='dropdown' />
          Neues Objekt
        </Accordion.Title>
        <Accordion.Content active={AccordionOpen}>
        {Object.keys(FormConfiguration.configFields).map(propName => getFieldByConfig(propName, FormConfiguration.configFields[propName]))}
                    <Form.Button name="Add Object" onClick={() => handleSubmit()}>Objekt hinzufügen</Form.Button>
        </Accordion.Content>

        </Accordion>
                </React.Fragment> : ""}
        </div>
    )
}

TopLevelEntryFormular.propTypes = {
    EntryKey: PropTypes.string,
}

export default TopLevelEntryFormular;
