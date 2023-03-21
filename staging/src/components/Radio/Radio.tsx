export const Radio = () => {
  return (
    <div className="neo-form-control" style={{width: '20%'}}>
      <div className="neo-input-group">
        <input
          className="neo-radio neo-radio--multiline"
          type="radio"
          name="radioExample"
          value="Red"
          id="radio1"
        />

        <label htmlFor="radio1">Radio 1 This is a radio with extra long text using new `--multiline` class suffix</label>

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
  );
};

export const RadioWithReadOnly = () => {
  return (
    <>
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

          <label htmlFor="radio1">Radio 1</label>

          <input
            className="neo-radio"
            type="radio"
            name="radioExample"
            value="Blue"
            id="radio2"
            defaultChecked
          />

          <label htmlFor="radio2">Radio 2</label>
        </div>
      </div>

      <div className="neo-form-control">
        <div className="neo-input-group">
          <p>Readonly Radio button</p>

          <input
            className="neo-radio neo-radio-readonly"
            type="radio"
            name="radioExample"
            value="Red"
            id="radioReadOnly1"
            readOnly
          />

          <label htmlFor="radioReadOnly1">Radio 1 </label>

          <input
            className="neo-radio neo-radio-readonly"
            type="radio"
            name="radioExample"
            value="Red"
            id="radioReadOnly2"
            defaultChecked
            readOnly
          />

          <label htmlFor="radioReadOnly2">Radio 2 </label>
        </div>
      </div>
    </>
  );
};
