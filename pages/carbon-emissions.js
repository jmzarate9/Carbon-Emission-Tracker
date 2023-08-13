import React from 'react';
import Navbar from '../components/Navbar'; 
import emissionStyles from '../styles/Emission.module.css'; 

const CarbonEmissionPage = () => {
    return (
        <div className={emissionStyles.container}>
            <Navbar />

            <div className={emissionStyles.content}>
                <h1 className={emissionStyles.heading}>Understanding Carbon Emission</h1>
                <p className={emissionStyles.paragraph}>
                    Carbon emissions primarily come from burning fossil fuels like coal, oil, and gas. These emissions trap heat in the atmosphere, leading to temperature rise and environmental imbalances. By measuring and tracking your carbon emissions, you're taking the first step toward a more sustainable future.
                </p>
                
                <h2 className={emissionStyles.subHeading}>Common Carbon Emitting Activities</h2>
                <p className={emissionStyles.paragraph}>
                    <span className={emissionStyles.sectionHeading}>Transportation:</span> Whether it's driving your car, flying, or using public transport, getting from point A to point B often involves burning fossil fuels, thus emitting carbon dioxide.
                </p>
                <p className={emissionStyles.paragraph}>
                    <span className={emissionStyles.sectionHeading}>Energy Consumption: </span> Heating, cooling, and lighting our homes and workplaces rely on energy sources that emit carbon, such as electricity generated from fossil fuels.
                </p>
                <p className={emissionStyles.paragraph}>
                    <span className={emissionStyles.sectionHeading}>Dietary Choices:</span> Believe it or not, what's on your plate matters too. The production of certain foods, especially meat and dairy, releases significant carbon emissions.
                </p>
                <p className={emissionStyles.paragraph}>
                    <span className={emissionStyles.sectionHeading}>Waste Generation:</span> The way we dispose of waste, especially non-biodegradable items, leads to the release of methane, a potent greenhouse gas.
                </p>
                <p className={emissionStyles.paragraph}>
                    <span className={emissionStyles.sectionHeading}>Industrial Processes:</span> Factories and manufacturing facilities emit carbon during their operations, contributing to a large portion of global emissions.
                </p>
                
                <h2 className={emissionStyles.subHeading}>Why Track Your Carbon Emissions?</h2>
                <p className={emissionStyles.paragraph}>
                    Tracking your carbon emissions isn't about pointing fingers; it's about taking responsibility. By understanding which activities contribute the most to your carbon footprint, you can make informed choices to reduce your impact. Small changes in your lifestyle can lead to significant improvements for our planet.
                </p>

                <div className={emissionStyles.section}>
                    <h2 className={emissionStyles.subHeading}>Research Papers and Resources</h2>
                    <p className={emissionStyles.paragraph}>
                        For more in-depth information about carbon emissions and their impact, you can explore the following research papers and resources:
                    </p>
                    <ul className={emissionStyles.resourcesList}>
                        <li><a href="https://faint-class-d56.notion.site/Carbon-Interface-Methodology-d788fff61c724a48b100e0f7d77c0c57" target="_blank" rel="noopener noreferrer">Carbon Interface - Methodology</a></li>

                        <li><a href="https://www.epa.gov/climateleadership/scope-1-and-scope-2-inventory-guidance" target="_blank" rel="noopener noreferrer">US EPA Scope 1 and Scope 2 Inventory Guidance</a></li>

                        <li><a href="https://www.canada.ca/en/environment-climate-change/services/environmental-indicators/greenhouse-gas-emissions.html" target="_blank" rel="noopener noreferrer">Greenhouse gas emissions</a></li>

                        <li><a href="https://ghgprotocol.org/online-training" target="_blank" rel="noopener noreferrer">Greenhouse Gas Protocol Courses Materials</a></li>

                        <li><a href="https://www.udemy.com/course/scope-1-greenhouse-gas-emissions-calculation-methodology/" target="_blank" rel="noopener noreferrer">HPBS BV Environmental Consulting (Udemy) – Scope 1: Greenhouse Gases Emissions Calculation Methodology (Online Course)</a></li>

                        <li><a href="https://www.udemy.com/course/scope-2-greenhouse-gases-emission-calculation-methodology/" target="_blank" rel="noopener noreferrer">HPBS BV Environmental Consulting (Udemy) – Scope 2: Greenhouse Gases Emissions Calculation Methodology (Online Course)</a></li>

                        <li><a href="https://www.udemy.com/course/scope-3-ghg-emissions-calculation-methodology/" target="_blank" rel="noopener noreferrer">HPBS BV Environmental Consulting (Udemy) – Scope 3: Greenhouse Gases Emissions Calculation Methodology (Online Course)</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CarbonEmissionPage;