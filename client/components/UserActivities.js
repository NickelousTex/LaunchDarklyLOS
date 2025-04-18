import React, { useEffect, useState } from 'react';
import { Grid, Button } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';

/* COMPONENTS */
import Title from './Title';
import { useLDClient } from 'launchdarkly-react-client-sdk';

export default function UserActivities() {
    const [showLogLeadButton, setShowLogLeadButton] = useState(false); // State for feature flag
    const ldClient = useLDClient();

    useEffect(() => {
        // Function to fetch the feature flag value
        const fetchFeatureFlags = async () => {
            try {
                const response = await fetch('/api/feature-flags'); // Fetch from backend API
                const data = await response.json();
                setShowLogLeadButton(data.showLogLeadButton); // Update state with flag value
            } catch (err) {
                console.error('Error fetching feature flags:', err);
            }
        };

        fetchFeatureFlags(); // Initial fetch
        const intervalId = setInterval(fetchFeatureFlags, 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    const handleLogCallClick = async () => {
        try {
            // Log call button click with user information
            console.log('Log Call button clicked by user:', process.env.REACT_APP_USER_KEY);
            if (ldClient) {
                ldClient.track('log-call-click', { key: process.env.REACT_APP_USER_KEY }, 1);
                // Flush events immediately
                await ldClient.flush();
                console.log('Event successfully flushed to LaunchDarkly');
            } else {
                // console logging for debugging
                console.error('LaunchDarkly client is not initialized');
            }
        } catch (error) {
            console.error('Error tracking event or flushing events:', error);
        }
    };
    // Initialize a click counter to send total click count for button
    let LogLeadclickCount = 0;
    const handleLogLeadClick = () => {
        LogLeadclickCount++;
        console.log(`Log Lead Button clicked. Total clicks: ${LogLeadclickCount}`);
    };
    const endSession = async () => {
        try {
            console.log(`Ending session with ${LogLeadclickCount} clicks.`);
            if (ldClient) {
                ldClient.track('log-lead-clicks', { key: process.env.REACT_APP_USER_KEY }, LogLeadclickCount);
                await ldClient.flush(); // Flush pending events
                console.log('Events successfully flushed');
            }
        } catch (error) {
            console.error('Error flushing events:', error);
        } finally {
            if (ldClient) ldClient.close(); // close client
            console.log('Session ended');
        }
    };
    window.addEventListener('beforeunload', endSession);

    return (
        <React.Fragment>
            <Title>User Quick Links</Title>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ flexGrow: 1 }}>
                {/* Conditionally render the first Grid item based on the feature flag */}
                {showLogLeadButton && (
                    <Grid item xs={6}>
                        <Button 
                            sx={{ backgroundColor: "#2b6777", width: '100%', display: 'flex', flexDirection: 'column' }} 
                            variant="contained" 
                            onClick={handleLogLeadClick} // Add click handler for tracking
                        >
                            <LibraryBooksIcon />Log Lead
                        </Button>
                    </Grid>
                )}
                <Grid item xs={6}>
                    <Button
                        sx={{ backgroundColor: "#2b6777", width: '100%', display: 'flex', flexDirection: 'column' }}
                        variant="contained"
                        onClick={handleLogCallClick} // Add click handler for tracking
                    >
                        <ContactPhoneIcon />Log Call
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button sx={{ backgroundColor: "#2b6777", width: '100%', display: 'flex', flexDirection: 'column' }} variant="contained">
                        <EditIcon />Update Info
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button sx={{ backgroundColor: "#2b6777", width: '100%', display: 'flex', flexDirection: 'column' }} variant="contained">
                        <InfoIcon />View Info
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
