import clsx from "clsx";
import { useEffect, useState } from "react";

export const DefaultAndBorderedPanels = () => {
  return (
    <>
      <div className="neo-panel">Default Panel</div>
      <div className="neo-panel neo-panel--bordered--top">
        Bordered Top Panel
      </div>
      <div className="neo-panel neo-panel--bordered--bottom">
        Bordered Bottom Panel
      </div>
      <div className="neo-panel neo-panel--bordered--side">
        Bordered Side Panel
      </div>
    </>
  );
};

export const PanelsWithPadding = () => {
  return (
    <>
      <div
        className="neo-panel neo-panel--padding--8"
        style={{ flexGrow: "1" }}
      >
        <div className="inner-div">Padding 8</div>
      </div>
      <div
        className="neo-panel neo-panel--padding--16"
        style={{ flexGrow: "1" }}
      >
        <div className="inner-div">Padding 16</div>
      </div>
      <div
        className="neo-panel neo-panel--padding--24"
        style={{ flexGrow: "1" }}
      >
        <div className="inner-div">Padding 24</div>
      </div>
    </>
  );
};

export const PanelsWithMargins = () => {
  type MarginType = {
    all?: boolean;
    top?: boolean;
    left?: boolean;
    right?: boolean;
    bottom?: boolean;
  };

  const [marginFour, setMarginFour] = useState<MarginType>({
    all: false,
    top: false,
    left: false,
    right: false,
    bottom: false,
  });

  const [marginEight, setMarginEight] = useState<MarginType>({
    all: false,
    top: false,
    left: false,
    right: false,
    bottom: false,
  });

  useEffect(() => {
    if (marginFour.all) {
      setMarginFour((marginFour) => ({
        ...marginFour,
        top: false,
        right: false,
        bottom: false,
        left: false,
      }));
    }
  }, [marginFour.all]);

  useEffect(() => {
    if (marginEight.all) {
      setMarginEight((marginEight) => ({
        ...marginEight,
        top: false,
        right: false,
        bottom: false,
        left: false,
      }));
    }
  }, [marginEight.all]);

  return (
    <>
      <div
        className={clsx(
          "neo-panel",
          "neo-panel--padding--8",
          marginFour.all && "neo-panel--margin--4",
          marginFour.top && "neo-panel--margin--4--top",
          marginFour.left && "neo-panel--margin--4--left",
          marginFour.right && "neo-panel--margin--4--right",
          marginFour.bottom && "neo-panel--margin--4--bottom"
        )}
        style={{ flexGrow: "1" }}
      >
        <form className="neo-form" style={{ height: "100%" }}>
          <div
            className="neo-form-control neo-form-control--checkboxes"
            style={{ height: "100%" }}
          >
            <div className="neo-input-group" style={{ height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexGrow: "1",
                }}
              >
                <input
                  className="neo-check"
                  type="checkbox"
                  id="margin-four-top"
                  value="margin-top"
                  checked={marginFour.top}
                  onChange={() => {
                    setMarginFour((marginFour) => ({
                      ...marginFour,
                      top: !marginFour.top,
                    }));
                  }}
                />
                <label htmlFor="margin-four-top">Margin 4 Top</label>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexGrow: "1",
                }}
              >
                <input
                  className="neo-check"
                  type="checkbox"
                  id="margin-four-left"
                  value="margin-left"
                  checked={marginFour.left}
                  onChange={() => {
                    setMarginFour((marginFour) => ({
                      ...marginFour,
                      left: !marginFour.left,
                    }));
                  }}
                />
                <label htmlFor="margin-four-left">Margin 4 Left</label>
                <input
                  className="neo-check"
                  type="checkbox"
                  id="margin-four"
                  value="margin"
                  checked={marginFour.all}
                  onChange={() => {
                    setMarginFour((marginFour) => ({
                      ...marginFour,
                      all: !marginFour.all,
                    }));
                  }}
                />
                <label htmlFor="margin-four">Margin 4 All</label>
                <input
                  className="neo-check"
                  type="checkbox"
                  id="margin-four-right"
                  value="margin-right"
                  checked={marginFour.right}
                  onChange={() => {
                    setMarginFour((marginFour) => ({
                      ...marginFour,
                      right: !marginFour.right,
                    }));
                  }}
                />
                <label htmlFor="margin-four-right">Margin 4 Right</label>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexGrow: "1",
                }}
              >
                <input
                  className="neo-check"
                  type="checkbox"
                  id="margin-four-bottom"
                  value="margin-bottom"
                  checked={marginFour.bottom}
                  onChange={() => {
                    setMarginFour((marginFour) => ({
                      ...marginFour,
                      bottom: !marginFour.bottom,
                    }));
                  }}
                />
                <label htmlFor="margin-four-bottom">Margin 4 Bottom</label>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="neo-panel neo-panel--padding-16">Seperator</div>
      <div
        className={clsx(
          "neo-panel",
          "neo-panel--padding--8",
          marginEight.all && "neo-panel--margin--8",
          marginEight.top && "neo-panel--margin--8--top",
          marginEight.left && "neo-panel--margin--8--left",
          marginEight.right && "neo-panel--margin--8--right",
          marginEight.bottom && "neo-panel--margin--8--bottom"
        )}
        style={{ flexGrow: "1" }}
      >
        <form className="neo-form" style={{ height: "100%" }}>
          <div
            className="neo-form-control neo-form-control--checkboxes"
            style={{ height: "100%" }}
          >
            <div className="neo-input-group" style={{ height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexGrow: "1",
                }}
              >
                <input
                  className="neo-check"
                  type="checkbox"
                  id="margin-eight-top"
                  value="margin-top"
                  checked={marginEight.top}
                  onChange={() => {
                    setMarginEight((marginEight) => ({
                      ...marginEight,
                      top: !marginEight.top,
                    }));
                  }}
                />
                <label htmlFor="margin-eight-top">Margin 8 Top</label>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexGrow: "1",
                }}
              >
                <input
                  className="neo-check"
                  type="checkbox"
                  id="margin-eight-left"
                  value="margin-left"
                  checked={marginEight.left}
                  onChange={() => {
                    setMarginEight((marginEight) => ({
                      ...marginEight,
                      left: !marginEight.left,
                    }));
                  }}
                />
                <label htmlFor="margin-eight-left">Margin 8 Left</label>
                <input
                  className="neo-check"
                  type="checkbox"
                  id="margin-eight"
                  value="margin"
                  checked={marginEight.all}
                  onChange={() => {
                    setMarginEight((marginEight) => ({
                      ...marginEight,
                      all: !marginEight.all,
                    }));
                  }}
                />
                <label htmlFor="margin-eight">Margin 8 All</label>
                <input
                  className="neo-check"
                  type="checkbox"
                  id="margin-eight-right"
                  value="margin-right"
                  checked={marginEight.right}
                  onChange={() => {
                    setMarginEight((marginEight) => ({
                      ...marginEight,
                      right: !marginEight.right,
                    }));
                  }}
                />
                <label htmlFor="margin-eight-right">Margin 8 Right</label>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexGrow: "1",
                }}
              >
                <input
                  className="neo-check"
                  type="checkbox"
                  id="margin-eight-bottom"
                  value="margin-bottom"
                  checked={marginEight.bottom}
                  onChange={() => {
                    setMarginEight((marginEight) => ({
                      ...marginEight,
                      bottom: !marginEight.bottom,
                    }));
                  }}
                />
                <label htmlFor="margin-eight-bottom">Margin 8 Bottom</label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
