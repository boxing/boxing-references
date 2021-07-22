import Enzyme, { mount, ReactWrapper } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import SearchBar from '../search-bar';

Enzyme.configure({ adapter: new Adapter() });

let mockUseLocation = '/boxing-references/mike/boxer';
const mockHandleSearchParamChange = jest.fn();
const mockHistoryReplace = jest.fn(() => {});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: mockUseLocation,
  }),
  useHistory: () => ({
    replace: mockHistoryReplace,
  }),
}));

let wrapper: ReactWrapper;

const props = {
  handleSearchParamChange: mockHandleSearchParamChange,
};

beforeEach(() => {
  mockHistoryReplace.mockImplementation(() => {});
  wrapper = mount(<SearchBar {...props} />);
});

afterEach(() => {
  wrapper.unmount();
});

test('loading the page should populate the input with the URL value', () => {
  expect(wrapper.find('input').props().value).toBe('mike');
});

test('loading the page should update the dropdown with the URL value', () => {
  expect(wrapper.find('select').props().value).toBe('boxer');
});

test('loading the page should update the title of the page', () => {
  expect(document.title).toBe(`Boxing references for "mike"`);
});

test('dropdown should be "all" if URL doesn\'t include last part"', () => {
  mockUseLocation = '/boxing-references/mike';
  wrapper = mount(<SearchBar {...props} />);
  expect(wrapper.find('input').props().value).toBe('mike');
  expect(wrapper.find('select').props().value).toBe('all');
});

test('should default to "all" if the search type is unknown', () => {
  mockUseLocation = '/boxing-references/mike/bla';
  wrapper = mount(<SearchBar {...props} />);
  expect(wrapper.find('input').props().value).toBe('mike');
  expect(wrapper.find('select').props().value).toBe('all');
});

test('should update the URL on input change', () => {
  wrapper
    .find('input')
    .simulate('change', { target: { name: 'text', value: 'tyson' } });
  expect(mockHandleSearchParamChange).toHaveBeenCalledTimes(1);
  // @ts-ignore
  expect(mockHistoryReplace.mock.calls[0][0]).toBe(
    '/boxing-references/tyson/all'
  );
});

test('should update the URL on dropdown change', () => {
  wrapper.find('select').simulate('change', { target: { value: 'lyrics' } });
  expect(mockHandleSearchParamChange).toHaveBeenCalledTimes(1);
  // @ts-ignore
  expect(mockHistoryReplace.mock.calls[0][0]).toBe(
    '/boxing-references/mike/lyrics'
  );
});
