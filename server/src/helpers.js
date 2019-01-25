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

function checkUrl(input) {
  const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;
  return !!input.match(pattern);
}

module.exports = {
  waitOn,
  checkUrl
};