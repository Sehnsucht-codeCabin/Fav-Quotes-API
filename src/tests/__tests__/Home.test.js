/* eslint-disable no-undef */
import React from 'react';
import mockAxios from 'jest-mock-axios';
// the shallow component render our Component in a 'shallow' way, I mean, kind of a placeholder without rendering a whole subtree of components
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../../containers/Home';

// enzyme is connected
configure({
  adapter: new Adapter(),
});

describe('tests for Home.js', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Home />);
  });

  it('should render App Component with no issues', () => {
    expect(wrapper.exists()).toEqual(true);
  });

  it('should render random quote on dom', () => {
    expect(wrapper.find('#quoteBody').text()).toBe('');
  });

  // it('fetches data from favquotes', () => {
  //   let catchFn = jest.fn(),
  //       thenFn = jest.fn();
  //   UppercaseProxy('something here')
  //       .then(thenFn)
  //       .catch(catchFn);
  //   // setup
  //   // mockAxios.get.mockImplementationOnce(() => Promise.resolve({
  //   //   data: { results: ["cat.jpg"] },
  //   // }));
  //   expect(mockAxios.get).toHaveBeenCalledWith('https://favqs.com/api/qotd');
  // });

});
