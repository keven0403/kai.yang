import { createReducer } from '@reduxjs/toolkit'
import { setLoadingState, setAddNodeLoadingState, setGlobleLoadingState } from './actions'

const initialState = {
	isLoading: false,
	isAddNodeLoading: false,
	isGlobleLoading: false
}

export default createReducer(initialState, (builder) => {
	builder
		.addCase(setLoadingState, (state, { payload: { isLoading } }) => {
            state.isLoading = isLoading
		})
		.addCase(setAddNodeLoadingState, (state, { payload: { isLoading } }) => {
            state.isAddNodeLoading = isLoading
		})
		.addCase(setGlobleLoadingState, (state, { payload: { isLoading } }) => {
            state.isGlobleLoading = isLoading
		})
})