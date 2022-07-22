const isBlocked = (user) => {
  if (user?.isBlocked) {
    throw new Error("Access denied, You are Blocked");
  }
};

module.exports = isBlocked;
