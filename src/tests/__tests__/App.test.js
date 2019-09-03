import React from 'react';
// the shallow component render our Component in a 'shallow' way, I mean, kind of a placeholder without rendering a whole subtree of components
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../App';

// enzyme is connected
configure({
  adapter: new Adapter(),
});

describe('tests for App.js', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render App Component with no issues', () => {
    expect(wrapper.exists()).toEqual(true);
  });
});
