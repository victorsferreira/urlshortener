function waitOn(miliseconds) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve();
      }, miliseconds);
    } catch (e) {
      reject(e); I
    }
  });
}

module.exports = {
  waitOn
};