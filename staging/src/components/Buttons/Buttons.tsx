import React from "react";

export const Buttons = () => {
  return (
    <section>
      <h2>Buttons</h2>

      <h3>Primary Buttons</h3>
      <div className="wrapper">
        <div className="wrapper__component-group">
          <button
            id="primarybutton"
            className="neo-btn neo-btn-primary neo-btn-primary--default"
          >
            Default
          </button>
          <button className="neo-btn neo-btn-primary neo-btn-primary--success">
            Success
          </button>
          <button className="neo-btn neo-btn-primary neo-btn-primary--alert">
            Alert
          </button>
          <button className="neo-btn neo-btn-primary neo-btn-primary--warning">
            Warning
          </button>
          <button className="neo-btn neo-btn-primary neo-btn-primary--info">
            Info
          </button>
        </div>
      </div>

      <h3>Secondary Buttons</h3>
      <div className="wrapper">
        <div className="wrapper__component-group">
          <button className="neo-btn neo-btn-secondary neo-btn-secondary--default">
            Default
          </button>
          <button className="neo-btn neo-btn-secondary neo-btn-secondary--success">
            Success
          </button>
          <button className="neo-btn neo-btn-secondary neo-btn-secondary--alert">
            Alert
          </button>
          <button className="neo-btn neo-btn-secondary neo-btn-secondary--warning">
            Warning
          </button>
          <button className="neo-btn neo-btn-secondary neo-btn-secondary--info">
            Info
          </button>
        </div>
      </div>

      <h3>Tertiary Buttons</h3>
      <div className="wrapper">
        <div className="wrapper__component-group">
          <button className="neo-btn neo-btn-tertiary neo-btn-tertiary--default">
            Default
          </button>
          <button className="neo-btn neo-btn-tertiary neo-btn-tertiary--success">
            Success
          </button>
          <button className="neo-btn neo-btn-tertiary neo-btn-tertiary--alert">
            Alert
          </button>
          <button className="neo-btn neo-btn-tertiary neo-btn-tertiary--warning">
            Warning
          </button>
          <button className="neo-btn neo-btn-tertiary neo-btn-tertiary--info">
            Info
          </button>
        </div>
      </div>

      <h3>Icon Buttons</h3>
      <div className="wrapper">
        <div className="wrapper__component-group">
          <button className="neo-btn neo-btn-primary neo-btn-primary--default neo-icon-settings">
            icon auto
          </button>

          <button
            dir="ltr"
            className="neo-btn neo-btn-primary neo-btn-primary--default neo-icon-settings"
          >
            icon left
          </button>

          <button
            dir="rtl"
            className="neo-btn neo-btn-primary neo-btn-primary--default neo-icon-settings"
          >
            icon right
          </button>

          <button
            dir="ltr"
            className="neo-btn neo-btn-secondary neo-btn-secondary--warning neo-icon-settings"
          >
            icon left
          </button>

          <button
            dir="rtl"
            className="neo-btn neo-btn-secondary neo-btn-secondary--warning neo-icon-settings"
          >
            icon right
          </button>

          <button
            dir="ltr"
            className="neo-btn neo-btn-tertiary neo-btn-tertiary--success neo-icon-settings"
          >
            icon left
          </button>

          <button
            dir="rtl"
            className="neo-btn neo-btn-tertiary neo-btn-tertiary--success neo-icon-settings"
          >
            icon right
          </button>
        </div>
      </div>

      <h3>Disabled Buttons</h3>
      <div className="wrapper">
        <div className="wrapper__component-group">
          <button
            className="neo-btn neo-btn-primary neo-btn-primary--default"
            disabled
          >
            Default
          </button>
          <button
            className="neo-btn neo-btn-primary neo-btn-primary--success"
            disabled
          >
            Success
          </button>
          <button
            className="neo-btn neo-btn-primary neo-btn-primary--alert"
            disabled
          >
            Alert
          </button>
          <button
            className="neo-btn neo-btn-primary neo-btn-primary--warning"
            disabled
          >
            Warning
          </button>
          <button
            className="neo-btn neo-btn-primary neo-btn-primary--info"
            disabled
          >
            Info
          </button>
        </div>
        <div className="wrapper__component-group">
          <button
            className="neo-btn neo-btn-secondary neo-btn-secondary--default"
            disabled
          >
            Default
          </button>
          <button
            className="neo-btn neo-btn-secondary neo-btn-secondary--success"
            disabled
          >
            Success
          </button>
          <button
            className="neo-btn neo-btn-secondary neo-btn-secondary--alert"
            disabled
          >
            Alert
          </button>
          <button
            className="neo-btn neo-btn-secondary neo-btn-secondary--warning"
            disabled
          >
            Warning
          </button>
          <button
            className="neo-btn neo-btn-secondary neo-btn-secondary--info"
            disabled
          >
            Info
          </button>
        </div>
        <div className="wrapper__component-group">
          <button
            className="neo-btn neo-btn-tertiary neo-btn-tertiary--default"
            disabled
          >
            Default
          </button>
          <button
            className="neo-btn neo-btn-tertiary neo-btn-tertiary--success"
            disabled
          >
            Success
          </button>
          <button
            className="neo-btn neo-btn-tertiary neo-btn-tertiary--alert"
            disabled
          >
            Alert
          </button>
          <button
            className="neo-btn neo-btn-tertiary neo-btn-tertiary--warning"
            disabled
          >
            Warning
          </button>
          <button
            className="neo-btn neo-btn-tertiary neo-btn-tertiary--info"
            disabled
          >
            Info
          </button>
        </div>
      </div>

      <h3>Button With Spinner</h3>
      <div className="wrapper">
        <div className="wrapper__component-group">
          <button className="neo-btn neo-btn-primary neo-btn-primary--primary">
            <span className="neo-spinner"></span>
            Submit
          </button>
          <button className="neo-btn neo-btn-secondary neo-btn-secondary--success">
            <span className="neo-spinner"></span>
            Submit
          </button>
          <button className="neo-btn neo-btn-tertiary neo-btn-tertiary--primary">
            <span className="neo-spinner"></span>
            Submit
          </button>
        </div>
      </div>

      <h3>Button With Badge</h3>
      <div className="wrapper">
        <div className="wrapper__component-group">
          <button
            className="neo-btn neo-btn-primary neo-btn-primary--primary neo-badge"
            data-badge="99"
          >
            Badge in Button
          </button>
          <button
            className="neo-btn neo-btn-secondary neo-btn-secondary--primary neo-badge"
            data-badge="99"
          >
            Badge in Button
          </button>
          <button
            className="neo-btn neo-btn-tertiary neo-btn-tertiary--primary neo-badge"
            data-badge="99"
          >
            Badge in Button
          </button>
        </div>
      </div>

      <h3>Circular Buttons</h3>
      <div className="wrapper">
        <div className="wrapper__component-group">
          <button
            className="neo-btn-circle neo-btn-circle-primary neo-btn-circle-primary--success neo-icon-settings"
            aria-label="DESCRIPTION OF ICON/ACTION"
          />
          <button
            className="neo-btn-circle neo-btn-circle-secondary neo-btn-circle-secondary--alert neo-icon-settings"
            aria-label="DESCRIPTION OF ICON/ACTION"
          />
          <button
            className="neo-btn-circle neo-btn-circle-tertiary neo-btn-circle-tertiary--info neo-icon-settings"
            aria-label="DESCRIPTION OF ICON/ACTION"
          />
        </div>
      </div>

      <h3>Square Buttons</h3>
      <div className="wrapper">
        <div className="wrapper__component-group">
          <button
            className="neo-btn-square neo-btn-square-primary neo-btn-square-primary--alert neo-icon-settings"
            aria-label="DESCRIPTION OF ICON/ACTION"
          />
          <button
            className="neo-btn-square neo-btn-square-secondary neo-btn-square-secondary--alert neo-icon-settings"
            aria-label="DESCRIPTION OF ICON/ACTION"
          />
          <button
            className="neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info neo-icon-settings"
            aria-label="DESCRIPTION OF ICON/ACTION"
          />
        </div>
      </div>

      <h3>Wide Buttons</h3>
      <div className="wrapper">
        <div className="wrapper__component-group">
          <div style={{ flexGrow: 1 }}>
            <button className="neo-btn neo-btn--wide neo-btn-primary neo-btn-primary--default neo-icon-chat">
              Button
            </button>

            <button className="neo-btn neo-btn--wide neo-btn-secondary neo-btn-secondary--default neo-icon-chat">
              Button
            </button>

            <button className="neo-btn neo-btn--wide neo-btn-tertiary neo-btn-tertiary--default neo-icon-chat">
              Button
            </button>
          </div>

          <div style={{ flexGrow: 1 }}>
            <button className="neo-btn neo-btn--wide neo-btn-primary neo-btn-primary--default">
              Button
            </button>

            <button className="neo-btn neo-btn--wide neo-btn-secondary neo-btn-secondary--default">
              Button
            </button>

            <button className="neo-btn neo-btn--wide neo-btn-tertiary neo-btn-tertiary--default">
              Button
            </button>
          </div>
        </div>
      </div>

      <h3>Compact Buttons</h3>
      <div className="wrapper">
        <div className="wrapper__component-group">
          <button className="neo-btn neo-btn--compact neo-btn--compact neo-btn-primary neo-btn-primary--primary">
            Primary
          </button>
          <button className="neo-btn neo-btn--compact neo-btn-secondary neo-btn-secondary--primary">
            Primary
          </button>
          <button className="neo-btn neo-btn--compact neo-btn-tertiary neo-btn-tertiary--primary">
            Primary
          </button>
          <button className="neo-btn neo-btn--compact neo-btn-primary neo-btn-primary--primary neo-icon-error">
            Primary icon left
          </button>
        </div>
        <div className="wrapper__component-group">
          <button
            aria-label="DESCRIPTION OF ICON/ACTION"
            className="neo-btn-circle neo-btn-circle--compact neo-btn-circle-primary neo-btn-circle-primary--success neo-icon-error"
          />
          <button
            aria-label="DESCRIPTION OF ICON/ACTION"
            className="neo-btn-circle neo-btn-circle--compact neo-btn-circle-secondary neo-btn-circle-secondary--alert neo-icon-error"
          />
          <button
            aria-label="DESCRIPTION OF ICON/ACTION"
            className="neo-btn-circle neo-btn-circle--compact neo-btn-circle-tertiary neo-btn-circle-tertiary--info neo-icon-error"
          />
          <button
            aria-label="DESCRIPTION OF ICON/ACTION"
            className="neo-btn-square neo-btn-square--compact neo-btn-square-primary neo-btn-square-primary--alert neo-icon-error"
          />
          <button
            aria-label="DESCRIPTION OF ICON/ACTION"
            className="neo-btn-square neo-btn-square--compact neo-btn-square-secondary neo-btn-square-secondary--alert neo-icon-error"
          />
          <button
            aria-label="DESCRIPTION OF ICON/ACTION"
            className="neo-btn-square neo-btn-square--compact neo-btn-square-tertiary neo-btn-square-tertiary--info neo-icon-error"
          />
        </div>
      </div>

      <h3>Pulsing Buttons</h3>
      <div className="wrapper">
        <div className="wrapper__component-group">
          <button className="neo-btn neo-btn-primary neo-btn-primary--default neo-pulse">
            Default
          </button>
          <button className="neo-btn neo-btn-primary neo-btn-primary--success neo-pulse">
            Success
          </button>
          <button className="neo-btn neo-btn-primary neo-btn-primary--alert neo-pulse">
            Alert
          </button>
          <button className="neo-btn neo-btn-primary neo-btn-primary--warning neo-pulse">
            Warning
          </button>
          <button className="neo-btn neo-btn-primary neo-btn-primary--info neo-pulse">
            Info
          </button>
          <button className="neo-btn neo-btn-secondary neo-btn-secondary--default neo-pulse">
            Default
          </button>
          <button className="neo-btn neo-btn-secondary neo-btn-secondary--success neo-pulse">
            Success
          </button>
          <button className="neo-btn neo-btn-secondary neo-btn-secondary--alert neo-pulse">
            Alert
          </button>
          <button className="neo-btn neo-btn-secondary neo-btn-secondary--warning neo-pulse">
            Warning
          </button>
          <button className="neo-btn neo-btn-secondary neo-btn-secondary--info neo-pulse">
            Info
          </button>
          <button className="neo-btn neo-btn-tertiary neo-btn-tertiary--default neo-pulse">
            Default
          </button>
          <button className="neo-btn neo-btn-tertiary neo-btn-tertiary--success neo-pulse">
            Success
          </button>
          <button className="neo-btn neo-btn-tertiary neo-btn-tertiary--alert neo-pulse">
            Alert
          </button>
          <button className="neo-btn neo-btn-tertiary neo-btn-tertiary--warning neo-pulse">
            Warning
          </button>
          <button className="neo-btn neo-btn-tertiary neo-btn-tertiary--info neo-pulse">
            Info
          </button>

          <button
            className="neo-btn-circle neo-btn-circle-primary neo-btn-circle-primary--success neo-pulse neo-icon-error"
            aria-label="primary circle success error icon"
          />

          <button
            className="neo-btn-circle neo-btn-circle-secondary neo-btn-circle-secondary--alert neo-pulse neo-icon-error"
            aria-label="primary circle success error icon"
          />

          <button
            className="neo-btn-circle neo-btn-circle-tertiary neo-btn-circle-tertiary--info neo-pulse neo-icon-error"
            aria-label="primary circle success error icon"
          />

          <button
            className="neo-btn-square neo-btn-square-primary neo-btn-square-primary--alert neo-pulse neo-icon-error"
            aria-label="primary circle success error icon"
          />

          <button
            className="neo-btn-square neo-btn-square-secondary neo-btn-square-secondary--alert neo-pulse neo-icon-error"
            aria-label="primary circle success error icon"
          />

          <button
            className="neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info neo-pulse neo-icon-error"
            aria-label="primary circle success error icon"
          />
        </div>
      </div>
    </section>
  );
};

