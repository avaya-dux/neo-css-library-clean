/* eslint-disable jsx-a11y/anchor-is-valid */

import clsx from "clsx";
import { useState } from "react";

export const Dropdown = () => {
  const [separatorLinkIsActive, setSeparatorLinkIsActive] =
    useState<boolean>(false);
  const [anotherActionIsActive, setAnotherActionIsActive] =
    useState<boolean>(false);

  return (
    <div className="neo-dropdown neo-dropdown--active">
      <button className="neo-btn neo-btn-primary neo-btn-primary--primary neo-dropdown__link-header">
        Action
      </button>
      <div className="neo-dropdown__content" role="menu">
        <div className="neo-dropdown__item neo-dropdown--active">
          <a
            aria-expanded="true"
            className="neo-dropdown__link"
            role="menuitem"
            href="#"
          >
            Something else
          </a>
          <div className="neo-dropdown__content" role="menu">
            <div className="neo-dropdown__shortcut--wrapper">
              <a className="neo-dropdown__link" href="/dropdown#">
                Action
              </a>
              <p className="neo-dropdown__shortcut">Shortcut text</p>
            </div>
            <a
              className={clsx(
                "neo-dropdown__link neo-icon-settings",
                anotherActionIsActive && "neo-dropdown__link--active"
              )}
              role="menuitem"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setAnotherActionIsActive(!anotherActionIsActive);
              }}
            >
              Click to Activate
            </a>
            <div className="neo-dropdown__item neo-dropdown--active">
              <a
                className="neo-dropdown__link"
                role="menuitem"
                href="/dropdown#"
              >
                Action
              </a>
            </div>
          </div>
        </div>
        <a
          className="neo-dropdown__link neo-dropdown--disabled"
          role="menuitem"
          href="/dropdown#"
        >
          Disabled action
        </a>
        <a
          className="neo-dropdown__link"
          role="menuitem"
          href="#"
        >
          Regular action
        </a>
        <a
          className={clsx(
            "neo-dropdown__link neo-icon-settings",
            separatorLinkIsActive && "neo-dropdown__link--active"
          )}
          role="menuitem"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setSeparatorLinkIsActive(!separatorLinkIsActive);
          }}
        >
          Click to Activate
        </a>
        <div className="neo-dropdown__item">
          <a
            className="neo-dropdown__link neo-dropdown--disabled"
            role="menuitem"
            href="/dropdown#"
          >
            Disabled Sub Menu
          </a>
        </div>
        <hr className="neo-dropdown__separator" />
        <a className="neo-dropdown__link" href="/dropdown#">
          <figure
            className="neo-avatar neo-avatar--small"
            data-initials="SM"
          ></figure>
          Another action
        </a>
      </div>
    </div>
  );
};

export const DropdownWithInput = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

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
          className={clsx(
            "neo-dropdown__link neo-icon-settings",
            isActive && "neo-dropdown__link--active"
          )}
          role="menuitem"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsActive(!isActive);
          }}
        >
          Click to Activate
        </a>
        <a
          className="neo-dropdown__link neo-dropdown--disabled neo-icon-settings"
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
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div className="neo-dropdown neo-dropdown--active">
        <button
          aria-expanded="true"
          className="neo-btn neo-btn-primary neo-btn-primary--primary neo-icon-settings neo-dropdown__link-header"
        ></button>
        <div className="neo-dropdown__content" role="menu">
          <a
            className={clsx(
              "neo-dropdown__link neo-icon-settings",
              isActive && "neo-dropdown__link--active"
            )}
            role="menuitem"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsActive(!isActive);
            }}
          >
            Click to Activate
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
