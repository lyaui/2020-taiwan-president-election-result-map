import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Breadcrumb from '@/components/UI/Breadcrumb';

describe('Breadcrumb Component', () => {
  it('Nothing rendered when routers array is empty', () => {
    const { container } = render(<Breadcrumb routers={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('router name and path rendered correctly with multiple routers', () => {
    const routers = [
      { label: 'foo', path: '/foo' },
      { label: 'bar', path: '/bar' },
      { label: 'baz', path: '/bax' },
    ];

    render(<Breadcrumb routers={routers} />);

    routers.forEach((_router) => {
      const link = screen.getByRole('link', { name: _router.label });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', _router.path);
    });
  });

  it('last router is primary color and cursor auto', () => {
    const routers = [
      { label: 'foo', path: '/foo' },
      { label: 'bar', path: '/bar' },
      { label: 'baz', path: '/bax' },
    ];

    render(<Breadcrumb routers={routers} />);

    routers.forEach((_router, _index, _arr) => {
      if (_index === _arr.length - 1) {
        const link = screen.getByRole('link', { name: _router.label });
        expect(link).toHaveClass('cursor-auto', 'text-primary');
      }
    });
  });
});
