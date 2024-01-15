import { render, screen } from '@testing-library/react';
import { expect, vi } from 'vitest';
import HomePage from '../app/page';

vi.mock('@clerK/nextjs', () => {
  return {
    auth: () => new Promise(resolve => {
      resolve({ userId: 'user-id-123' });
    }),
    ClerkProvider: ({ children }: any) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'user-id-123',
        fullName: 'John Smith',
      },
    }),
  };
});

test('Home', async () => {
  render(await HomePage());
  expect(screen.getByText('Tracking your mood on a daily basis, be honest, really')).toBeTruthy();
});
