import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getAdmin } from '../../../../store/auth/selectors';
import { connect } from 'react-redux';
import { actions } from '../../../../store/data/actions';
import { useState } from 'react';

const AddForm = (props) => {
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [isOn, setIsOn] = useState('0');
  const [managerId, setSetManagerId] = useState('1');

  const changeTypeHandler = (e) => {
    setType(e.target.value);
  };

  const changeLocationHandler = (e) => {
    setLocation(e.target.value);
  };

  const changeIsOnHandler = (e) => {
    setIsOn(e.target.value);
  };

  const changeManagerHandler = (e) => {
    setSetManagerId(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.addLight({
      type: type,
      location: location,
      isOn: isOn,
      managerId: managerId,
      role: props.role,
    });

    setType('');
    setLocation('');
  };

  return (
    <div className=" mt-10">
      ДОБАВИТЬ НОВЫЙ ФОНАРЬ
      <Form onSubmit={(e) => submitHandler(e)}>
        <Form.Group className="mb-3">
          <Form.Label>Тип</Form.Label>
          <Form.Control
            type="type"
            placeholder="Введите тип фонаря"
            value={type}
            onChange={(e) => changeTypeHandler(e)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Адрес</Form.Label>
          <Form.Control
            type="location"
            placeholder="Введите адрес"
            value={location}
            onChange={(e) => changeLocationHandler(e)}
            required
          />
        </Form.Group>
        Выберите состояние света по умолчанию
        <select className="form-select mt-10" onChange={(e) => changeIsOnHandler(e)}>
          <option selected value="0">
            Выключено
          </option>
          <option value="1">Включено</option>
        </select>
        <br />
        Выберите менеджера
        <select className="form-select mt-10" onChange={(e) => changeManagerHandler(e)}>
          <option selected value="1">
            User1
          </option>
          <option value="2">User2</option>
        </select>
        <Button variant="btn btn-outline-success" type="submit" className="mt-10">
          ДОБАВИТЬ ФОНАРЬ
        </Button>
      </Form>
    </div>
  );
};

export const mapStateToProps = (state, props) => {
  return {
    props: props,
    role: getAdmin(state),
  };
};

export const mapDispatchToProps = (dispatch) => ({
  addLight: (payload) => dispatch(actions.addLight(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
