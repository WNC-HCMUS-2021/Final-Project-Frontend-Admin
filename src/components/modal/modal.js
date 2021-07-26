import React from 'react'
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react'

function Modal(
    { clrHeader,
        title,
        content,
        clrBtnLeft,
        txtBtnLeft,
        clrBtnRight,
        txtBtnRight,
        open,
        setOpen,
        handleSubmit
    }
) {
    return (
        <CModal
            show={open}
            onClose={() => setOpen(!open)}
            color={clrHeader ? clrHeader : ""}
        >
            <CModalHeader closeButton>
                <CModalTitle>{title ? title : ""}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {content ? content : ""}
            </CModalBody>
            <CModalFooter>
                <CButton
                    color={clrBtnLeft ? clrBtnLeft : "secondary"}
                    onClick={() => setOpen(!open)}
                >
                    {txtBtnLeft ? txtBtnLeft : "Cancel"}
                </CButton>

                <CButton
                    color={clrBtnRight ? clrBtnRight : "success"}
                    onClick={() => handleSubmit()}
                >
                    {txtBtnRight ? txtBtnRight : "Confirm"}
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default Modal