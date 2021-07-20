import Search from '../search';
import Enzyme, { mount, ReactWrapper } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { data } from '../../data';

Enzyme.configure({ adapter: new Adapter() });

let wrapper: ReactWrapper;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000',
  }),
  useHistory: () => ({
    push: () => {},
  }),
}));

const props = {
  songs: data,
};

beforeEach(() => {
  wrapper = mount(<Search {...props} />);
});

afterEach(() => {
  wrapper.unmount();
});

const findTableCellThatContains = (
  wrapper: ReactWrapper,
  text: string
): ReactWrapper => {
  return wrapper.findWhere((node) => {
    return (
      node.type() === 'td' &&
      node.text().replace('- BoxRec/BoxStat', '').trim() === text
    );
  });
};

test('should show "0 results" if nothing returned', () => {
  wrapper
    .find('input')
    .simulate('change', { target: { name: 'text', value: 'zxczczxc' } });
  const div = wrapper.findWhere((node) => {
    return node.type() === 'div' && node.text() === '0 results';
  });
  expect(div.length).toBeGreaterThanOrEqual(1);
});

test('should not show "0 results" if results returned', () => {
  wrapper
    .find('input')
    .simulate('change', { target: { name: 'text', value: '1999' } });
  const div = wrapper.findWhere((node) => {
    return node.type() === 'div' && node.text() === '0 results';
  });
  expect(div.length).toBe(0);
});

test('should return results with accents when not using accents', () => {
  wrapper
    .find('input')
    .simulate('change', { target: { name: 'text', value: 'Julio Cesar' } });
  expect(
    findTableCellThatContains(wrapper, 'Julio César Chávez').length
  ).toBeGreaterThanOrEqual(1);
});

test('should return results with accents when using accents', () => {
  wrapper
    .find('input')
    .simulate('change', { target: { name: 'text', value: 'JuliO César' } });
  expect(
    findTableCellThatContains(wrapper, 'Julio César Chávez').length
  ).toBeGreaterThanOrEqual(1);
});
