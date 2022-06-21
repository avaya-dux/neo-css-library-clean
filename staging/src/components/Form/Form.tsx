import { Fragment } from "react";

export const NeoForm = () => {
  return (
    <Fragment>
      <form className="neo-form">
        <div className="neo-form-control">
          <div className="neo-input-group">
            <label for="textInput" aria-label="phoneNumberInput">
              Input group label
            </label>
            <div className="neo-input-editable__wrapper">
              <input
                className="neo-input"
                id="input1"
                placeholder="Placeholder text"
                type="text"
              ></input>
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                aria-label="clear input"
                tabIndex="-1"
                className="neo-input-edit__icon neo-icon-end"
              ></button>
            </div>
          </div>
          <div className="neo-input-hint">Input group helper text</div>
        </div>
        <div className="neo-form-control">
          <div className="neo-input-editable__wrapper">
            <input
              className="neo-input"
              id="input-no-label"
              placeholder="Input With No Label"
              type="text"
            ></input>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export const InputStates = () => {
  return (
    <Fragment>
      <form className="neo-form">
        <div className="neo-form-control neo-form-control--disabled">
          <div className="neo-input-group">
            <label for="disabledInput" aria-label="disabledInput">
              Disabled input
            </label>
            <div className="neo-input-editable__wrapper">
              <input
                className="neo-input"
                defaultValue=""
                id="disabledInput"
                placeholder="This input is disabled"
                role="textbox"
                aria-label="disabledInput"
                disabled
              />
            </div>
          </div>
        </div>
        <div className="neo-form-control neo-form-control--required">
          <div className="neo-input-group">
            <label for="requiredInput" aria-label="requiredInput">
              Required input
            </label>
            <div className="neo-input-editable__wrapper">
              <input
                className="neo-input"
                defaultValue=""
                id="requiredInput"
                placeholder="This input is required"
                role="textbox"
                aria-label="requiredInput"
              />
            </div>
          </div>
        </div>
        <div className="neo-form-control neo-form-control--error">
          <div className="neo-input-group">
            <label for="errorInput" aria-label="requiredInput">
              Error input
            </label>
            <div className="neo-input-editable__wrapper">
              <input
                className="neo-input"
                defaultValue=""
                id="errorInput"
                placeholder="This input has an error"
                role="textbox"
                aria-label="errorInput"
              />
            </div>
          </div>
          <div className="neo-input-hint" aria-live="assertive">
            Input group helper text in error state.
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export const FormAlignment = () => {
  return (
    <Fragment>
      <form className="neo-form neo-form--inline">
        <div className="neo-form-control">
          <div className="neo-input-group neo-input-group--inline">
            <label for="textInput" aria-label="phoneNumberInput">
              Input group label
            </label>
            <div className="neo-input-editable__wrapper">
              <input
                className="neo-input"
                id="textInput"
                placeholder="Text Input"
                aria-label="textInput"
                role="textbox"
              />
            </div>
          </div>
          <div className="neo-input-hint">Input group helper text</div>
        </div>
        <div className="neo-form-control">
          <div className="neo-input-editable__wrapper">
            <input
              className="neo-input"
              placeholder="Input with No Label"
              role="textbox"
              aria-label="inputNoLabel"
            />
          </div>
        </div>
        <div className="neo-form-control neo-form-control--error neo-form-control--required">
          <div className="neo-input-group">
            <label for="radioMixedExample" aria-label="Addon on the right">
              Radios
            </label>
            <div className="neo-input-group--inline">
              <input
                className="neo-radio"
                type="radio"
                name="radioMixedExample"
                value="1"
                id="radioMixedExample1"
                role="radio"
                aria-checked="false"
              />
              <label htmlFor="radioMixedExample1">Radio 1</label>
              <input
                className="neo-radio"
                type="radio"
                name="radioMixedExample"
                value="2"
                id="radioMixedExample2"
                role="radio"
                aria-checked="false"
              />
              <label htmlFor="radioMixedExample2">Radio 2</label>
              <input
                className="neo-radio"
                type="radio"
                name="radioMixedExample"
                value="3"
                id="radioMixedExample3"
                role="radio"
                aria-checked="false"
              />
              <label htmlFor="radioMixedExample3">Radio 3</label>
            </div>
            <div className="neo-input-hint" aria-live="assertive">
              Please select at least one.
            </div>
          </div>
        </div>
        <div className="neo-form-control">
          <div className="neo-input-group">
            <label for="checkGroupExample" aria-label="Addon on the right">
              Checks
            </label>
            <div className="neo-input-group--inline">
              <input
                className="neo-check"
                type="checkbox"
                id="checkgroup1"
                value="checkgroup1"
                role="checkbox"
                aria-checked="false"
              />
              <label htmlFor="checkgroup1">Check 1</label>
              <input
                className="neo-check"
                type="checkbox"
                id="checkgroup2"
                value="checkgroup2"
                role="checkbox"
                aria-checked="true"
                defaultChecked
              />
              <label htmlFor="checkgroup2">Check 2</label>
              <input
                className="neo-check"
                type="checkbox"
                id="checkgroup3"
                value="checkgroup3"
                role="checkbox"
                aria-checked="false"
                disabled
              />
              <label htmlFor="checkgroup3">Check 3 (disabled)</label>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export const MixedInputs = () => {
  return (
    <form className="neo-form">
      <div className="neo-form-control neo-form-control--error neo-form-control--required">
        <div className="neo-input-group">
          <label for="input-group-addon-on-left" aria-label="Addon on the left">
            First input field
          </label>
          <div className="neo-input-group--addons">
            <div className="neo-input-group__addon">http://example.com/</div>
            <input
              className="neo-input"
              id="input-group-addon-on-left"
              placeholder="URL"
              role="textbox"
              aria-label="Addon on the left"
            />
          </div>
          <div className="neo-input-hint" aria-live="assertive">
            Enter your domain.
          </div>
        </div>
      </div>
      <div className="neo-form-control neo-form-control--disabled">
        <div className="neo-input-group">
          <label for="input-group-addon-on-left" aria-label="Addon on the left">
            Second input field
          </label>
          <div className="neo-input-group--addons">
            <div className="neo-input-group__addon">http://example.com/</div>
            <input
              className="neo-input"
              id="input-group-addon-on-left"
              placeholder="URL"
              role="textbox"
              aria-label="Addon on the left"
              disabled
            />
          </div>
        </div>
      </div>
      <div className="neo-form-control neo-form-control--error">
        <div className="neo-input-group">
          <label for="input-name-grid3" aria-label="name">
            Select
          </label>
          <div className="neo-select">
            <select className="neo-icon-chevron-down" name="color">
              <option defaultselected="true">Loading...</option>
              <option value="1">red</option>
              <option value="2">orange</option>
              <option value="3">yellow</option>
              <option value="4">green</option>
              <option value="5">blue</option>
            </select>
          </div>
          <div className="neo-input-hint" aria-live="assertive">
            Please select one.
          </div>
        </div>
      </div>
      <div className="neo-form-control">
        <div className="neo-input-group">
          <label
            for="input-group-addon-on-right"
            aria-label="Addon on the right"
          >
            Third input field
          </label>
          <div className="neo-input-group--addons">
            <input
              className="neo-input"
              id="input-group-addon-on-right"
              placeholder="Domain name"
              role="textbox"
              aria-label="Addon on the right"
            />
            <div className="neo-input-group__addon">.com</div>
          </div>
        </div>
      </div>
      <div className="neo-form-control neo-form-control--error neo-form-control--required">
        <div className="neo-input-group">
          <label for="radioMixedExample" aria-label="Addon on the right">
            Radios
          </label>
          <div className="neo-input-group--inline">
            <input
              className="neo-radio"
              type="radio"
              name="radioMixedExample"
              value="1"
              id="radioMixedExample1"
              role="radio"
              aria-checked="false"
            />
            <label htmlFor="radioMixedExample1">Radio 1</label>
            <input
              className="neo-radio"
              type="radio"
              name="radioMixedExample"
              value="2"
              id="radioMixedExample2"
              role="radio"
              aria-checked="false"
            />
            <label htmlFor="radioMixedExample2">Radio 2</label>
            <input
              className="neo-radio"
              type="radio"
              name="radioMixedExample"
              value="3"
              id="radioMixedExample3"
              role="radio"
              aria-checked="false"
            />
            <label htmlFor="radioMixedExample3">Radio 3</label>
          </div>
          <div className="neo-input-hint" aria-live="assertive">
            Please select at least one.
          </div>
        </div>
      </div>
      <div className="neo-form-control">
        <div className="neo-input-group">
          <label for="checkGroupExample" aria-label="Addon on the right">
            Checks
          </label>
          <div className="neo-input-group--inline">
            <input
              className="neo-check"
              type="checkbox"
              id="checkgroup1"
              value="checkgroup1"
              role="checkbox"
              aria-checked="false"
            />
            <label htmlFor="checkgroup1">Check 1</label>
            <input
              className="neo-check"
              type="checkbox"
              id="checkgroup2"
              value="checkgroup2"
              role="checkbox"
              aria-checked="true"
              defaultChecked
            />
            <label htmlFor="checkgroup2">Check 2</label>
            <input
              className="neo-check"
              type="checkbox"
              id="checkgroup3"
              value="checkgroup3"
              role="checkbox"
              aria-checked="false"
              disabled
            />
            <label htmlFor="checkgroup3">Check 3 (disabled)</label>
          </div>
        </div>
      </div>
      <div className="neo-form-control neo-form-control--required neo-form-control--error">
        <div className="neo-input-group">
          <label htmlFor="checkgroup3">Switches</label>
          <div className="neo-input-group--inline">
            <label tabIndex="0" className="neo-switch" htmlFor="switchGroup1">
              <input
                id="switchGroup1"
                type="checkbox"
                role="checkbox"
                aria-checked="false"
              />
              <i className="neo-switch__icon"></i>
              Switch group 1
            </label>
            <label tabIndex="0" className="neo-switch" htmlFor="switchGroup2">
              <input
                id="switchGroup2"
                type="checkbox"
                role="checkbox"
                aria-checked="false"
              />
              <i className="neo-switch__icon"></i>
              Switch group 2
            </label>
          </div>
          <div className="neo-input-hint" aria-live="assertive">
            Please select at least one.
          </div>
        </div>
      </div>
      <div className="neo-form-control">
        <div className="neo-input-group">
          <label
            for="input-group-addon-on-left-plus-icon2"
            aria-label="Addon on the left plus icon"
          >
            Addon on the left (icon included) and right editable
          </label>
          <div className="neo-input-group--addons">
            <div className="neo-input-group__addon neo-icon-call"></div>
            <div className="neo-input-editable__wrapper">
              <input
                className="neo-input"
                defaultValue=""
                id="input-group-addon-on-left-plus-icon3"
                placeholder="Type a number..."
                role="textbox"
                aria-label="Addon on the left plus icon"
              />
              <button className="neo-input-editable__close neo-icon-end"></button>
            </div>
            <div className="neo-input-group__addon">.com</div>
          </div>
        </div>
      </div>
      <div className="neo-form-control neo-form-control--textarea">
        <div className="neo-input-group">
          <label aria-label="Icon form">Editable text area label</label>
          <div>
            <textarea
              className="neo-input"
              placeholder="Input with right icon"
              role="textbox"
              aria-label="Input with right icon"
            />
            <div className="neo-input-textarea__helper">
              <div className="neo-input-hint">Enter text</div>
              <div className="neo-input-textarea__counter">31/100</div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
