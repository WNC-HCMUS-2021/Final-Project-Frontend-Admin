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
import { getListAcademy } from '../../apis/teacherApi';
import { deleteAcademy } from '../../apis/academyApi';

const fields = ['academy_name', 'description_short', 'price', 'register', 'view', 'rate', 'status', 'is_delete', 'created_at', 'action']

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
        let teacher_id = localStorage.getItem("userid_admin_academy");
        getListAcademy(teacher_id)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    setList(res.data.data);
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
                                <div>
                                    <Link to="/academies/create">
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
                                    'status':
                                        (item) => (
                                            <td>{item.status === 1 ? 'Ho??n th??nh' : 'Ch??a ho??n th??nh'}</td>
                                        ),
                                    'is_delete':
                                        (item) => (
                                            <td>{item.is_delete === 1 ? '???? xo??' : 'Ch??a xo??'}</td>
                                        ),
                                    'action':
                                        (item, index) => (
                                            <td>
                                                <CButton size="sm" color="info" className="mr-1" onClick={() => {
                                                    history.push(`/teachers/academy/detail/${item.academy_id}`);
                                                }}>
                                                    <FontAwesomeIcon icon="eye" />
                                                </CButton>
                                                <CButton size="sm" color="warning" className="mr-1" onClick={() => {
                                                    history.push(`/teachers/academy/edit/${item.academy_id}`);
                                                }}>
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