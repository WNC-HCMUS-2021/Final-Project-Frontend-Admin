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
    CForm
} from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import PageLoading from '../../components/pageLoading/pageLoading';
import OutlineEdit from './outline-edit';

// api
import { detailAcademy, updateAcademy } from '../../apis/academyApi';
import { getListCategory } from '../../apis/categoryApi';


function DetailAcademy() {
    const params = useParams();
    const academyId = params.id;
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    // state
    const [view, setView] = useState('edit');
    const [academyInfo, setAcademyInfo] = useState();
    const [outlineInfo, setOutlineInfo] = useState();
    const [listCategory, setListCategory] = useState();
    const [loading, setLoading] = useState(false); // loading page
    const [academyDescDetail, setAcademyDescDetail] = useState(EditorState.createEmpty());
    const [status, setStatus] = useState(false);

    const getDetailAcademy = async (id) => {
        await detailAcademy(id)
            .then((res) => {
                console.log("detail academy", res);
                if (res.status === 200) {
                    setAcademyInfo(res.data.data.academy);
                    setOutlineInfo(res.data.data.outline);
                    setStatus(res.data.data.academy.status === "1" ? true : false);
                    const contentBlock = htmlToDraft(res.data.data.academy.description_detail);
                    if (contentBlock) {
                        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                        const editorState = EditorState.createWithContent(contentState);
                        setAcademyDescDetail(editorState);
                      }

                    getListCategory()
                        .then((res2) => {
                            if (res2.status === 200) {
                                setListCategory(res2.data.data.data)
                            }
                        })
                        .catch((err2) => {
                            setListCategory([]);
                        })
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            })
    }

    const onSubmit = async (formValues) => {
        // submit
        let data = {
            teacher_id: parseInt(localStorage.getItem('userid_admin_academy')),
            academy_category_id: parseInt(formValues.academy_category_id),
            academy_name: formValues.academy_name,
            description_short: formValues.description_short,
            description_detail: draftToHtml(convertToRaw(academyDescDetail.getCurrentContent())),
            price: parseInt(formValues.price),
            price_discount: parseInt(formValues.price_discount),
            status: status === true ? 1 : 0,
            created_at: new Date().getTime()
        };

        await updateAcademy(academyId, data)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res);
                    toast.success('Academy updated!');
                }
            })
            .catch((err) => {
                toast.error('Error!');
            });
    }

    useEffect(() => {
        setLoading(true);
        getDetailAcademy(academyId);
    }, [academyId])

    return (
        <React.Fragment>
            {!loading && academyInfo && listCategory
                ?
                view === 'edit'
                    ?
                    <React.Fragment>
                        <CCard>
                            <CForm onSubmit={handleSubmit(onSubmit)} className="form-horizontal">
                                <CCardHeader>
                                    Edit academy
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
                                                {...register("academy_name", { required: true })} defaultValue={academyInfo.academy_name}
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
                                            <select {...register("academy_category_id", { required: true })} className="custom-input" defaultValue={academyInfo.academy_category_id}>
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
                                                {...register("description_short", { required: true })} defaultValue={academyInfo.description_short}
                                            />
                                        </CCol>
                                    </CFormGroup>
                                    <CFormGroup row>
                                        <CCol md="3">
                                            <CLabel htmlFor="description_detail">Description detail</CLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <Editor
                                                editorState={academyDescDetail}
                                                toolbarClassName="toolbarClassName"
                                                wrapperClassName="wrapperClassName"
                                                editorClassName="editorClassName"
                                                onEditorStateChange={setAcademyDescDetail}
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
                                                {...register("price", { required: true })} defaultValue={academyInfo.price}
                                            />
                                        </CCol>
                                    </CFormGroup>
                                    <CFormGroup row>
                                        <CCol md="3">
                                            <CLabel htmlFor="price_discount">Price discount</CLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <input className="custom-input" type="text" placeholder="Enter price discount of academy..."
                                                {...register("price_discount")} defaultValue={academyInfo.price_discount}
                                            />
                                        </CCol>
                                    </CFormGroup>
                                    <CFormGroup row>
                                        <CCol md="3">
                                            <CLabel htmlFor="status">Status</CLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <label className="c-switch c-switch-success" >
                                                <input type="checkbox" className="c-switch-input" defaultChecked={status}
                                                    onChange={() => setStatus(!status)}
                                                />
                                                <span className="c-switch-slider"></span>
                                            </label>
                                        </CCol>
                                    </CFormGroup>
                                    <CButton color="info" type="button" onClick={() => {
                                        setView('edit-outline');
                                    }}>
                                        Edit outline
                                    </CButton>
                                </CCardBody>
                                <CCardFooter>
                                    <div className="card-footer_custom">
                                        <Link to="/teachers/academy">
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
                    : <OutlineEdit outlineInfo={outlineInfo} setOutlineInfo={setOutlineInfo} setView={setView} />
                :
                <PageLoading />
            }
        </React.Fragment>
    );
}


export default DetailAcademy;