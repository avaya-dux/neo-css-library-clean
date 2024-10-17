import clsx from "clsx";

// TO-DO: Fix a11y issues with Table checkbox labels

import { useState } from "react";
import type * as React from "react";

export const Table = () => {
	return (
		<section>
			<h2>Table</h2>

			<table className="neo-table">
				<thead>
					<tr>
						<th>Expand</th>
						<th>Name</th>
						<th>Number</th>
						<th>
							Email2
							<div className="neo-table__resizer__th neo-table--resizing" />
						</th>
						<th>Avatar</th>
						<th>Chip</th>
						<th>Icon</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<div className="neo-tooltip neo-tooltip--right neo-tooltip--onhover">
								<button
									type="button"
									className="expand neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info neo-icon-chevron-right"
									aria-label="expand Michael"
									aria-expanded="false"
								/>
								<div className="neo-tooltip__content" id="tooltip1">
									<div className="neo-arrow" />
									Tooltip
								</div>
							</div>
						</td>
						<td>Thomas</td>
						<td className="number">12345</td>
						<td>
							thomas@shelby.ltd
							<div className="neo-table__resizer__td neo-table--resizing" />
						</td>
						<td>
							<figure className="neo-avatar" data-initials="TA" />
						</td>
						<td>
							<div
								className="neo-chip neo-chip--default"
								aria-label="Placeholder"
							>
								Placeholder
							</div>
						</td>
						<td>
							<span className="neo-icon-error" />
						</td>
					</tr>
					<tr>
						<td />
						<td>Michael</td>
						<td className="number">12345</td>
						<td>
							michael@shelby.ltd
							<div className="neo-table__resizer__td neo-table--resizing" />
						</td>
						<td>
							<figure className="neo-avatar" data-initials="MD" />
						</td>
						<td>
							<div
								className="neo-chip neo-chip--default"
								aria-label="Placeholder"
							>
								Placeholder
							</div>
						</td>
						<td>
							<span className="neo-icon-error" />
						</td>
					</tr>
					<tr>
						<td>
							<div className="neo-tooltip neo-tooltip--right neo-tooltip--onhover">
								<button
									type="button"
									className="expand neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info neo-icon-chevron-right"
									aria-label="expand Gavin"
									aria-expanded="false"
								/>
								<div className="neo-tooltip__content" id="tooltip1">
									<div className="neo-arrow" />
									Tooltip
								</div>
							</div>
						</td>
						<td>Gavin</td>
						<td className="number">12345</td>
						<td>
							gavin@shelby.ltd
							<div className="neo-table__resizer__td neo-table--resizing" />
						</td>
						<td>
							<figure className="neo-avatar" data-initials="GS" />
						</td>
						<td>
							<div
								className="neo-chip neo-chip--default"
								aria-label="Placeholder"
							>
								Placeholder
							</div>
						</td>
						<td>
							<span className="neo-icon-error" />
						</td>
					</tr>
					<tr>
						<td />
						<td>Polly</td>
						<td className="number">12345</td>
						<td>
							polly@shelby.ltd
							<div className="neo-table__resizer__td neo-table--resizing" />
						</td>
						<td>
							<figure className="neo-avatar" data-initials="PD" />
						</td>
						<td>
							<div
								className="neo-chip neo-chip--default"
								aria-label="Placeholder"
							>
								Placeholder
							</div>
						</td>
						<td>
							<span className="neo-icon-error" />
						</td>
					</tr>
					<tr>
						<td />
						<td className="active">Stephen</td>
						<td className="number">12345</td>
						<td>
							stephen@shelby.ltd
							<div className="neo-table__resizer__td neo-table--resizing" />
						</td>
						<td>
							<figure className="neo-avatar" data-initials="SA" />
						</td>
						<td>
							<div
								className="neo-chip neo-chip--default"
								aria-label="Placeholder"
							>
								Placeholder
							</div>
						</td>
						<td>
							<span className="neo-icon-error" />
						</td>
					</tr>
				</tbody>
			</table>
		</section>
	);
};

