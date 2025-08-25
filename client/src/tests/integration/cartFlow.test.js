// src/tests/integration/cartFlow.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";
import axios from "axios";

// Mock axios response for products
jest.mock("axios");

describe("Shopping Cart Flow", () => {
  beforeEach(() => {
    axios.get.mockResolvedValueOnce({
      data: [
        {
          _id: "1",
          name: "Test Product 1",
          price: 100,
          image: "/test-product-1.jpg",
        },
      ],
    });
  });

  it("should allow a user to add a product to the cart and see it in the cart page", async () => {
    render(
      <MemoryRouter initialEntries={["/shop"]}>
        <App />
      </MemoryRouter>
    );

    // 1. Wait for mocked product to appear
    await waitFor(() =>
      expect(screen.getByText("Test Product 1")).toBeInTheDocument()
    );

    // 2. Click "Add to Cart"
    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    // 3. Click cart link
    fireEvent.click(screen.getByTestId("cart-link"));

    // 4. Verify product appears in cart
    await waitFor(() =>
      expect(screen.getByText(/Test Product 1/i)).toBeInTheDocument()
    );
  });
});
