import clsx from "clsx";
import { useEffect, useState } from "react";

import "./ws-layout-panel-proposal.css";

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

export const WorkspacesUIWithPanels = () => {
  const WSLayoutConfigOptions = {
    0: 1,
    1: 2,
    2: 2,
    3: 2,
    4: 2,
    5: 3,
    6: 3,
    7: 3,
    8: 3,
    9: 4,
    10: 4,
    11: 4,
    12: 5,
    13: 5,
    14: 5,
    15: 5,
    16: 5,
    17: 6,
  };

  const [layoutConfig, setLayoutConfig] = useState("0");

  const [panelsToRender, setPanelsToRender] = useState<number[]>([]);

  useEffect(() => {
    const numberOfPanelsToRender =
      WSLayoutConfigOptions[
        layoutConfig as unknown as keyof typeof WSLayoutConfigOptions
      ];

    setPanelsToRender([]);

    for (let x = 1; x <= numberOfPanelsToRender; x++) {
      setPanelsToRender(panelsToRender => [...panelsToRender, x]);
    }
  }, [layoutConfig]);

  return (
    <>
      <div className="neo-form-control" style={{ margin: "18px 0px" }}>
        <div className="neo-input-group">
          <label htmlFor="layout-config">Select Layout Configuration</label>
          <div className="neo-select" style={{ width: "30%" }}>
            <select
              id="layout-config"
              onChange={(e) => setLayoutConfig(e.target.value)}
            >
              <option value="0">0 (default)</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
            </select>
          </div>
        </div>
      </div>

      <div
        className="background-color neo-ws-layout neo-ws-layout--no-sidebar"
        style={{ marginBottom: "12px", height: "600px" }}
      >
        <div
          className="neo-panel neo-panel--bordered--bottom"
          style={{ gridArea: "header" }}
        >
          <nav className="neo-navbar">
            <div className="neo-nav--left">
              <a className="neo-skipnav" href="#content">
                Skip to main content
              </a>

              <a className="neo-navbar__brand" title="Neo Framework" href="https://design.avaya.com">
                <img
                  src="/assets/images/avaya-logo-header.svg"
                  aria-label="Avaya logo"
                />
              </a>

              <div className="neo-search-input neo-input-group neo-input-icon__wrapper neo-input-editable__wrapper">
                <span className="neo-icon-search" />
                <input className="neo-input" placeholder="Smart search" />
                <button
                  aria-label="clear search"
                  className="neo-input-editable__close neo-icon-end"
                  tabIndex={-1}
                />
              </div>
            </div>

            <div className="neo-nav">
              <div className="neo-badge__navbutton">
                <button
                  className="neo-badge__navbutton--content neo-btn neo-icon-dashboard"
                  aria-label="dashboard"
                ></button>
              </div>
              <div className="neo-badge__navbutton">
                <button
                  className="neo-badge__navbutton--content neo-btn neo-icon-notifications-on"
                  aria-label="notifications"
                ></button>
                <span className="neo-badge__icon" data-badge="99"></span>
              </div>
              <div className="neo-badge__navbutton">
                <button
                  className="neo-badge__navbutton--content neo-btn neo-icon-settings"
                  aria-label="settings"
                ></button>
              </div>
              <div
                className="neo-nav-status neo-nav-status--ready"
              >
                <div className="neo-nav-status-info">
                  <p>Barbara Barberson</p>
                  <span className="neo-label neo-label--ready">
                    Ready: 03:47
                  </span>
                </div>
                <figure
                  className="neo-avatar"
                  data-initials="BB"
                  title="Barbara Barberson"
                ></figure>
              </div>
            </div>
          </nav>
        </div>
        <div
          className={clsx(
            "neo-ws-layout--context",
            `neo-ws-layout--context-${layoutConfig}`
          )}
        >
          {panelsToRender.map((panel) => {
            return (
              <div
                className={clsx(
                  "neo-panel neo-panel--padding--8",
                  `neo-ws-layout--context-grid-area-${panel}`
                )}
              >
                {panel}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
