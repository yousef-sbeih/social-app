import { createAction, props } from '@ngrx/store';
import { Post } from '../interfaces/post.interface';

export const SET_POST = '[posts post-dialog] Set posts ';
export const ADD_POST = '[posts post-dialog] add post ';
export const UPDATE_POST = '[posts post-dialog] update post  ';
export const DELETE_POST = '[posts post-dialog] delete post  ';

export const setPosts = createAction(SET_POST, props<{ posts: Post[] }>());
export const addPost = createAction(ADD_POST, props<{ post: Post }>());
export const updatePost = createAction(UPDATE_POST, props<{ post: Post }>());
export const deletePost = createAction(DELETE_POST, props<{ post: Post }>());
