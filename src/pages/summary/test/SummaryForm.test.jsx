import SummaryForm from "../SummaryForm";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Summary Form Tests", () => {
  test("Given default render <SummaryForm /> will render and checkbox will be unchecked", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: "I agree to Terms and Conditions",
    });
    const confirmButton = screen.getByRole("button", { name: "Confirm order" });
    expect(confirmButton).toBeDisabled();
    expect(checkbox).not.toBeChecked();
  });
  test("When checkbox is checked the button becomes enabled and vice versa", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: "I agree to Terms and Conditions",
    });
    const confirmButton = screen.getByRole("button", {
      name: "Confirm order",
    });

    // Assert that checkbox is checked and button is enabled for submission
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(confirmButton).toBeEnabled();

    // Assert that checkbox is unchecked and button is disabled
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(confirmButton).toBeDisabled();
  });
});
