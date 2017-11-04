// TODO remove when fixed in react
global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};
