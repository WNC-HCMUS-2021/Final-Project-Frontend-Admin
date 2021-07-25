import React, { useEffect, useState } from 'react';
import {
    CButton,
    CCol,
    CFormGroup,
    CLabel,
    CInput,
    CForm,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react';

// api
import { updateOccupation } from '../../apis/occupationApi';
import { HTTP_STATUS_200 } from '../../constants/constants';


function ModalEditOccupation({ open, setOpen, occupationInfo, tagList, setTagList, occupationList, setOccupationList, indexOccupation }) {
    // setUpdateStatus(2);
    const [fvrName, setFvrName] = useState(occupationInfo ? occupationInfo.name : ""); // occupation name

    

    const handleSubmit = async () => {
        // validate
        console.log(fvrName);


        let data = {
            
        };

        await updateOccupation(data)
            .then((res) => {
                if (res.status === HTTP_STATUS_200) {
                   
                }
            })
            .catch((err) => {
                console.log("Update occupation error", err);
            });
    }

    useEffect(() => {
        
    }, [])

    return (
        <CModal
            show={open}
            onClose={() => setOpen(!open)}
        >
            <CModalHeader closeButton>
                <CModalTitle>Edit Occupation</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm action="" method="post" className="form-horizontal">
                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="fvr_name">Name</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                            <CInput type="text" placeholder="Enter occupation name..."
                               
                            />
                        </CCol>
                    </CFormGroup>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton
                    color="secondary"
                    onClick={() => setOpen(!open)}
                >
                    Cancel
                </CButton>

                <CButton
                    color="success"
                    onClick={() => handleSubmit()}
                >
                    Submit
                </CButton>
            </CModalFooter>
        </CModal>
    );
}
export default ModalEditOccupation;