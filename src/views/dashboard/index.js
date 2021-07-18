import React from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,

    CRow
} from '@coreui/react';
import {
    CChartBar,
    CChartDoughnut,

} from '@coreui/react-chartjs'

export default function Dashboard(props) {
    return (
        <React.Fragment>
            <CRow>
                <CCol md="6">
                    <CCard>
                        <CCardBody>
                            <div className="card-custom">
                                <div className="card-custom-quantity">
                                    50
                                </div>
                                <div className="card-custom-title">
                                    Số lượng user
                                </div>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </React.Fragment>
    )
}