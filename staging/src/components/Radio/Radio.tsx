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
          />
          <label htmlFor="radio1">Radio 1</label>
          <input
            className="neo-radio"
            type="radio"
            name="radioExample"
            value="Blue"
            id="radio2"
          />
          <label htmlFor="radio2">Radio 2</label>
          <input
            className="neo-radio"
            type="radio"
            name="radioExample"
            value="Green"
            id="radio3"
            disabled
          />
          <label htmlFor="radio3">Radio 3 (disabled)</label>
        </div>
      </div>
    </form>
  );
};
