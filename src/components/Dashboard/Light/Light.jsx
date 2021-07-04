import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { getAdmin } from '../../../store/auth/selectors';
import { actions } from '../../../store/data/actions';
import Checkbox from '../Checkbox';
import styles from './Light.module.css';

const st = classNames.bind(styles);

const Light = (props) => {
  let users = ['', 'User1', 'User2'];
  let { changeLight, isAdmin } = props;

  const onChange = (e) => {
    changeLight({
      id: props.props.data.id,
      isOn: e.target.checked,
    });
  };

  return (
    <div className={st('light')}>
      <span className={st('descr')}>Марка фонаря: </span>
      <span>{props.props.data.type}</span>
      <span className={st('descr')}>Адрес: </span>
      <span>{props.props.data.location} </span>
      <span className={st('descr')}>Менеждер: </span>
      <span>{users[props.props.data.managerId]}</span>

      {!(isAdmin == 'admin') ? (
        <Checkbox isOn={props.props.data.isOn} onChange={onChange} />
      ) : (
        <>
          <span className={st('descr')}>Статус: </span>
          <span>{props.props.data.isOn ? 'Включен' : 'Выключен'} </span>
        </>
      )}
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
  changeLight: (payload) => dispatch(actions.changeLight(payload)),
  data: () => dispatch(actions.data()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Light);
