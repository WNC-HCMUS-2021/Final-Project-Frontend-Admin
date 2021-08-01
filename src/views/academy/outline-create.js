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
    CRow
} from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OutlineAcademy from '../../components/outlineAcademy/outlineAcademy';

// api
import { createOutlineAcademy } from '../../apis/academyApi';

function CreateOutline({ setView, academyId }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [list, setList] = useState([]);
    const [numberOutline, setNumberOutline] = useState(0);

    const onChangeNumberOutline = (number) => {
        setList([]);
        let arrTemp = [];
        if (number > 0 && number < 20) {
            setNumberOutline(number);
            for (var i = 0; i < number; i++) {
                arrTemp.push(i + 1);
            }
            setList(arrTemp);
        }
    }

    const onSubmit = async (formValues) => {
        console.log(formValues);

        var data = [];

        for (var i = 0; i < numberOutline; i++) {
            data[i] = {
                title: formValues[`outline_title_${i + 1}`],
                url_video: formValues[`outline_url_video_${i + 1}`],
                content: formValues[`outline_content_${i + 1}`],
                description: formValues[`outline_description_${i + 1}`],
            }
        }
        console.log(data);
        await createOutlineAcademy(academyId, data)
            .then((res) => {
                if (res.status === 201) {
                    toast.success('Outline created!');
                    setTimeout(() => {
                        setView('create');
                    }, 1500);
                }
            })
            .catch((err) => {
                toast.error('Outline fail!');
                console.log(err);
            })

    }

    return (
        <React.Fragment>
            <CCard>
                <CForm onSubmit={handleSubmit(onSubmit)} className="form-horizontal">
                    <CCardHeader>
                        Create outline
                    </CCardHeader>
                    <CCardBody>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="number_outline">Number of outline</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <input className="custom-input" type="number" placeholder="Enter number of outline"
                                    onChange={(e) => onChangeNumberOutline(e.target.value)}
                                />
                            </CCol>
                        </CFormGroup>
                        <br />
                        <CRow>
                            {
                                list.map((item) => {
                                    return <OutlineAcademy key={item} number={item} register={register} />
                                })
                            }
                        </CRow>

                    </CCardBody>
                    <CCardFooter>
                        <div className="card-footer_custom">
                            <Link to="/teachers/academy">
                                <CButton color="secondary" className="mr-2" >
                                    Cancel
                                </CButton>
                            </Link>
                            <CButton color="secondary" className="mr-2" onClick={() => {
                                setView('create');
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


export default CreateOutline;