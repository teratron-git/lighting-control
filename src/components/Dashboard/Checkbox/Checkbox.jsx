const Checkbox = (props) => {
  return (
    <span className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        defaultChecked={props.isOn}
        onChange={props.onChange}
      />
    </span>
  );
};

export default Checkbox;
