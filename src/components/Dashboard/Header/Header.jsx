import Button from 'react-bootstrap/Button';
import styles from './Header.module.css';
import classNames from 'classnames/bind';
import Navbar from 'react-bootstrap/Navbar';
import { getAdmin } from '../../../store/auth/selectors';
import { connect } from 'react-redux';

const st = classNames.bind(styles);

const Header = (props) => {
  console.log('🚀 ~ file: Header.jsx ~ line 11 ~ Header ~ props', props);
  return (
    <div className={st('header')}>
      <div className={st('headerNavbar')} variant="dark">
        <div className={st('title')}>
          {props.isAdmin == 'admin' ? 'ПАНЕЛЬ АДМИНИСТРАТОРА' : 'ПАНЕЛЬ ПОЛЬЗОВАТЕЛЯ'}
        </div>
        <Button>ВЫЙТИ</Button>
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
  // changeLight: (payload) => dispatch(actions.changeLight(payload)),
  // data: () => dispatch(actions.data()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
