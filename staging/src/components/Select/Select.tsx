const options = [
	<div
		className="neo-chip neo-chip--default neo-chip--close neo-chip--close--default"
		key={1}
	>
		Option 1
		<button
			className="neo-close neo-close--clear"
			aria-label="remove option"
			type="button"
		/>
	</div>,
	<div
		className="neo-chip neo-chip--default neo-chip--close neo-chip--close--default"
		key={2}
	>
		Option 2
		<button
			className="neo-close neo-close--clear"
			aria-label="remove option"
			type="button"
		/>
	</div>,
	<div
		className="neo-chip neo-chip--default neo-chip--close neo-chip--close--default"
		key={3}
	>
		Option 3
		<button
			className="neo-close neo-close--clear"
			aria-label="remove option"
			type="button"
		/>
	</div>,
	<div
		className="neo-chip neo-chip--default neo-chip--close neo-chip--close--default"
		key={4}
	>
		Option 4
		<button
			className="neo-close neo-close--clear"
			aria-label="remove option"
			type="button"
		/>
	</div>,
	<div
		className="neo-chip neo-chip--default neo-chip--close neo-chip--close--default"
		key={5}
	>
		Option 5
		<button
			className="neo-close neo-close--clear"
			aria-label="remove option"
			type="button"
		/>
	</div>,
	<div
		className="neo-chip neo-chip--default neo-chip--close neo-chip--close--default"
		key={6}
	>
		Option 6
		<button
			className="neo-close neo-close--clear"
			aria-label="remove option"
			type="button"
		/>
	</div>,
	<div
		className="neo-chip neo-chip--default neo-chip--close neo-chip--close--default"
		key={7}
	>
		Option 7
		<button
			className="neo-close neo-close--clear"
			aria-label="remove option"
			type="button"
		/>
	</div>,
	<div
		className="neo-chip neo-chip--default neo-chip--close neo-chip--close--default"
		key={8}
	>
		Option 8
		<button
			className="neo-close neo-close--clear"
			aria-label="remove option"
			type="button"
		/>
	</div>,
	<div
		className="neo-chip neo-chip--default neo-chip--close neo-chip--close--default"
		key={9}
	>
		Option 9
		<button
			className="neo-close neo-close--clear"
			aria-label="remove option"
			type="button"
		/>
	</div>,
	<div
		className="neo-chip neo-chip--default neo-chip--close neo-chip--close--default"
		key={10}
	>
		Option 10
		<button
			className="neo-close neo-close--clear"
			aria-label="remove option"
			type="button"
		/>
	</div>,
];

export const SelectExamples = () => {
	return (
		<section>
			<h2>Select Examples</h2>

			<div style={{ width: 300 }}>
				<h3>No Options Selected and Expanded</h3>

				<div className="neo-input-group">
					<label htmlFor="combobox">Choose one</label>

					<div className="neo-multiselect  neo-multiselect--active">
						<div className="neo-multiselect-combo__header neo-multiselect-combo__header--expanded">
							<input
								className="neo-input "
								placeholder="Select One"
								id="combobox"
							/>
						</div>
						<div
							className="neo-multiselect__content neo-set-keyboard-focus"
							aria-multiselectable="true"
							id=":r7:-menu"
							role="listbox"
							aria-labelledby="combobox"
						>
							<ul role="group">
								<li
									className="neo-option neo-option--selected"
									// biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
									role="option"
									aria-selected="true"
									id=":r7:-item-0"
								>
									Apple
								</li>
								<li
									className="neo-option neo-option--disabled"
									// biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
									role="option"
									aria-selected="false"
									id=":r7:-item-1"
									aria-describedby="helper-text-c0086d45-3271-48eb-9df4-e891f1009753-Gravel"
								>
									Gravel
								</li>
								<p
									className="neo-input-hint"
									id="helper-text-c0086d45-3271-48eb-9df4-e891f1009753-Gravel"
								>
									Not a Fruit
								</p>
								<li
									className="neo-option neo-option--selected"
									// biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
									role="option"
									aria-selected="true"
									id=":r7:-item-2"
									aria-describedby="helper-text-ec357751-a653-4a09-84da-cb3b8c816c80-Broccoli"
								>
									Broccoli
								</li>
								<p
									className="neo-input-hint"
									id="helper-text-ec357751-a653-4a09-84da-cb3b8c816c80-Broccoli"
								>
									Vegetable
								</p>
								<li
									className="neo-option neo-option--selected"
									// biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
									role="option"
									aria-selected="true"
									id=":r7:-item-3"
								>
									Banana
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div style={{ width: 300, marginTop: 200 }}>
				<h3>Few Options Selected</h3>

				<div className="neo-input-group">
					<label htmlFor="combobox">Choose one</label>

					<div className="neo-multiselect">
						<div className="neo-multiselect-combo__header">
							{options.slice(0, 1)}

							<input
								className="neo-input "
								placeholder="Select One"
								id="combobox"
							/>
						</div>
					</div>
				</div>
			</div>

			<div style={{ width: 300 }}>
				<h3>Many Options</h3>

				<div className="neo-input-group">
					<label htmlFor="combobox">Choose one</label>

					<div className="neo-multiselect">
						<div className="neo-multiselect-combo__header">
							{options}

							<input
								className="neo-input "
								placeholder="Select One"
								id="combobox"
							/>
						</div>
					</div>
				</div>
			</div>

			<div style={{ width: 300 }}>
				<h3>Disabled</h3>

				<div className="neo-input-group">
					<label htmlFor="disabled-combobox">Choose one</label>

					<div className="neo-multiselect neo-multiselect--disabled">
						<div className="neo-multiselect-combo__header">
							<input
								className="neo-input "
								placeholder="Select One"
								id="disabled-combobox"
								disabled
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export const SmallSelect = () => {
	return (
		<div style={{ width: 300 }}>
			<h2>Small Select Expanded</h2>

			<div className="neo-input-group">
				<label htmlFor="combobox">Choose one</label>

				<div className="neo-multiselect neo-multiselect--small neo-multiselect--active">
					<div className="neo-multiselect__header neo-multiselect__header--expanded">
						Select One
					</div>
					<div className="neo-multiselect__content">
						<ul aria-label="list of options">
							<li
								className="neo-multiselect__content__item--disabled"
								tabIndex={-1}
							>
								Option 1
							</li>
							<li>Option 2</li>
							<li>Option 3</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
