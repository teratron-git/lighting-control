import { useState, useEffect } from 'react';
import { actions } from '../../../store/data/actions';
import { getAdmin } from '../../../store/auth/selectors';
import { connect } from 'react-redux';
import styles from './Light.module.css';
import classNames from 'classnames/bind';
import Checkbox from '../Checkbox';

const st = classNames.bind(styles);

const Light = (props) => {
  console.log('props LINGH', props);
  let [id, setId] = useState(props.props.data.id);
  let [isOn, setIsOn] = useState(props.props.data.isOn);

  let { lights, changeLight, data, isAdmin } = props;
  let users = ['', 'User1', 'User2'];

  useEffect(() => {
    setId(id);
    setIsOn(props.props.data.isOn);
  }, []);

  const onChange = (e) => {
    console.log('🚀 ~ file: Light.jsx ~ line 30 ~ onChange ~   e.target.value', e.target.value);
    console.log('🚀 ~ file: Light.jsx ~ line 30 ~ onChange ~   e.target.checked', e.target.checked);
    console.log(
      '🚀 ~ file: Light.jsx ~ line 30 ~ onChange ~   e.target.defaultChecked',
      e.target.defaultChecked
    );
    setIsOn(e.target.checked);
    changeLight({
      id: props.props.data.id,
      isOn: e.target.checked,
    });
  };

  return (
    <div className={st('light')}>
      <span className={st('descr')}>Тип фонаря: </span>
      <span>{props.props.data.type}</span>
      <span className={st('descr')}>Адрес: </span>
      <span>{props.props.data.location} </span>
      <span className={st('descr')}>Менеждер: </span>
      <span>{users[props.props.data.managerId]}</span>

      {!(isAdmin == 'admin') ? (
        <Checkbox isOn={isOn} onChange={onChange} />
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
