
import React, { useState, useEffect } from 'react';
import {  Form, Button, Checkbox, Input, Radio, Select, TextArea } from 'semantic-ui-react'
import firebase from './../Firebase/Firebase'
import './FoodLookup.scss';
import './FoodLookup_config';

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
]

function FoodLookup() {

    const [value, setValue] = useState(1);

    return <div>
        <Form>
            <Form.Group widths='equal'>
                <Form.Field control={Input} label='First name' placeholder='First name' />
                <Form.Field control={Input} label='Last name' placeholder='Last name' />
                <Form.Field control={Select} label='Gender' options={options} placeholder='Gender' />
            </Form.Group>
            <Form.Group inline>
                <label>Quantity</label>
                <Form.Field
                    control={Radio}
                    label='One'
                    value='1'
                    checked={value === '1'}
                />
                <Form.Field
                    control={Radio}
                    label='Two'
                    value='2'
                    checked={value === '2'}
                />
                <Form.Field
                    control={Radio}
                    label='Three'
                    value='3'
                    checked={value === '3'}
                />
            </Form.Group>
            <Form.Field control={TextArea} label='About' placeholder='Tell us more about you...' />
            <Form.Field control={Checkbox} label='I agree to the Terms and Conditions' />
            <Form.Field control={Button}>Submit</Form.Field>
        </Form>
    </div>
}

export default FoodLookup;