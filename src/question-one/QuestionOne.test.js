import React from "react";
import * as data from "../server/db.json";
import {
  render,
  fireEvent,
  getByTestId,
  waitFor,
  screen,
} from "@testing-library/react";
import { QuestionOne } from "./QuestionOne";

const mockDataService = {
  getJobsWithSearchTerm: () => Promise.resolve(data.getJobsWithSearchTerm),
};
const mockDataServiceError = {
  getJobsWithSearchTerm: () => Promise.reject("Error"),
};

test("Render first time", async () => {
  render(<QuestionOne service={mockDataService} />);

  expect(await screen.findByText("No Results"));
});

test("Input data with length >= 3 and have response. It show data as expected", async () => {
  const { container, rerender } = render(
    <QuestionOne service={mockDataService} />
  );
  const input = getByTestId(container, "search");
  fireEvent.change(input, { target: { value: "Build" } });

  expect(input).toHaveValue("Build");
  expect(await screen.findByText("Build a fence"));
  expect(await screen.findByText("Build a shed"));
});

test("Input data with length >= 3 and have response and Remove input data. It show No Results", async () => {
  const { container, rerender } = render(
    <QuestionOne service={mockDataService} />
  );
  const input = getByTestId(container, "search");
  fireEvent.change(input, { target: { value: "Build" } });

  expect(input).toHaveValue("Build");
  expect(await screen.findByText("Build a fence"));

  fireEvent.change(input, { target: { value: "" } });
  expect(await screen.findByText("No Results"));
});

test("Input data with length >= 3 and Server Error. It's show No Results", async () => {
  const { container, rerender } = render(
    <QuestionOne service={mockDataServiceError} />
  );
  const input = getByTestId(container, "search");
  fireEvent.change(input, { target: { value: "Build" } });

  expect(input).toHaveValue("Build");
  expect(await screen.findByText("No Results"));
});

test("Input data with length < 3. It show No Results", async () => {
  const { container } = render(<QuestionOne service={mockDataService} />);
  const input = getByTestId(container, "search");
  fireEvent.change(input, { target: { value: "Sa" } });
  expect(await screen.findByText("No Results"));
});
