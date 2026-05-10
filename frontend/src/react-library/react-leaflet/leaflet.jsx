import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const countries = [
    { country: "United States", latitude: 39.8283, longitude: -98.5795 },
    { country: "Canada", latitude: 56.1304, longitude: -106.3468 },
    { country: "United Kingdom", latitude: 55.3781, longitude: -3.4360 },
    { country: "Australia", latitude: -25.2744, longitude: 133.7751 },
    { country: "Germany", latitude: 51.1657, longitude: 10.4515 },
    { country: "France", latitude: 46.2276, longitude: 2.2137 },
    { country: "Netherlands", latitude: 52.1326, longitude: 5.2913 },
    { country: "Sweden", latitude: 60.1282, longitude: 18.6435 },
    { country: "Norway", latitude: 60.4720, longitude: 8.4689 },
    { country: "Denmark", latitude: 56.2639, longitude: 9.5018 },
    { country: "Finland", latitude: 61.9241, longitude: 25.7482 },
    { country: "Ireland", latitude: 53.1424, longitude: -7.6921 },
    { country: "Switzerland", latitude: 46.8182, longitude: 8.2275 },
    { country: "Austria", latitude: 47.5162, longitude: 14.5501 },
    { country: "Italy", latitude: 41.8719, longitude: 12.5674 },
    { country: "Spain", latitude: 40.4637, longitude: -3.7492 },
    { country: "Portugal", latitude: 39.3999, longitude: -8.2245 },
    { country: "Belgium", latitude: 50.5039, longitude: 4.4699 },
    { country: "Japan", latitude: 36.2048, longitude: 138.2529 },
    { country: "South Korea", latitude: 35.9078, longitude: 127.7669 },
    { country: "China", latitude: 35.8617, longitude: 104.1954 },
    { country: "Singapore", latitude: 1.3521, longitude: 103.8198 },
    { country: "Malaysia", latitude: 4.2105, longitude: 101.9758 },
    { country: "India", latitude: 20.5937, longitude: 78.9629 },
    { country: "Bangladesh", latitude: 23.6850, longitude: 90.3563 },
    { country: "Pakistan", latitude: 30.3753, longitude: 69.3451 },
    { country: "United Arab Emirates", latitude: 23.4241, longitude: 53.8478 },
    { country: "Saudi Arabia", latitude: 23.8859, longitude: 45.0792 },
    { country: "Turkey", latitude: 38.9637, longitude: 35.2433 },
    { country: "Poland", latitude: 51.9194, longitude: 19.1451 },
    { country: "Czech Republic", latitude: 49.8175, longitude: 15.4730 },
    { country: "Hungary", latitude: 47.1625, longitude: 19.5033 },
    { country: "Romania", latitude: 45.9432, longitude: 24.9668 },
    { country: "Lithuania", latitude: 55.1694, longitude: 23.8813 },
    { country: "Latvia", latitude: 56.8796, longitude: 24.6032 },
    { country: "Estonia", latitude: 58.5953, longitude: 25.0136 },
    { country: "New Zealand", latitude: -40.9006, longitude: 174.8860 },
    { country: "Brazil", latitude: -14.2350, longitude: -51.9253 },
    { country: "Argentina", latitude: -38.4161, longitude: -63.6167 },
    { country: "Mexico", latitude: 23.6345, longitude: -102.5528 },
    { country: "Chile", latitude: -35.6751, longitude: -71.5430 },
    { country: "South Africa", latitude: -30.5595, longitude: 22.9375 },
    { country: "Egypt", latitude: 26.8206, longitude: 30.8025 },
    { country: "Qatar", latitude: 25.3548, longitude: 51.1839 },
    { country: "Thailand", latitude: 15.8700, longitude: 100.9925 },
    { country: "Vietnam", latitude: 14.0583, longitude: 108.2772 },
    { country: "Indonesia", latitude: -0.7893, longitude: 113.9213 },
    { country: "Philippines", latitude: 12.8797, longitude: 121.7740 }
];



export const Divisions = () => {

    return (
        <MapContainer center={[23.505, 90.09]} zoom={6} scrollWheelZoom={false} className='h-100 w-100' >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />



        </MapContainer>
    )
}


export const SearchCountries = () => {

    const mapRef = useRef(null);


    function Search(val) {

        let country = countries.find(x => x.country.toLowerCase().includes(val.toLowerCase()))
        if (country) {
            let coord = [country.latitude, country.longitude]
            mapRef.current.flyTo(coord, 5);
        }
    }


    return (
        <div className='flex flex-col w-full px-4 relative' >

            <div className='header-12' >Locate Available Destinations </div>

            <input
                className='bg-(--color4) text-(--color1) absolute top-16 left-24 z-10 rounded-lg' style={{ width: '15rem' }}
                placeholder='Search by country' onChange={(e) => Search(e.target.value)} />

            <div className='border-2 rounded-lg border-(--color4)' >
                <MapContainer ref={mapRef} center={[0, 0]} zoom={2} scrollWheelZoom={false} className='h-100 z-0 w-full' >

                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />


                    {countries && countries.map(center => (
                        <Marker key={center.country} position={[center.latitude, center.longitude]}>
                            <Popup>
                                {center.country}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

            </div>
        </div>
    )
}


export const Leaflet = () => {


    return (

        <div>
            <SearchDivisions />
        </div>

    );
};

