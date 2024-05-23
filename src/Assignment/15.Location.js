import { useState, useEffect } from 'react';

export default function Location() {
    const [location, setLocation] = useState({});
    const [city, setCity] = useState({});

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        setLocation({ latitude, longitude });
                    },
                    error => {
                        console.error('Error:', error.message);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };
        

        getLocation();
    }, []);
     // Empty dependency array ensures that the effect runs only once, when the component mounts

    const handleCity = () => {
        if (!location.latitude || !location.longitude) {
            console.error('Location not available.');
            return;
        }

        fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.3031931bdb165a63999d2242c99a5529&lat=${location.latitude}&lon=${location.longitude}&format=json`)
            .then(response => response.json())
            .then(data => {
                setCity(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <h1>Location</h1>
            <h3>Latitude: {location.latitude}</h3>
            <h3>Longitude: {location.longitude}</h3>
            {city.address && <h3>City: {city.address.city}</h3>}
            <button onClick={handleCity}>Get City</button>
        </div>
    );
}
