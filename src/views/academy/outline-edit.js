import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
    CCard,
    CCardHeader,
    CCardBody,
    CCardFooter,
    CButton,
    CCol,
    CFormGroup,
    CLabel,
    CForm
} from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditOutline({ outlineInfo, setView }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onChangeNumberOutline = (number) => {
        console.log(number);
        if (number > 0) {

        }
    }

    const onSubmit = (formValues) => {

    }

    return (
        <React.Fragment>
            <CCard>
                <CForm onSubmit={handleSubmit(onSubmit)} className="form-horizontal">
                    <CCardHeader>
                        Edit academy
                    </CCardHeader>
                    <CCardBody>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="number_outline">Number of outline</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                {errors.number_outline &&
                                    <span style={{ color: 'red' }}>Number of outline is required!</span>
                                }
                                <input className="custom-input" type="number" placeholder="Enter number of outline"
                                    {...register("number_outline", { required: true })} onChange={(e) => onChangeNumberOutline(e.target.value)}
                                />
                            </CCol>
                        </CFormGroup>

                    </CCardBody>
                    <CCardFooter>
                        <div className="card-footer_custom">
                            <Link to="/teachers/academy">
                                <CButton color="secondary" className="mr-2" >
                                    Cancel
                                </CButton>
                            </Link>
                            <CButton color="secondary" className="mr-2" onClick={() => {
                                setView('edit');
                            }}>
                                Return academy
                            </CButton>
                            <CButton color="info" type="submit">
                                Save
                            </CButton>
                        </div>
                    </CCardFooter>
                </CForm>
            </CCard>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
            />

        </React.Fragment>
    );
}


export default EditOutline;