import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '/components/Navbar';
import electricityStyles from '@/styles/ElectricityEstimate.module.css';
import { estimateElectricity } from '@/pages/api/estimate';
import useAuth from '@/components/auth';
import Swal from 'sweetalert2';

const Electricity = () => {
    useAuth();
    const [electricityUnit, setElectricityUnit] = useState('');
    const [electricityValue, setElectricityValue] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [estimateResult, setEstimateResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorText, setErrorText] = useState('');

    const handleEstimate = async () => {
        setIsLoading(true);

        const data = {
            "type": 'electricity',
            "electricity_unit": electricityUnit,
            "electricity_value": parseFloat(electricityValue),
            "country": country,
            "state": state
        };

        try {
            const responseData = await estimateElectricity(data);
    
            if (responseData && responseData.data) {
                setEstimateResult(responseData.data.attributes);
            } else {
                console.error("Response data or data.attributes is undefined.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while fetching the estimate. Please check your inputs and try again.',
                confirmButtonText: 'OK'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className={electricityStyles.outerContainer}>
                <div className={electricityStyles.innerContainer}>
                    <div className={electricityStyles.infoContainer}>
                        <h3>Electricity Estimate Information</h3>
                        <p>
                        The electricity estimate endpoint will provide carbon emissions in grams, pounds, kilograms and tonnes. To create an electricity estimate, provide the following params:
                        </p>
                        <ul>
                            <li>
                                <strong>Type:</strong> electricity
                            </li>
                            <li>
                                <strong>Electricity Unit:</strong> Can be either megawatt hours mwh or kilowatt hours kwh. If a unit is not provided, mwh is the default.
                            </li>
                            <li>
                                <strong>Electricity Value:</strong> Value of the unit of electricity consumption or generation noted above.
                            </li>
                            <li>
                                <strong>Country:</strong> Set to the country you need emissions data on for electricity consumption. Currently, Carbon Interface supports North American and European countries and sub-regions. Visit our <a href='https://faint-class-d56.notion.site/4b4f41db73254b4b915ba01d55eba7e7?v=4ad0efe7763540ab801fadd9f3bf1ce0'target="_blank" rel="noopener noreferrer">geographic coverage page</a> to see what countries and regions are supported. The country must be passed through using the country's ISO 3166 country code found <a href="https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes" target="_blank" rel="noopener noreferrer">here</a>.
                            </li>
                            <li>
                                <strong>State:</strong> Proving the state will allow the API to generate a more accurate eletrcitiy emissions estimate. Emissions data from electricity generation from all Canadian provinces and US states is supported. The state param needs to be the two letter ISO state code.
                            </li>
                        </ul>
                    </div>
                    <div className={electricityStyles.formContainer}>
                        <div className={electricityStyles.formContent}>
                            <h4>Electricity Estimate</h4>
                            Electricity Unit:
                            <input
                                className={electricityStyles.input}
                                type="text"
                                placeholder="mwh or kwh"
                                value={electricityUnit}
                                onChange={(e) => setElectricityUnit(e.target.value)}
                            />
                            Electricity Value:
                            <input
                                className={electricityStyles.input}
                                type="number"
                                placeholder="Electricity Value"
                                value={electricityValue}
                                onChange={(e) => setElectricityValue(e.target.value)}
                            />
                            Country:
                            <input
                                className={electricityStyles.input}
                                type="text"
                                placeholder="us, ca, etc"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                            State:
                            <input
                                className={electricityStyles.input}
                                type="text"
                                placeholder="fl, az, etc"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                            <div className={electricityStyles.btnContainer}>
                                <button className={electricityStyles.btn} onClick={handleEstimate}>
                                Get Estimate
                                </button>
                            </div>
                            </div>
                            <div className={electricityStyles.resultContainer}>
                                <h4>Estimated CO2 Emission:</h4>
                            {isLoading && <p>Loading...</p>}
                            {estimateResult && (
                                <div className={electricityStyles.result}>
                                <p>carbon_g: {estimateResult.carbon_g}</p>
                                <p>carbon_lb: {estimateResult.carbon_lb}</p>
                                <p>carbon_kg: {estimateResult.carbon_kg}</p>
                                <p>carbon_mt: {estimateResult.carbon_mt}</p>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
        </div>
        </>
    );
};

export default Electricity;
