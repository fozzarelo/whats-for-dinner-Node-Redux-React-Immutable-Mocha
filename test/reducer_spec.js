/* global describe */
/* global it */
import { expect } from 'chai'
import { fromJS } from 'immutable'
import reducer from '../src/reducer'

describe('reducing...', () => {
  describe('core reducer', () => {
    it('has an initial state', () => {
      const action = { type: 'SET_ENTRIES', entries: fromJS(['a']) }
      const newState = reducer(undefined, action)
      expect(newState).to.equal(fromJS({ entries: ['a'] }))
    })
    it('handles SET_ENTRIES', () => {
      const state = fromJS({})
      const action = { type: 'SET_ENTRIES', entries: fromJS(['a', 'b', 'c']) }
      const newState = reducer(state, action)
      expect(newState).to.equal(fromJS({ entries: ['a', 'b', 'c'] }))
    })
    it('handles VOTE', () => {
      const state = fromJS(
        {
          vote: { pair: ['a', 'b'] },
          entries: [],
        },
      )
      const action = { type: 'VOTE', entry: 'a' }
      const newState = reducer(state, action)
      expect(newState).to.equal(fromJS(
        {
          vote: { pair: ['a', 'b'], tally: { a: 1 } },
          entries: [],
        },
      ))
    })
    it('handles NEXT', () => {
      const state = fromJS(
        {
          vote: { pair: ['a', 'b'], tally: { a: 6 } },
          entries: [],
        },
      )
      const action = { type: 'NEXT' }
      const newState = reducer(state, action)
      expect(newState).to.equal(fromJS({ winner: 'a' }))
    })
  })
})
