import React from 'react';
import { render, screen } from '@testing-library/react';
import Forbidden from '../components/Forbidden';

describe('Forbidden Component', () => {
    it('renders', () => {
        render(<Forbidden />);
        expect(screen.getByRole('heading', {name: 'Forbidden'})).toBeInTheDocument();
    });
    // it('should fail', () => {
    //     render(<Forbidden />);
    //     expect(screen.getByText("This text doesn't exist.")).toBeInTheDocument();
    // });
});
