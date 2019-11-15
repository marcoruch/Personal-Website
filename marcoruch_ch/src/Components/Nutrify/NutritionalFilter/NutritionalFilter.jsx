import React, { useState } from 'react'
import { Dropdown, Grid } from 'semantic-ui-react'
import NumberInput from 'semantic-ui-react-numberinput';
import IconButton from '../../GeneralComponents/IconButton/IconButton'
import PropTypes from 'prop-types'

const nutritionalTypes = [
    {
        key: 'Calcium',
        text: 'Calcium',
        value: 'Calcium',
        image: ''
    },
    {
        key: 'Carbs',
        text: 'Carbs',
        value: 'Carbs',
        image: ''
    },
    {
        key: 'Cholesterol',
        text: 'Cholesterol',
        value: 'Cholesterol',
        image: ''
    },
    {
        key: 'Monounsaturated',
        text: 'Monounsaturated',
        value: 'Monounsaturated',
        image: ''
    },
    {
        key: 'Polyunsaturated',
        text: 'Polyunsaturated',
        value: 'Polyunsaturated',
        image: ''
    },
    {
        key: 'Saturated',
        text: 'Saturated',
        value: 'Saturated',
        image: ''
    },
    {
        key: 'Fat',
        text: 'Fat',
        value: 'Fat',
        image: ''
    },
    {
        key: 'Trans',
        text: 'Trans',
        value: 'Trans',
        image: ''
    },
    {
        key: 'Iron',
        text: 'Iron',
        value: 'Iron',
        image: ''
    },
    {
        key: 'Fiber',
        text: 'Fiber',
        value: 'Fiber',
        image: ''
    },
    {
        key: 'Folate (Equivalent)',
        text: 'Folate (Equivalent)',
        value: 'Folate (Equivalent)',
        image: ''
    },
    {
        key: 'Potassium',
        text: 'Potassium',
        value: 'Potassium',
        image: ''
    },
    {
        key: 'Magnesium',
        text: 'Magnesium',
        value: 'Magnesium',
        image: ''
    },
    {
        key: 'Sodium',
        text: 'Sodium',
        value: 'Sodium',
        image: ''
    },
    {
        key: 'Niacin (B3)',
        text: 'Niacin (B3)',
        value: 'Niacin (B3)',
        image: ''
    },
    {
        key: 'Phosphorus',
        text: 'Phosphorus',
        value: 'Phosphorus',
        image: ''
    },
    {
        key: 'Protein',
        text: 'Protein',
        value: 'Protein',
        image: ''
    },
    {
        key: 'Riboflavin (B2)',
        text: 'Riboflavin (B2)',
        value: 'Riboflavin (B2)',
        image: ''
    },
    {
        key: 'Sugars',
        text: 'Sugars',
        value: 'Sugars',
        image: ''
    },
    {
        key: 'Thiamin (B1)',
        text: 'Thiamin (B1)',
        value: 'Thiamin (B1)',
        image: ''
    },
    {
        key: 'Vitamin E',
        text: 'Vitamin E',
        value: 'Vitamin E',
        image: ''
    },
    {
        key: 'Vitamin A',
        text: 'Vitamin A',
        value: 'Vitamin A',
        image: ''
    },
    {
        key: 'Vitamin B12',
        text: 'Vitamin B12',
        value: 'Vitamin B12',
        image: ''
    },
    {
        key: 'Vitamin B6',
        text: 'Vitamin B6',
        value: 'Vitamin B6',
        image: ''
    },
    {
        key: 'Vitamin C',
        text: 'Vitamin C',
        value: 'Vitamin C',
        image: ''
    },
    {
        key: 'Vitamin D',
        text: 'Vitamin D',
        value: 'Vitamin D',
        image: ''
    },
    {
        key: 'Vitamin K',
        text: 'Vitamin K',
        value: 'Vitamin K',
        image: ''
    },
]

const nutritionalGramFactors = [
    {
        key: 'Grams',
        text: 'g',
        value: 1,
        image: ''
    },
    {
        key: '100Grams',
        text: '100 g',
        value: 100,
        image: ''
    },
    {
        key: 'Kilograms',
        text: '1 kg',
        value: 1000,
        image: ''
    },
]

function NutritionalFilter(props) {

    const [NutritionalType, setNutritionalType] = useState(null)
    const [NutritionalFactorToGrams, setNutritionalFactorToGrams] = useState(100)
    const [NutritionalAmount, setNutritionalAmount] = useState(1)

    // Add Type
    const onClick = (x, y) => props.onClick(x, y);

    // Change Type
    const handleNutritionalTypeChanged = (x) => setNutritionalType(nutritionalTypes.filter(nt => nt.key === x.value)[0])

    // Change Factor
    const handleNutritionalFactorToGramsChanged = (x) => setNutritionalFactorToGrams(nutritionalGramFactors.filter(nf => nf.value === x.value)[0].value)

    // Amount
    const handleNutritionalAmountChanged = (x) => setNutritionalAmount(x)

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "row", }}>


                <Dropdown
                    style={{ marginRight: "10px" }}
                    placeholder='Choose Nutritional-Type'
                    search
                    searchInput={{ type: 'text' }}
                    fluid
                    selection
                    options={nutritionalTypes}
                    onChange={(_, data) => handleNutritionalTypeChanged(data)} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", }}>


                <h3 style={{ color: '#ffffff' }}>Menge</h3>
                <NumberInput style={{ marginRight: "10px", width: '100px' }} value={NutritionalAmount} onChange={handleNutritionalAmountChanged} placeholder={"Menge"} />

                <br></br>
                <div className="mengeHolder" style={{ display: 'flex', flexDirection: 'row' }}>
                    <Dropdown
                        style={{ marginRight: "10px", width: '150px' }}
                        placeholder='Choose Amount Type'
                        search
                        searchInput={{ type: 'text' }}
                        fluid
                        selection
                        value={NutritionalFactorToGrams}
                        options={nutritionalGramFactors}
                        onChange={(_, data) => handleNutritionalFactorToGramsChanged(data)} />
                    {

                        NutritionalType
                            ? <IconButton icon="plus circle" color="green" name="" onClick={() => onClick(NutritionalType, NutritionalAmount * NutritionalFactorToGrams)} />
                            : <IconButton disabled icon="plus circle" color="black" name="" />
                    }
                </div>
            </div>

        </div>
    )
}

NutritionalFilter.propTypes = {
    nutritionalUnit: PropTypes.string,
    nutritionalTypeName: PropTypes.string,
    onClick: () => { }
}


export default NutritionalFilter
