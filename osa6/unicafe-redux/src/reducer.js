const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      const voteGood = {
        ...initialState,
        good: state.good + 1
      }
      return voteGood
    case 'OK':
      const voteOk = {
        ...initialState,
        ok: state.ok + 1
      }
      return voteOk
    case 'BAD':
      const voteBad = {
        ...initialState,
        bad: state.bad + 1
      }
      return voteBad
    case 'ZERO':
      const resetVotes = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return resetVotes
    default: return state
  }
  
}

export default counterReducer
