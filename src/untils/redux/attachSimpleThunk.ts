import { AsyncThunk, PayloadAction, ActionReducerMapBuilder, Draft } from '@reduxjs/toolkit';

type HasLoadingAndError = {
  loading: boolean;
  error: string | null;
};

export function attachSimpleThunk<
  State extends HasLoadingAndError,
  Returned,
  ThunkArg = void
>(
  builder: ActionReducerMapBuilder<State>,
  thunk: AsyncThunk<Returned, ThunkArg, {}>,
  onFulfilled: (state: Draft<State>, action: PayloadAction<Returned>) => void
): void {
  builder
    .addCase(thunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.loading = false;
      onFulfilled(state, action);
    })
    .addCase(thunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error';
    });
}
