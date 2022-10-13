export const DropdownWithInput = () => {
  return (
    <div className="neo-dropdown neo-dropdown--active">
      <button
        aria-expanded="true"
        className="neo-btn neo-btn-primary neo-btn-primary--primary neo-dropdown__link-header"
      >
        Action
      </button>
      <div className="neo-dropdown__content" role="menu">
        <a
          className="neo-dropdown__link neo-icon-settings"
          role="menuitem"
          href="placeholder"
        >
          Something else
        </a>
        <a
          className="neo-dropdown__link neo-dropdown--disabled neo-icon-robot"
          role="menuitem"
          href="placeholder"
        >
          Disabled action
        </a>
        <div className="neo-dropdown--input">
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
          <button className="neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info neo-icon-voice"></button>
        </div>
      </div>
    </div>
  );
};

export const DropdownIconButton = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div className="neo-dropdown neo-dropdown--active">
        <button
          aria-expanded="true"
          className="neo-btn neo-btn-primary neo-btn-primary--primary neo-icon-settings neo-dropdown__link-header"
        ></button>
        <div className="neo-dropdown__content" role="menu">
          <a
            className="neo-dropdown__link neo-icon-settings"
            role="menuitem"
            href="placeholder"
          >
            Something else
          </a>
          <a
            className="neo-dropdown__link neo-dropdown--disabled neo-icon-robot"
            role="menuitem"
            href="placeholder"
          >
            Disabled action
          </a>
          <div className="neo-dropdown--input">
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
            <button className="neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info neo-icon-voice"></button>
          </div>
        </div>
      </div>
      <div className="neo-dropdown">
        <button
          aria-expanded="false"
          disabled
          className="neo-btn neo-btn-primary neo-btn-primary--primary neo-icon-settings neo-dropdown__link-header"
        ></button>
      </div>
    </div>
  );
};
