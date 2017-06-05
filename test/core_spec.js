/* global describe */
/* global it */
import { expect } from 'chai'
import { List, Map, fromJS } from 'immutable'
import { setEntries, next, vote } from '../src/core'

describe('core logic', () => {
  describe('setEntries', () => {
    it('adds entries to the state', () => {
      const oldState = Map()
      const entries = List.of('a', 'b', 'c')
      const newState = setEntries(oldState, entries)
      // expect(newState).to.equal(Map({ entries: List.of('a', 'b', 'c') }))
      expect(newState).to.equal(Map({
        entries: List.of('a', 'b', 'c'),
      }));
      expect(oldState).to.equal(Map())
    })
    it('convererts new entries to immutable', () => {
      const oldState = Map()
      const entries = ['a', 'b', 'c']
      const newState = setEntries(oldState, entries)
      expect(newState).to.equal(Map({ entries: List.of('a', 'b', 'c') }))
      expect(oldState).to.equal(Map())
    })
  })
  describe('next', () => {
    it('takes sets up the first vote and removes voting entries from list', () => {
      const state = Map({ entries: List.of('a', 'b', 'c') })
      const newState = next(state)
      expect(newState).to.equal(Map({
        vote: Map({ pair: List.of('a', 'b') }),
        entries: List.of('c'),
      }))
    })
    it('returns the winning entry back to the entries list', () => {
      const state = fromJS(
        {
          vote: { pair: ['a', 'b'], tally: { a: 2, b: 5 } },
          entries: ['c', 'd'],
        },
      )
      const newState = next(state)
      expect(newState).to.equal(fromJS(
        {
          vote: { pair: ['c', 'd'] },
          entries: ['b'],
        },
      ))
    })
    it('in case of a tie, returns both entries to the list', () => {
      const state = fromJS(
        {
          vote: { pair: ['a', 'b'], tally: { a: 5, b: 5 } },
          entries: ['c', 'd'],
        },
      )
      const newState = next(state)
      expect(newState).to.equal(fromJS(
        {
          vote: { pair: ['c', 'd'] },
          entries: ['a', 'b'],
        },
      ))
    })
    it('declares the last standing entry winner', () => {
      const state = fromJS(
        {
          vote: { pair: ['a', 'b'], tally: { a: 1 } },
          entries: [],
        },
      )
      const newState = next(state)
      expect(newState).to.equal(fromJS({ winner: 'a' }))
    })
  })
  describe('vote', () => {
    it('creates a tally if there isnt one and starts it at 1', () => {
      const state = fromJS(
        {
          vote: { pair: ['a', 'b'] },
          entries: [],
        },
      )
      const newState = vote(state, 'a')
      expect(newState).to.equal(fromJS(
        {
          vote: { pair: ['a', 'b'], tally: { a: 1 } },
          entries: [],
        },
    ))
    })
    it('it increments an existing tally', () => {
      const state = fromJS(
        {
          vote: { pair: ['a', 'b'], tally: { b: 1 } },
          entries: [],
        },
      )
      const newState = vote(state, 'b')
      expect(newState).to.equal(fromJS(
        {
          vote: { pair: ['a', 'b'], tally: { b: 2 } },
          entries: [],
        },
      ))
    })
  })
})
