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
