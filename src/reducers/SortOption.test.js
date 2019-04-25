import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import SortOption from './SortOption'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Sortoption', () => {
  
  let expectedActions, store

  it("dispatch the right actions", () => {
    expectedActions = [
      {type:"ASCENDING"},
      {type:'DESCENDING'}
    ]
   store = mockStore({ option: "none" })

   store.dispatch(expectedActions[0]);
   store.dispatch(expectedActions[1]);

   expect(store.getActions()[0]).toEqual(expectedActions[0]);
   expect(store.getActions()[1]).toEqual(expectedActions[1]);

  })
})