/* eslint-env jest */
import React from 'react'
import {shallow} from 'enzyme'
import PageNotFound from './PageNotFound.jsx'
import configureMockStore from "redux-mock-store"
import {Provider} from 'react-redux'

describe('Page - PageNotFound', () => {
  let wrapper
  beforeAll(() => {
    const initialState = {}
    const mockStore = configureMockStore()
    const store = mockStore(initialState)
    wrapper = shallow(
      <Provider store={store}>
        <PageNotFound />
      </Provider>
    )
  })
  // component loads
  it('renders without crashing', () => {
    expect(wrapper.length).toEqual(1)
  })
})


