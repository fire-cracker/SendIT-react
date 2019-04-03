import React from 'react';
import { shallow } from 'enzyme';

import Header from '../../../components/header';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Header />);
});
describe('Tests for the Header', () => {
  it('Should render Header', () => {
    wrapper = shallow(<Header />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should call handle functions onclick', () => {
    const wrapper = shallow(<Header />);
    wrapper.find('a').at(0).simulate('click');
    wrapper.unmount();
  });
});
