import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './components/fontAwesomeIcon/foneAwesomeIcon';
import './assets/scss/style.scss';

const AdminLayout = React.lazy(() => import('./layouts/admin-layout'));
const Login = React.lazy(() => import('./views/pages/login/login'));
const Logout = React.lazy(() => import('./views/pages/logout/logout'));
const Register = React.lazy(() => import('./views/pages/register/register'));
const Page403 = React.lazy(() => import('./views/pages/page403/page403'));
const Page404 = React.lazy(() => import('./views/pages/page404/page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/page500'));

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

function App() {
  return (
    <Router>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
          <Route exact path="/logout" name="Logout Page" render={props => <Logout {...props} />} />
          <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
          <Route exact path="/403" name="Page 403" render={props => <Page403 {...props} />} />
          <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
          <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
          <Route path="/" name="Home" render={props => <AdminLayout {...props} />} />
        </Switch>
      </React.Suspense>
    </Router>
  );
}

export default App;