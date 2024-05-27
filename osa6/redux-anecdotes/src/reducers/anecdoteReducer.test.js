import reducer from "./anecdoteReducer"
import deepFreeze from 'deep-freeze'

describe('reducer', () => {
  test('returns new state with action NEW_ANECDOTE', () => {
    const state = []
    const action = {
      type: 'anecdotes/createAnecdote',
      payload: 'This is an anecdote'
    }

    deepFreeze(state)
    const newState = reducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState.map(s => s.content)).toContainEqual(action.payload)
  })

  test('returns new state with action VOTE', () => {
    const state = [
      {
        content: 'Anecdote 1',
        votes: 0,
        id: 1
      },
      {
        content: 'Anecdote 2',
        votes: 0,
        id: 2
      },
      {
        content: 'Anecdote 3',
        votes: 0,
        id: 3
      }
    ]

    const action = {
      type: 'anecdotes/voteAnecdote',
      payload: 2
    }

    deepFreeze(state)
    const newState = reducer(state, action)

    expect(newState).toHaveLength(3)
    
    expect(newState).toContainEqual(state[0])
    console.log("moi")
    console.log(state[0])
    expect(newState).toContainEqual({
      content: 'Anecdote 2',
      votes: 1,
      id: 2
    })
  })
})