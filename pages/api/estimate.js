
// electricity API
export const estimateElectricity = async (electricityData) => {
    try {
        const response = await fetch("https://www.carboninterface.com/api/v1/estimates", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            },
            body: JSON.stringify(electricityData),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch data from Carbon Interface API.");
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Error fetching data.");
    }
};


// flights API
export const estimateFlight = async (flightsData) => {
    try {
        const response = await fetch("https://www.carboninterface.com/api/v1/estimates", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            },
            body: JSON.stringify(flightsData),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch data from Carbon Interface API.");
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Error fetching data.");
    }
};

// Fuel Combustion API
export const estimateFuel = async (fuelData) => {
    try {
        const response = await fetch("https://www.carboninterface.com/api/v1/estimates", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            },
            body: JSON.stringify(fuelData),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch data from Carbon Interface API.");
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Error fetching data.");
    }
};


