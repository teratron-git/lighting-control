import { useState, useEffect } from 'react';
import { actions } from '../../../store/data/actions';
import { getAdmin } from '../../../store/auth/selectors';
import { connect } from 'react-redux';
import styles from './Light.module.css';
import classNames from 'classnames/bind';

const st = classNames.bind(styles);

const Light = (props) => {
  console.log('props LINGH', props);
  let [id, setId] = useState(props.props.data.id);
  let [isOn, setIsOn] = useState(props.props.data.isOn);

  let { lights, changeLight, data, isAdmin } = props;

  useEffect(() => {
    // data({});
    setIsOn(props.props.data.id);
    setIsOn(props.data.isOn);
  }, []);

  const onChange = (e) => {
    // e.target.value == '0' ? setIsOn('0') : setIsOn('1');
    // setId(props.props.data.id);
    // console.log('ON ID ', on, id, e.target.value);

    changeLight({
      id: props.props.data.id,
      isOn: props.props.data.isOn == '0' ? '1' : '0',
    });
  };

  return (
    <div className={st('light')}>
      {props.props.data.id} {props.props.data.type} {props.props.data.location}
      {props.props.data.isOn ? 'ВКЛ' : 'ВЫКЛ'} {props.props.data.managerId}
      {!(isAdmin == 'admin') ? (
        <span className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            defaultChecked={isOn}
            value={isOn}
            onChange={(e) => onChange(e)}
          />
        </span>
      ) : (
        false
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
