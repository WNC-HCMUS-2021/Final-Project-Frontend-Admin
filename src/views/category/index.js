import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    CCard,
    CCardHeader,
    CCardBody,
    CDataTable,
    CButton
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageLoading from '../../components/pageLoading/pageLoading';
import Modal from '../../components/modal/modal';
import ModalEdit from './modal-edit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// api
import { getListCategory, deleteCategory } from '../../apis/categoryApi';

const fields = ['academy_category_name', 'is_delete', 'created_at', 'action']

function ListCategory() {
    // state
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [catInfo, setCatInfo] = useState(null);
    const [catIndex, setCatIndex] = useState(null);
    const [openModalDel, setOpenModalDel] = useState(false);
    const [showModalDel, setShowModalDel] = useState(false); // to render modal delete
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false); // to render modal edit

    // delete
    function confirmDelete(item) {
        setCatInfo(item);
        setShowModalDel(true);
        setOpenModalDel(true);
    }

    function submitDelete() {
        setOpenModalDel(false);
        deleteCategory(catInfo.academy_category_id)
            .then((res) => {
                if (res.status === 200) {
                    setList(list.filter(item => item.academy_category_id !== catInfo.academy_category_id));
                    console.log("Delete successfully");
                    toast.success('Delete successfully!');
                }
            })
            .catch((err) => {
                setCatInfo(null); // reset id
                console.log("Error", err);
                toast.error('Delete error!');
            })
    }

    // edit
    function confirmEdit(item, index) {
        setCatInfo(item);
        console.log(item);
        setCatIndex(index);
        setShowModalEdit(true);
        setOpenModalEdit(true);
    }


    useEffect(() => {
        setLoading(true);
        // list places
        let params = {
            page: 1,
            rowsperpage: 100
        };
        getListCategory(params)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    setList(res.data.data.data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                setList([]);
                console.log("Err list place: ", err);
                setLoading(false);
            });
    }, [])

    return (
        <React.Fragment>
            {loading
                ? <PageLoading />
                :
                <React.Fragment>
                    <CCard>
                        <CCardHeader>
                            <div className="card-header_custom">
                                <div className="card-header_custom_txt">
                                    List Place
                                </div>
                                <div>
                                    <Link to="/categories/create">
                                        <CButton block color="info">
                                            <FontAwesomeIcon icon="plus" />
                                        </CButton>
                                    </Link>
                                </div>
                            </div>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={list}
                                fields={fields}
                                itemsPerPage={5}
                                itemsPerPageSelect
                                tableFilter
                                pagination
                                scopedSlots={{
                                    'is_delete':
                                        (item) => (
                                            <td>{item.is_delete === 1 ? 'Đã xoá' : 'Chưa xoá'}</td>
                                        ),
                                    'action':
                                        (item, index) => (
                                            <td>
                                                <CButton size="sm" color="warning" className="mr-1" onClick={() => confirmEdit(item, index)}>
                                                    <FontAwesomeIcon icon="edit" />
                                                </CButton>
                                                {item.is_delete === 1
                                                    ? null
                                                    :
                                                    <CButton size="sm" color="danger" className="mr-1" onClick={() => confirmDelete(item)}>
                                                        <FontAwesomeIcon icon="trash" />
                                                    </CButton>
                                                }
                                            </td>
                                        )
                                }}
                            />
                        </CCardBody>
                    </CCard>

                    {showModalDel
                        ?
                        <Modal
                            clrHeader="danger"
                            title="Are you sure you want to delete?"
                            clrBtnRight="danger"
                            open={openModalDel}
                            setOpen={setOpenModalDel}
                            handleSubmit={() => submitDelete()}
                        />
                        : null
                    }

                    {showModalEdit
                        ? <ModalEdit
                            open={openModalEdit}
                            setOpen={setOpenModalEdit}
                            catInfo={catInfo}
                            catList={list}
                            setCatList={setList}
                            catIndex={catIndex}
                        />
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
            }
        </React.Fragment>
    )
}

export default ListCategory;