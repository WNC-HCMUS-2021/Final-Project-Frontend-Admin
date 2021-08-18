import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// api
import { getListAcademy, deleteAcademy } from '../../apis/academyApi';

const fields = ['academy_name', 'academy_category_name', 'description_short', 'price', 'status', 'teacher_name', 'is_delete', 'created_at', 'action']

function ListAcademy() {
    const history = useHistory();
    // state
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [academyInfo, setAcademyInfo] = useState(null);
    const [openModalDel, setOpenModalDel] = useState(false);
    const [showModalDel, setShowModalDel] = useState(false); // to render modal delete

    // delete
    function confirmDelete(item) {
        setAcademyInfo(item);
        setShowModalDel(true);
        setOpenModalDel(true);
    }

    function submitDelete() {
        setOpenModalDel(false);
        deleteAcademy(academyInfo.academy_id)
            .then((res) => {
                if (res.status === 200) {
                    setList(list.filter(item => item.academy_id !== academyInfo.academy_id));
                    console.log("Delete successfully");
                    toast.success('Delete successfully!');
                }
            })
            .catch((err) => {
                setAcademyInfo(null); // reset id
                console.log("Error", err);
                toast.error('Delete error!');
            })
    }

    useEffect(() => {
        setLoading(true);
        // list places
        let params = {
            page: 1,
            rowsperpage: 100
        };
        getListAcademy(params)
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
                                    List Academy
                                </div>
                            </div>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={list}
                                fields={fields}
                                itemsPerPage={5}
                                itemsPerPageSelect
                                columnFilter
                                tableFilter
                                pagination
                                scopedSlots={{
                                    'status':
                                        (item) => (
                                            <td>{item.status === 1 ? 'Hoàn thành' : 'Chưa hoàn thành'}</td>
                                        ),
                                    'is_delete':
                                        (item) => (
                                            <td>{item.is_delete === 1 ? 'Đã xoá' : 'Chưa xoá'}</td>
                                        ),
                                    'action':
                                        (item, index) => (
                                            <td>
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

export default ListAcademy;