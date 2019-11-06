/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PublicQuotesManager } from '../../containers/PublicQuotes';

// enzyme is connected
configure({
  adapter: new Adapter(),
  disableLifecycleMethods: true,
});

describe('tests for PublicQuotes.js', () => {
  let wrapper;
  beforeEach(() => {
    const initialProps = {
      quotes: null,
    };

    wrapper = shallow(<PublicQuotesManager {...initialProps} />);
  });
  it('should render Component with no issues', () => {
    expect(wrapper.exists()).toEqual(true);
  });

  it('should render warning paragraph when quotes are null', () => {
    expect(wrapper.find('#no-public-quotes')).toHaveLength(1);
  });

  it('should render public quotes when quotes are not null', () => {
    wrapper.setProps({
      quotes: [
        {
          id: 43818,
          dialogue: false,
          private: false,
          tags: [
            'moving-on',
          ],
          url: 'https://favqs.com/quotes/brian-eno/43818-i-don-t-live--',
          favorites_count: 1,
          upvotes_count: 0,
          downvotes_count: 0,
          author: 'Brian Eno',
          author_permalink: 'brian-eno',
          body: "I don't live in the past at all I'm always wanting to do something new. I make a point of constantly trying to forget and get things out of my mind.",
        },
      ],
    });
    expect(wrapper.find('#no-public-quotes').length).toBe(0);
  });
});
