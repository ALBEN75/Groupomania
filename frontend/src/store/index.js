import { createStore } from 'vuex'

const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/auth'
});

let user = localStorage.getItem('user');
if (!user) {
 user = {
    userId: -1,
    token: '',
  }; 
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    };
  }
}

let post = localStorage.getItem('post');

const store = createStore({
  state: {
    status: '',
    user: user,
    users: {
      username:'',
      lastname: '',
      firstname: '',
      job: '',
      email:''
    },
    post: post,
    posts: {
      content: '',
      file:''
    },
    /*comment: comment,*/
    comments: {
      contentComment: '',
      fileComment: ''
    }
  },
  getters: {
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    loginUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = user.token;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    users: function (state, users) {
      state.users = users;
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    posts: function (state, posts) {
      state.posts = posts;
    },
    comments: function (state, comments) {
      state.comments = comments;
    }
  },
  actions: {
    signupAccount: ({commit}, users) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/signup', users)
        .then(function (response) {
          commit('setStatus', '');
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_signup');
          reject(error);
        });
      });
    },
    loginAccount: ({commit}, users) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/login', users)
        .then(function (response) {
          commit('setStatus', '');
          commit('loginUser', response.data);
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_login');
          reject(error);
        });
      });
    },
  }
})

export default store;
