import Enzyme, { mount, ReactWrapper } from 'enzyme';
import { data } from '../../data';
import Stats from '../stats';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

let wrapper: ReactWrapper;

const props = {
  songs: data,
};

beforeEach(() => {
  wrapper = mount(<Stats {...props} />);
});

afterEach(() => {
  wrapper.unmount();
});

test('should have more than 10', () => {
  expect(wrapper.html().match(/\((\d+)\)/g)?.length).toBeGreaterThan(10);
});

test('should results sorted where elements go in order descending', () => {
  const arr: IterableIterator<any> = wrapper.html().matchAll(/\(([\d+])\)/g);
  // @ts-ignore
  const arrNumbers: number[] = [...arr]
    .map((i) => parseInt(i[1], 10))
    .slice(0, 5);
  expect(arrNumbers).toBeDefined();

  for (let i = 0; i < arrNumbers.length - 1; i++) {
    const num1 = arrNumbers[i];
    const num2 = arrNumbers[i + 1];
    expect(num1 >= num2).toBe(true);
  }
});
