import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Contact from './Contact';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { defineJestMocks } from '../testing-utils/utils';

describe('Contact Component', () => {
  defineJestMocks(jest);
  const server = setupServer()

  beforeAll(() => {
    return server.listen();
  });
  beforeEach(() => {
    jest.clearAllMocks();
    defineJestMocks(jest)
  });
  afterEach(() => server.resetHandlers())
  // clean up once the tests are done
  afterAll(() => server.close())

  test('can send message', async () => {
    const name = 'Test User';
    const email = 'test@test.com';
    const message = 'Test message';

    // given
    const submitMessageSpy = jest.fn();
    server.use(rest.post('/api/contact/message', (req, res, ctx) => {
      submitMessageSpy(req.body);

      return res();
    }))

    const { container } = render(<Contact />);

    const nameInput = container.querySelector('#name');
    const emailInput = container.querySelector('#email');
    const messageInput = container.querySelector('#message');
    const SendButton = screen.getByText('Send');

    if (nameInput === null) throw 'nameInput is null';
    if (emailInput === null) throw 'emailInput is null';
    if (messageInput === null) throw 'messageInput is null';

    // when
    userEvent.type(nameInput, name);
    userEvent.type(emailInput, email);
    userEvent.type(messageInput, message);
    userEvent.click(SendButton);

    // then
    await waitFor(() => screen.getByText('Sending Message Completed'), { timeout: 1000 });

    expect(submitMessageSpy.mock.calls.length).toBe(1);
    expect(submitMessageSpy.mock.calls[0][0]).toStrictEqual({ "email": email, "message": message, "name": name });
    expect(screen.queryByText('Not a valid email!')).not.toBeInTheDocument();
  });


  test('email is valid before sending', async () => {
    const name = 'Test User';
    const incorrectEmail = 'test@test';
    const message = 'Test message';

    // given
    const submitMessageSpy = jest.fn();
    server.use(rest.post('/api/contact/message', (req, res, ctx) => {
      submitMessageSpy(req.body);

      return res();
    }))

    const { container } = render(<Contact />);

    const nameInput = container.querySelector('#name');
    const emailInput = container.querySelector('#email');
    const messageInput = container.querySelector('#message');
    const SendButton = screen.getByText('Send');

    if (nameInput === null) throw 'nameInput is null';
    if (emailInput === null) throw 'emailInput is null';
    if (messageInput === null) throw 'messageInput is null';

    // when
    userEvent.type(nameInput, name);
    userEvent.type(emailInput, incorrectEmail);
    userEvent.type(messageInput, message);
    userEvent.click(SendButton);

    // then
    await waitFor(() => screen.getByText('Not a valid email!'));

    expect(submitMessageSpy.mock.calls.length).toBe(0);
  });
})