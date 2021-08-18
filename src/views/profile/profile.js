import React, { useState, useEffect } from 'react';
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

} from '@coreui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { detailTeacher, editTeacher } from '../../apis/teacherApi';

function Profile() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const teacherId = localStorage.getItem("userid_admin_academy");

    // state
    const [profile, setProfile] = useState();
    const [view, setView] = useState('detail');

    const onSubmit = async (formValues) => {
        console.log(formValues);
        let data = {
            user_id: parseInt(teacherId),
            name: formValues.name,
            phone_number: formValues.phone_number,
            gender: formValues.gender
        }

        await editTeacher(data)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    toast.success("Edit complete!")
                    setProfile(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
                toast.success("Edit fail!")
            })
    }

    useEffect(() => {
        detailTeacher(teacherId)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res);
                    setProfile(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            })

    }, [])

    const name = register("name", {
        required: 'Name is required!',
        minLength: {
            value: 2,
            message: 'Name must be at least 2 characters!'
        },
        maxLength: {
            value: 30,
            message: 'Name maximum 30 characters!'
        }
    });

    const phone_number = register("phone_number", {
        required: 'Phone Number is required!',
        maxLength: {
            value: 10,
            message: 'Phone Number maximum 10 number!'
        }
    });

    const gender = register("gender", {
        required: 'Gender is required!',
    });

    return (
        <React.Fragment>
            {profile ?
                view === 'detail' ?
                    <CCard>
                        <CCardHeader>
                            Profile
                        </CCardHeader>
                        <CCardBody>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="username">Username</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <input type="text" className="custom-input" placeholder="Username" defaultValue={profile.username} disabled />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="email">Email</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <input type="text" className="custom-input" placeholder="Email" defaultValue={profile.email} disabled />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Name</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <input type="text" className="custom-input" placeholder="Name" defaultValue={profile.name} disabled />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="phone_number">Phone Number</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <input type="text" className="custom-input" placeholder="Phone Number" defaultValue={profile.phone_number} disabled />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="birthday">Birthday</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <input type="text" className="custom-input" placeholder="Birthday" defaultValue={profile.birthday} disabled />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="Gender">Gender</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <input type="text" className="custom-input" placeholder="Gender" defaultValue={profile.gender} disabled />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="Money">Money</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <input type="text" className="custom-input" placeholder="Money" defaultValue={profile.money} disabled />
                                </CCol>
                            </CFormGroup>
                        </CCardBody>
                        <CCardFooter>
                            <div className="card-footer_custom">
                                <Link to="/dashboard">
                                    <CButton color="secondary" className="mr-2" >
                                        Cancel
                                    </CButton>
                                </Link>
                                <CButton color="warning" className="mr-2" onClick={() => {
                                    setView('edit');
                                }}>
                                    Edit
                                </CButton>
                            </div>
                        </CCardFooter>

                    </CCard>
                    :
                    <CCard>
                        <CForm onSubmit={handleSubmit(onSubmit)} className="form-horizontal">
                            <CCardHeader>
                                Edit Profile
                            </CCardHeader>
                            <CCardBody>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="name">Name</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        {errors.name &&
                                            <span style={{ color: 'red' }}>{errors.name.message}</span>
                                        }
                                        <input type="text" className="custom-input" placeholder="Name" defaultValue={profile.name} {...name} />
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="phone_number">Phone Number</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        {errors.phone_number &&
                                            <span style={{ color: 'red' }}>{errors.phone_number.message}</span>
                                        }
                                        <input type="text" className="custom-input" placeholder="Phone Number" defaultValue={profile.phone_number} {...phone_number} />
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="gender">Gender</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        {errors.gender &&
                                            <span style={{ color: 'red' }}>{errors.gender.message}</span>
                                        }
                                        <select  {...gender} className="custom-input" defaultValue={profile.gender}>
                                            <option value="Nam">Male</option>
                                            <option value="Nữ">Female</option>
                                        </select>
                                    </CCol>
                                </CFormGroup>
                            </CCardBody>
                            <CCardFooter>
                                <div className="card-footer_custom">
                                    <Link to="/dashboard">
                                        <CButton color="secondary" className="mr-2" >
                                            Cancel
                                        </CButton>
                                    </Link>
                                    <CButton color="secondary" className="mr-2" onClick={() => {
                                        setView('detail');
                                    }}>
                                        Return detail
                                    </CButton>

                                    <CButton color="primary" className="mr-2" type="submit">
                                        Save
                                    </CButton>
                                </div>
                            </CCardFooter>
                        </CForm>
                    </CCard>
                : null
            }
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
    )
}

export default Profile;