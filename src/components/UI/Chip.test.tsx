import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Chip from '@/components/UI/Chip';

describe('Chip Component', () => {
  it('rendered with provided content', () => {
    const content = 'foo';

    render(<Chip>{content}</Chip>);
    const chip = screen.getByText(content);

    expect(chip).toBeInTheDocument();
  });

  it('executes onClick callback when clicked', async () => {
    const user = userEvent.setup();

    const content = 'foo';
    const onClickMock = jest.fn();

    render(<Chip onClick={onClickMock}>{content}</Chip>);
    const chip = screen.getByText(content);
    await user.click(chip);

    expect(onClickMock).toHaveBeenCalled();
  });

  it('applies custom className when provided', () => {
    const content = 'foo';
    const className = 'foo-class';

    render(<Chip className={className}>{content}</Chip>);
    const chip = screen.getByText(content);

    expect(chip).toHaveClass(className);
  });
});
