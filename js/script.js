"use strict";
// note: coordinated of moving elems are not useful, so here we don't need coords of the ball

// note that we are working with document-relative coordinates => absolute not fixed
const field = document.getElementById("field");
const ball = document.getElementById("ball");

let fieldStyles = getComputedStyle(field);

let fieldCoords = field.getBoundingClientRect();
// document-relative coords
fieldCoords = {
  ...fieldCoords,
  top: fieldCoords.top + window.scrollY,
  left: fieldCoords.left + window.scrollX,
  bottom: fieldCoords.bottom + window.scrollY,
  right: fieldCoords.right + window.scrollX,
};
// the changing properties are top/left css props, let's animate them
// they must have initial values to be animated
ball.style.left =
  fieldCoords.left + parseInt(fieldStyles.borderLeftWidth) + "px";
ball.style.top = fieldCoords.top + parseInt(fieldStyles.borderTopWidth) + "px";

field.addEventListener("click", function (event) {
  ball.style.left = event.pageX - ball.offsetWidth / 2 + "px";
  ball.style.top = event.pageY - ball.offsetHeight / 2 + "px";
  if (event.pageX + ball.offsetWidth > fieldCoords.right) {
    ball.style.left =
      fieldCoords.right -
      ball.offsetWidth -
      parseInt(fieldStyles.borderRightWidth) +
      "px";
  }
  if (event.pageX < fieldCoords.left + parseInt(fieldStyles.borderLeftWidth)) {
    ball.style.left =
      fieldCoords.left + parseInt(fieldStyles.borderLeftWidth) + "px";
  }
  if (event.pageY + ball.offsetHeight > fieldCoords.bottom) {
    ball.style.top =
      fieldCoords.bottom -
      ball.offsetHeight -
      parseInt(fieldStyles.borderBottomWidth) +
      "px";
  }
  if (
    event.pageY <
    fieldCoords.top +
      parseInt(fieldStyles.borderTopWidth) +
      ball.offsetHeight / 2
  ) {
    ball.style.top =
      fieldCoords.top + parseInt(fieldStyles.borderTopWidth) + "px";
    console.log("ok");
  }
});
