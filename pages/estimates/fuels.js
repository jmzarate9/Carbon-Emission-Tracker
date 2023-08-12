import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '/components/Navbar';
import fuelCombustionStyles from '@/styles/FuelsEstimate.module.css'; 
import { estimateFuel } from '@/pages/api/estimate'; 
import useAuth from '@/components/auth';
import Swal from 'sweetalert2';

const FuelCombustion = () => {
    useAuth();
    const [fuelSourceType, setFuelSourceType] = useState('');
    const [fuelSourceUnit, setFuelSourceUnit] = useState('');
    const [fuelSourceValue, setFuelSourceValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [estimateResult, setEstimateResult] = useState(null);

    const handleEstimate = async () => {
        setIsLoading(true);

        const data = {
        type: 'fuel_combustion',
        fuel_source_type: fuelSourceType,
        fuel_source_unit: fuelSourceUnit,
        fuel_source_value: parseFloat(fuelSourceValue),
        };

        try {
            const responseData = await estimateFuel(data);

            if (responseData && responseData.data) {
                setEstimateResult(responseData.data.attributes);
                console.log("result: " + estimateResult);
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
        <div className={fuelCombustionStyles.outerContainer}>
            <div className={fuelCombustionStyles.innerContainer}>
            <div className={fuelCombustionStyles.infoContainer}>
                <h3>Fuel Combustion Estimate Information</h3>
                <p>
                    To estimate carbon emissions from fuel combustion, please provide the following parameters:
                </p>
                <ul>
                <li>
                    <strong>Type:</strong> fuel_combustion
                </li>
                <li>
                    <strong>Fuel Source Type:</strong> The api_name of the fuel source you want to calculate combustion emissions from. The full list of fuel sources available can be found <a href="https://faint-class-d56.notion.site/Carbon-Interface-Fuel-Sources-0166b59ec1514984895cc7dd35836392">here</a>.
                </li>
                <li>
                    <strong>Fuel Source Unit:</strong> The unit of the fuel_source that you want combustion emissions from. Units are specific to the fuel_source_type, so please view the units available per fuel source <a href="https://faint-class-d56.notion.site/Carbon-Interface-Fuel-Sources-0166b59ec1514984895cc7dd35836392">here</a>.
                </li>
                <li>
                    <strong>Fuel Source Value:</strong> Amount of the above specific unit and fuel source that you want an emissions estimate for.
                </li>
                </ul>
            </div>
            <div className={fuelCombustionStyles.formContainer}>
                <div className={fuelCombustionStyles.formContent}>
                    <h4>Fuel Combustion Emission</h4>
                    Fuel Source Type:
                    <input 
                        className={fuelCombustionStyles.input}
                        type="text"
                        placeholder="dfo, ker, jr, pg, etc"
                        value={fuelSourceType}
                        onChange={(e) => setFuelSourceType(e.target.value)}
                    />
                    Fuel Source Unit:
                    <input 
                        className={fuelCombustionStyles.input}
                        type="text"
                        placeholder="btu, gallon, short_ton, etc"
                        value={fuelSourceUnit}
                        onChange={(e) => setFuelSourceUnit(e.target.value)}
                    />
                    Fuel Source Value:
                    <input
                        className={fuelCombustionStyles.input}
                        type="text"
                        placeholder="Fuel Source Value"
                        value={fuelSourceValue}
                        onChange={(e) => setFuelSourceValue(e.target.value)}
                    />
                    <div className={fuelCombustionStyles.btnContainer}>
                        <button className={fuelCombustionStyles.btn} onClick={handleEstimate}>
                        Get Estimate
                        </button>
                    </div>
                    </div>
                    <div className={fuelCombustionStyles.resultContainer}>
                        <h4>Estimated CO2 Emission:</h4>
                    {isLoading && <p>Loading...</p>}
                    {estimateResult && (
                        <div className={fuelCombustionStyles.result}>
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

export default FuelCombustion;
