import classNames from 'classnames/bind';
import LoginForm from './LoginForm';
import styles from './LoginPage.module.css';

const st = classNames.bind(styles);

const LoginPage = () => {
  return (
    <div className={st('loginPage')}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
