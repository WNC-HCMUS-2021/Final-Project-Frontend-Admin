import React from 'react';
import {
    CCol,
    CFormGroup,
    CLabel
} from '@coreui/react'

export default function OutlineAcademyEdit({ number, register }) {
    return (
        <CCol xs="12" md="6">
            <CFormGroup row className="mt-3">
                <CCol md="3">
                    <CLabel htmlFor={"outline_title_" + number}>Title {number}</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <input className="custom-input" type="text" placeholder="Enter outline title"
                        {...register(`outline_title_${number}`, { required: true })}
                    />
                </CCol>
            </CFormGroup>
            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor={"outline_url_video_" + number}>Url video {number}</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <input className="custom-input" type="text" placeholder="Enter url video"
                        {...register(`outline_url_video_${number}`, { required: true })}
                    />
                </CCol>
            </CFormGroup>
            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor={"outline_content_" + number}>Content {number}</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <input className="custom-input" type="text" placeholder="Enter content"
                        {...register(`outline_content_${number}`, { required: true })}
                    />
                </CCol>
            </CFormGroup>
            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor={"outline_description_" + number}>Description {number}</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <input className="custom-input" type="text" placeholder="Enter description"
                        {...register(`outline_description_${number}`, { required: true })}
                    />
                </CCol>
            </CFormGroup>
        </CCol>
    )
}