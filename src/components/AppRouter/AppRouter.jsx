import { Redirect, Switch, Route, withRouter } from 'react-router-dom';
import Header from '../../components/Dashboard/Header';
import Dashboard from '../../components/Dashboard';

const AppRouter = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/dashboard" component={Dashboard}></Route>
      </Switch>
    </>
  );
};

export default withRouter(AppRouter);
