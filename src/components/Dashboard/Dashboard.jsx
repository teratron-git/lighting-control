import UserPanel from './UserPanel';
import AdminPanel from './AdminPanel';
import { Switch, Route, Redirect } from 'react-router-dom';
import { getAdmin } from '../../store/auth/selectors';
import { connect } from 'react-redux';

const Dashboard = (props) => {
  console.log('🚀 ~ file: Dashboard.jsx ~ line 8 ~ Dashboard ~ props', props);
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
  // data: () => dispatch(actions.data()),
});

export default connect(mapStateToProps, null)(Dashboard);
