import clsx from "clsx";
/* eslint-disable */
import { useEffect, useState } from "react";

type LeftNav = {
  className?: string;
};

export const LeftNavWithSimpleJS = ({ className }: LeftNav) => {
  const [activate, setActivate] = useState([1]);
  const onExpand = (number: number) => {
    if (activate.includes(number)) {
      setActivate((prevState) => prevState.filter((numb) => numb !== number));
    } else {
      setActivate((prevState) => [...prevState, number]);
    }
  };

  return (
    <div
      className={clsx(
        "neo-leftnav--wrapper neo-leftnav--wrapper-tooltip",
        className
      )}
    >
      <nav className="neo-leftnav">
        <ul className="neo-leftnav__nav neo-leftnav__nav--tooltip">
          <li
            className={
              activate.includes(1)
                ? "neo-leftnav__main neo-leftnav__main--active neo-leftnav__main--expand"
                : "neo-leftnav__main neo-leftnav__main--active neo-tooltip neo-tooltip--right neo-tooltip--onhover"
            }
          >
            <button
              className="neo-leftnav__category neo-btn neo-btn-secondary--info neo-icon-contact expandable"
              onClick={() => onExpand(1)}
              aria-labelledby="tooltip1"
            >
              Accounts This Is An Extra Long String That Should Wrap
            </button>
            <div className="neo-tooltip__content" id="tooltip1">
              <div className="neo-arrow" />
              Accounts
            </div>
            <ul className="neo-leftnav__nav neo-leftnav__nav--tooltip">
              <li className="neo-leftnav__sub neo-leftnav__sub--active neo-leftnav__sub--multiline neo-tooltip neo-tooltip--right neo-tooltip--onhover">
                <a>Overview This Is An Extra Long String That Should Wrap This Is Many More Words To Show That The Shape Of The Dot Is Now Preserved With Many More Lines Of Text</a>
                <div className="neo-tooltip__content" id="tooltip1">
                  <div className="neo-arrow"></div>
                  Tooltip
                </div>
              </li>

              <li className="neo-leftnav__sub neo-leftnav__sub--multiline">
                <a>Manage Users This Is An Extra Long String That Should Wrap</a>
              </li>

              <li className="neo-leftnav__sub">
                <a>Billing</a>
              </li>

              <li className="neo-leftnav__sub">
                <a tabIndex={-1}>Payments</a>
              </li>
            </ul>
          </li>

          <li
            className={
              activate.includes(2)
                ? "neo-leftnav__main neo-leftnav__main--expand"
                : "neo-leftnav__main neo-tooltip neo-tooltip--right neo-tooltip--onhover"
            }
          >
            <a
              className="expandable"
              onClick={() => onExpand(2)}
              aria-labelledby="tooltip2"
            >
              Configuration This Is An Extra Long String That Should Wrap
            </a>

            <div className="neo-tooltip__content" id="tooltip2">
              <div className="neo-arrow" />
              Configuration
            </div>

            <ul className="neo-leftnav__nav">
              <li className="neo-leftnav__sub neo-leftnav__sub--active neo-leftnav__sub--no-icon">
                <a>RBAC</a>
              </li>

              <li className="neo-leftnav__sub neo-leftnav__sub--no-icon">
                <a>SIP Trunking</a>
              </li>

              <li className="neo-leftnav__sub neo-leftnav__sub--no-icon">
                <a>Directory Services</a>
              </li>
            </ul>
          </li>

          <li
            className={
              activate.includes(3)
                ? "neo-leftnav__main neo-leftnav__main--expand"
                : "neo-leftnav__main neo-tooltip neo-tooltip--right neo-tooltip--onhover"
            }
          >
            <a
              className="neo-icon-address-book expandable"
              onClick={() => onExpand(3)}
              aria-labelledby="tooltip3"
            >
              Contact Center
            </a>

            <div className="neo-tooltip__content" id="tooltip3">
              <div className="neo-arrow" />
              Contact Center
            </div>

            <ul className="neo-leftnav__nav">
              <li className="neo-leftnav__sub neo-leftnav__sub--active">
                <a tabIndex={-1}>Customer Identifiers</a>
              </li>

              <li className="neo-leftnav__sub">
                <a>Transfer Destinations</a>
              </li>

              <li className="neo-leftnav__sub">
                <a>Work Assignments</a>
              </li>

              <li className="neo-leftnav__sub">
                <a tabIndex={-1}>Contacts</a>
              </li>
            </ul>
          </li>

          <li className="neo-leftnav__main">
            <a className="neo-icon-user-group" tabIndex={-1}>
              Groups This Is An Extra Long String That Should Wrap
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export const CondensedLeftNavWithScroll = () => {
  const [activate, setActivate] = useState([1]);
  const [condensed, setCondensed] = useState(true);

  const onExpand = (number: number) => {
    if (activate.includes(number)) {
      setActivate((prevState) => prevState.filter((numb) => numb !== number));
    } else {
      setActivate((prevState) => [...prevState, number]);
    }
  };

  useEffect(() => {
    console.log(condensed);
  }, [condensed]);

  return (
    <div
      className={
        condensed
          ? "neo-leftnav--wrapper neo-leftnav--wrapper-tooltip neo-leftnav--condensed--scrollable neo-leftnav--condensed hide-nav"
          : "neo-leftnav--wrapper neo-leftnav--wrapper-tooltip neo-leftnav--condensed--scrollable neo-leftnav--condensed"
      }
    >
      <nav
        className="neo-leftnav"
        aria-label="secondary"
        style={{ maxHeight: "200px" }}
      >
        <ul className="neo-leftnav__nav">
          <li
            className={`neo-leftnav__main neo-leftnav__main--active ${
              activate.includes(1) && !condensed
                ? "neo-leftnav__main--expand"
                : ""
            }`}
          >
            <a
              aria-label="Accounts"
              className="neo-icon-contact"
              onClick={() => onExpand(1)}
            >
              Accounts
              <span className="neo-icon-chevron-left" />
            </a>

            <ul className="neo-leftnav__nav">
              <li className="neo-leftnav__sub">
                <a tabIndex={-1}>Overview</a>
              </li>

              <li className="neo-leftnav__sub">
                <a tabIndex={-1}>Manage Users</a>
              </li>

              <li className="neo-leftnav__sub neo-leftnav__sub--active">
                <a tabIndex={-1}>Billing</a>
              </li>

              <li className="neo-leftnav__sub neo-leftnav__sub--active">
                <a tabIndex={-1}>Payments</a>
              </li>
            </ul>
          </li>

          <li className="neo-leftnav__main neo-leftnav__main--active">
            <a className="neo-icon-address-book">Contact Center</a>
          </li>

          <li className="neo-leftnav__main">
            <a className="neo-icon-user-group">Groups</a>
          </li>

          <li className="neo-leftnav__main">
            <a className="neo-icon-settings">Settings</a>
          </li>

          <li className="neo-leftnav__main">
            <a className="neo-icon-global">Menu 1</a>
          </li>

          <li className="neo-leftnav__main">
            <a className="neo-icon-configure">Menu 2</a>
          </li>

          <li className="neo-leftnav__main">
            <a className="neo-icon-idea">Menu 3</a>
          </li>

          <li className="neo-leftnav__main">
            <a className="neo-icon-chart-gauge">Menu 4</a>
          </li>

          <li className="neo-leftnav__main">
            <a className="neo-icon-view-tiles">Menu 5</a>
          </li>

          <li className="neo-leftnav__main">
            <a className="neo-icon-pie-chart">Menu 6</a>
          </li>
        </ul>
      </nav>

      <div className="neo-tooltip neo-tooltip-leftnav--condensed__toggle neo-tooltip--right neo-tooltip--onhover">
        <a
          role="button"
          aria-label="expand navigation"
          className="neo-icon-page-first neo-leftnav--condensed__toggle"
          aria-labelledby="tooltip4"
          onClick={() => setCondensed(!condensed)}
        />

        <div className="neo-tooltip__content" id="tooltip4">
          <div className="neo-arrow" />
          Expand/Collapse
        </div>
      </div>
    </div>
  );
};
