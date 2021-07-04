import { actions } from '../../../store/data/actions';
import { getAllData } from '../../../store/data/selectors';
import { getUserName, getUserId } from '../../../store/auth/selectors';
import { connect } from 'react-redux';
import Light from '../Light';
import { useEffect, useState } from 'react';

const UserPanel = (props) => {
  console.log('UserPanel ~ props', props);

  let mapLights = props.allData.filter((item) => item.managerId == props.getUserId);
  console.log('🚀 ~ file: UserPanel.jsx ~ line 16 ~ mapLights ~ mapLights', mapLights);

  const [dataArray, setDataArray] = useState(mapLights || []);
  console.log('🚀 ~ file: UserPanel.jsx ~ line 12 ~ UserPanel ~ dataArray', dataArray);

  useEffect(() => {
    setDataArray(mapLights);
  }, []);

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

export const mapStateToProps = (state, props) => {
  return {
    props,
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
