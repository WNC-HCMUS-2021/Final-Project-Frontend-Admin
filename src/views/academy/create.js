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

} from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageLoading from '../../components/pageLoading/pageLoading';

// api
import { createAcademy } from '../../apis/academyApi';
import { getListCategory } from '../../apis/categoryApi';


function CreateAcademy() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    // state
    const [loading, setLoading] = useState(false); // loading page
    const [listCategory, setListCategory] = useState(false);

    // submit form
    const onSubmit = async (formValues) => {
        // submit
        let data = {
            teacher_id: parseInt(localStorage.getItem('userid_admin_academy')),
            academy_category_id: parseInt(formValues.academy_category_id),
            academy_name: formValues.academy_name,
            description_short: formValues.description_short,
            description_detail: formValues.description_detail,
            price: parseInt(formValues.price),
            price_discount: parseInt(formValues.price_discount),
            created_at: new Date().getTime()
        };

        await createAcademy(data)
            .then((res) => {
                if (res.status === 201) {
                    console.log(res);
                    toast.success('Academy created!');
                    // reset form
                    reset();
                }
            })
            .catch((err) => {
                toast.error('Error!');
            });
    }

    useEffect(() => {
        setLoading(true);
        getListCategory()
            .then((res2) => {
                if (res2.status === 200) {
                    setListCategory(res2.data.data.data);
                    setLoading(false);
                }
            })
            .catch((err2) => {
                setListCategory([]);
                setLoading(false);
            })
    }, [])

    return (
        <React.Fragment>
            {!loading && listCategory
                ?
                <React.Fragment>
                    <CCard>
                        <CForm onSubmit={handleSubmit(onSubmit)} className="form-horizontal">
                            <CCardHeader>
                                Create academy
                            </CCardHeader>
                            <CCardBody>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="academy_name">Academy name</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        {errors.academy_name &&
                                            <span style={{ color: 'red' }}>Academy name is required!</span>
                                        }
                                        <input className="custom-input" type="text" placeholder="Enter academy name..."
                                            {...register("academy_name", { required: true })}
                                        />
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="email">Academy category</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        {errors.academy_category_id &&
                                            <span style={{ color: 'red' }}>Academy category is required!</span>
                                        }
                                        <select {...register("academy_category_id", { required: true })} className="custom-input">
                                            {
                                                listCategory.map(item => {
                                                    return (
                                                        <option value={item.academy_category_id} key={item.academy_category_id}>
                                                            {item.academy_category_name}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="description_short">Description short</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        {errors.description_short &&
                                            <span style={{ color: 'red' }}>Description short is required!</span>
                                        }
                                        <input className="custom-input" type="text" placeholder="Enter description short..."
                                            {...register("description_short", { required: true })}
                                        />
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="description_detail">Description detail</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        {errors.description_detail &&
                                            <span style={{ color: 'red' }}>Description detail is required!</span>
                                        }
                                        <input className="custom-input" type="text" placeholder="Enter description detail..."
                                            {...register("description_detail", { required: true })}
                                        />
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="price">Price</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        {errors.price &&
                                            <span style={{ color: 'red' }}>Price is required!</span>
                                        }
                                        <input className="custom-input" type="text" placeholder="Enter price of academy..."
                                            {...register("price", { required: true })}
                                        />
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="price_discount">Price discount</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <input className="custom-input" type="text" placeholder="Enter price discount of academy..."
                                            {...register("price_discount")}
                                        />
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
                :
                <PageLoading />
            }
        </React.Fragment>
    );
}

export default CreateAcademy;