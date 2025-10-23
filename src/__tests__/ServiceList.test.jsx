import { render, screen } from "@testing-library/react";
import ServiceList from "../components/ServiceList";

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([{ id: 1, name: "Fertilizer" }])
    })
  );
});

afterAll(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

test("shows loading animation when fetching services", async () => {
  render(<ServiceList />);
  expect(screen.getByText(/Loading services/i)).toBeInTheDocument();
});

test("renders a list of services", async () => {
  render(<ServiceList />);
  const serviceItem = await screen.findByText(/Fertilizer/i);
  expect(serviceItem).toBeInTheDocument();
});
