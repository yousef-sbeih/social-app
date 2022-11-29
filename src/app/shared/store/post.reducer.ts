import { createReducer, on } from '@ngrx/store';
import { Post } from '../interfaces/post.interface';
import { addPost, deletePost, setPosts, updatePost } from './post.action';

export interface AppState {
  posts: Post[];
}
export const initalState: Post[] = [];
export const postReducer = createReducer(
  initalState,
  on(setPosts, (state, { posts }) => {
    return [...posts];
  }),
  on(addPost, (state, { post }) => [post, ...state]),
  on(updatePost, (state, { post }) => {
    const index = state.findIndex((p) => p._id === post._id);
    return [...state.slice(0, index), post, ...state.slice(index + 1)];
  }),
  on(deletePost, (state, { post }) => {
    const index = state.findIndex((p) => p._id === post._id);
    return [...state.slice(0, index), ...state.slice(index + 1)];
  })
);
