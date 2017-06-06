import { List, Map, fromJS } from 'immutable'

const getWinners = (vote) => {
  if (!vote) return []
  const [red, blue] = vote.get('pair')
  const redVotes = vote.getIn(['tally', red], 0)
  const blueVotes = vote.getIn(['tally', blue], 0)
  if (redVotes === blueVotes) return [red, blue]
  return (redVotes > blueVotes) ? red : blue
}
exports.zeroState = Map()
exports.setEntries = (state, entries) => state.set('entries', List(entries))
exports.next = (state) => {
  const entries = state.get('entries').concat(getWinners(state.get('vote')))
  if (entries.size === 1) {
    return state.remove('vote').remove('entries').set('winner', entries.first())
  } else {
    return state.merge({
      vote: Map({ pair: entries.take(2) }),
      entries: entries.skip(2),
    })
  }
}
exports.vote = (stateVote, entry) => stateVote.updateIn(
    ['tally', entry],                // path
    0,                               // default
    i => i + 1,                      // function
  )
