import Button from 'react-bootstrap/Button';
import styles from './Header.module.css';
import classNames from 'classnames/bind';
import Navbar from 'react-bootstrap/Navbar';

const st = classNames.bind(styles);

const Header = (props) => {
  return (
    <div className={st('header')}>
      <div className={st('headerNavbar')} variant="dark">
        <div className={st('title')}>{false ? 'ПАНЕЛЬ ПОЛЬЗОВАТЕЛЯ' : 'ПАНЕЛЬ АДМИНИСТРАТОРА'}</div>
        <Button>ВЫЙТИ</Button>
      </div>
    </div>
  );
};

export default Header;
