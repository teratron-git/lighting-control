import Button from 'react-bootstrap/Button';
import styles from './Header.module.css';
import classNames from 'classnames/bind';
import Navbar from 'react-bootstrap/Navbar';
import { getAdmin } from '../../../store/auth/selectors';
import { connect } from 'react-redux';
import { actions } from '../../../store/auth/actions';

const st = classNames.bind(styles);

let { logOut } = actions;

const Header = (props) => {
  let { logOut } = props;
  console.log('🚀 ~ file: Header.jsx ~ line 11 ~ Header ~ props', props);

  const clickHandler = (e) => {
    logOut();
    console.log(props);
  };

  return (
    <div className={st('header')}>
      <div className={st('headerNavbar')} variant="dark">
        <div className={st('title')}>
          {props.isAdmin == 'admin' ? 'ПАНЕЛЬ АДМИНИСТРАТОРА' : 'ПАНЕЛЬ ПОЛЬЗОВАТЕЛЯ'}
        </div>
        <Button onClick={(e) => clickHandler(e)}>ВЫЙТИ</Button>
      </div>
    </div>
  );
};

export const mapStateToProps = (state, props) => {
  return {
    props: props,
    isAdmin: getAdmin(state),
  };
};

export const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(actions.logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
