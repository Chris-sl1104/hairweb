import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScriptNext } from '@react-google-maps/api';
import { Box, Typography, Grid, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '10px',
};

const shopLocation = {
    lat: -37.79559755602221,
    lng: 144.97660405563076,
};

const defaultZoom = 16;

const Map = () => {
    const [apiKey, setApiKey] = useState('');
    const [mapInstance, setMapInstance] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        // Fetch the Google Maps API key from the server
        fetch('http://192.168.0.108:5000/api/get-maps-api-key')
            .then((response) => response.json())
            .then((data) => {
                setApiKey(data.apiKey);
            })
            .catch((error) => {
                console.error('Error fetching API key:', error);
            });
    }, []);

    // Callback to handle map load event
    const onLoad = useCallback((map) => {
        setMapInstance(map);
    }, []);

    // Effect to add marker once the map is loaded
    useEffect(() => {
        if (mapInstance) {
            (async () => {
                const { AdvancedMarkerElement } = await window.google.maps.importLibrary('marker');
                new AdvancedMarkerElement({
                    map: mapInstance,
                    position: shopLocation,
                    title: 'Shop Location',
                });
            })();
        }
    }, [mapInstance]);

    const handleRefresh = () => {
        window.location.reload();
    };

    if (!apiKey) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    backgroundColor: theme.palette.background.default,
                }}
            >
                <Button
                    variant="contained"
                    onClick={handleRefresh}
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        padding: '10px 20px',
                        fontSize: '16px',
                    }}
                >
                    Unable to load Google Map, click to refresh
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{
            paddingTop: 10,
            paddingX: 2,
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
        }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ color: theme.palette.text.primary }}>
                Our Store Location
            </Typography>

            <LoadScriptNext googleMapsApiKey={apiKey} libraries={['marker']}>
                <Box sx={{ borderRadius: '10px', overflow: 'hidden', boxShadow: 3 }}>
                    <GoogleMap
                        id="map"
                        mapContainerStyle={mapContainerStyle}
                        zoom={defaultZoom}
                        center={shopLocation}
                        onLoad={onLoad}
                        options={{
                            mapId: 'a78d721437c7bbb',
                        }}
                    />
                </Box>
            </LoadScriptNext>

            <Box sx={{ marginTop: 4 }}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6} lg={6}>
                        <Box sx={{ padding: 2, paddingLeft: {sx: 0, md: 12, lg: 25}, textAlign: 'left' }}>
                            <Typography variant="h6" sx={{ color: theme.palette.warning.main }}>
                                We are located at:
                            </Typography>
                            <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                                33 Rose St, <br />Fitzroy, Victoria, <br />3065, Australia
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={6}>
                        <Box sx={{ padding: 2, paddingLeft: {sx: 0, md: 8, lg: 15}, textAlign: 'left' }}>
                            <Typography variant="h6" sx={{ color: theme.palette.warning.main }}>
                                Business Hours:
                            </Typography>
                            <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                                Monday - Friday: 9:00 AM - 6:00 PM
                            </Typography>
                            <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                                Saturday: 10:00 AM - 4:00 PM
                            </Typography>
                            <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
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
