/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import toast from 'react-hot-toast';
import axios from 'axios';
axios.defaults.withCredentials = true;

const BACKEND_URL =
  process.env.REACT_APP_DEPLOYED_URL || 'http://localhost:5000';

// Authentication
export const success = (history) => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/user`, { credentials: true })
    .then((response) => {
      localStorage.setItem('id', response.data.user.id);
      if (response.data.user.track === null) {
        history.push('/onboarding');
      } else {
        history.push('/');
      }
      toast.success('Welcome to the Lambda Alumni Network!');
    })
    .catch(() => toast.error('Oh no! An error has occurred.'));
};

// Fetches logged in user
export const fetchUser = () => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/user`)
    .then((response) =>
      dispatch({ type: 'SET_USER', payload: response.data.user })
    )
    .catch(() => toast.error('There was a problem fetching user.'));
};

// Fetches all users
export const fetchUsers = () => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/admin/users/`)
    .then((response) => dispatch({ type: 'SET_USERS', payload: response.data }))
    .catch(() => toast.error('There was a problem fetching users.'));
};

// Logs out user
export const logOut = (history) => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/auth/logout`)
    .then((response) => {
      localStorage.removeItem('id');
      history.push('/welcome');
      toast.success('You have been successfully logged out. See ya later!');
    })
    .catch(() =>
      toast.error('Uh oh. You have not been successfully logged out.')
    );
};

// Deletes user
export const deleteUser = (id) => (dispatch) => {
  return axios
    .delete(`${BACKEND_URL}/api/admin/users/${id}`)
    .then(() => toast.success('User has been deleted.'))
    .catch(() => toast.error('There was a problem deleting the user.'));
};

// Fetches a user's liked posts
export const fetchUsersLikedPosts = () => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/user/post/like`)
    .then((response) =>
      dispatch({ type: 'SET_USERS_LIKED_POSTS', payload: response.data })
    )
    .catch(() =>
      toast.error('Hmmm, there was a problem fetching liked posts.')
    );
};

// Fetches a user's liked comments
export const fetchUsersLikedComments = () => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/user/comment/like`)
    .then((response) =>
      dispatch({ type: 'SET_USERS_LIKED_COMMENTS', payload: response.data })
    )
    .catch(() =>
      toast.error('Hmmm, there was a problem fetching liked comments.')
    );
};

