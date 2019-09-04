/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable indent */
import reducer from '../../store/favQuotesReducer';
import * as actionTypes from '../../store/actionTypes';

describe('auth', () => {

    let quotes;
    beforeEach(() => {
        quotes = [{
            tags: [
                'linux',
                'programming',
                'code',
                'finnish-american'
            ],
            favorite: false,
            author_permalink: 'linus-torvalds',
            body: 'Talk is cheap. Show me the code.',
            id: 253,
            favorites_count: 1,
            upvotes_count: 0,
            downvotes_count: 0,
            dialogue: false,
            author: 'Linus Torvalds',
            url: 'https://favqs.com/quotes/linus-torvalds/253-talk-is-cheap-s-'
        }]
      });

    it('should login in user', () => {
        expect(reducer(undefined, {
            type: actionTypes.ADD_PUBLIC,
            // eslint-disable-next-line object-shorthand
            quotes: quotes,
        })).toEqual({
            favQuotes: [],
            publicQuotes: quotes,
        });
    });

});