function fitCanvas( stage ) {
  var backgroundEl = document.querySelector('.Background');
  var contentEl = document.querySelector('.Page__Content');

  var backgroundElWidth = backgroundEl.offsetWidth;

  // Resize stage
  stage.width( backgroundElWidth );
  stage.height(window.innerHeight);

  // Move canvas container to new position.
  backgroundEl.style.left = contentEl.getBoundingClientRect().left + contentEl.clientWidth + "px";
  // stage.scale({ x: scale, y: scale });
}

export default fitCanvas