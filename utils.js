import lineClamp from 'line-clamp';

export const getCutText = () => {
  const elements = document.getElementsByClassName('line-clamp');
  for (let i = 0; i < elements.length; i++) {
    lineClamp(elements[i], 5)
  }
};
