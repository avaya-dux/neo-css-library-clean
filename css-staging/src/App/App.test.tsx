import { render, screen } from "@testing-library/react";

import { App } from "./";

test("renders without exploding", () => {
  render(<App />);
  expect(screen.getByText(/CSS Staging/i)).toBeInTheDocument();
});