// Fetches a user's profile, different from auth fetch
export const fetchUserProfile = (userID) => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/user/${userID}`)
    .then((response) =>
      dispatch({ type: 'SET_CURRENT_USER', payload: response.data })
    )
    .catch(() => toast.error('Hmmm, there was a problem fetching the user.'));
};

// Updates a user's display name
export const updateUserDisplayName = (userID, displayName) => (dispatch) => {
  axios
    .put(`${BACKEND_URL}/api/user/displayname`, { userID, displayName })
    .then(() => toast.success('Woo! Display name changed to ' + displayName))
    .catch(() =>
      toast.error('Oh no! there was a problem updating your display name.')
    );
};

// Set a user's onboarded status to true
export const updateOnboardedStatusToTrue = () => (dispatch) => {
  return axios
    .put(`${BACKEND_URL}/api/user/onboard`)
    .then(() => toast.success('Woo! Glad you are here!'))
    .catch(() => toast.error('Oh no! there was a problem.'));
};

// Updates a user's role
export const updateUserRole = (id, role) => (dispatch) => {
  return axios
    .put(`${BACKEND_URL}/api/admin/users/${id}/${role}`)
    .then(() => toast.success('Role Successfully Updated'))
    .catch(() => toast.error('There was a problem updating the user\'s role.'));
};

// Sets user track during onboarding
export const setTrack = (track, token) => (dispatch) => {
  return axios
    .put(`${BACKEND_URL}/api/user/track`, { track, token })
    .then(() => toast.success('Woo! Track successfully set to ' + track))
    .catch(() => toast.error('Uh oh! There was a problem setting your track.'));
};

// Fetches all rooms
export const fetchRooms = () => (dispatch) => {
  return axios
    .get(`${BACKEND_URL}/api/room`)
    .then((response) => dispatch({ type: 'SET_ROOMS', payload: response.data }))
    .catch(() => {
      toast.error('Oh no! There was a problem fetching rooms.');
    });
};

// Creates a room
export const createRoom = (room) => (dispatch) => {
  return axios
    .post(`${BACKEND_URL}/api/room`, { ...room })
    .then(() => toast.success('Room Successfully Created'))
    .catch(() => toast.error('There was a problem creating the room.'));
};

// Updates a room
export const updateRoom = (id, room) => (dispatch) => {
  return axios
    .put(`${BACKEND_URL}/api/admin/rooms/${id}`, room)
    .then(() => toast.success('Room Successfully Updated'))
    .catch(() => toast.error('There was a problem updating the room.'));
};

// Deletes a room
export const deleteRoom = (id) => (dispatch) => {
  return axios
    .delete(`${BACKEND_URL}/api/room/${id}`)
    .then(() => toast.success('Room Successfully Deleted'))
    .catch(() => toast.error('There was a problem deleting the room.'));
};

// Creates a post
export const postQuestion = (title, description, room, history) => (
  dispatch
) => {
  return axios
    .post(`${BACKEND_URL}/api/post/create`, {
      title: title,
      description: description,
      room_id: room,
    })
    .then(() => toast.success('Nice! Your new post was just published.'))
    .catch(() => toast.error('Wait! There was a problem creating your post.'));
};

// Updates a post
export const updatePost = (userID, postID, newDescription) => (dispatch) => {
  return axios
    .put(`${BACKEND_URL}/api/post/update/${userID}/${postID}`, {
      newDescription,
    })
    .then(() => toast.success('Your post was successfully updated.'))
    .catch(() => toast.error('Oh no! There was a problem updating your post.'));
};

// Deletes a post
export const deletePost = (postID) => (dispatch) => {
  return axios
    .delete(`${BACKEND_URL}/api/post/delete/${postID}`)
    .then(() => toast.success('Your post was successfully deleted.'))
    .catch(() => toast.error('Hmm, there was a problem deleting your post.'));
};

// Fetches posts based on user search input
export const fetchSearch = (search) => (dispatch) => {
  axios
    .post(`${BACKEND_URL}/api/post/search`, { search })
    .then((response) => {
      dispatch({ type: 'SET_POSTS', payload: response.data });
    })
    .catch(() => toast.error('Oh no! There was a problem fetching posts.'));
};

// Fetches a post
export const fetchPost = (postID) => (dispatch) => {
  dispatch({ type: 'START_FETCHING_CURRENT_POST' });
  axios
    .get(`${BACKEND_URL}/api/post/${postID}`)
    .then((response) =>
      dispatch({ type: 'SET_CURRENT_POST', payload: response.data })
    )
    .catch(() =>
      toast.error('Uh... looks like there was a problem fetching the post.')
    );
};

// Fetches posts, ordered by most recent
export const fetchRecent = () => (dispatch) => {
  axios
    .post(`${BACKEND_URL}/api/post/recent`)
    .then((response) => dispatch({ type: 'SET_POSTS', payload: response.data }))
    .catch(() => toast.error('Shoot, there was a problem fetching posts.'));
};

// Fetches posts, ordered by number of likes
export const fetchPopular = () => (dispatch) => {
  axios
    .post(`${BACKEND_URL}/api/post/popular`)
    .then((response) => dispatch({ type: 'SET_POSTS', payload: response.data }))
    .catch(() => toast.error('Uh oh! There was a problem fetching posts.'));
};

// Likes a post
export const like = (postID) => (dispatch) => {
  return axios
    .get(`${BACKEND_URL}/api/post/like/${postID}`)
    .then(() => {})
    .catch(() => toast.error('Oh no! There was a problem liking this post.'));
};

// Removes like from a post
export const unlike = (postID) => (dispatch) => {
  return axios
    .delete(`${BACKEND_URL}/api/post/like/${postID}`)
    .then(() => {})
    .catch(() => toast.error('Hmm, there was a problem unliking this post.'));
};

// Creates a comment
export const postComment = (user, postID, comment) => (dispatch) => {
  return axios
    .post(`${BACKEND_URL}/api/comment`, { postID, comment })
    .then(() => {
      toast.success('Sweet! Comment added.');
    })
    .catch(() => toast.error('Hmm, there was a problem adding your comment'));
};

// Likes a comment
export const likeComment = (commentID) => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/comment/like/${commentID}`)
    .then(() => {})
    .catch(() =>
      toast.error('Oh no! There was a problem liking this comment.')
    );
};

// Removes like from a comment
export const unlikeComment = (commentID) => (dispatch) => {
  axios
    .delete(`${BACKEND_URL}/api/comment/like/${commentID}`)
    .then(() => {})
    .catch(() =>
      toast.error('Uh oh! There was a problem unliking this comment.')
    );
};

// Fetches a post's comments, ordered by recent
export const fetchPostCommentsByRecent = (postID) => (dispatch) => {
  dispatch({ type: 'START_FETCHING_CURRENT_POST_COMMENTS' });
  return axios
    .get(`${BACKEND_URL}/api/comment/recent/${postID}`)
    .then((response) =>
      dispatch({ type: 'SET_CURRENT_POST_COMMENTS', payload: response.data })
    )
    .catch(() => toast.error('Looks like there was trouble loading comments.'));
};

