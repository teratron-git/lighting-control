import { Route, Switch, withRouter } from 'react-router-dom';
import Dashboard from '../../components/Dashboard';
import Header from '../../components/Dashboard/Header';

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
