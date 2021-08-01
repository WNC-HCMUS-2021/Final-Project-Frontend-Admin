import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
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
import { updateOutlineAcademy } from '../../apis/academyApi';

function EditOutline({ outlineInfo, setOutlineInfo, setView }) {
    const params = useParams();
    const academyId = params.id;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [list, setList] = useState([]);
    const [numberOutline, setNumberOutline] = useState(outlineInfo.length);

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
                academy_outline_id: outlineInfo[i].academy_outline_id,
                title: formValues[`outline_title_${i + 1}`],
                url_video: formValues[`outline_url_video_${i + 1}`],
                content: formValues[`outline_content_${i + 1}`],
                description: formValues[`outline_description_${i + 1}`],
            }
        }

        console.log(data);
        await updateOutlineAcademy(academyId, data)
            .then((res) => {
                if (res.status === 200) {
                    setOutlineInfo(res.data.data);
                    toast.success('Outline updated!');
                }
            })
            .catch((err) => {
                toast.error('Outline update fail!');
                console.log(err);
            })
    }

    useEffect(() => {
        // load data 
        let arrTemp = [];
        if (numberOutline > 0 && numberOutline < 20) {
            for (var i = 0; i < numberOutline; i++) {
                arrTemp.push(outlineInfo[i]);
            }
            setList(arrTemp);
        }
    }, [])

    return (
        <React.Fragment>
            <CCard>
                <CForm onSubmit={handleSubmit(onSubmit)} className="form-horizontal">
                    <CCardHeader>
                        Edit outline academy
                    </CCardHeader>
                    <CCardBody>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="number_outline">Number of outline</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <input className="custom-input" type="number" placeholder="Enter number of outline" disabled
                                    onChange={(e) => onChangeNumberOutline(e.target.value)} defaultValue={numberOutline}
                                />
                            </CCol>
                        </CFormGroup>

                        <br />
                        <CRow>
                            {
                                list.map((item, index) => {
                                    return <OutlineAcademy key={index} number={index + 1} info={item} register={register} />
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