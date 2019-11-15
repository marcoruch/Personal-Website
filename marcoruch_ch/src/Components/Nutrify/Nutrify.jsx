import React, { useState } from 'react'
import { Dropdown, Grid, GridColumn } from 'semantic-ui-react'
import NutritionalFilter from './NutritionalFilter/NutritionalFilter'
import NutritionalFilterLabel from './NutritionalFilterLabel/NutritionalFilterLabel'
import PropTypes from 'prop-types'
import { Visible } from '../GeneralComponents/DesignHelper/DesignHelper'
import './Nutrify.scss';
import IconButton from '../GeneralComponents/IconButton/IconButton'

function Nutrify(props) {

    const DietTypes = [
        {
            key: "Personalized",
            text: "Personalisiert",
            value: "Personalized",
            image: ""
        },
        {
            key: "Low-Carb",
            text: "Low-Carb",
            value: "LowCarb",
            image: ""
        },
        {
            key: "High-Proteine",
            text: "High-Proteine",
            value: "HighProteine",
            image: ""
        },
        {
            key: "Diabetes",
            text: "Diabetes",
            value: "Diabetes",
            image: ""
        }
    ]
    const [DietType, setDietType] = useState(null);
    const [NutritionalFilters, setNutritionalFilters] = useState([]);

    const handleDietType = (x) => {
        setDietType(DietTypes.filter(nt => nt.key === x.value)[0])
    }

    const handleNewNutritionalFilter = (newNutritionalFilter, nutritionalAmount) => {
        if (NutritionalFilters.length > 0 && NutritionalFilters.filter(nf => nf.type.key === newNutritionalFilter.key).length === 0) {
            setNutritionalFilters([...NutritionalFilters, { type: newNutritionalFilter, amount: nutritionalAmount}])
        } else if (NutritionalFilters.length === 0) {
            setNutritionalFilters([{ type: newNutritionalFilter, amount: nutritionalAmount}])
        } else {
            console.warn("Nutritional Filter already added: ", { type: newNutritionalFilter, amount: nutritionalAmount});
        }
    }

    return (
        <div className="nutrify">
            <h3 className="welcome-text">Welcome to Nutrify</h3>
            <div className="content">
                <div className="filter-menu">
                    <Grid width={16}>
                        <GridColumn width={3} id="diet-type" className="filter-sub-menu">
                            <Dropdown
                                placeholder='Select Friend'
                                fluid
                                selection
                                width={"300px"}
                                options={DietTypes}
                                onChange={(_, data) => handleDietType(data)} />
                        </GridColumn>
                        <GridColumn style={{ display: Visible(DietType && DietType.key === "Personalized") }} width={4} id="personal-filters" className="filter-sub-menu">
                            <NutritionalFilter onClick={handleNewNutritionalFilter} /><br />
                            {
                                NutritionalFilters && NutritionalFilters.length > 0 
                                ? <div>
                                    <h3 style={{ color: '#ffffff' }}>Nährstoffe: </h3>
                                    { NutritionalFilters.map(x => <NutritionalFilterLabel text={x.type.text + " ("+x.amount +"g)"} color={"black"}  backgroundColor={"green"}></NutritionalFilterLabel>) }
                                </div>
                                : ""
                            }
                        </GridColumn>
                        <GridColumn style={{ display: Visible(DietType) }} width={4} id="get-recipes" className="filter-sub-menu">
                            <IconButton text="Filtern" icon="send" labelPosition={"right"} onClick={()=> {}} color={"teal"} ></IconButton>
                        </GridColumn>
                    </Grid>

                </div>
            </div>
        </div>
    )
}

Nutrify.propTypes = {
    DietType: PropTypes.string,
    DietTypes: PropTypes.array
}

export default Nutrify

