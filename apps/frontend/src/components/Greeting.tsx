import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/greeting";

interface GreetingResponse {
    greeting: string;
}

const Greeting = () => {
    const [greeting, setGreeting] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGreeting = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error("Failed to fetch greeting");
                const data: GreetingResponse = await response.json();
                setGreeting(data.greeting);
            } catch (err) {
                setError((err as Error).message);
            }
        };

        fetchGreeting();
    }, []);

    if (error) return <p>Error: {error}</p>;
    return <p>{greeting ? greeting : "Loading..."}</p>;
};

export default Greeting;
