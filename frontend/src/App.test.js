import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app components', () => {
  render(<App />);
  

  const headerElement = screen.getByText(/WufWuf/i);
  expect(headerElement).toBeInTheDocument();
  const introMessageElement = screen.getByText(/¡Agenda tu cita y adopta tu peludito!/i);
  expect(introMessageElement).toBeInTheDocument();

  const dateInput = screen.getByPlaceholderText(/Fecha de la cita/i);
  expect(dateInput).toBeInTheDocument();
  const timeInput = screen.getByPlaceholderText(/Hora/i);
  expect(timeInput).toBeInTheDocument();
  const userIdInput = screen.getByPlaceholderText(/ID de usuario/i);
  expect(userIdInput).toBeInTheDocument();
  const phoneInput = screen.getByPlaceholderText(/Número de teléfono/i);
  expect(phoneInput).toBeInTheDocument();
  const nameInput = screen.getByPlaceholderText(/Nombre/i);
  expect(nameInput).toBeInTheDocument();
  const lastNameInput = screen.getByPlaceholderText(/Apellido/i);
  expect(lastNameInput).toBeInTheDocument();
  const emailInput = screen.getByPlaceholderText(/Email/i);
  expect(emailInput).toBeInTheDocument();

  const footerElement = screen.getByText(/Contacto: contact@wufwuf.com/i);
  expect(footerElement).toBeInTheDocument();
});
