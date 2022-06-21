export const Radio = () => {
  return (
    <form className="neo-form">
      <div className="neo-form-control">
        <div className="neo-input-group">
          <input
            className="neo-radio"
            type="radio"
            name="radioExample"
            value="Red"
            id="radio1"
            role="radio"
            aria-checked="false"
            tabIndex="0"
          />
          <label for="radio1">Radio 1</label>
          <input
            className="neo-radio"
            type="radio"
            name="radioExample"
            value="Blue"
            id="radio2"
            role="radio"
            aria-checked="false"
            tabIndex="0"
          />
          <label for="radio2">Radio 2</label>
          <input
            className="neo-radio"
            type="radio"
            name="radioExample"
            value="Green"
            id="radio3"
            role="radio"
            aria-checked="false"
            disabled
          />
          <label for="radio3">Radio 3 (disabled)</label>
        </div>
      </div>
    </form>
  );
};
