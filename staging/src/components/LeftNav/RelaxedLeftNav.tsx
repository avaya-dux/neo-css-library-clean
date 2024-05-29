import { useEffect, useState } from "react";

export const RelaxedLeftNavWithSimpleJS = () => {
	const [activate, setActivate] = useState([1]);
	const onExpand = (number: number) => {
		if (activate.includes(number)) {
			setActivate((prevState) => prevState.filter((numb) => numb !== number));
		} else {
			setActivate((prevState) => [...prevState, number]);
		}
	};

	return (
		<div className="neo-leftnav--wrapper neo-leftnav--wrapper-tooltip">
			<nav className="neo-leftnav">
				<ul className="neo-leftnav__nav neo-leftnav__nav--tooltip">
					<li
						className={
							activate.includes(1)
								? "neo-leftnav__main neo-leftnav__main--active neo-leftnav__main--expand"
								: "neo-leftnav__main neo-leftnav__main--active neo-tooltip neo-tooltip--right neo-tooltip--onhover"
						}
					>
						<div
							className="neo-leftnav__main__item neo-icon-contact expandable"
							onClick={() => onExpand(1)}
							onKeyUp={() => onExpand(1)}
							aria-labelledby="tooltip1r"
						>
							Accounts This Is Multiple Lines Of Text That Should Wrap
						</div>
						<div className="neo-tooltip__content" id="tooltip1r">
							<div className="neo-arrow" />
							Accounts
						</div>
						<ul className="neo-leftnav__nav">
							<li className="neo-leftnav__sub neo-leftnav__sub--multiline neo-leftnav__sub--active">
								<span className="neo-leftnav__sub__item">
									Overview This Is An Extra Long String That Should Wrap
								</span>
							</li>

							<li className="neo-leftnav__sub neo-leftnav__sub--multiline">
								<span>
									<span className="neo-leftnav__sub__item">
										Manage Users This Is An Extra Long String That Should Wrap
									</span>
								</span>
							</li>

							<li className="neo-leftnav__sub">
								<span>
									<span>
										<a className="neo-leftnav__sub__item">Billing</a>
									</span>
								</span>
							</li>

							<li className="neo-leftnav__sub">
								<span>
									<a className="neo-leftnav__sub__item" tabIndex={-1}>
										Payments
									</a>
								</span>
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
						<div
							className="neo-leftnav__main__item expandable"
							onClick={() => onExpand(2)}
							onKeyUp={() => onExpand(2)}
							aria-labelledby="tooltip2r"
						>
							Configuration This Is An Extra Long String That Should Wrap
						</div>

						<div className="neo-tooltip__content" id="tooltip2r">
							<div className="neo-arrow" />
							Configuration
						</div>

						<ul className="neo-leftnav__nav">
							<li className="neo-leftnav__sub neo-leftnav__sub--active neo-leftnav__sub--no-icon">
								<span>
									<a className="neo-leftnav__sub__item">RBAC</a>
								</span>
							</li>

							<li className="neo-leftnav__sub neo-leftnav__sub--no-icon">
								<span>
									<a href="#" className="neo-leftnav__sub__item">
										SIP Trunking
									</a>
								</span>
							</li>

							<li className="neo-leftnav__sub neo-leftnav__sub--no-icon">
								<span>
									<a className="neo-leftnav__sub__item">Directory Services</a>
								</span>
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
						<div
							className="neo-leftnav__main__item neo-icon-address-book expandable"
							onClick={() => onExpand(3)}
							onKeyUp={() => onExpand(3)}
							aria-labelledby="tooltip3r"
						>
							Contact Center
						</div>

						<div className="neo-tooltip__content" id="tooltip3r">
							<div className="neo-arrow" />
							Contact Center
						</div>

						<ul className="neo-leftnav__nav">
							<li className="neo-leftnav__sub neo-leftnav__sub--active">
								<a tabIndex={-1} className="neo-leftnav__sub__item">
									Customer Identifiers
								</a>
							</li>

							<li className="neo-leftnav__sub">
								<span>
									<a className="neo-leftnav__sub__item">
										Transfer Destinations
									</a>
								</span>
							</li>

							<li className="neo-leftnav__sub">
								<span>
									<a className="neo-leftnav__sub__item">Work Assignments</a>
								</span>
							</li>

							<li className="neo-leftnav__sub">
								<span>
									<a tabIndex={-1} className="neo-leftnav__sub__item">
										Contacts
									</a>
								</span>
							</li>
						</ul>
					</li>

					<li className="neo-leftnav__main">
						<div
							className="neo-leftnav__main__item neo-icon-user-group"
							tabIndex={-1}
						>
							Groups This Is An Extra Long String That Should Wrap
						</div>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export const RelaxedCondensedLeftNavWithScroll = () => {
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
			style={{ height: "400px" }}
		>
			<nav
				className="neo-leftnav"
				aria-label="secondary"
				style={{ maxHeight: "350px" }}
			>
				<ul className="neo-leftnav__nav">
					<li
						className={`neo-leftnav__main neo-leftnav__main--active ${
							activate.includes(1) && !condensed
								? "neo-leftnav__main--expand"
								: ""
						}`}
					>
						<div
							aria-label="Accounts"
							className="neo-leftnav__main__item neo-icon-contact"
							onClick={() => onExpand(1)}
							onKeyUp={() => onExpand(1)}
						>
							Accounts
							<span className="neo-icon-chevron-left" />
						</div>

						<ul className="neo-leftnav__nav">
							<li className="neo-leftnav__sub">
								<span>
									<a
										tabIndex={-1}
										className="neo-leftnav__sub__item neo-leftnav__sub--active"
									>
										Overview
									</a>
								</span>
							</li>

							<li className="neo-leftnav__sub">
								<span>
									<a tabIndex={-1} className="neo-leftnav__sub__item">
										Manage Users
									</a>
								</span>
							</li>

							<li className="neo-leftnav__sub">
								<span>
									<a tabIndex={-1} className="neo-leftnav__sub__item">
										Billing
									</a>
								</span>
							</li>

							<li className="neo-leftnav__sub">
								<span>
									<a tabIndex={-1} className="neo-leftnav__sub__item">
										Payments
									</a>
								</span>
							</li>
						</ul>
					</li>

					<li className="neo-leftnav__main">
						<div className="neo-leftnav__main__item neo-icon-address-book">
							Contact Center
						</div>
					</li>

					<li className="neo-leftnav__main">
						<div className="neo-leftnav__main__item neo-icon-user-group">
							Groups
						</div>
					</li>

					<li className="neo-leftnav__main">
						<div className="neo-leftnav__main__item neo-icon-settings">
							Settings
						</div>
					</li>

					<li className="neo-leftnav__main">
						<div className="neo-leftnav__main__item neo-icon-global">
							Menu 1
						</div>
					</li>

					<li className="neo-leftnav__main">
						<div className="neo-leftnav__main__item neo-icon-configure">
							Menu 2
						</div>
					</li>

					<li className="neo-leftnav__main">
						<div className="neo-leftnav__main__item neo-icon-idea">Menu 3</div>
					</li>

					<li className="neo-leftnav__main">
						<div className="neo-leftnav__main__item neo-icon-chart-gauge">
							Menu 4
						</div>
					</li>

					<li className="neo-leftnav__main">
						<div className="neo-leftnav__main__item neo-icon-view-tiles">
							Menu 5
						</div>
					</li>

					<li className="neo-leftnav__main">
						<div className="neo-leftnav__main__item neo-icon-pie-chart">
							Menu 6
						</div>
					</li>
				</ul>
			</nav>

			<a
				role="button"
				aria-label="expand navigation"
				className="neo-icon-page-first neo-leftnav--condensed__toggle"
				aria-labelledby="tooltip4r"
				onClick={() => setCondensed(!condensed)}
			/>
		</div>
	);
};
