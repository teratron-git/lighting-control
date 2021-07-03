import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getError } from '../../../store/auth/selectors';
import { connect } from 'react-redux';
import { actions } from '../../../store/auth/actions';
import { useEffect, useState } from 'react';

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
    <div>
      ФОРМА АВТОРИЗАЦИИ
      <Form onSubmit={(e) => submitHandler(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="userName"
            placeholder="Enter username"
            value={userName}
            onChange={(e) => changeEmailHandler(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => changePasswordHandler(e)}
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
