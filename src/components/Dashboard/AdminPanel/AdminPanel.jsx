import { actions } from '../../../store/data/actions';
import { getAllData } from '../../../store/data/selectors';
import { connect } from 'react-redux';
import Light from '../Light';
import AddForm from './AddForm';

const AdminPanel = (props) => {
  console.log('AdminPanel ~ props', props);

  return (
    <div className={'AdminPanel'}>
      <div>ADMIN PANEL</div>
      <AddForm />
      <br />
      <ul>
        {props.allData.map((item) => (
          <Light key={item.id} data={item}></Light>
        ))}
      </ul>
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    allData: getAllData(state),
  };
};

export const mapDispatchToProps = (dispatch) => ({
  // changeLight: (payload) => dispatch(actions.changeLight(payload)),
  // data: () => dispatch(actions.data()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
