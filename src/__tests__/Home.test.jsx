// src/__tests__/Home.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../pages/Home";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

jest.mock("axios");

const mockData = [
  { id: 1, title: "Wheat", description: "High-quality wheat", price: 200, unit: "kg" },
  { id: 2, title: "Corn", description: "Fresh corn", price: 150, unit: "kg" },
];

describe("Home Component", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockData });
  });

  test("shows loading spinner initially", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
    await waitFor(() => screen.getByText(/Wheat/i));
  });

  test("renders commodities after fetch", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("Wheat"));
    expect(screen.getByText("Wheat")).toBeInTheDocument();
    expect(screen.getByText("Corn")).toBeInTheDocument();
  });

  test("filters commodities based on search input", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("Wheat"));
    fireEvent.change(screen.getByPlaceholderText(/Search for crops/i), {
      target: { value: "corn" },
    });

    await waitFor(() => screen.getByText("Corn"));
    expect(screen.getByText("Corn")).toBeInTheDocument();
    expect(screen.queryByText("Wheat")).not.toBeInTheDocument();
  });
});