// Fetches a post's comments, ordered by number of likes
export const fetchPostCommentsByPopular = (postID) => (dispatch) => {
  dispatch({ type: 'START_FETCHING_CURRENT_POST_COMMENTS' });
  axios
    .get(`${BACKEND_URL}/api/comment/popular/${postID}`)
    .then((response) =>
      dispatch({ type: 'SET_CURRENT_POST_COMMENTS', payload: response.data })
    )
    .catch(() => toast.error('Looks like there was trouble loading comments.'));
};

// Fetches all posts in a specific room
export const fetchPostByRoom = (roomID, page) => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/room/${roomID}/recent?page=${page}&limit=10`)
    .then((res) => {
      dispatch({ type: 'SET_POSTS', payload: res.data });
    })
    .catch(() => toast.error('Oh no! Could not fetch posts.'));
};

// Fetches all posts in a specific room
export const fetchPostByRoomByPopular = (roomID, page) => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/room/${roomID}/popular?page=${page}&limit=10`)
    .then((res) => {
      dispatch({ type: 'SET_POSTS', payload: res.data });
    })
    .catch(() => toast.error('Oh no! Could not fetch posts.'));
};

// Updates search state
export const setSearch = (search) => (dispatch) => {
  dispatch({ type: 'SET_SEARCH', payload: search });
};

export const retrieveFullSearchResults = (search) => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/search/full/${search}`)
    .then((res) => {
      dispatch({ type: 'SET_FULL_SEARCH', payload: res.data });
    })
    .catch(() => toast.error('Oh no! Could not retrieve search results.'));
};

export const flagPost = (id, reason) => (dispatch) => {
  axios
    .post(`${BACKEND_URL}/api/mod/posts/${id}`, { reason: reason})
    .then(() => {
      toast.success(`Thanks! That post was successfully flagged as "${reason}"`);
    })
    .catch(() => {
      toast.error('Hmm... That post could not be flagged');
    });
};

export const flagComment = (id, reason) => (dispatch) => {
  axios
    .post(`${BACKEND_URL}/api/mod/comments/${id}`, { reason: reason})
    .then(() => {
      toast.success(`Thanks! That comment was successfully flagged as "${reason}"`);
    })
    .catch(() => {
      toast.error('Hmm... That comment could not be flagged');
    });
};

// Fetches flagged posts
export const fetchFlaggedPosts = () => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/mod/posts`)
    .then((res) => {
      dispatch({ type: 'SET_FLAGGED_POSTS', payload: res.data });
    })
    .catch(() => toast.error('There was a problem fetching flagged posts.'));
};

// Fetches flagged comments
export const fetchFlaggedComments = () => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/mod/comments`)
    .then((res) => {
      dispatch({ type: 'SET_FLAGGED_POSTS', payload: res.data });
    })
    .catch(() => toast.error('There was a problem fetching flagged comments.'));
};

// Archives post (moderator)
export const archivePost = (postID) => (dispatch) => {
  return axios
    .delete(`${BACKEND_URL}/api/mod/posts/${postID}`)
    .then(() => toast.success('Post Successfully Archived'))
    .catch(() => toast.error('Error Archiving Post'));
};

// Archives comment (moderator)
export const archiveComment = (commentID) => (dispatch) => {
  return axios
    .delete(`${BACKEND_URL}/api/mod/comments/${commentID}`)
    .then(() => toast.success('Comment Successfully Archived'))
    .catch(() => toast.error('Error Archiving Comment'));
};

// Resolves post (moderator) - keeps post visible
export const resolvePost = (postID) => (dispatch) => {
  return axios
    .put(`${BACKEND_URL}/api/mod/posts/${postID}`)
    .then(() => toast.success('Post Successfully Resolved'))
    .catch(() => toast.error('Error Resolving Post'));
};

// Resolves comment (moderator) - keeps comment visible
export const resolveComment = (commentID) => (dispatch) => {
  return axios
    .put(`${BACKEND_URL}/api/mod/comments/${commentID}`)
    .then(() => toast.success('Comment Successfully Resolved'))
    .catch(() => toast.error('Error Resolving Comment'));
};

// Removes a comment (user)
export const removeCommentsByUserId = (commentId) => (dispatch) => {
  return axios
    .delete(`${BACKEND_URL}/api/comment/${commentId}`)
    .then(() => toast.success('Success! Your comment was removed.'))
    .catch(() =>
      toast.error('Oh no! There was an error removing your comment')
    );
};

// fetch comment(user)
export const fetchComments = (commentId) => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/comment/${commentId}`)
    .then(() => {})
    .catch(() =>
      toast.error('Oh no! There was a problem fetching that comment.')
    );
};
