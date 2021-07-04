import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { getAllData } from '../../../store/data/selectors';
import Light from '../Light';
import AddForm from './AddForm';
import styles from './AdminPanel.module.css';
const st = classNames.bind(styles);

const AdminPanel = (props) => {
  return (
    <div className={st('adminPanel')}>
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

export default connect(mapStateToProps, null)(AdminPanel);
