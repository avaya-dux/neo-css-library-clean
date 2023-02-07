export const BasicWidget = () => {
  return (
    <div className="neo-widget__content">
      <div className="neo-widget__header">
        <div className="neo-widget__header-left">
          <span className="neo-icon-chat"></span>
          <p>Header of widget window</p>
        </div>
        <div className="neo-widget__header-right"></div>
      </div>
      <div className="neo-widget__body neo-widget__body">
        <p className="neo-widget__message neo-widget__message">
          Adipisicing in consequat incididunt occaecat sit eu
          <strong>enim ex pariatur</strong>. Ad eiusmod duis incididunt
          reprehenderit.
        </p>
      </div>
    </div>
  );
};

export const BorderlessWidget = () => {
  return (
    <div className="neo-widget__content neo-widget__content--borderless">
      <div className="neo-widget__header">
        <div className="neo-widget__header-left">
          <span className="neo-icon-chat"></span>
          <p>Header of widget window</p>
        </div>
        <div className="neo-widget__header-right"></div>
      </div>
      <div className="neo-widget__body neo-widget__body">
        <p className="neo-widget__message neo-widget__message">
          Adipisicing in consequat incididunt occaecat sit eu
          <strong>enim ex pariatur</strong>. Ad eiusmod duis incididunt
          reprehenderit.
        </p>
      </div>
    </div>
  );
};

export const WidgetWithRadios = () => {
  return (
    <div style={{ display: "flex", justifyContent: 'space-around', marginBottom: '2rem' }}>
      <div className="neo-widget__content">
        <div className="neo-widget__header">
          <div className="neo-widget__header-left">
            <span className="neo-icon-chat"></span>
            <p>Header of widget window</p>
          </div>
          <div className="neo-widget__header-right"></div>
        </div>
        <div className="neo-widget__body neo-widget__body">
          <div className="neo-input-group">
            <input
              type="radio"
              name="logs-range-option"
              className="neo-radio"
              id="logs-10-minutes"
            />
            <label htmlFor="logs-10-minutes">Last 10 minutes (Default)</label>
          </div>
          <div className="neo-input-group">
            <input
              type="radio"
              name="logs-range-option"
              className="neo-radio"
              id="logs-20-minutes"
            />
            <label htmlFor="logs-20-minutes">Last 20 minutes (Default)</label>
          </div>
          <div className="neo-input-group">
            <input
              type="radio"
              name="logs-range-option"
              className="neo-radio"
              id="logs-30-minutes"
            />
            <label htmlFor="logs-30-minutes">Last 30 minutes (Default)</label>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p>Image of issue as per CCNXT-108310:</p>
        <img
          className="neo-img neo-thumbnail"
          style={{ maxWidth: "50%" }}
          src="/assets/images/WidgetRadios.png"
          alt="issue with radio buttons in Widget"
        ></img>
      </div>
    </div>
  );
};
