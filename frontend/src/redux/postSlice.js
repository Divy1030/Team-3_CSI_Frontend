import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './axiosInstance';


export const getPosts = createAsyncThunk('posts/getPosts', async (_, { getState }) => {
  const { user } = getState().auth;
  const response = await axiosInstance.get('/posts/', {
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  });
  return response.data;
});

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    selectedPost: null,
    loading: false,
    error: null,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPosts, setSelectedPost } = postSlice.actions;
export default postSlice.reducer;