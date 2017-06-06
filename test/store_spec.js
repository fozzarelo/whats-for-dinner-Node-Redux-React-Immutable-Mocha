/* global describe */
/* global it */
import { expect } from 'chai'
import { fromJS } from 'immutable'
import MakeStore from '../src/store'

describe('The store', () => {
  it('is a Redux store with reducers', () => {
    const store = MakeStore()
    expect(store.getState()).to.equal(fromJS({}))
    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['banana', 'kiwi', 'apple'],
    })
    expect(store.getState()).toEqual(fromJS({
      entries: ['banana', 'kiwi', 'apple'],
    }))
  })
})
