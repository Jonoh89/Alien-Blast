export default callback => (button, pointer, isOver) => {
  if (isOver) {
    callback(button, pointer, isOver);
    button.scale.set(1);
  }
};
