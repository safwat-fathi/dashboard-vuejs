export default {
  /* A fit-them-all commit */
  basic(state, payload) {
    state[payload.key] = payload.value;
  },

  /* Styles */
  styles(state, payload) {
    for (const key in payload) {
      if (["body", "html"].includes(key)) {
        continue;
      }

      state[`${key}Style`] = payload[key];
    }
  },

  /* User */
  user(state, payload) {
    const { name, email, avatar } = payload;

    if (payload.name) {
      state.user.name = name;
    }
    if (payload.email) {
      state.user.email = email;
    }
    if (payload.avatar) {
      state.user.avatar = avatar;
    }
  },
};
