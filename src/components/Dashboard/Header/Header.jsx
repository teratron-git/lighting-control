import classNames from 'classnames/bind';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { actions } from '../../../store/auth/actions';
import { getAdmin } from '../../../store/auth/selectors';
import styles from './Header.module.css';

const st = classNames.bind(styles);

const Header = (props) => {
  let { logOut, isAdmin } = props;

  const clickHandler = (e) => {
    logOut();
  };

  return (
    <div className={st('header')}>
      <div className={st('headerNavbar')} variant="dark">
        <div className={st('title')}>
          {isAdmin == 'admin' ? 'ПАНЕЛЬ АДМИНИСТРАТОРА' : 'ПАНЕЛЬ ПОЛЬЗОВАТЕЛЯ'}
        </div>
        <Button variant="btn btn-outline-danger" onClick={(e) => clickHandler(e)}>
          ВЫЙТИ
        </Button>
      </div>
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    isAdmin: getAdmin(state),
  };
};

export const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(actions.logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
