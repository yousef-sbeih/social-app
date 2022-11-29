import { createAction, props } from '@ngrx/store';
import { User } from '../interfaces/user.interface';

export const SET_USER = '[profile] set user  ';
export const UPDATE_USER = '[profile] update user  ';
export const setUser = createAction(SET_USER, props<{ user: User }>());
export const updateUser = createAction(UPDATE_USER, props<{ user: User }>());
