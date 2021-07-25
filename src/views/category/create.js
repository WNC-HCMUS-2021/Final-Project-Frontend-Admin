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
    CInput,
    CForm,

} from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageLoading from '../../components/pageLoading/pageLoading';

// api
import { createCategory } from '../../apis/categoryApi';


function CreateAcademyCategory() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    // state
    const [loading, setLoading] = useState(false); // loading page

    // submit form
    const onSubmit = async (formValues) => {
        // submit
        let data = {
            academy_category_name: formValues.cat_name,
            created_by: 2,
            created_at: new Date().getTime()
        };

        await createCategory(data)
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
                                Create category
                            </CCardHeader>
                            <CCardBody>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="cat_name">Name</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        {errors.cat_name &&
                                            <span style={{ color: 'red' }}>Category name is required!</span>
                                        }
                                        <input className="custom-input" type="text" placeholder="Enter place name..."
                                            {...register("cat_name", { required: true })}
                                        />
                                    </CCol>
                                </CFormGroup>
                            </CCardBody>
                            <CCardFooter>
                                <div className="card-footer_custom">
                                    <Link to="/categories">
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

export default CreateAcademyCategory;