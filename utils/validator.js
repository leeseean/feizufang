module.exports = {
  validateEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  },
  validateUsername(v) {
    return /^[a-zA-Z0-9_]{3,20}$/.test(v);
  },
  validatePassword(v) {
    return /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/.test(v);
  },
};
