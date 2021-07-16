import Search from "../search";
import {mount, ReactWrapper} from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';
import {data} from "../../data";

Enzyme.configure({adapter: new Adapter()});

let wrapper: ReactWrapper;

const props = {
    songs: data,
}

beforeEach(() => {
    wrapper = mount(<Search {...props}/>);
});

afterEach(() => {
    wrapper.unmount();
});

test('should show "no results" if nothing returned', () => {
    wrapper.find('input').simulate('change', {target: {name: 'text', value: ''}});
    const div = wrapper.findWhere(node => {
        return (
            node.type() === 'div'
            && node.text() === 'No results'
        )
    })
    expect(div.length).toBe(1);
});

test('should not show "no results" if results returned', () => {
    wrapper.find('input').simulate('change', {target: {name: 'text', value: '1999'}});
    const div = wrapper.findWhere(node => {
        return (
            node.type() === 'div'
            && node.text() === 'No results'
        )
    })
    expect(div.length).toBe(0);
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
