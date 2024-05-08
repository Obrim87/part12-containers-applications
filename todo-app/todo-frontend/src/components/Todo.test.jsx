import Todo from './Todo';
import { render, screen } from '@testing-library/react';

test('single todo is rendered', async () => {
  const todo = {
    text: 'This is my test todo',
    done: false
  };

  render(<Todo todo={todo} />);

  const element = await screen.findByText('This is my test todo');

  expect(element).toBeInTheDocument();
});
