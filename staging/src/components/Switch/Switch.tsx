import { Fragment } from "react";

export const Switch = () => {
  return (
    <form className="neo-form">
      <div className="neo-form-control">
        <label className="neo-switch" htmlFor="uncheckedCheckbox">
          <input id="uncheckedCheckbox" type="checkbox" />
          <i className="neo-switch__icon" />
          I'm initially unchecked
        </label>
      </div>
      <div className="neo-form-control">
        <label className="neo-switch" htmlFor="checkedCheckbox">
          <input id="checkedCheckbox" type="checkbox" defaultChecked />
          <i className="neo-switch__icon" />
          I'm initially checked
        </label>
      </div>
    </form>
  );
};

export const SwitchDescription = () => {
  return (
    <p className="global-spacing--text">
      Switches can be rendered using checkboxes.
    </p>
  );
};

export const DisabledSwitch = () => {
  return (
    <Fragment>
      <div className="neo-form-control">
        <label
          className="neo-switch neo-switch--disabled"
          htmlFor="uncheckedDisabledCheckbox"
        >
          <input id="uncheckedDisabledCheckbox" type="checkbox" disabled />
          <i className="neo-switch__icon" />
          I'm initially unchecked
        </label>
      </div>
      <div className="neo-form-control">
        <label
          className="neo-switch neo-switch--disabled"
          htmlFor="checkedDisabledCheckbox"
        >
          <input
            id="checkedDisabledCheckbox"
            type="checkbox"
            defaultChecked
            disabled
          />
          <i className="neo-switch__icon" />
          I'm initially checked
        </label>
      </div>
    </Fragment>
  );
};
