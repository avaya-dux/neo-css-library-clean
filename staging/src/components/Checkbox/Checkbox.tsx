export const Checkbox = () => {
  return (
    <div className="neo-form-control">
      <div className="neo-input-group">
        <input
          className="neo-check"
          type="checkbox"
          id="checkbox1"
          value="Checkbox 1"
        />

        <label htmlFor="checkbox1">Check 1</label>

        <input
          className="neo-check"
          type="checkbox"
          id="checkbox2"
          value="Checkbox 2"
          defaultChecked
        />

        <label htmlFor="checkbox2">Check 2</label>

        <input
          className="neo-check"
          type="checkbox"
          id="checkbox3"
          value="Checkbox 3"
          disabled
        />

        <label htmlFor="checkbox3">Check 3 (disabled)</label>

        <input
          className="neo-check"
          type="checkbox"
          id="checkbox4"
          value="Checkbox 4"
          defaultChecked
          disabled
        />

        <label htmlFor="checkbox4">Check 4 (disabled)</label>

        <input
          className="neo-check neo-check--indeterminate"
          type="checkbox"
          id="checkbox5"
          value="Checkbox 5"
          defaultChecked
        />

        <label htmlFor="checkbox5">Check 5 (indeterminate)</label>

        <input
          className="neo-check neo-check--indeterminate"
          type="checkbox"
          id="checkbox6"
          value="Checkbox 6"
          defaultChecked
          disabled
        />

        <label htmlFor="checkbox6">Check 6 (indeterminate disabled)</label>
      </div>
    </div>
  );
};

export const CheckboxWithReadOnly = () => {
  return (
    <div className="neo-form-control">
      <div className="neo-input-group">
        <p>Checkbox</p>

        <input
          className="neo-check"
          type="checkbox"
          id="checkbox"
          value="Checkbox"
        />

        <label htmlFor="checkbox">Check</label>

        <input
          className="neo-check"
          type="checkbox"
          id="checkbox1"
          value="Checkbox"
          defaultChecked
        />

        <label htmlFor="checkbox1">Check 1</label>

        <br />
        <p>Readonly Checkbox</p>

        <input
          className="neo-check neo-check-readonly"
          type="checkbox"
          id="readOnlyCheckbox"
          value="Read-only Checkbox"
          readOnly
        />

        <label htmlFor="readOnlyCheckbox">Check 1</label>

        <input
          className="neo-check  neo-check-readonly"
          type="checkbox"
          id="readOnlyCheckbox2"
          value="Read-only Checkbox 2"
          defaultChecked
          readOnly
        />

        <label htmlFor="readOnlyCheckbox2">Check 2</label>
      </div>
    </div>
  );
};
