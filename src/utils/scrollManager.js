// utils/scrollManager.js
let scrollFn = null;

export const registerScrollFunction = (fn) => {
  scrollFn = fn;
};

export const triggerScroll = () => {
  if (scrollFn) scrollFn();
};
