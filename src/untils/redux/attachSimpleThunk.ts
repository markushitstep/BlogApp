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
      (state as Draft<State>).loading = true;
      (state as Draft<State>).error = null;
    })
    .addCase(thunk.fulfilled, onFulfilled)
    .addCase(thunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error';
    });
}
