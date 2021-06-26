import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

/**
 * TODO:
 * 1. Remove date and userid
 */
const initialState = [
  {
    id: '1',
    content: 'New post',
    user: '2',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      heart: 0,
    },
  },
  {
    id: '2',
    content: 'This is my second post',
    user: '1',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      heart: 0,
    },
  },
];

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(content, userID) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            content,
            user: userID,
            reactions: {
              heart: 0,
            },
          },
        };
      },
    },
    postUpdated(state, action) {
      const { id, content } = action.payload;
      const postToBeUpdated = state.find((post) => post.id === id);

      if (postToBeUpdated) {
        postToBeUpdated.content = content;
      }
    },
    reactionAdded(state, action) {
      const { postID, reaction } = action.payload;
      const postToBeUpdated = state.find((post) => post.id === postID);

      if (postToBeUpdated) {
        postToBeUpdated.reactions[reaction]++;
      }
    },
  },
});

export const { postAdded, postUpdated, reactionAdded } = postSlice.actions;

export default postSlice.reducer;
