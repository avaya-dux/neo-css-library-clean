export const Radio = () => {
  return (
    <>
      <form className="neo-form">
        <div className="neo-form-control">
          <div className="neo-input-group">
            <p>Radio button</p>
            <input
              className="neo-radio"
              type="radio"
              name="radioExample"
              value="Red"
              id="radio1"
            />
            <label for="radio1">Radio 1</label>
            <input
              className="neo-radio"
              type="radio"
              name="radioExample"
              value="Blue"
              id="radio2"
              checked
            />
            <label for="radio2">Radio 2</label>
          </div>
        </div>
      </form>
      <form className="neo-form">
        <div className="neo-form-control">
          <div className="neo-input-group">
            <p>Readonly Radio button</p>
            <input
              className="neo-radio neo-radio-readonly"
              type="radio"
              name="radioExample"
              value="Red"
              id="radioReadOnly1"
              readonly
            />
            <label for="radioReadOnly1">Radio 1 </label>
            <input
              className="neo-radio neo-radio-readonly"
              type="radio"
              name="radioExample"
              value="Red"
              id="radioReadOnly2"
              checked
              readonly
            />
            <label for="radioReadOnly2">Radio 2 </label>
          </div>
        </div>
      </form>
    </>
  );
};
