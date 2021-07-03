import UserPanel from './UserPanel';
import AdminPanel from './AdminPanel';
import { Switch, Route, Redirect } from 'react-router-dom';
import { getAdmin } from '../../store/auth/selectors';
import { actions } from '../../store/data/actions';
import { actions as authActions } from '../../store/auth/actions';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const Dashboard = (props) => {
  console.log('🚀 ~ file: Dashboard.jsx ~ line 8 ~ Dashboard ~ props', props);

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

export const mapStateToProps = (state, props) => {
  return {
    props: props,
    isAdmin: getAdmin(state),
  };
};

export const mapDispatchToProps = (dispatch) => ({
  // changeLight: (payload) => dispatch(actions.changeLight(payload)),
  allLights: (payload) => dispatch(actions.allLights(payload)),
  checkIsLogin: (payload) => dispatch(authActions.checkIsLogin(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
