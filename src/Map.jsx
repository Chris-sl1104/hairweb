import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Box, Typography, Grid } from '@mui/material';

const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '10px', // Adding rounded corners to the map
};

// Latitude and longitude for the shop location
const shopLocation = {
    lat: -37.79559755602221,
    lng: 144.97660405563076,
};

// Set the default zoom level of the map
const defaultZoom = 16;

const Map = () => {
    const [apiKey, setApiKey] = useState('');
    const [mapRefreshKey, setMapRefreshKey] = useState(0);

    useEffect(() => {
        // Fetch the Google Maps API key from the server
        fetch('http://192.168.0.108:5000/api/get-maps-api-key')
            .then((response) => response.json())
            .then((data) => {
                setApiKey(data.apiKey); // Save the API key in state
            })
            .catch((error) => {
                console.error('Error fetching API key:', error);
            });
    }, []);

    useEffect(() => {
        // Check if the Google Maps API has loaded and initialize the map
        if (window.google && window.google.maps) {
            (async () => {
                const { AdvancedMarkerElement } = await window.google.maps.importLibrary('marker');

                const map = new window.google.maps.Map(document.getElementById('map'), {
                    zoom: defaultZoom,
                    center: shopLocation,
                    mapId: 'a78d721437c7bbb', // Replace with your own mapId
                });

                // Add an advanced marker to the map at the shop location
                new AdvancedMarkerElement({
                    map,
                    position: shopLocation,
                    title: 'Shop Location',
                });
            })();
        }
    }, [mapRefreshKey]); // Refresh the map when mapRefreshKey changes

    useEffect(() => {
        // Once the API key is set, trigger a re-render to refresh the map
        if (apiKey) {
            const timer = setTimeout(() => {
                setMapRefreshKey((prevKey) => prevKey + 1);
            }, 1000);
            return () => clearTimeout(timer); // Cleanup the timer
        }
    }, [apiKey]);

    if (!apiKey) {
        return <div>Loading...</div>; // Show a loading message if the API key hasn't loaded yet
    }

    return (
        <Box sx={{ paddingTop: 10, paddingX: 2 }}>
            {/* Title */}
            <Typography variant="h4" align="center" gutterBottom sx={{ color: '#fff' }}>
                Our Store Location
            </Typography>

            {/* Google Map */}
            <LoadScript googleMapsApiKey={apiKey} libraries={['marker']}>
                <Box sx={{ borderRadius: '10px', overflow: 'hidden', boxShadow: 3 }}>
                    <div id="map" style={mapContainerStyle}></div>
                </Box>
            </LoadScript>

            {/* Store Information */}
            <Box sx={{ marginTop: 4 }}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6} lg={6}>
                        <Box sx={{ padding: 2, paddingLeft: {sx: 0, md: 12, lg: 25}, textAlign: 'left' }}> {/* Align text to the left */}
                            <Typography variant="h6" sx={{ color: '#ffa726' }}>
                                We are located at:
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#fff' }}>
                                33 Rose St, <br />Fitzroy, Victoria, <br />3065, Australia
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={6}>
                        <Box sx={{ padding: 2, paddingLeft: {sx: 0, md: 8, lg: 15}, textAlign: 'left' }}> {/* Align text to the left */}
                            <Typography variant="h6" sx={{ color: '#ffa726' }}>
                                Business Hours:
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#fff' }}>
                                Monday - Friday: 9:00 AM - 6:00 PM
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#fff' }}>
                                Saturday: 10:00 AM - 4:00 PM
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#fff' }}>
                                Sunday: Closed
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Map;
