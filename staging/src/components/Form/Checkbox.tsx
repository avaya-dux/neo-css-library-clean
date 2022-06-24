export const CheckboxWithReadOnly = () => {
  return (
    <>
      <form className="neo-form">
        <div className="neo-form-control">
          <div className="neo-input-group">
            <p>Checkbox</p>
            <input
              className="neo-check"
              type="checkbox"
              id="checkbox"
              value="Checkbox"
            />
            <label for="checkbox">Check</label>
            <input
              className="neo-check"
              type="checkbox"
              id="checkbox1"
              value="Checkbox"
              defaultChecked
            />
            <label for="checkbox1">Check 1</label>
            <br/>
            <p>Readonly Checkbox</p>
            <input
              className="neo-check neo-check-readonly"
              type="checkbox"
              id="readOnlyCheckbox"
              value="Read-only Checkbox"
              readonly
            />
            <label for="readOnlyCheckbox">Check 1</label>
            <input
              className="neo-check  neo-check-readonly"
              type="checkbox"
              id="readOnlyCheckbox2"
              value="Read-only Checkbox 2"
              defaultChecked
              readonly
            />
            <label for="readOnlyCheckbox2">Check 2</label>
          </div>
        </div>
      </form>
    </>
  );
};
