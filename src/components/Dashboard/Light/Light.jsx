import { useState, useEffect } from 'react';
import { actions } from '../../../store/data/actions';
import { getAdmin } from '../../../store/auth/selectors';
import { connect } from 'react-redux';

const Light = (props) => {
  console.log('props LINGH', props);
  let [id, setId] = useState(props.props.data.id);
  let [on, setOn] = useState(props.props.data.isOn);
  console.log('STATE ID ON', id, on);

  let { lights, changeLight, data, isAdmin } = props;

  useEffect(() => {
    data({});
    setOn(!!props.props.data.id);
    setOn(!!props.props.data.isOn);
  }, []);

  const onChange = (e) => {
    setOn(e.target.checked);
    setId(props.props.data.id);
    console.log('ON ID ', on, id, e.target.value);

    changeLight({ id, on });
  };

  return (
    <div>
      {props.props.data.id} {props.props.data.type} {props.props.data.location}
      {props.props.data.isOn ? 'ВКЛ' : 'ВЫКЛ'} {props.props.data.manager}
      {!(isAdmin == 'admin') ? (
        <span className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            defaultChecked={on}
            onChange={onChange}
          />
          <label className="form-check-label">-</label>
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
