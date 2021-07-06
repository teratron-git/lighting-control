import classNames from 'classnames/bind';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { actions } from '../../../store/auth/actions';
import { getError, getIsLogging } from '../../../store/auth/selectors';
import styles from './LoginForm.module.css';

const st = classNames.bind(styles);

const LoginForm = (props) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const { error, isLogging } = props;

  const changeEmailHandler = (e) => {
    setUserName(e.target.value);
  };

  const changePasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.logIn({ userName: userName, password: password });
  };

  return (
    <div className={st('loginForm')}>
      <div className={st('title')}>Удаленное управление освещением</div>В системе зарегистрированы
      три пользователя:
      <div className={st('loginForm_cred')}>
        <div>
          Имя: <b>Admin</b>, пароль: <b>Admin</b> для входа под администратором
        </div>
        <div>
          Имя: <b>User1</b>, пароль: <b>User1</b> для входа под Пользователем1
        </div>
        <div>
          Имя: <b>User2</b>, пароль: <b>User2</b> для входа под Пользователем2
        </div>
      </div>
      <Form onSubmit={(e) => submitHandler(e)} required>
        <Form.Group className="mb-3 center w-200" controlId="formBasicEmail">
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control
            type="userName"
            placeholder="Введите имя"
            value={userName}
            onChange={(e) => changeEmailHandler(e)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 center w-200" controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => changePasswordHandler(e)}
            required
          />
        </Form.Group>
        <div className={st('buttonSpinner')}>
          {isLogging ? (
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          ) : (
            <Button variant="primary" type="submit">
              ВОЙТИ
            </Button>
          )}
        </div>
      </Form>
      <span className="error">{error}&nbsp; </span>
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    error: getError(state),
    isLogging: getIsLogging(state),
  };
};

export const mapDispatchToProps = (dispatch) => ({
  logIn: (payload) => dispatch(actions.logIn(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
