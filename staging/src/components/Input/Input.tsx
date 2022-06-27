export const BasicInput = () => {
  return (
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
            />
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
              aria-label="clear input"
              className="neo-input-edit__icon neo-icon-end"
            />
          </div>
        </div>
        <div className="neo-input-hint">Enter your name.</div>
      </div>
    </form>
  );
};

export const InputAddons = () => {
  return (
    <form className="neo-form">
      <div className="neo-form-control">
        <div className="neo-input-group">
          <label htmlFor="input-group-prefix">Input group with prefix</label>
          <div className="neo-input-group--addons">
            <div className="neo-input-group__addon">$</div>
            <input
              className="neo-input"
              id="input-group-prefix"
              placeholder="Domain"
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="neo-form-control">
        <div className="neo-input-group">
          <label htmlFor="input-group-suffix">Input group with suffix</label>
          <div className="neo-input-group--addons">
            <input
              className="neo-input"
              id="input-group-suffix"
              placeholder="Domain"
              type="text"
            />
            <div className="neo-input-group__addon">.com</div>
          </div>
        </div>
      </div>
      <div className="neo-form-control">
        <div className="neo-input-group">
          <label htmlFor="input-group-prefix-suffix">
            Input group with both prefix and suffix
          </label>
          <div className="neo-input-group--addons">
            <div className="neo-input-group__addon">http://example.</div>
            <input
              className="neo-input"
              id="input-group-prefix-suffix"
              placeholder="Domain"
              type="text"
            />
            <div className="neo-input-group__addon">.com</div>
          </div>
        </div>
      </div>
    </form>
  );
};

export const ReadOnlyInput = () => {
  return (
    <form className="neo-form">
      <div className="neo-form-control">
        <div className="neo-input-group">
          <label htmlFor="readOnlyInput">Name</label>
          <input
            tabIndex={-1}
            className="neo-input neo-input-readonly"
            id="readOnlyInput"
            placeholder="Read-only"
            type="text"
            defaultValue="Read-only"
            readOnly
          />
        </div>
      </div>
    </form>
  );
};

export const InputWithIcons = () => {
  return (
    <form className="neo-form">
      <div className="neo-form-control neo-input-icon">
        <div className="neo-input-group">
          <label htmlFor="input-icons-both">
            Input with left and right icons
          </label>
          <div className="neo-input-icon__wrapper">
            <span className="neo-icon-analytics" />
            <input
              id="input-icons-both"
              className="neo-input"
              placeholder="Left & right icons"
              type="text"
            />
            <span className="neo-icon-accept" />
          </div>
        </div>
      </div>
      <div className="neo-form-control neo-input-icon">
        <div className="neo-input-group">
          <label htmlFor="input-icon-left">Input with left icon</label>
          <div className="neo-input-icon__wrapper">
            <span className="neo-icon-messaging-not-ready" />
            <input
              id="input-icon-left"
              className="neo-input"
              placeholder="Left icon"
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="neo-form-control neo-input-icon">
        <div className="neo-input-group">
          <label htmlFor="input-icon-right">Input with right icon</label>
          <div className="neo-input-icon__wrapper">
            <input
              id="input-icon-right"
              className="neo-input"
              placeholder="Right icon"
              type="text"
            />
            <span className="neo-icon-signature" />
          </div>
        </div>
      </div>
    </form>
  );
};

export const InputNoLabel = () => {
  return (
    <div className="neo-form-control">
      <div className="neo-input-editable__wrapper">
        <input
          className="neo-input"
          id="input-no-label"
          placeholder="Input With No Label"
          type="text"
        />
      </div>
    </div>
  );
};

