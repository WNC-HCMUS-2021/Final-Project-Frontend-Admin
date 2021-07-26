import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
    CCard,
    CCardHeader,
    CCardBody,
    CDataTable,
    CButton,
    CImg
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageLoading from '../../components/pageLoading/pageLoading';
import Modal from '../../components/modal/modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// api
import { getListStudent, deleteStudent } from '../../apis/studentApi';

const fields = ['avatar', 'name', 'username', 'email', 'phone_number', 'birthday', 'gender', 'is_delete', 'created_at', 'action']

const timestampToDate = (timestamp) => {
    const d = new Date(timestamp);
    return (d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear());
  }

function ListStudent() {
    const history = useHistory();
    // state
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [openModalDel, setOpenModalDel] = useState(false);
    const [showModalDel, setShowModalDel] = useState(false); // to render modal delete

    // delete
    function confirmDelete(item) {
        setUserInfo(item);
        setShowModalDel(true);
        setOpenModalDel(true);
    }

    function submitDelete() {
        setOpenModalDel(false);
        deleteStudent(userInfo.user_id)
            .then((res) => {
                if (res.status === 200) {
                    setList(list.filter(item => item.user_id !== userInfo.user_id));
                    console.log("Delete successfully");
                    toast.success('Delete successfully!');
                }
            })
            .catch((err) => {
                setUserInfo(null); // reset id
                console.log("Error", err);
                toast.error('Delete error!');
            })
    }

    useEffect(() => {
        setLoading(true);
        // list places
        let params = {
            page: 1,
            rowsperpage: 100,
            role: 'student'
        };
        getListStudent(params)
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
                                    List Student
                                </div>
                                {/* <div>
                                    <Link to="/academy/create">
                                        <CButton block color="info">
                                            <FontAwesomeIcon icon="plus" />
                                        </CButton>
                                    </Link>
                                </div> */}
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
                                    'avatar':
                                        (item) => (
                                            <td>
                                                <div className="c-avatar">
                                                    <CImg
                                                        // src={item.avatar}
                                                        src={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/User-info.svg/2048px-User-info.svg.png"}
                                                        className="c-avatar-img"
                                                        alt="admin@bootstrapmaster.com"
                                                    />
                                                </div>
                                            </td>
                                        ),
                                    'gender':
                                        (item) => (
                                            <td>
                                                {item.gender}
                                            </td>
                                        ),
                                    'birthday':
                                        (item) => (
                                            <td>
                                                {timestampToDate(item.birthday)}
                                            </td>
                                        ),
                                    'created_at':
                                        (item) => (
                                            <td>
                                                {timestampToDate(item.created_at)}
                                            </td>
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

export default ListStudent;