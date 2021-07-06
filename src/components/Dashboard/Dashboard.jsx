import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { actions as authActions } from '../../store/auth/actions';
import { getAdmin } from '../../store/auth/selectors';
import { actions } from '../../store/data/actions';
import AdminPanel from './AdminPanel';
import UserPanel from './UserPanel';

const Dashboard = (props) => {
  useEffect(() => {
    props.allLights();
    props.checkIsLogin();
  }, []);

  return (
    <Switch>
      {props.isAdmin == 'admin' ? (
        <>
          <Redirect path="*" to="/dashboard/admin"></Redirect>
          <Route path="/dashboard/admin" component={AdminPanel} title="a"></Route>
        </>
      ) : (
        <>
          <Redirect path="*" to="/dashboard/user"></Redirect>
          <Route path="/dashboard/user" component={UserPanel} title="u"></Route>
        </>
      )}

      <Redirect path="*" to="/dashboard/"></Redirect>
    </Switch>
  );
};

export const mapStateToProps = (state) => {
  return {
    isAdmin: getAdmin(state),
  };
};

export const mapDispatchToProps = (dispatch) => ({
  allLights: (payload) => dispatch(actions.allLights(payload)),
  checkIsLogin: (payload) => dispatch(authActions.checkIsLogin(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
