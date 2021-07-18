import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Header from './header/index';
import Sidebar from './sidebar/index';
import Footer from './footer/index';
import Content from './content/index';


export default function AdminLayout(props) {
    let history = useHistory();
    // check login
    const token = localStorage.getItem("token_admin_together");
    useEffect(() => {
        if (!token) {
            history.push("/login");
        }
    });
    return (
        <div className="c-app c-default-layout">
            <Sidebar />
            <div className="c-wrapper">
                <Header />
                <div className="c-body">
                    <Content />
                </div>
                <Footer />
            </div>
        </div>
    )
}