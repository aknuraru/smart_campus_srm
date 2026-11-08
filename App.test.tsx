import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { App } from "./App";

describe("App UI integration tests", () => {
  it("UI01: room switching updates availability from Unavailable to Available", async () => {
    const user = userEvent.setup();
    render(<App />);

    const startInput = screen.getByLabelText("Start Time");
    const endInput = screen.getByLabelText("End Time");
    await user.clear(startInput);
    await user.type(startInput, "10:00");
    await user.clear(endInput);
    await user.type(endInput, "11:00");

    expect(screen.getByText("Unavailable")).toBeInTheDocument();

    const seminarRoomBtn = screen.getByRole("button", { name: /Seminar Room 210/i });
    await user.click(seminarRoomBtn);

    expect(screen.getByText("Available")).toBeInTheDocument();
  });

  it("UI02: typing 200 attendees displays empty state and hides result card", async () => {
    const user = userEvent.setup();
    render(<App />);

    const attendeesInput = screen.getByLabelText("Attendees");
    await user.clear(attendeesInput);
    await user.type(attendeesInput, "200");

    expect(screen.getByText(/No rooms match your requirements/i)).toBeInTheDocument();
    expect(screen.queryByText("Available")).not.toBeInTheDocument();
    expect(screen.queryByText("Unavailable")).not.toBeInTheDocument();
  });

  it("UI03: selecting blocked Lecture Hall 405 displays blocked message", async () => {
    const user = userEvent.setup();
    render(<App />);

    const lectureHallBtn = screen.getByRole("button", { name: /Lecture Hall 405/i });
    await user.click(lectureHallBtn);

    expect(screen.getByText("Unavailable")).toBeInTheDocument();
    expect(screen.getByText("Room is blocked")).toBeInTheDocument();
  });

  it("UI04: checking Projector and Computers filters catalog to Computer Lab 101", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByLabelText("Projector"));
    await user.click(screen.getByLabelText("Computers"));

    expect(screen.getByRole("button", { name: /Computer Lab 101/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Room 304/i })).not.toBeInTheDocument();
  });
});
