import { useState } from "react";

export const LeftNavWithSimpleJS = () => {
    const [activate, setActivate] = useState([1]);
    const onExpand = (number) => {
      if (activate.includes(number)) {
        // console.log(activate)
        setActivate((prevState) => prevState.filter((numb) => numb != number));
      } else {
        setActivate((prevState) => [...prevState, number]);
      }
      console.log(activate);
    };
    return (
        <div className="neo-leftnav--wrapper neo-leftnav--wrapper-tooltip">
            <nav className="neo-leftnav">
            <ul className="neo-leftnav__nav neo-leftnav__nav--tooltip" role="menu">
                <li
                className={
                    activate.includes(1)
                    ? "neo-leftnav__main neo-leftnav__main--active neo-leftnav__main--expand"
                    : "neo-leftnav__main neo-leftnav__main--active neo-tooltip neo-tooltip--right neo-tooltip--onhover"
                }
                >
                <a
                    tabIndex="0"
                    className="neo-icon-contact expandable"
                    onClick={() => onExpand(1)}
                    aria-labelledby="tooltip1"
                >
                    Accounts
                </a>
                <div className="neo-tooltip__content" id="tooltip1">
                    <div className="neo-arrow"></div>
                    Accounts
                </div>
                <ul className="neo-leftnav__nav" role="menu">
                    <li className="neo-leftnav__sub neo-leftnav__sub--active">
                    <a tabIndex="0">Overview</a>
                    </li>
                    <li className="neo-leftnav__sub" disabled>
                    <a role="menuitem">Manage Users</a>
                    </li>
                    <li className="neo-leftnav__sub">
                    <a tabIndex="0">Billing</a>
                    </li>
                    <li className="neo-leftnav__sub">
                    <a role="menuitem" tabIndex="-1">
                        Payments
                    </a>
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
                    role="menuitem"
                    tabIndex="0"
                    className="expandable"
                    onClick={() => onExpand(2)}
                    aria-labelledby="tooltip2"
                >
                    Configuration
                </a>
                <div className="neo-tooltip__content" id="tooltip2">
                    <div className="neo-arrow"></div>
                    Configuration
                </div>
                <ul className="neo-leftnav__nav" role="menu">
                    <li className="neo-leftnav__sub neo-leftnav__sub--active neo-leftnav__sub--no-icon">
                    <a tabIndex="0">RBAC</a>
                    </li>
                    <li className="neo-leftnav__sub neo-leftnav__sub--no-icon">
                    <a tabIndex="0">SIP Trunking</a>
                    </li>
                    <li className="neo-leftnav__sub neo-leftnav__sub--no-icon">
                    <a tabIndex="0">Directory Services</a>
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
                    tabIndex="0"
                    className="neo-icon-address-book expandable"
                    onClick={() => onExpand(3)}
                    aria-labelledby="tooltip3"
                >
                    Contact Center
                </a>
                <div className="neo-tooltip__content" id="tooltip3">
                    <div className="neo-arrow"></div>
                    Contact Center
                </div>
                <ul className="neo-leftnav__nav" role="menu">
                    <li
                    className="neo-leftnav__sub neo-leftnav__sub--active"
                    disabled
                    >
                    <a role="menuitem" tabIndex="-1">
                        Customer Identifiers
                    </a>
                    </li>
                    <li className="neo-leftnav__sub">
                    <a tabIndex="0">Transfer Destinations</a>
                    </li>
                    <li className="neo-leftnav__sub">
                    <a tabIndex="0">Work Assignments</a>
                    </li>
                    <li className="neo-leftnav__sub">
                    <a role="menuitem" tabIndex="-1">
                        Contacts
                    </a>
                    </li>
                </ul>
                </li>
                <li className="neo-leftnav__main" disabled>
                <a role="menuitem" className="neo-icon-user-group" tabIndex="-1">
                    Groups
                </a>
                </li>
            </ul>
            </nav>
        </div>
    );
};