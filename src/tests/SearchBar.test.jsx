import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";
import { describe, it, expect, vi } from "vitest";

describe("SearchBar", () => {
  it("calls onSearch with the entered ingredient", () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    const input = screen.getByPlaceholderText(/Enter an ingredient/i);
    const button = screen.getByRole("button", { name: /Search/i });

    fireEvent.change(input, { target: { value: "chicken" } });
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledWith("chicken");
  });
});
