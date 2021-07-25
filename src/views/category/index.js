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

// api
import { getListCategory } from '../../apis/categoryApi';

const fields = ['academy_category_name', 'is_delete', 'created_at', 'action']

function ListCategory() {
    const history = useHistory();
    // state
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

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
                                        (item) => (
                                            <td>
                                                <CButton size="sm" color="warning" className="mr-1" onClick={() => {
                                                    history.push(`/places/edit/${item._id}`);
                                                }}>
                                                    <FontAwesomeIcon icon="edit" />
                                                </CButton>
                                                {item.is_delete === 1
                                                    ? null
                                                    :
                                                    <CButton size="sm" color="danger" className="mr-1" >
                                                        <FontAwesomeIcon icon="trash" />
                                                    </CButton>
                                                }
                                            </td>
                                        )
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default ListCategory;