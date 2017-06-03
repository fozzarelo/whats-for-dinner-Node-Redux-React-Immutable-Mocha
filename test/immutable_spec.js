/* global describe */
/* global it */
import { List, Map } from 'immutable'
import { expect } from 'chai'

describe('immutability', () => {
  describe('a tree', () => {
    function addMovie(currentState, movie) {
      return currentState.set(
        'movies',
        currentState.get('movies').push(movie),
      )
    }
    it('is immutable', () => {
      const state = Map({
        movies: List.of('a', 'b', 'c'),
      })
      const nextState = addMovie(state, 'd')
      expect(nextState).to.equal(Map({
        movies: List.of('a', 'b', 'c', 'd'),
      }))
      expect(state).to.equal(Map({ movies: List.of('a', 'b', 'c') }))
    })
  })
})
