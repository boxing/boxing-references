import Search from "../search";
import {mount, ReactWrapper} from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

let wrapper: ReactWrapper;

const props = {
    songs: [
        {
            song: "Surf Swag",
            year: 2009,
            singer: "Lil Wayne",
            artist: "Lil Wayne",
            lyrics: "Weezy beat the beat up like Sonny Liston",
            boxer: "Sonny Liston",
        },
        {
            song: "Bitch Please",
            year: 1999,
            artist: "Snoop Dogg",
            singer: 'Xzibit',
            lyrics: "Scrap like Mike Tyson",
            boxer: "Mike Tyson",
        }
    ]
}

beforeEach(() => {
    wrapper = mount(<Search {...props}/>);
});

afterEach(() => {
    wrapper.unmount();
});

describe('year', () => {

    test('should return results', () => {
        wrapper.find('input').simulate('change', {target: {name: 'text', value: '1999'}});
        expect(wrapper.find('tbody tr').length).toBe(1)
    });

});

describe('artist', () => {

    test('should return results regardless of case', () => {
        wrapper.find('input').simulate('change', {target: {name: 'text', value: 'Snoop Dogg'}});
        expect(wrapper.find('tbody tr').length).toBe(1)
    });

});

describe('boxer name', () => {

    test('should return results regardless of case', () => {
        wrapper.find('input').simulate('change', {target: {name: 'text', value: 'mIke Tyson'}});
        expect(wrapper.find('tbody tr').length).toBe(1)
    });

});
