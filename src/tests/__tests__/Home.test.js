/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Home } from '../../containers/Home';

// enzyme is connected
configure({
  adapter: new Adapter(),
  disableLifecycleMethods: false,
});

describe('tests for Home.js', () => {
  let wrapper;

  beforeEach(() => {
    const initialProps = {
      isAuthenticated: false,
      getPublicQuotes: jest.fn(),
      logout: jest.fn(),
      setNotActiveSession: jest.fn(),
      sessionNotActive: 'false',
    };

    wrapper = shallow(<Home {...initialProps} />);
  });

  it('should render App Component with no issues', () => {
    expect(wrapper.exists()).toEqual(true);
  });

  // check if daily quote was executed or not
  it('should get daily quote', () => {
    // set initial quote
    wrapper.setState({
      quote: {
        body: 'Some quote',
        author: 'John Doe',
      },
    });
    expect(wrapper.find('#quote-body').text()).toBe('"Some quote"');

    // unset initial quote (authenticated user)
    wrapper.setProps({
      isAuthenticated: true,
    });
    expect(wrapper.find('#quote-body').length).toBe(0);
  });
});
