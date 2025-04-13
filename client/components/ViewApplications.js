import * as React from 'react';
import VerifyIQ from '@informed-iq/verify-iq-sdk';
import { Typography, Grid, TextField } from '@mui/material';

/* COMPONENTS */
import Title from './Title';
import VerifyIQOpen from './VerifyIQOpen';
import VerifyIQSettings from './VerifyIQSettings';
import RequestIQOpen from './RequestIQOpen';

export default function ViewApplications() {
    const [applicationId, setApplicationId] = React.useState('');
    const [verifyIQAuthToken, setVerifyIQAuthToken] = React.useState('');
    const [verifyIQEnvironment, setVerifyIQEnvironment] = React.useState('');
    const [verifyIQIIQURL, setVerifyIQIIQURL] = React.useState('');
    const [verifyIQACURL, setVerifyIQACURL] = React.useState('');
    const [verifyIQApplicant, setVerifyIQApplicant] = React.useState('');
    const [verifyIQDocumentModalOption, setVerifyIQDocumentModalOption] = React.useState('');
    const [verifyIQStipulation, setVerifyIQStipulation] = React.useState('');
    const [verifyIQUploadWebhook, setVerifyIQUploadWebhook] = React.useState('');
    const [verifyIQCollectWebhook, setVerifyIQCollectWebhook] = React.useState('');
    const [verifyIQJWT, setVerifyIQJWT] = React.useState('');
    const [verifyIQPrecheckedDocuments, setVerifyIQPrecheckedDocuments] = React.useState({});
    const [viq, setViq] = React.useState({});

    const handleVerifyIQAuthTokenChange = (event) => {
        setVerifyIQAuthToken(event.target.value);
    }

    const handleVerifyIQEnvironmentChange = (event) => {
        setVerifyIQEnvironment(event.target.value);
    }

    const handleApplicationIdChange = (event) => {
        setApplicationId(event.target.value);
    }

    const handleVerifyIQACURLChange = (event) => {
        setVerifyIQACURL(event.target.value);
    }

    const handleVerifyIQIIQURLChange = (event) => {
        setVerifyIQIIQURL(event.target.value);
    }

    const handleVerifyIQApplicantChange = (event) => {
        setVerifyIQApplicant(event.target.value);

    }
    const handleVerifyIQDocumentModalOptionChange = (event) => {
        setVerifyIQDocumentModalOption(event.target.value);
    }

    const handleVerifyIQStipulationChange = (event) => {
        setVerifyIQStipulation(event.target.value);
    }
    const handleVerifyIQUploadWebhookChange = (event) => {
        setVerifyIQUploadWebhook(event.target.value);
    }
    const handleVerifyIQCollectWebhookChange = (event) => {
        setVerifyIQCollectWebhook(event.target.value);
    }
    const handleVerifyIQJWTChange = (event) => {
        setVerifyIQJWT(event.target.value);
    }
    const handleVerifyIQPrecheckedDocumentsChange = (event) => {
        setVerifyIQPrecheckedDocuments(event.target.value);
    }

    const initVerifyIQ = () => {
        let tmp = new VerifyIQ({
            authType: VerifyIQ.auth.Tab,
            authToken: verifyIQAuthToken,
            environment: verifyIQEnvironment,
            actionCallbackWebhookUrl: verifyIQACURL,
            url: verifyIQIIQURL,
            onPass: function (actionObject, reason) {
                /* Stipulation action handler */
                console.log('Pass', actionObject, reason);
            },

            onDocumentRequestedViaSms: function (stipObjects) {
                console.log('onRequestDocumentsViaSms', stipObjects);
            },

            onIncomplete: function (actionObject, reason) {
                /* Stipulation action handler */
                console.log('Incomplete', actionObject, reason);
            },

            onWaive: function (actionObject, reason) {
                /* Stipulation action handler */
                console.log('Waive', actionObject, reason);
            },
        });
        setViq(tmp);
    }

    const verifyIQSettingsProps = {
        initVerifyIQ,
        verifyIQACURL,
        verifyIQIIQURL,
        verifyIQApplicant,
        verifyIQEnvironment,
        verifyIQDocumentModalOption,
        verifyIQStipulation,
        verifyIQUploadWebhook,
        verifyIQCollectWebhook,
        verifyIQJWT,
        verifyIQPrecheckedDocuments,
        handleVerifyIQAuthTokenChange,
        handleVerifyIQEnvironmentChange,
        handleVerifyIQACURLChange,
        handleVerifyIQIIQURLChange,
        handleVerifyIQApplicantChange,
        handleVerifyIQDocumentModalOptionChange,
        handleVerifyIQStipulationChange,
        handleVerifyIQUploadWebhookChange,
        handleVerifyIQCollectWebhookChange,
        handleVerifyIQJWTChange,
        handleVerifyIQPrecheckedDocumentsChange,
    }

    const verifyIQOpenProps = {
        applicationId,
        viq,
        verifyIQApplicant,
        verifyIQDocumentModalOption,
        verifyIQStipulation,
        verifyIQUploadWebhook,
        verifyIQCollectWebhook,
        verifyIQJWT,
        verifyIQPrecheckedDocuments,
    }

    const requestIQOpenProps = {
        applicationId,
        viq,
        verifyIQJWT,
        verifyIQCollectWebhook,
        verifyIQPrecheckedDocuments,
    }

    return (
        <React.Fragment>
            <div style={{ position: 'relative' }}>
                <VerifyIQSettings {...verifyIQSettingsProps} />
                <Title>Application Lookup</Title>
                <Typography color="text.secondary" sx={{ paddingBottom: '20px' }}>utilizes VerifyIQ</Typography>
                <div>
                    <Grid container align="center" rowSpacing="20px">
                        <Grid item xs={12}>
                            <TextField
                                id="standard-basic"
                                label="Application ID"
                                onChange={handleApplicationIdChange}
                                variant="standard"
                                helperText="Please enter application id"
                                sx={{ label: { color: "#2b6777" } }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <VerifyIQOpen {...verifyIQOpenProps} />
                        </Grid>
                        <Grid item xs={6}>
                            <RequestIQOpen {...requestIQOpenProps} />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </React.Fragment>
    );
}
