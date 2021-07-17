import Search from "../search";
import Enzyme, {mount, ReactWrapper} from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
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

const findTableCellThatContains = (wrapper: ReactWrapper, text: string): ReactWrapper => {
    return wrapper.findWhere(node => {
        return (node.type() === 'td'
            && node.text() === text);
    });
}

test('should show "0 results" if nothing returned', () => {
    wrapper.find('input').simulate('change', {target: {name: 'text', value: 'zxczczxc'}});
    const div = wrapper.findWhere(node => {
        return (
            node.type() === 'div'
            && node.text() === '0 results'
        )
    })
    expect(div.length).toBe(1);
});

test('should not show "0 results" if results returned', () => {
    wrapper.find('input').simulate('change', {target: {name: 'text', value: '1999'}});
    const div = wrapper.findWhere(node => {
        return (
            node.type() === 'div'
            && node.text() === '0 results'
        )
    })
    expect(div.length).toBe(0);
});

test('should return results with accents when not using accents', () => {
    wrapper.find('input').simulate('change', {target: {name: 'text', value: 'Julio Cesar'}});
    expect(findTableCellThatContains(wrapper, 'Julio César Chávez').length).toBeGreaterThanOrEqual(1);
});

test('should return results with accents when using accents', () => {
    wrapper.find('input').simulate('change', {target: {name: 'text', value: 'JuliO César'}});
    expect(findTableCellThatContains(wrapper, 'Julio César Chávez').length).toBeGreaterThanOrEqual(1);
});

describe('filter', () => {

    test('should filter by artist', () => {
        wrapper.find('select').simulate('change', {target: {value: 'artist'}});
        wrapper.find('input').simulate('change', {target: {name: 'text', value: 'SnOop Dogg'}});
        expect(findTableCellThatContains(wrapper, 'Snoop Dogg').length).toBeGreaterThanOrEqual(1);
        expect(findTableCellThatContains(wrapper, 'Lil Wayne').length).toBe(0);
    });

    test('should filter by song', () => {
        wrapper.find('select').simulate('change', {target: {value: 'song'}});
        wrapper.find('input').simulate('change', {target: {name: 'text', value: 'Bitch PLease'}});
        expect(findTableCellThatContains(wrapper, 'Bitch Please').length).toBeGreaterThanOrEqual(1);
        expect(findTableCellThatContains(wrapper, 'Surf Swag').length).toBe(0);
    });

    test('should filter by lyrics', () => {
        wrapper.find('select').simulate('change', {target: {value: 'lyrics'}});
        wrapper.find('input').simulate('change', {target: {name: 'text', value: 'Beat the beaT'}});
        expect(findTableCellThatContains(wrapper, 'Surf Swag').length).toBeGreaterThanOrEqual(1);
        expect(findTableCellThatContains(wrapper, 'Bitch Please').length).toBe(0);
    });

    test('should filter by boxers', () => {
        wrapper.find('select').simulate('change', {target: {value: 'boxer'}});
        wrapper.find('input').simulate('change', {target: {name: 'text', value: 'lisTon'}});
        expect(findTableCellThatContains(wrapper, 'Sonny Liston').length).toBeGreaterThanOrEqual(1);
        expect(findTableCellThatContains(wrapper, 'Mike Tyson').length).toBe(0);
    });

});

describe('no filter', () => {

    describe('song', () => {

        test('should return results', () => {
            wrapper.find('input').simulate('change', {target: {name: 'text', value: 'surf'}});
            expect(findTableCellThatContains(wrapper, 'Surf Swag').length).toBeGreaterThanOrEqual(1);
        });

    });

    describe('year', () => {

        test('should return results', () => {
            wrapper.find('input').simulate('change', {target: {name: 'text', value: '1999'}});
            expect(findTableCellThatContains(wrapper, 'Bitch Please').length).toBeGreaterThanOrEqual(1);
        });

    });

    describe('artist', () => {

        test('should return results regardless of case', () => {
            wrapper.find('input').simulate('change', {target: {name: 'text', value: 'Snoop Dogg'}});
            expect(findTableCellThatContains(wrapper, 'Snoop Dogg').length).toBeGreaterThanOrEqual(1);
        });

    });

    describe('boxer name', () => {

        test('should return results regardless of case', () => {
            wrapper.find('input').simulate('change', {target: {name: 'text', value: 'mIke Tyson'}});
            expect(findTableCellThatContains(wrapper, 'Mike Tyson').length).toBeGreaterThanOrEqual(1);
        });

    });

});
