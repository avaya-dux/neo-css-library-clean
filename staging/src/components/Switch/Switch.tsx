import { Fragment } from "react";

export const Switch = () => {
  return (
    <form className="neo-form">
      <div className="neo-form-control">
        <label className="neo-switch" for="uncheckedCheckbox">
          <input
            id="uncheckedCheckbox"
            type="checkbox"
            role="checkbox"
            aria-checked="false"
            tabIndex="0"
          />
          <i className="neo-switch__icon"></i>
          I'm initially unchecked
        </label>
      </div>
      <div className="neo-form-control">
        <label className="neo-switch" for="checkedCheckbox">
          <input
            id="checkedCheckbox"
            type="checkbox"
            role="checkbox"
            defaultChecked
            aria-checked="true"
            tabIndex="0"
          />
          <i className="neo-switch__icon"></i>
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
          for="uncheckedDisabledCheckbox"
        >
          <input
            id="uncheckedDisabledCheckbox"
            type="checkbox"
            role="checkbox"
            aria-checked="false"
            disabled
          />
          <i className="neo-switch__icon"></i>
          I'm initially unchecked
        </label>
      </div>
      <div className="neo-form-control">
        <label
          className="neo-switch neo-switch--disabled"
          for="checkedDisabledCheckbox"
        >
          <input
            id="checkedDisabledCheckbox"
            type="checkbox"
            role="checkbox"
            defaultChecked
            aria-checked="true"
            disabled
          />
          <i className="neo-switch__icon"></i>
          I'm initially checked
        </label>
      </div>
    </Fragment>
  );
};
