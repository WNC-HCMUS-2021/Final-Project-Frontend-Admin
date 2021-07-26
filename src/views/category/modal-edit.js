import React, { useState, useEffect } from 'react';
import {
    CButton,
    CCol,
    CFormGroup,
    CLabel,
    CForm,
    CInput,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react';

// api
import { updateCategory } from '../../apis/categoryApi';


function ModelEditCategory({ open, setOpen, catInfo, catList, setCatList, catIndex }) {
    // state
    const [catName, setCatName] = useState(catInfo ? catInfo.academy_category_name : "");
    const [errName, setErrName] = useState("");

    // submit form
    const onSubmit = async () => {
        // validate
        console.log(catName);
        if (catName === "") {
            setErrName("Please enter occupation name!");
            return;
        } else {
            setErrName("");
        }
        // submit
        let data = {
            academy_category_name: catName,
            updated_by: 2,
        };

        await updateCategory(catInfo.academy_category_id ,data)
            .then((res) => {
                if (res.status === 200) {
                    let newArr = [...catList]; // copying the old datas array
                    newArr[catIndex] = res.data.data; //replace element with whatever you want to change it to
                    setCatList(newArr);
                    setOpen(false);
                }
            })
            .catch((err) => {
                console.log("Update occupation error", err);
            });
    }

    useEffect(() => {
        setCatName(catInfo.academy_category_name);
        
    }, [catInfo])

    return (
        <CModal
            show={open}
            onClose={() => setOpen(!open)}
        >
            <CModalHeader closeButton>
                <CModalTitle>Edit category</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm className="form-horizontal">

                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="cat_name">Name</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                            <CInput type="text" placeholder="Enter category name..."
                                onChange={(e) => {
                                    setCatName(e.target.value);
                                }}
                                value={catName}
                            />
                            {errName !== ""
                                ? <small style={{ color: "red" }}>{errName}</small>
                                : ""
                            }
                        </CCol>
                    </CFormGroup>
                </CForm>

            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => setOpen(!open)} >
                    Cancel
                </CButton>
                <CButton type="butotn" color="success" onClick={() => onSubmit()}>Submit</CButton>
            </CModalFooter>
        </CModal>
    );
}
export default ModelEditCategory;