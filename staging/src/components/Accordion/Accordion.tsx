import clsx from "clsx";
import { useState } from "react";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const AccordionItem = ({ dataItem, onToggle, active }: any) => {
	const { title, body } = dataItem;
	return (
		<div
			className={clsx(
				"neo-accordion__item",
				active && "neo-accordion__item--active",
			)}
		>
			<div className="neo-accordion__header">
				<button
					type="button"
					aria-expanded={active}
					aria-controls="a1"
					className="neo-accordion__header-text"
					onClick={onToggle}
					id="accordion1id"
				>
					{title}
				</button>
			</div>
			{active && (
				<div
					id="a1"
					aria-labelledby="accordion1id"
					className="neo-accordion__body"
				>
					<div className="neo-accordion__content">
						<p>{body}</p>
					</div>
				</div>
			)}
		</div>
	);
};
export const StackedInteractiveAccordion = () => {
	const data = [
		{
			title: "Accordion 1",
			body: "Accordion 1 body text",
		},
		{
			title: "Accordion 2",
			body: "Accordion 2 body text",
		},
		{
			title: "Accordion 3",
			body: "Accordion 3 body text",
		},
	];
	const [clicked, setClicked] = useState(0);
	const handleToggle = (index: number) => {
		if (clicked !== index) {
			setClicked(index);
		}
	};
	return (
		<div className="neo-accordion neo-accordion__stacked">
			{data.map((dataItem, index) => (
				<AccordionItem
					key={index}
					dataItem={dataItem}
					onToggle={() => handleToggle(index)}
					active={clicked === index}
				/>
			))}
		</div>
	);
};
