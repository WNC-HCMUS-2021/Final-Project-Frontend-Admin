import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import jwt from 'jsonwebtoken';

import LoadingSVG from '../../../assets/svg/Rolling-1s-25px.svg';

import { authLogin } from '../../../apis/authApi';

const Login = () => {
  // state
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [err, setErr] = React.useState("");
  const [loadingBtn, setLoadingBtn] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);

  const submitLogin = () => {
    // validate
    if (username === "") {
      setErr("Please enter username");
      console.log(err);
      return;
    }
    if (password === "") {
      setErr("Please enter password");
      return;
    }
    setErr("");
    setLoadingBtn(true);
    // submit
    let data = {
      username,
      password
    };
    authLogin(data)
      .then((res) => {
        if (res.status === 200) {
          setLoadingBtn(false);
          const payload = jwt.decode(res.data.data.accessToken);
          localStorage.setItem("token_admin_academy", res.data.data.accessToken);
          localStorage.setItem("role_admin_academy", payload.role);
          localStorage.setItem("userid_admin_academy", payload.userId);
          localStorage.setItem("username_admin_academy", payload.username);
          setRedirect(true);
        }
      })
      .catch((error) => {
        setLoadingBtn(false);
        setErr("Wrong account information or password!");
        console.log("Error: ", error);
      });
  }

  useEffect(() => {
    let token = localStorage.getItem("token_admin_academy");
    if (token) {
      setRedirect(true);
    }
  }, [])

  return (
    <>
      {redirect
        ? <Redirect to="/" />
        :
        <div className="c-app c-default-layout flex-row align-items-center">
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md="4">
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm>
                        <h1>Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                        {err && (
                          <div className="errorMsg" style={{ color: 'red', float: 'left' }}>{err}</div>
                        )}
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" placeholder="Username" autoComplete="username"
                            onChange={e => setUsername(e.target.value)}
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="password" placeholder="Password" autoComplete="current-password"
                            onChange={e => setPassword(e.target.value)}
                          />
                        </CInputGroup>
                        <CRow>
                          <CCol xs="6">
                            <CButton
                              color="primary"
                              className="px-4"
                              onClick={submitLogin}
                            >
                              {loadingBtn
                                ? <img src={LoadingSVG} alt="loading_btn" />
                                : "Login"
                              }
                            </CButton>
                          </CCol>
                          {/* <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol> */}
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                  {/* <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                    <CCardBody className="text-center">
                      <div>
                        <h2>Sign up</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                        <Link to="/register">
                          <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                        </Link>
                      </div>
                    </CCardBody>
                  </CCard> */}
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      }
    </>
  )
}

export default Login