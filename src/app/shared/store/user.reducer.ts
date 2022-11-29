import { createReducer, on } from '@ngrx/store';
import { User } from '../interfaces/user.interface';
import { setUser } from './user.action';

export interface AppState {
  user: User | null;
}
const initialState: AppState = { user: null };

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, user }))
);