export const TableWithSortHeaders = () => {
	const [isActive, setIsActive] = useState(false);

	return (
		<section>
			<h2>Table With Sort Headers</h2>

			<table className="neo-table">
				<thead>
					<tr>
						<th className="filters">
							<div
								className={clsx(
									"neo-multiselect",
									isActive && "neo-multiselect--active",
								)}
								onClick={() => setIsActive(!isActive)}
								onKeyUp={() => setIsActive(!isActive)}
								data-testid="table-filters-cell"
							>
								First Name
								<span className="neo-icon-chevron-down" />
								<div className="neo-multiselect__content">
									<ul>
										<li className="selected">A - Z</li>
										<li>Z - A</li>
										<li>Filter By</li>
									</ul>
								</div>
							</div>
						</th>
						<th>Number</th>
						<th>Email</th>
						<th>Avatar</th>
						<th>Chip</th>
						<th>Icon</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Thomas</td>
						<td className="number">12345</td>
						<td>thomas@shelby.ltd</td>
						<td>
							<figure className="neo-avatar" data-initials="TA" />
						</td>
						<td>
							<div
								className="neo-chip neo-chip--default"
								aria-label="Placeholder"
							>
								Placeholder
							</div>
						</td>
						<td>
							<span className="neo-icon-error" />
						</td>
					</tr>
					<tr>
						<td>Michael</td>
						<td className="number">12345</td>
						<td>michael@shelby.ltd</td>
						<td>
							<figure className="neo-avatar" data-initials="MD" />
						</td>
						<td>
							<div
								className="neo-chip neo-chip--default"
								aria-label="Placeholder"
							>
								Placeholder
							</div>
						</td>
						<td>
							<span className="neo-icon-error" />
						</td>
					</tr>
				</tbody>
			</table>
		</section>
	);
};

