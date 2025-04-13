import React from 'react';
import VerifyIQ from '@informed-iq/verify-iq-sdk';
import { Button, Modal, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    height: '95%',
};

const VerifyIQOpen = ({
    viq,
    applicationId,
    verifyIQApplicant,
    verifyIQDocumentModalOption,
    verifyIQStipulation,
    verifyIQUploadWebhook,
    verifyIQCollectWebhook,
    verifyIQJWT,
    verifyIQPrecheckedDocuments,
}) => {

    const createRenderOptions = (desiredVerifyIQApplicant, desiredVerifyIQDocumentModalOption, desiredVerifyIQStipulation) => {
        let options = {
            htmlElement: document.getElementById("verify-iq-modal"),
            applicationId: applicationId,
            applicant: VerifyIQ.ApplicantTypes.PrimaryApplicant,
            documentModalOptions: VerifyIQ.DocumentModalOptions.None,
            stipulation: VerifyIQ.StipulationTypes.Income,
            uploadedDocumentWebhookUrl: verifyIQUploadWebhook,
            collectedDocumentWebhookUrl: verifyIQCollectWebhook,
            jwtToken: verifyIQJWT,
            precheckedDocuments: JSON.parse(JSON.stringify(verifyIQPrecheckedDocuments)
            ),
        };

        switch (desiredVerifyIQApplicant) {
            case 'CoApplicant':
                options.applicant = VerifyIQ.ApplicantTypes.CoApplicant;
                break;
            default:
                options.applicant = VerifyIQ.ApplicantTypes.PrimaryApplicant;
                break;
        }

        switch (desiredVerifyIQDocumentModalOption) {
            case "RequestDocuments":
                options.documentModalOptions = VerifyIQ.DocumentModalOptions.RequestDocuments;
                break;

            case "RequestDocumentsOnlyIfNoAssociatedDocuments":
                options.documentModalOptions = VerifyIQ.DocumentModalOptions.RequestDocumentsOnlyIfNoAssociatedDocuments;
                break;

            case "UploadDocuments":
                options.documentModalOptions = VerifyIQ.DocumentModalOptions.UploadDocuments;
                break;

            case "UploadDocumentsOnlyIfNoAssociatedDocuments":
                options.documentModalOptions = VerifyIQ.DocumentModalOptions.UploadDocumentsOnlyIfNoAssociatedDocuments;
                break;
            default:
                options.documentModalOptions = VerifyIQ.DocumentModalOptions.None;
                break;
        }

        switch (desiredVerifyIQStipulation) {
            case "Income":
                options.stipulation = VerifyIQ.StipulationTypes.Income;
                break;

            case "Residence":
                options.stipulation = VerifyIQ.StipulationTypes.Residence;
                break;

            case "Identity":
                options.stipulation = VerifyIQ.StipulationTypes.Identity;
                break;

            case "Insurance":
                options.stipulation = VerifyIQ.StipulationTypes.Insurance;
                break;

            case "SSN":
                options.stipulation = VerifyIQ.StipulationTypes.SSN;
                break;

            case "Trade":
                options.stipulation = VerifyIQ.StipulationTypes.Trade;
                break;

            case "PaidAccount":
                options.stipulation = VerifyIQ.StipulationTypes.PaidAccount;
                break;

            case "Phone":
                options.stipulation = VerifyIQ.StipulationTypes.Phone;
                break;

            case "MortgageCurrent":
                options.stipulation = VerifyIQ.StipulationTypes.MortgageCurrent;
                break;

            case "BankruptcyDischarged":
                options.stipulation = VerifyIQ.StipulationTypes.BankruptcyDischarged;
                break;

            case "TaxLienSatisfied":
                options.stipulation = VerifyIQ.StipulationTypes.TaxLienSatisfied;
                break;

            case "Rent":
                options.stipulation = VerifyIQ.StipulationTypes.Rent;
                break;

            case "ChildSupportPaidAndCurrent":
                options.stipulation = VerifyIQ.StipulationTypes.ChildSupportPaidAndCurrent;
                break;

            case "ArticlesOfIncorporation":
                options.stipulation = VerifyIQ.StipulationTypes.ArticlesOfIncorporation;
                break;

            case "ExecutedCrossCollateralDefaultAgreement":
                options.stipulation = VerifyIQ.StipulationTypes.ExecutedCrossCollateralDefaultAgreement;
                break;

            default:
                options.stipulation = "";
                break;
        }

        return options;
    }


    const handleVerifyIQOnClick = async () => {
        await setOpen(true);
        let renderOptions = await createRenderOptions(verifyIQApplicant, verifyIQDocumentModalOption, verifyIQStipulation);
        await viq.renderApplicationId(renderOptions);
    }
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button
                id="verify-iq-find-app-button"
                onClick={handleVerifyIQOnClick}
                sx={
                    {
                        backgroundColor: "#2b6777",
                        "&hover": { cursor: "pointer" }
                    }
                }
                variant="contained">
                Find App
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} id="verify-iq-modal">
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

export default VerifyIQOpen;
