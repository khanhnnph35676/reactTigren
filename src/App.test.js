import {render, screen} from '@testing-library/react';
import App from './App';
import Index from './app_magento/index'

test('renders learn react link', () => {
    render(<App/>);
    render(<Index/>);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
