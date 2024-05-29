import { useState } from "react";

export const CondensedLeftNavWithTooltip = () => {
	const [activate, setActivate] = useState([1]);
	const [condensed, setCondensed] = useState(true);

	const onExpand = (number: number) => {
		if (activate.includes(number)) {
			setActivate((prevState) => prevState.filter((numb) => numb !== number));
		} else {
			setActivate((prevState) => [...prevState, number]);
		}
	};

	return (
		<div
			className={
				condensed
					? "neo-leftnav--wrapper neo-leftnav--wrapper-tooltip neo-leftnav--condensed--scrollable neo-leftnav--condensed hide-nav"
					: "neo-leftnav--wrapper neo-leftnav--wrapper-tooltip neo-leftnav--condensed--scrollable neo-leftnav--condensed"
			}
			id="leftnav-wrapper"
			style={{ height: "500px" }}
		>
			<nav
				className="neo-leftnav"
				aria-label="secondary"
				style={{
					overflow: "visible",
				}}
			>
				<ul className="neo-leftnav__nav" style={{ overflow: "visible" }}>
					<li
						className={`neo-leftnav__main neo-leftnav__main--active ${
							activate.includes(1) && !condensed
								? "neo-leftnav__main--expand"
								: ""
						}`}
					>
						<div className="neo-tooltip neo-tooltip--right neo-tooltip--onhover">
							<a
								aria-label="Accounts"
								className="neo-leftnav__main__item neo-icon-contact"
								onClick={() => onExpand(1)}
							>
								Accounts
								<span className="neo-icon-chevron-left" />
							</a>

							<div className="neo-tooltip__content">
								<div className="neo-arrow" />
								Accounts
							</div>
						</div>

						<ul
							className="neo-leftnav__nav"
							style={{ overflow: !condensed ? "visible" : "hidden" }}
						>
							<li className="neo-leftnav__sub" style={{ overflow: "visible" }}>
								<div className="neo-tooltip neo-tooltip--right neo-tooltip--onhover">
									<a>Overview</a>
									<div className="neo-tooltip__content">
										<div className="neo-arrow" />
										Overview
									</div>
								</div>
							</li>

							<li className="neo-leftnav__sub">
								<div className="neo-tooltip neo-tooltip--right neo-tooltip--onhover">
									<a href="/">Manage Users</a>
									<div className="neo-tooltip__content">
										<div className="neo-arrow" />
										Manage Users
									</div>
								</div>
							</li>

							<li className="neo-leftnav__sub neo-leftnav__sub--active">
								<div className="neo-tooltip neo-tooltip--right neo-tooltip--onhover">
									<a href="/">Billing</a>
									<div className="neo-tooltip__content">
										<div className="neo-arrow" />
										Billing
									</div>
								</div>
							</li>

							<li className="neo-leftnav__sub neo-leftnav__sub--active">
								<div className="neo-tooltip neo-tooltip--right neo-tooltip--onhover">
									<a href="/">Payments</a>
									<div className="neo-tooltip__content">
										<div className="neo-arrow" />
										Payments
									</div>
								</div>
							</li>
						</ul>
					</li>

					<li className="neo-leftnav__main">
						<div className="neo-tooltip neo-tooltip--right neo-tooltip--onhover">
							<a
								aria-label="Accounts"
								className="neo-leftnav__main__item neo-icon-user-group"
							>
								Groups
							</a>

							<div className="neo-tooltip__content">
								<div className="neo-arrow" />
								Groups
							</div>
						</div>
					</li>

					<li className="neo-leftnav__main">
						<div className="neo-tooltip neo-tooltip--right neo-tooltip--onhover">
							<a
								aria-label="Accounts"
								className="neo-leftnav__main__item neo-icon-settings"
							>
								Settings
							</a>

							<div className="neo-tooltip__content">
								<div className="neo-arrow" />
								Settings
							</div>
						</div>
					</li>

					<li className="neo-leftnav__main">
						<div className="neo-tooltip neo-tooltip--right neo-tooltip--onhover">
							<a
								aria-label="Accounts"
								className="neo-leftnav__main__item neo-icon-call"
							>
								Call
							</a>

							<div className="neo-tooltip__content">
								<div className="neo-arrow" />
								Call
							</div>
						</div>
					</li>

					<li className="neo-leftnav__main">
						<div className="neo-tooltip neo-tooltip--right neo-tooltip--onhover">
							<a
								aria-label="Accounts"
								className="neo-leftnav__main__item neo-icon-bot"
							>
								Bot
							</a>

							<div className="neo-tooltip__content">
								<div className="neo-arrow" />
								Bot
							</div>
						</div>
					</li>

					<li className="neo-leftnav__main">
						<span />
						<div className="neo-tooltip neo-tooltip--right neo-tooltip--onhover">
							<a
								aria-label="Accounts"
								className="neo-leftnav__main__item neo-icon-voice"
							>
								Call
							</a>

							<div className="neo-tooltip__content">
								<div className="neo-arrow" />
								Call
							</div>
						</div>
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

export const CondensedLeftNavWithTooltipRelaxed = () => {
	const [activate, setActivate] = useState([1]);
	const [condensed, setCondensed] = useState(true);

	const onExpand = (number: number) => {
		if (activate.includes(number)) {
			setActivate((prevState) => prevState.filter((numb) => numb !== number));
		} else {
			setActivate((prevState) => [...prevState, number]);
		}
	};

	return (
		<div
			className={
				condensed
					? "neo-leftnav--wrapper neo-leftnav--wrapper-tooltip neo-leftnav--condensed--scrollable neo-leftnav--condensed hide-nav"
					: "neo-leftnav--wrapper neo-leftnav--wrapper-tooltip neo-leftnav--condensed--scrollable neo-leftnav--condensed"
			}
			id="leftnav-wrapper"
			style={{ height: "500px" }}
		>
			<nav
				className="neo-leftnav"
				aria-label="secondary"
				style={{
					overflow: "visible",
				}}
			>
				<ul className="neo-leftnav__nav" style={{ overflow: "visible" }}>
					<li
						className={`neo-leftnav__main neo-leftnav__main--active ${
							activate.includes(1) && !condensed
								? "neo-leftnav__main--expand"
								: ""
						}`}
					>
						<div className="neo-tooltip neo-tooltip--right neo-tooltip--onhover">
							<div
								aria-label="Accounts"
								className="neo-leftnav__main__item neo-icon-contact"
								onClick={() => onExpand(1)}
								onKeyUp={() => onExpand(1)}
							>
								Accounts
								<span className="neo-icon-chevron-left" />
							</div>

							<div className="neo-tooltip__content">
								<div className="neo-arrow" />
								Accounts
							</div>
						</div>

						<ul
							className="neo-leftnav__nav"
							style={{ overflow: !condensed ? "visible" : "hidden" }}
						>
							<li
								className="neo-leftnav__sub neo-leftnav__sub--active"
								style={{ overflow: "visible" }}
							>
								<div className="neo-tooltip neo-tooltip--right neo-tooltip--onhover">
									<a className="neo-leftnav__sub__item">Overview</a>
									<div className="neo-tooltip__content">
										<div className="neo-arrow" />
										Overview
									</div>
								</div>
							</li>

							<li className="neo-leftnav__sub">
								<div className="neo-tooltip neo-tooltip--right neo-tooltip--onhover">
									<div className="neo-leftnav__sub__item">Manage Users</div>
									<div className="neo-tooltip__content">
										<div className="neo-arrow" />
										Manage Users
									</div>
								</div>
							</li>

							<li className="neo-leftnav__sub">
								<div className="neo-tooltip neo-tooltip--right neo-tooltip--onhover">
									<div className="neo-leftnav__sub__item">Billing</div>
									<div className="neo-tooltip__content">
										<div className="neo-arrow" />
										Billing
									</div>
								</div>
							</li>

							<li className="neo-leftnav__sub">
								<div className="neo-tooltip neo-tooltip--right neo-tooltip--onhover">
									<div className="neo-leftnav__sub__item">Payments</div>
									<div className="neo-tooltip__content">
										<div className="neo-arrow" />
										Payments
									</div>
								</div>
							</li>
						</ul>
					</li>

					<li className="neo-leftnav__main">
						<div className="neo-tooltip neo-tooltip--right neo-tooltip--onhover">
							<div
								aria-label="Accounts"
								className="neo-leftnav__main__item neo-icon-user-group"
							>
								Groups
							</div>

							<div className="neo-tooltip__content">
								<div className="neo-arrow" />
								Groups
							</div>
						</div>
					</li>

					<li className="neo-leftnav__main">
						<div className="neo-tooltip neo-tooltip--right neo-tooltip--onhover">
							<div
								aria-label="Accounts"
								className="neo-leftnav__main__item neo-icon-settings"
							>
								Settings
							</div>

							<div className="neo-tooltip__content">
								<div className="neo-arrow" />
								Settings
							</div>
						</div>
					</li>

					<li className="neo-leftnav__main">
						<div className="neo-tooltip neo-tooltip--right neo-tooltip--onhover">
							<div
								aria-label="Accounts"
								className="neo-leftnav__main__item neo-icon-call"
							>
								Call
							</div>

							<div className="neo-tooltip__content">
								<div className="neo-arrow" />
								Call
							</div>
						</div>
					</li>

					<li className="neo-leftnav__main">
						<div className="neo-tooltip neo-tooltip--right neo-tooltip--onhover">
							<div
								aria-label="Accounts"
								className="neo-leftnav__main__item neo-icon-bot"
							>
								Bot
							</div>

							<div className="neo-tooltip__content">
								<div className="neo-arrow" />
								Bot
							</div>
						</div>
					</li>

					<li className="neo-leftnav__main">
						<span />
						<div className="neo-tooltip neo-tooltip--right neo-tooltip--onhover">
							<div
								aria-label="Accounts"
								className="neo-leftnav__main__item neo-icon-voice"
							>
								Call
							</div>

							<div className="neo-tooltip__content">
								<div className="neo-arrow" />
								Call
							</div>
						</div>
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
