import UserPanel from './UserPanel';
import AdminPanel from './AdminPanel';
import { Switch, Route } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <Switch>
      <Route path="/dashboard/user" component={UserPanel}></Route>
      <Route path="/dashboard/admin" component={AdminPanel}></Route>
    </Switch>
  );
};
