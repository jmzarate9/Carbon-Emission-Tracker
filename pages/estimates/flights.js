import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '/components/Navbar';
import flightStyles from '@/styles/FlightEstimate.module.css';
import { estimateFlight } from '@/pages/api/estimate';
import useAuth from '@/components/auth'; 
import Swal from 'sweetalert2';

const FlightEstimate = () => {
    useAuth();
    const [passengers, setPassengers] = useState('');
    const [departureAirport1, setDepartureAirport1] = useState('');
    const [destinationAirport1, setDestinationAirport1] = useState('');
    const [departureAirport2, setDepartureAirport2] = useState('');
    const [destinationAirport2, setDestinationAirport2] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [estimateResult, setEstimateResult] = useState(null);

    const handleEstimate = async () => {
            setIsLoading(true);
    
            const data = {
                type: 'flight',
                passengers: parseInt(passengers, 10),
                legs: [
                {
                    departure_airport: departureAirport1,
                    destination_airport: destinationAirport1,
                },
                {
                    departure_airport: departureAirport2,
                    destination_airport: destinationAirport2,
                },
                ],
            };
    
            try {
                const responseData = await estimateFlight(data);
    
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
        }

    return (
        <>
            <Navbar />
            <div className={flightStyles.outerContainer}>
                <div className={flightStyles.innerContainer}>
                    <div className={flightStyles.infoContainer}>
                        <h3>Flights Estimate Information</h3>
                        <p>
                        The flight estimate request will accept passenger flight details and compute the carbon emissions for the trip. To compute the carbon emissions of a round trip ensure the legs param includes both the departure flight and the return flight.
                        </p>
                        <ul>
                            <li>
                                <strong>Type:</strong> flights
                            </li>
                            <li>
                                <strong>Passengers:</strong> Number of passengers you want the emissions estimate to be calculated for.
                            </li>
                            <li>
                                <strong>Legs:</strong> array of Leg objects - see below for more details on the Leg object.
                            </li>
                            <li>
                                <strong>Departure Airport:</strong> The departure airport <a href="https://www.iata.org/en/publications/directories/code-search/" target="_blank" rel="noopener noreferrer">IATA Code</a>.
                            </li>
                            <li>
                                <strong>Destination Airport:</strong> The destination airport <a href="https://www.iata.org/en/publications/directories/code-search/" target="_blank" rel="noopener noreferrer">IATA Code</a>.
                            </li>
                        </ul>
                    </div>
                    <div className={flightStyles.formContainer}>
                        <div className={flightStyles.formContent}>
                        <h4>Flight Emission</h4>
                            Passengers:
                            <input
                                className={flightStyles.input}
                                type="text"
                                placeholder="Number of Passengers"
                                value={passengers}
                                onChange={(e) => setPassengers(e.target.value)}
                            />
                            Departure Airport 1:
                            <input
                                className={flightStyles.input}
                                type="text"
                                placeholder="Departure Airport"
                                value={departureAirport1}
                                onChange={(e) => setDepartureAirport1(e.target.value)}
                            />
                            Destination Airport 1:
                            <input
                                className={flightStyles.input}
                                type="text"
                                placeholder="Destination Airport"
                                value={destinationAirport1}
                                onChange={(e) => setDestinationAirport1(e.target.value)}
                            />
                            Departure Airport 2:
                            <input
                                className={flightStyles.input}
                                type="text"
                                placeholder="Departure Airport"
                                value={departureAirport2}
                                onChange={(e) => setDepartureAirport2(e.target.value)}
                            />
                            Destination Airport 2:
                            <input
                                className={flightStyles.input}
                                type="text"
                                placeholder="Destination Airport"
                                value={destinationAirport2}
                                onChange={(e) => setDestinationAirport2(e.target.value)}
                            />
                            <div className={flightStyles.btnContainer}>
                                <button className={flightStyles.btn} onClick={handleEstimate}>
                                Get Estimate
                                </button>
                            </div>
                            </div>
                            <div className={flightStyles.resultContainer}>
                                <h4>Estimated CO2 Emission:</h4>
                            {isLoading && <p>Loading...</p>}
                            {estimateResult && (
                                <div className={flightStyles.result}>
                                <p>carbon_g: {estimateResult.carbon_g}</p>
                                <p>carbon_lb: {estimateResult.carbon_lb}</p>
                                <p>carbon_kg: {estimateResult.carbon_kg}</p>
                                <p>carbon_mt: {estimateResult.carbon_mt}</p>
                                <p>distance_value: {estimateResult.distance_value} km</p>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
        </div>
        </>
    );
};

export default FlightEstimate;