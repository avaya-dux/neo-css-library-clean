const ColorRange = (props: { colorName: string }) => {
	const neoColorValues = [
		"100",
		"200",
		"300",
		"400",
		"500",
		"600",
		"700",
		"800",
		"900",
	];

	const { colorName } = props;

	return (
		<>
			{neoColorValues.map((colorValue, index) => (
				<div
					key={index}
					style={{
						width: "100px",
						height: "100px",
						backgroundColor: `var(--neo-color-${colorName}-${colorValue})`,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{colorValue}
				</div>
			))}
		</>
	);
};

export const ColorsView = () => {
	const neoColorNames = [
		"red",
		"orange",
		"green",
		"blue",
		"purple",
		"gold",
		"teal",
		"pink",
	];

	return (
		<div style={{ marginBottom: "16px" }}>
			{neoColorNames.map((colorName, index) => (
				<div
					key={index}
					style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
				>
					<p style={{ margin: "0 8px" }}>{colorName.toUpperCase()}</p>
					<ColorRange colorName={colorName} />
				</div>
			))}
		</div>
	);
};
