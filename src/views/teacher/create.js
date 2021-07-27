import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    CForm,

} from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageLoading from '../../components/pageLoading/pageLoading';

// api
import { createTeacher } from '../../apis/teacherApi';


function CreateTeacher() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    // state
    const [loading, setLoading] = useState(false); // loading page

    // submit form
    const onSubmit = async (formValues) => {
        // submit
        let data = {
            username: formValues.username,
            password: formValues.password,
            email: formValues.email,
            name: formValues.fullname,
            phone_number: formValues.phone_number,
            birthday: formValues.birthday,
            gender: formValues.gender,
            created_at: new Date().getTime()
        };

        await createTeacher(data)
            .then((res) => {
                if (res.status === 201) {
                    console.log(res);
                    toast.success('Category created!');
                    // reset form
                    reset();
                }
            })
            .catch((err) => {
                toast.error('Error!');
            });
    }

    return (
        <React.Fragment>
            {loading
                ? <PageLoading />
                :
                <React.Fragment>
                    <CCard>
                        <CForm onSubmit={handleSubmit(onSubmit)} className="form-horizontal">
                            <CCardHeader>
                                Create teacher
                            </CCardHeader>
                            <CCardBody>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="cat_name">Full name</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        {errors.fullname &&
                                            <span style={{ color: 'red' }}>Full name is required!</span>
                                        }
                                        <input className="custom-input" type="text" placeholder="Enter full name..."
                                            {...register("fullname", { required: true })}
                                        />
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="email">Email</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                  
                                        {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
                                        <input className="custom-input" type="text" placeholder="Enter email..."
                                            {...register("email", { 
                                                required: true,
                                                pattern: {
                                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message: 'Email is not valid!'
                                                }
                                            })}
                                        />
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="username">Username</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        {errors.username &&
                                            <span style={{ color: 'red' }}>Username is required!</span>
                                        }
                                        <input className="custom-input" type="text" placeholder="Enter username..."
                                            {...register("username", { required: true })}
                                        />
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="password">Password</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        {errors.password &&
                                            <span style={{ color: 'red' }}>Password is required!</span>
                                        }
                                        <input className="custom-input" type="password" placeholder="Enter password..."
                                            {...register("password", { required: true })}
                                        />
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="phone_number">Phone number</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        {errors.phone_number &&
                                            <span style={{ color: 'red' }}>Phone number is required!</span>
                                        }
                                        <input className="custom-input" type="text" placeholder="Enter phone number..."
                                            {...register("phone_number", { required: true })}
                                        />
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="birthday">Birthday</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        {errors.birthday &&
                                            <span style={{ color: 'red' }}>Birthday is required!</span>
                                        }
                                        <input className="custom-input" type="text" placeholder="YYYY-MM-DD"
                                            {...register("birthday", { required: true })}
                                        />
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="gender">Gender</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        {errors.gender &&
                                            <span style={{ color: 'red' }}>Gender is required!</span>
                                        }
                                        <select {...register("gender", { required: true })} className="custom-input">
                                            <option value="Nam">Male</option>
                                            <option value="Nữ">Female</option>
                                        </select>
                                    </CCol>
                                </CFormGroup>
                            </CCardBody>
                            <CCardFooter>
                                <div className="card-footer_custom">
                                    <Link to="/teachers">
                                        <CButton color="secondary" className="mr-2" >
                                            Cancel
                                        </CButton>
                                    </Link>
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
            }
        </React.Fragment>
    );
}

export default CreateTeacher;