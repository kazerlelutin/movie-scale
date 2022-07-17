import { render } from '@testing-library/react';
import Consent from './Consent';

describe('<Consent />', () => {

    it('Check snapshot', () => {
        const { asFragment } = render(
            <Consent setter={jest.fn()}/>
        );
        expect(asFragment()).toMatchSnapshot();
    });

});
