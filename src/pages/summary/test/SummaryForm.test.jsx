import SummaryForm from "../SummaryForm";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(confirmButton).toBeEnabled();

    // Assert that checkbox is unchecked and button is disabled
    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(confirmButton).toBeDisabled();
  });
  test("popover responds to hover", async () => {
    render(<SummaryForm />);

    // popover starts out hidden
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    // popover appears upon mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);
    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    // popover disappears when we mouse out
    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() => {
      return screen.queryByText(/no ice cream will actually be delivered/i);
    });
  });
});
