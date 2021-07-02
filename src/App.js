import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import st from './App.module.css';
import AppRouter from './components/AppRouter';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <div className={st.app}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/dashboard" permited={true} component={AppRouter} />
          <Route path="/" component={LoginPage} exact />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const PrivateRoute = ({ component: Component, permited, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (permited ? <Component {...props} /> : <Redirect to="/" />)}
  />
);

export default App;
