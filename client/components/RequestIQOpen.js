import React from 'react';
import { Button, Modal, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '65%',
    left: '65%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    height: '95%',
};

const RequestIQOpen = ({
    viq,
    applicationId,
    verifyIQCollectWebhook,
    verifyIQPrecheckedDocuments
}) => {
    const handleRequestIQOnClick = async () => {
        await setOpen(true);
        let options = {
            htmlElement: document.getElementById("request-iq-modal"),
            applicationId: applicationId,
            collectedDocumentWebhookUrl: verifyIQCollectWebhook,
            precheckedDocuments: Object.keys(verifyIQPrecheckedDocuments).length ? JSON.parse(verifyIQPrecheckedDocuments) : {},
        }
        await viq.renderRequestIq(options);
    }
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button
                id="verify-iq-find-app-button"
                onClick={handleRequestIQOnClick}
                sx={
                    {
                        backgroundColor: "#2b6777",
                        "&hover": { cursor: "pointer" }
                    }
                }
                variant="contained">
                Request Docs
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} id="request-iq-modal">
                    <CloseIcon onClick={handleClose} sx={
                        {
                            position: "absolute",
                            left: "-21px",
                            top: "-21px",
                            border: "2px solid #fff",
                            borderRadius: "50%",
                            color: "#fff",
                            "&:hover": {
                                cursor: "pointer"
                            }
                        }
                    }
                    />
                </Box>
            </Modal>
        </div >
    );
}

export default RequestIQOpen;