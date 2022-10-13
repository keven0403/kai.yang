import { createReducer } from '@reduxjs/toolkit'
import { selectThemHandler } from './actions'

const initialState = {
	themType: 'month'
}

export default createReducer(initialState, (builder) => {
	builder
		.addCase(selectThemHandler, (state, { payload: { themType } }) => {
            state.themType = themType
		})
})