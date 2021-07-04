const Checkbox = (props) => {
  console.log('🚀 ~ file: Checkbox.jsx ~ line 11 ~ Checkbox ~ props', props);
  return (
    <span className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        defaultChecked={props.isOn}
        value={props.isOn}
        onChange={props.onChange}
      />
    </span>
  );
};

export default Checkbox;
