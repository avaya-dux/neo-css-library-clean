import { icons, iconCategories } from "./iconInfo";

interface icon {
  name: string;
  bidirectional: boolean;
  category: string;
  animated: boolean;
}

type iconCategoryContainer = {
  category: string;
  icons: icon[];
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
          <IconCategoryContainer category={category} icons={iconsToRender} />
        );
      })}
    </>
  );
};
