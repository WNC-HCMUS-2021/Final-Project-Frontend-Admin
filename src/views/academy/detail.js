import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import {
    CCard,
    CCardHeader,
    CCardBody,
    CCardFooter,
    CButton,
    CCol,
    CFormGroup,
    CLabel,
} from '@coreui/react'
import 'react-toastify/dist/ReactToastify.css';
import PageLoading from '../../components/pageLoading/pageLoading';

// api
import { detailAcademy } from '../../apis/academyApi';


function DetailAcademy() {
    const params = useParams();
    const academyId = params.id;
    const [academyInfo, setAcademyInfo] = useState();
    const [outlineInfo, setOutlineInfo] = useState();
    // state
    const [loading, setLoading] = useState(false); // loading page

    const getDetailAcademy = async (id) => {
        await detailAcademy(id)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    setAcademyInfo(res.data.data.academy);
                    setOutlineInfo(res.data.data.outline);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            })
    }

    useEffect(() => {
        setLoading(true);
        getDetailAcademy(academyId);
    }, [academyId])

    return (
        <React.Fragment>
            {!loading && academyInfo
                ?
                <React.Fragment>
                    <CCard>
                        <CCardHeader>
                            Detail academy
                        </CCardHeader>
                        <CCardBody>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="academy_name">Academy name</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <input className="custom-input" type="text" value={academyInfo.academy_name} readOnly />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="email">Academy category</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <input className="custom-input" type="text" value={academyInfo.academy_category_name} readOnly />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="description_short">Description short</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <input className="custom-input" type="text" value={academyInfo.description_short} readOnly />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="description_detail">Description detail</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <input className="custom-input" type="text" value={academyInfo.description_detail} readOnly />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="price">Price</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <input className="custom-input" type="text" value={academyInfo.price} readOnly />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="price_discount">Price discount</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <input className="custom-input" type="text" value={academyInfo.price_discount} readOnly />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="register">Register</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <input className="custom-input" type="text" value={academyInfo.register} readOnly />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="view">View</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <input className="custom-input" type="text" value={academyInfo.view} readOnly />
                                </CCol>
                            </CFormGroup>
                            <div className="row col" style={{color: "red"}}>Outline</div>
                            <div className="row mt-3">

                                {outlineInfo
                                    ?
                                    outlineInfo.map((item, index) => {
                                        return (
                                            <div className="col-3">
                                                <DetailOutline item={item} key={index} />
                                            </div>
                                        )
                                    })
                                    : null
                                }
                            </div>

                        </CCardBody>
                        <CCardFooter>
                            <div className="card-footer_custom">
                                <Link to="/teachers/academy">
                                    <CButton color="secondary" className="mr-2" >
                                        Cancel
                                    </CButton>
                                </Link>
                                <Link to={`/teachers/academy/edit/${academyId}`}>
                                    <CButton color="warning" className="mr-2" >
                                        Edit
                                    </CButton>
                                </Link>
                            </div>
                        </CCardFooter>
                    </CCard>
                </React.Fragment>
                :
                <PageLoading />
            }
        </React.Fragment>
    );
}

function DetailOutline({ item }) {
    return (
        <div className="outline-detail">
            <div className="outline-detail_title">
                <CFormGroup row>
                    <CCol md="3">
                        <CLabel htmlFor="view">Title</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                        <input className="custom-input" type="text" value={item.title} readOnly />
                    </CCol>
                </CFormGroup>
            </div>
            <div className="outline-detail_url">
                <CFormGroup row>
                    <CCol md="3">
                        <CLabel htmlFor="view">URL</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                        <input className="custom-input" type="text" value={item.url} readOnly />
                    </CCol>
                </CFormGroup>
            </div>
            <div className="outline-detail_content">
                <CFormGroup row>
                    <CCol md="3">
                        <CLabel htmlFor="view">Content</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                        <input className="custom-input" type="text" value={item.content} readOnly />
                    </CCol>
                </CFormGroup>
            </div>
            <div className="outline-detail_description">
                <CFormGroup row>
                    <CCol md="3">
                        <CLabel htmlFor="view">Desc</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                        <input className="custom-input" type="text" value={item.description} readOnly />
                    </CCol>
                </CFormGroup>
            </div>
        </div>
    );
}

export default DetailAcademy;