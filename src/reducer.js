import { setEntries, next, vote, zeroState } from './core'

export default function reducer(state = zeroState, action) {
  switch (action.type) {
  case 'SET_ENTRIES': return setEntries(state, action.entries)
  case 'NEXT': return next(state)
  case 'VOTE': return state.update('vote', stateVote => vote(stateVote, action.entry))
  default: return state
  }
}
