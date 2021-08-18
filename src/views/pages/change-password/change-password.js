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

} from '@coreui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ChangePassword = React.forwardRef(() => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    // state
    const [errMsg, setErrMsg] = useState('');

    const onSubmit = async (formValues) => {
        // validate
        if (formValues.new_password !== formValues.confirm_new_password) {
            setErrMsg('New password and confirm new password does not match!');
            return;
        } else {
            setErrMsg('');
        }

        // submit
        let data = {
            password: formValues.password,
            newpassword: formValues.new_password,
            confirmnewpassword: formValues.confirm_new_password,
        };
        console.log(data);

        // await changePasswordUserAdmin(data)
        //     .then((res) => {
        //         console.log(res);
        //         if (res.status === 200) {
        //             toast.success('Change password success!')
        //             reset();
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err.response);
        //         if (err.response.status === 401) {
        //             toast.error(err.response.data.message)
        //         } else {
        //             toast.error('Change password fail!')
        //         }
        //     })
    }

    const password = register("password", {
        required: 'Password is required!',
        minLength: {
            value: 6,
            message: 'Password must be at least 6 characters!'
        },
        maxLength: {
            value: 30,
            message: 'Password maximum 30 characters!'
        }
    });

    const newPassword = register("new_password", {
        required: 'New password is required!',
        minLength: {
            value: 6,
            message: 'New password must be at least 6 characters!'
        },
        maxLength: {
            value: 30,
            message: 'New password maximum 30 characters!'
        }
    });

    const confirmNewPassword = register("confirm_new_password", {
        required: 'Confirm new password is required!',
        minLength: {
            value: 6,
            message: 'Confirm new password must be at least 6 characters!'
        },
        maxLength: {
            value: 30,
            message: 'Confirm new password maximum 30 characters!'
        }
    });

    return (
        <React.Fragment>
            <CCard>
                <CForm onSubmit={handleSubmit(onSubmit)} className="form-horizontal">
                    <CCardHeader>
                        Change Password
                    </CCardHeader>
                    <CCardBody>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="password">Old password</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                {errors.password &&
                                    <span style={{ color: 'red' }}>{errors.password.message}</span>
                                }
                                <input type="password" className="custom-input" placeholder="Enter password" {...password} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="new_password">New password</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                {errors.new_password &&
                                    <span style={{ color: 'red' }}>{errors.new_password.message}</span>
                                }
                                <input type="password" className="custom-input" placeholder="Enter new password" {...newPassword} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="confirm_password">Confirm password</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                {errMsg !== ''
                                    ? <span style={{ color: 'red' }}>{errMsg}</span>
                                    : null
                                }
                                {errors.confirm_new_password &&
                                    <span style={{ color: 'red' }}>{errors.confirm_new_password.message}</span>
                                }
                                <input type="password" className="custom-input" placeholder="Enter confirm new password" 
                                    {...confirmNewPassword} 
                                />
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
    )
})

export default ChangePassword;