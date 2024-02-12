const options = [
  <div
    className="neo-chip neo-chip--default neo-chip--close neo-chip--close--default"
    key={1}
  >
    Option 1
    <button className="neo-close neo-close--clear" aria-label="remove option" />
  </div>,
  <div
    className="neo-chip neo-chip--default neo-chip--close neo-chip--close--default"
    key={2}
  >
    Option 2
    <button className="neo-close neo-close--clear" aria-label="remove option" />
  </div>,
  <div
    className="neo-chip neo-chip--default neo-chip--close neo-chip--close--default"
    key={3}
  >
    Option 3
    <button className="neo-close neo-close--clear" aria-label="remove option" />
  </div>,
  <div
    className="neo-chip neo-chip--default neo-chip--close neo-chip--close--default"
    key={4}
  >
    Option 4
    <button className="neo-close neo-close--clear" aria-label="remove option" />
  </div>,
  <div
    className="neo-chip neo-chip--default neo-chip--close neo-chip--close--default"
    key={5}
  >
    Option 5
    <button className="neo-close neo-close--clear" aria-label="remove option" />
  </div>,
  <div
    className="neo-chip neo-chip--default neo-chip--close neo-chip--close--default"
    key={6}
  >
    Option 6
    <button className="neo-close neo-close--clear" aria-label="remove option" />
  </div>,
  <div
    className="neo-chip neo-chip--default neo-chip--close neo-chip--close--default"
    key={7}
  >
    Option 7
    <button className="neo-close neo-close--clear" aria-label="remove option" />
  </div>,
  <div
    className="neo-chip neo-chip--default neo-chip--close neo-chip--close--default"
    key={8}
  >
    Option 8
    <button className="neo-close neo-close--clear" aria-label="remove option" />
  </div>,
  <div
    className="neo-chip neo-chip--default neo-chip--close neo-chip--close--default"
    key={9}
  >
    Option 9
    <button className="neo-close neo-close--clear" aria-label="remove option" />
  </div>,
  <div
    className="neo-chip neo-chip--default neo-chip--close neo-chip--close--default"
    key={10}
  >
    Option 10
    <button className="neo-close neo-close--clear" aria-label="remove option" />
  </div>,
];

export const SelectExamples = () => {
  return (
    <section>
      <h2>Select Examples</h2>

      <div style={{ width: 300 }}>
        <h3>No Options Selected</h3>

        <div className="neo-input-group">
          <label htmlFor="combobox">Choose one</label>

          <div className="neo-multiselect">
            <div className="neo-multiselect-combo__header">
              <input
                className="neo-input "
                placeholder="Select One"
                id="combobox"
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: 300 }}>
        <h3>Few Options Selected</h3>

        <div className="neo-input-group">
          <label htmlFor="combobox">Choose one</label>

          <div className="neo-multiselect">
            <div className="neo-multiselect-combo__header">
              {options.slice(0, 1)}

              <input
                className="neo-input "
                placeholder="Select One"
                id="combobox"
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: 300 }}>
        <h3>Many Options</h3>

        <div className="neo-input-group">
          <label htmlFor="combobox">Choose one</label>

          <div className="neo-multiselect">
            <div className="neo-multiselect-combo__header">
              {options}

              <input
                className="neo-input "
                placeholder="Select One"
                id="combobox"
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: 300 }}>
        <h3>Disabled</h3>

        <div className="neo-input-group">
          <label htmlFor="disabled-combobox">Choose one</label>

          <div className="neo-multiselect neo-multiselect--disabled">
            <div className="neo-multiselect-combo__header">
              <input
                className="neo-input "
                placeholder="Select One"
                id="disabled-combobox"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SmallSelect = () => {
  return (
    <div style={{ width: 300 }}>
      <h2>Small Select</h2>

      <div className="neo-input-group">
        <label htmlFor="combobox">Choose one</label>

        <div className="neo-multiselect neo-multiselect--small neo-multiselect--active">
          <div className="neo-multiselect__header">Select One</div>
          <div className="neo-multiselect__content">
            <ul aria-label="list of options">
              <li
                className="neo-multiselect__content__item--disabled"
                tabIndex={-1}
              >
                Option 1
              </li>
              <li>Option 2</li>
              <li>Option 3</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