export const InputCombinations = () => {
  return (
    <form className="neo-form">
      <div className="neo-form-control neo-input-icon">
        <div className="neo-input-group">
          <label htmlFor="input-icon-editable">Input with icons editable</label>
          <div className="neo-input-icon__wrapper neo-input-editable__wrapper">
            <span className="neo-icon-analytics" />
            <input
              id="input-icon-editable"
              className="neo-input"
              placeholder="Input with icons"
              aria-label="Input with icon"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
              aria-label="clear input"
              tabIndex={-1}
              className="neo-input-edit__icon neo-icon-end"
            />
          </div>
        </div>
      </div>
      <div className="neo-form-control neo-input-icon">
        <div className="neo-input-group">
          <label htmlFor="input-icon-add-on-editable">
            Input with icons & add on editable
          </label>
          <div className="neo-input-group--addons">
            <div className="neo-input-icon__wrapper neo-input-editable__wrapper">
              <span className="neo-icon-analytics" />
              <input
                id="input-icon-add-on-editable"
                className="neo-input"
                placeholder="Input with icons"
                aria-label="Input with icon"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                aria-label="clear input"
                tabIndex={-1}
                className="neo-input-edit__icon neo-icon-end"
              />
            </div>
            <div className="neo-input-group__addon">.com</div>
          </div>
        </div>
      </div>
      <div className="neo-form-control neo-form-control--disabled neo-input-icon">
        <div className="neo-input-group">
          <label htmlFor="input-icon-editable">
            Input with icons & add on editable & disabled
          </label>
          <div className="neo-input-group--addons">
            <div className="neo-input-icon__wrapper neo-input-editable__wrapper">
              <span className="neo-icon-analytics" />
              <input
                id="input-icon-editable"
                className="neo-input"
                placeholder="Input with icons"
                aria-label="Input with icon"
                disabled
              />
              <button
                disabled
                onClick={(e) => {
                  e.preventDefault();
                }}
                aria-label="clear input"
                tabIndex={-1}
                className="neo-input-edit__icon neo-icon-end"
              />
            </div>
            <div className="neo-input-group__addon">.com</div>
          </div>
        </div>
      </div>
      <div className="neo-form-control neo-form-control--error neo-form-control--required neo-input-icon">
        <div className="neo-input-group">
          <label htmlFor="input-error">
            Input with icons & add on editable & error
          </label>
          <div className="neo-input-group--addons">
            <div className="neo-input-icon__wrapper neo-input-editable__wrapper">
              <span className="neo-icon-analytics" />
              <input
                id="input-error"
                className="neo-input"
                placeholder="Input with icons"
                aria-label="Input with icon"
                aria-invalid="true"
                aria-describedby="inputHint"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                aria-label="clear input"
                tabIndex={-1}
                className="neo-input-edit__icon neo-icon-end"
              />
            </div>
            <div className="neo-input-group__addon">.com</div>
          </div>
          <div className="neo-input-hint" id="inputHint" aria-live="assertive">
            Enter your phone number.
          </div>
        </div>
      </div>
      <div className="neo-form-control">
        <div className="neo-input-group">
          <label
            htmlFor="input-group-addon-on-left-plus-icon2"
            aria-label="Addon on the left plus icon"
          >
            Addon on the left (icon included) and right editable
          </label>
          <div className="neo-input-group--addons">
            <div className="neo-input-group__addon neo-icon-call" />
            <div className="neo-input-editable__wrapper">
              <input
                className="neo-input"
                defaultValue=""
                id="input-group-addon-on-left-plus-icon3"
                placeholder="Type a number..."
                aria-label="Addon on the left plus icon"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                aria-label="clear input"
                tabIndex={-1}
                className="neo-input-edit__icon neo-icon-end"
              />
            </div>
            <div className="neo-input-group__addon">.com</div>
          </div>
        </div>
      </div>
      <div className="neo-form-control neo-form-control--disabled">
        <div className="neo-input-group">
          <label
            htmlFor="input-group-addon-on-left-plus-icon2"
            aria-label="Addon on the left plus icon"
          >
            Addon on the left (icon included) and right editable disabled
          </label>
          <div className="neo-input-group--addons">
            <div className="neo-input-group__addon neo-icon-call" />
            <div className="neo-input-editable__wrapper">
              <input
                className="neo-input"
                defaultValue=""
                id="input-group-addon-on-left-plus-icon3"
                placeholder="Type a number..."
                aria-label="Addon on the left plus icon"
                disabled
              />
              <button
                disabled
                onClick={(e) => {
                  e.preventDefault();
                }}
                aria-label="clear input"
                tabIndex={-1}
                className="neo-input-edit__icon neo-icon-end"
              />
            </div>
            <div className="neo-input-group__addon">.com</div>
          </div>
        </div>
      </div>
      <div className="neo-form-control neo-form-control--error neo-form-control--required">
        <div className="neo-input-group">
          <label
            htmlFor="input-group-addon-on-left-plus-icon2"
            aria-label="Addon on the left plus icon"
          >
            Addon on the left (icon included) and right editable error
          </label>
          <div className="neo-input-group--addons">
            <div className="neo-input-group__addon neo-icon-call" />
            <div className="neo-input-editable__wrapper">
              <input
                className="neo-input"
                defaultValue=""
                id="input-group-addon-on-left-plus-icon3"
                placeholder="Type a number..."
                aria-label="Addon on the left plus icon"
                aria-invalid="true"
                aria-describedby="inputHint"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                aria-label="clear input"
                tabIndex={-1}
                className="neo-input-edit__icon neo-icon-end"
              />
            </div>
            <div className="neo-input-group__addon">.com</div>
          </div>
          <div className="neo-input-hint" id="inputHint" aria-live="assertive">
            Enter your phone number.
          </div>
        </div>
      </div>
    </form>
  );
};
