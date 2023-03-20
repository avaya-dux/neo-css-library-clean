import { Icon, iconCategories, icons } from "./iconInfo";

type iconCategoryContainer = {
  category: string;
  icons: Icon[];
};

const IconCategoryContainer = (props: iconCategoryContainer) => {
  const { category, icons } = props;

  return (
    <>
      {icons.length > 0 && (
        <div>
          <h4>{category}</h4>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {icons.map((icon) => {
              const unicode = `neo-icon-${icon.name}`;
              return (
                <div
                  key={icon.name}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100px",
                    width: "100px",
                    justifyContent: "space-around",
                    alignItems: "center",
                    margin: "20px 10px",
                  }}
                >
                  <span className={unicode} style={{ fontSize: "28px" }}></span>
                  <div style={{ textAlign: "center" }}>{icon.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export const IconComponent = () => {
  return (
    <>
      {iconCategories.map((category, index) => {
        const iconsToRender = icons.filter(
          (icon) => icon.category === category
        );

        return (
          <IconCategoryContainer
            key={index}
            category={category}
            icons={iconsToRender}
          />
        );
      })}
    </>
  );
};

export const IconSizes = () => {
  return (
    <>
      <h2>Icon sizes</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "1rem",
        }}
      >
        <span className="neo-icon-error neo-icon--small"> Small</span>
        <span className="neo-icon-error neo-icon--medium"> Medium</span>
        <span className="neo-icon-error neo-icon--large"> Large</span>
      </div>
    </>
  );
};

export const IconStates = () => {
  return (
    <>
      <h2>Icon states</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "1rem",
          marginBottom: "2rem"
        }}
      >
        <span className="neo-icon-state neo-icon-state--available neo-icon-voice"></span>
        <span className="neo-icon-state neo-icon-state--away neo-icon-voice"></span>
        <span className="neo-icon-state neo-icon-state--busy neo-icon-voice"></span>
        <span className="neo-icon-state neo-icon-state--do-not-disturb neo-icon-voice"></span>
        <span className="neo-icon-state neo-icon-state--offline neo-icon-voice"></span>
        <span className="neo-icon-state neo-icon-state--lock neo-icon-voice"></span>
        <span className="neo-icon-state neo-icon-state--warning neo-icon-voice"></span>
        <span className="neo-icon-state neo-icon-state--missed neo-icon-voice"></span>
        <span className="neo-icon-state neo-icon-state--connected neo-icon-voice"></span>
        <span className="neo-icon-state neo-icon-state--inbound neo-icon-voice"></span>
        <span className="neo-icon-state neo-icon-state--outbound neo-icon-voice"></span>
        <span className="neo-icon-state neo-icon-state--acw neo-icon-voice"></span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "1rem",
        }}
      >
        <span className="neo-icon-state neo-icon-state--large neo-icon-state--available neo-icon-voice"></span>
        <span className="neo-icon-state neo-icon-state--large neo-icon-state--away neo-icon-voice"></span>
        <span className="neo-icon-state neo-icon-state--large neo-icon-state--busy neo-icon-voice"></span>
        <span className="neo-icon-state neo-icon-state--large neo-icon-state--do-not-disturb neo-icon-voice"></span>
        <span className="neo-icon-state neo-icon-state--large neo-icon-state--offline neo-icon-voice"></span>
        <span className="neo-icon-state neo-icon-state--large neo-icon-state--lock neo-icon-voice"></span>
        <span className="neo-icon-state neo-icon-state--large neo-icon-state--warning neo-icon-voice"></span>
        <span className="neo-icon-state neo-icon-state--large neo-icon-state--missed neo-icon-voice"></span>
        <span className="neo-icon-state neo-icon-state--large neo-icon-state--connected neo-icon-voice"></span>
        <span className="neo-icon-state neo-icon-state--large neo-icon-state--inbound neo-icon-voice"></span>
        <span className="neo-icon-state neo-icon-state--large neo-icon-state--outbound neo-icon-voice"></span>
        <span className="neo-icon-state neo-icon-state--large neo-icon-state--acw neo-icon-voice"></span>
      </div>
    </>
  );
};
