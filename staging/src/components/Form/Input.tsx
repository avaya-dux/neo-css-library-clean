export const BasicInput = () => {
  return (
    <>
      <p>Input Component</p>
      <form className="neo-form">
        <div className="neo-form-control">
          <div className="neo-input-group">
            <label htmlFor="input1">Name</label>
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
          <div className="neo-input-hint">Enter your name.</div>
        </div>
      </form>
    </>
  );
};

export const ReadOnlyInput = () => {
  return (
    <>
      <p>Read Only Input Component</p>
      <form className="neo-form">
        <div className="neo-form-control">
          <div className="neo-input-group">
            <label for="readOnlyInput">Label</label>
            <input
              tabIndex="-1"
              className="neo-input neo-input-readonly"
              id="readOnlyInput"
              placeholder="Read-only"
              type="text"
              defaultValue="Read-only"
              readOnly
            ></input>
          </div>
        </div>
      </form>
    </>
  );
};
