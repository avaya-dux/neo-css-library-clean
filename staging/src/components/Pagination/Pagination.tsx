import clsx from "clsx";
import { useState } from "react";

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

export const PaginationMultiSelect = () => {
  const [paginationSelectActive, setPaginationSelectActive] = useState(false);

  const [paginationSelectValue, setPaginationSelectValue] = useState(10);

  const paginationSelectOptions = [10, 50, 100, 1000, 10000, 100000, 1000000];

  return (
    <div className="neo-pagination__row" style={{ marginBottom: "2rem" }}>
      <div>
        <p>500-510</p>
      </div>
      <nav className="neo-pagination" role="navigation" aria-label="pagination">
        <button
          className="neo-btn-square neo-pagination__arrow-btn neo-icon-arrow-left"
          aria-label="left arrow"
        ></button>
        <ul className="neo-pagination__list">
          <li>
            <button className="neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info">
              1
            </button>
          </li>
          <li>
            <span className="neo-pagination__dots">&hellip;</span>
          </li>
          <li>
            <button className="neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info">
              49
            </button>
          </li>
          <li>
            <button className="neo-btn-square neo-btn-square-secondary neo-btn-square-secondary--info">
              50
            </button>
          </li>
          <li>
            <button className="neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info">
              51
            </button>
          </li>
          <li>
            <span className="neo-pagination__dots">&hellip;</span>
          </li>
          <li>
            <button className="neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info">
              99
            </button>
          </li>
        </ul>
        <button
          className="neo-btn-square neo-pagination__arrow-btn neo-icon-arrow-right"
          aria-label="right arrow"
        ></button>
      </nav>
      <div>
        <form className="neo-form neo-form--inline">
          <label htmlFor="pagination-select">Show:</label>
          <div className="neo-form-control">
            <div
              className={clsx(
                "neo-multiselect",
                paginationSelectActive && "neo-multiselect--active"
              )}
              aria-label="Show"
              role="listbox"
              id="pagination-select"
              tabIndex={0}
              onClick={() => setPaginationSelectActive(!paginationSelectActive)}
            >
              <div className="neo-multiselect__header">
                {paginationSelectValue}
              </div>
              <div className="neo-multiselect__content">
                <ul>
                  {paginationSelectOptions.map((option, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => setPaginationSelectValue(option)}
                      >
                        {option}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};