export const TableWithSelectAllRow = () => {
	const [selectAllOnPage, setSelectAllOnPage] = useState(false);

	const [selectAll, setSelectAll] = useState(false);

	const [selectedRows, setSelectedRows] = useState<string[]>([]);

	const checkboxRows = ["row1", "row2", "row3", "row4", "row5"];

	const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const checkboxName = event.target.name;

		if (selectedRows.includes(checkboxName)) {
			if (selectedRows.length === 5) {
				setSelectAllOnPage(false);
			}
			setSelectedRows(selectedRows.filter((names) => names !== checkboxName));
		} else {
			if (selectedRows.length === 4) {
				setSelectAllOnPage(true);
			}
			setSelectedRows([...selectedRows, checkboxName]);
		}
	};

	return (
		<>
			<section>
				<h2>Table With Select All Row</h2>

				<p>
					Pagination is non-functional, this is just to demonstrate how a
					"select all" scenario <i>would</i> work
				</p>

				<table className="neo-table">
					<thead>
						<tr>
							<th className="check">
								<input
									className={clsx(
										"neo-check",
										selectedRows.length > 0 &&
											selectedRows.length < 5 &&
											"neo-check--indeterminate",
									)}
									type="checkbox"
									id="selectAllCheckbox"
									value="selectAllCheckbox"
									name="selectAllCheckbox"
									checked={selectAllOnPage || selectedRows.length > 0}
									onChange={() => {
										setSelectAllOnPage(!selectAllOnPage);
										setSelectedRows(selectAllOnPage ? [] : checkboxRows);
									}}
								/>
								<label htmlFor="selectAllCheckbox" aria-label="select all" />
							</th>
							<th>First Name</th>
							<th>Number</th>
							<th>Email</th>
							<th>Avatar</th>
							<th>Chip</th>
							<th>Icon</th>
							<th>Button</th>
							<th>More</th>
						</tr>
					</thead>
					<tbody>
						{selectAllOnPage && (
							<tr>
								<td className="select-all" colSpan={100}>
									<div>
										{!selectAll ? (
											<p>
												All 5 items on this page are selected.{" "}
												<button
													type="button"
													className="neo-link"
													onClick={() => setSelectAll(true)}
												>
													Select all 400 items.
												</button>
											</p>
										) : (
											<p>
												All 400 items selected.{" "}
												<button
													type="button"
													className="neo-link"
													onClick={() => {
														setSelectAllOnPage(false);
														setSelectedRows([]);
														setSelectAll(false);
													}}
												>
													Clear selection.
												</button>
											</p>
										)}
									</div>
								</td>
							</tr>
						)}
						<tr
							className={clsx(
								(selectAllOnPage || selectedRows.includes("row1")) && "active",
							)}
						>
							<td>
								<div
									className="neo-tooltip neo-tooltip--down neo-tooltip--onhover"
									aria-describedby="table-tooltip"
								>
									<input
										className="neo-check"
										type="checkbox"
										value="row1"
										id="row1"
										name="row1"
										checked={selectedRows.includes("row1") || selectAllOnPage}
										onChange={onCheckboxChange}
									/>
									<label htmlFor="row1" aria-label="select row 1" />
									<div
										className="neo-tooltip__content"
										// biome-ignore lint/a11y/useSemanticElements: we built this before we knew better and if I change it now, it will break
										role="tooltip"
										id="table-tooltip"
									>
										<div className="neo-arrow" />
										Test
									</div>
								</div>
							</td>
							<td>Thomas</td>
							<td className="number">12345</td>
							<td>thomas@shelby.ltd</td>
							<td>
								<figure
									className="neo-avatar neo-avatar--small"
									data-initials="TA"
								/>
							</td>
							<td>
								<div
									className="neo-chip neo-chip--default"
									aria-label="Placeholder"
								>
									Placeholder
								</div>
							</td>
							<td>
								<span className="neo-icon-error" />
							</td>
							<td>
								<button
									type="button"
									className="neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info neo-icon-refresh"
									aria-label="refresh"
								/>
							</td>
							<td>
								<button
									type="button"
									className="neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info neo-icon-more"
									aria-label="more"
								/>
							</td>
						</tr>
						<tr
							className={clsx(
								(selectAllOnPage || selectedRows.includes("row2")) && "active",
							)}
						>
							<td>
								<input
									className="neo-check"
									type="checkbox"
									value="defaulttablecheckbox3"
									id="row2"
									name="row2"
									checked={selectedRows.includes("row2") || selectAllOnPage}
									onChange={onCheckboxChange}
								/>
								<label htmlFor="row2" aria-label="select row 2" />
							</td>
							<td>
								<a href="#fixme">Michael</a>
							</td>
							<td className="number">12345</td>
							<td>
								<input className="neo-input" />
							</td>
							<td>
								<figure
									className="neo-avatar neo-avatar--small"
									data-initials="MD"
								/>
							</td>
							<td>
								<div
									className="neo-chip neo-chip--default"
									aria-label="Placeholder"
								>
									Placeholder
								</div>
							</td>
							<td>
								<span className="neo-icon-error" />
							</td>
							<td>
								<button
									type="button"
									className="neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info neo-icon-refresh"
									aria-label="refresh"
								/>
							</td>
							<td>
								<button
									type="button"
									className="neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info neo-icon-more"
									aria-label="more"
								/>
							</td>
						</tr>
						<tr
							className={clsx(
								(selectAllOnPage || selectedRows.includes("row3")) && "active",
							)}
						>
							<td>
								<input
									className="neo-check"
									type="checkbox"
									value="defaulttablecheckbox4"
									id="row3"
									name="row3"
									checked={selectedRows.includes("row3") || selectAllOnPage}
									onChange={onCheckboxChange}
								/>
								<label htmlFor="row3" aria-label="select row 3" />
							</td>
							<td>
								<a href="#fixme">Polly</a>
							</td>
							<td className="number">12345</td>
							<td>polly@shelby.ltd</td>
							<td>
								<figure
									className="neo-avatar neo-avatar--small"
									data-initials="PD"
								/>
							</td>
							<td>
								<div
									className="neo-chip neo-chip--default"
									aria-label="Placeholder"
								>
									Placeholder
								</div>
							</td>
							<td>
								<span className="neo-icon-error" />
							</td>
							<td>
								<button
									type="button"
									aria-label="refresh"
									className="neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info neo-icon-refresh"
								/>
							</td>
							<td>
								<button
									type="button"
									aria-label="more"
									className="neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info neo-icon-more"
								/>
							</td>
						</tr>
						<tr
							className={clsx(
								(selectAllOnPage || selectedRows.includes("row4")) && "active",
							)}
						>
							<td>
								<input
									className="neo-check"
									type="checkbox"
									value="defaulttablecheckbox5"
									id="row4"
									name="row4"
									checked={selectedRows.includes("row4") || selectAllOnPage}
									onChange={onCheckboxChange}
								/>
								<label htmlFor="row4" aria-label="select row 4" />
							</td>
							<td className="active">Stephen</td>
							<td className="number">12345</td>
							<td>stephen@shelby.ltd</td>
							<td>
								<figure
									className="neo-avatar neo-avatar--small"
									data-initials="SA"
								/>
							</td>
							<td>
								<div
									className="neo-chip neo-chip--default"
									aria-label="Placeholder"
								>
									Placeholder
								</div>
							</td>
							<td>
								<span className="neo-icon-error" />
							</td>
							<td>
								<button
									type="button"
									className="neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info neo-icon-refresh"
									aria-label="refresh"
								/>
							</td>
							<td>
								<button
									type="button"
									className="neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info neo-icon-more"
									aria-label="more"
								/>
							</td>
						</tr>
						<tr
							className={clsx(
								(selectAllOnPage || selectedRows.includes("row5")) && "active",
							)}
						>
							<td>
								<input
									className="neo-check"
									type="checkbox"
									value="defaulttablecheckbox6"
									id="row5"
									name="row5"
									checked={selectedRows.includes("row5") || selectAllOnPage}
									onChange={onCheckboxChange}
								/>
								<label htmlFor="row5" aria-label="select row 5" />
							</td>
							<td>Jonas</td>
							<td className="number">12345</td>
							<td>jonas@shelby.ltd</td>
							<td>
								<figure
									className="neo-avatar neo-avatar--small"
									data-initials="JP"
								/>
							</td>
							<td>
								<div
									className="neo-chip neo-chip--default"
									aria-label="Placeholder"
								>
									Placeholder
								</div>
							</td>
							<td>
								<span className="neo-icon-error" />
							</td>
							<td>
								<button
									type="button"
									className="neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info neo-icon-refresh"
									aria-label="refresh"
								/>
							</td>
							<td>
								<button
									type="button"
									className="neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info neo-icon-more"
									aria-label="more"
								/>
							</td>
						</tr>
					</tbody>
				</table>
				<div
					className="neo-pagination__row"
					style={{ justifyContent: "center" }}
				>
					<nav className="neo-pagination" aria-label="pagination">
						<button
							type="button"
							aria-label="left arrow"
							className="neo-btn-square neo-pagination__arrow-btn neo-icon-arrow-left"
						/>
						<ul className="neo-pagination__list">
							<li>
								<button
									type="button"
									className="neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info"
								>
									1
								</button>
							</li>
							<li>
								<span className="neo-pagination__dots">&hellip;</span>
							</li>
							<li>
								<button
									type="button"
									className="neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info"
								>
									49
								</button>
							</li>
							<li>
								<button
									type="button"
									className="neo-btn-square neo-btn-square-secondary neo-btn-square-secondary--info"
								>
									50
								</button>
							</li>
							<li>
								<button
									type="button"
									className="neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info"
								>
									51
								</button>
							</li>
							<li>
								<span className="neo-pagination__dots">&hellip;</span>
							</li>
							<li>
								<button
									type="button"
									className="neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info"
								>
									99
								</button>
							</li>
						</ul>
						<button
							type="button"
							aria-label="right arrow"
							className="neo-btn-square neo-pagination__arrow-btn neo-icon-arrow-right"
						/>
					</nav>
				</div>
			</section>
		</>
	);
};
