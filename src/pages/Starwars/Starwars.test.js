/* eslint-env jest */
import React from 'react'
import {shallow} from 'enzyme'
import Starwars from './Starwars.jsx'
import configureMockStore from "redux-mock-store"
import {Provider} from 'react-redux'

describe('Page - Starwars', () => {
  let wrapper
  beforeAll(() => {
    const initialState = {}
    const mockStore = configureMockStore()
    const store = mockStore(initialState)
    wrapper = shallow(
      <Provider store={store}>
        <Starwars />
      </Provider>
    )
  })
  // component loads
  it('renders without crashing', () => {
    expect(wrapper.length).toEqual(1)
  })
})


