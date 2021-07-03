import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import st from './App.module.css';
import AppRouter from './components/AppRouter';
import LoginPage from './components/LoginPage';
import classNames from 'classnames';
import { actions } from './store/auth/actions';
import { getIsLoggedIn } from './store/auth/selectors';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const App = (props) => {
  let { isLoggedIn, checkIsLogin } = props;

  useEffect(() => {
    checkIsLogin();
  }, []);
  console.log(props);
  return (
    <div className={classNames(st.app, isLoggedIn ? st.appDashboard : '')}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/dashboard" permited={isLoggedIn} component={AppRouter} />
          {!isLoggedIn ? (
            <Route path="/" component={LoginPage} exact />
          ) : (
            <Redirect to="/dashboard" />
          )}
          ;
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

const PrivateRoute = ({ component: Component, permited, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (permited ? <Component {...props} /> : <Redirect to="/" />)}
  />
);

export const mapStateToProps = (state) => {
  return {
    isLoggedIn: getIsLoggedIn(state),
  };
};

export const mapDispatchToProps = (dispatch) => ({
  checkIsLogin: () => dispatch(actions.checkIsLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
