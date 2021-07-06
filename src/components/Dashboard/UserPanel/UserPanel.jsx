import { connect } from 'react-redux';
import { getUserId, getUserName } from '../../../store/auth/selectors';
import { actions } from '../../../store/data/actions';
import { getAllData } from '../../../store/data/selectors';
import Light from '../Light';

const UserPanel = (props) => {
  let mapLights = props.allData.filter((item) => item.managerId == props.getUserId);

  return (
    <div className={'userPanel'}>
      <div className="mtb-20">Пользователь: {props.getUserName}</div>
      <ul>
        {mapLights.map((item) => (
          <Light key={item.id} data={item}></Light>
        ))}
      </ul>
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    allData: getAllData(state),
    getUserName: getUserName(state),
    getUserId: getUserId(state),
  };
};

export const mapDispatchToProps = (dispatch) => ({
  changeLight: (payload) => dispatch(actions.changeLight(payload)),
  data: () => dispatch(actions.data()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);
