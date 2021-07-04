import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getError } from '../../../store/auth/selectors';
import { connect } from 'react-redux';
import { actions } from '../../../store/auth/actions';
import { useEffect, useState } from 'react';
import styles from './LoginForm.module.css';
import classNames from 'classnames/bind';

const st = classNames.bind(styles);

const LoginForm = (props) => {
  console.log('🚀 ~ file: LoginForm.jsx ~ line 8 ~ LoginForm ~ props', props);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  // console.log('🚀 ~ file: LoginForm.jsx ~ line 11 ~ LoginForm ~ username', username);
  // console.log('🚀 ~ file: LoginForm.jsx ~ line 13 ~ LoginForm ~ password', password);

  const changeEmailHandler = (e) => {
    setUserName(e.target.value);
  };

  const changePasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log('🚀 ~ file: LoginForm.jsx ~ line 25 ~ clickHandler ~ e', e);
    props.logIn({ userName: userName, password: password });
  };
  // useEffect(() => {
  //   props.logIn({ userName: 'Admin', password: 'Admin' }), [];
  // });

  return (
    <div className={st('loginForm')}>
      <div className={st('title')}>Удаленное управление освещением</div>В системе зарегистрированы
      три пользователя:
      <div className={st('loginForm_cred')}>
        Имя: <b>Admin</b>, пароль: <b>Admin</b> для входа под администратором
        <br /> Имя: <b>User1</b>, пароль: <b>User1</b> для входа под Пользователем1
        <br /> Имя: <b>User2</b>, пароль: <b>User2</b> для входа под Пользователем2
      </div>
      <Form onSubmit={(e) => submitHandler(e)} required>
        <Form.Group className="mb-3 center w-200" controlId="formBasicEmail">
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control
            type="userName"
            placeholder="Ведите имя"
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
        <Button variant="primary" type="submit">
          ВОЙТИ
        </Button>
      </Form>
      <span className="error">{props.error}</span>
    </div>
  );
};

export const mapStateToProps = (state, props) => {
  return {
    props: props,
    error: getError(state),
  };
};

export const mapDispatchToProps = (dispatch) => ({
  // changeLight: (payload) => dispatch(actions.changeLight(payload)),
  logIn: (payload) => dispatch(actions.logIn(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
