export const Checkbox = () => {
  return (
    <form className="neo-form">
      <div className="neo-form-control">
        <div className="neo-input-group">
          <input
            className="neo-check"
            type="checkbox"
            id="checkbox1"
            value="Checkbox 1"
          />
          <label for="checkbox1">Check 1</label>
          <input
            className="neo-check"
            type="checkbox"
            id="checkbox2"
            value="Checkbox 2"
            defaultChecked
          />
          <label for="checkbox2">Check 2</label>
          <input
            className="neo-check"
            type="checkbox"
            id="checkbox3"
            value="Checkbox 3"
            disabled
          />
          <label for="checkbox3">Check 3 (disabled)</label>
          <input
            className="neo-check"
            type="checkbox"
            id="checkbox4"
            value="Checkbox 4"
            defaultChecked
            disabled
          />
          <label for="checkbox4">Check 4 (disabled)</label>
          <input
            className="neo-check neo-check--indeterminate"
            type="checkbox"
            id="checkbox5"
            value="Checkbox 5"
            defaultChecked
          />
          <label for="checkbox5">Check 5 (indeterminate)</label>
          <input
            className="neo-check neo-check--indeterminate"
            type="checkbox"
            id="checkbox6"
            value="Checkbox 6"
            defaultChecked
            disabled
          />
          <label for="checkbox6">Check 6 (indeterminate disabled)</label>
        </div>
      </div>
    </form>
  );
};
