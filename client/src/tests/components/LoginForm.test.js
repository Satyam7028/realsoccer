import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import LoginForm from '../../components/auth/LoginForm';

describe('LoginForm', () => {
  test('renders the login form with email and password fields', () => {
    const mockLogin = jest.fn();
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ login: mockLogin }}>
          <LoginForm />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test('calls the login function with the correct arguments on submit', async () => {
    const mockLogin = jest.fn();
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ login: mockLogin }}>
          <LoginForm />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });
});
