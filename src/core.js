import { List, Map } from 'immutable'

exports.setEntries = (state, entries) => state.set('entries', List(entries))
exports.next = (state) => {
  const entries = state.get('entries')
  return state.merge({
    vote: Map({ pair: entries.take(2) }),
    entries: entries.skip(2),
  })
}
