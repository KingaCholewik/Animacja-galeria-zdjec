import './sass/style.scss';

document.addEventListener('DOMContentLoaded', () => {
  const imagesContainerEl = document.querySelector('.slider__images-container');
  const img1El = document.querySelector('img.first');
  const img2El = document.querySelector('img.second');

  let dragging = false;
  let imagesContainerLeftOffset;

  let imagesContainerWidth;

  const img1ContainerEl = document.querySelector(
    '.slider__image-container--first'
  );
  const img2ContainerEl = document.querySelector(
    '.slider__image-container--second'
  );
  const handleEl = document.querySelector('.slider__handle');
  const dividerEl = document.querySelector('.slider__divider');

  const getOffset = (clientX) => {
    const offset = clientX - imagesContainerLeftOffset;
    if (offset < 0) {
      return 0;
    } else if (offset > imagesContainerWidth) {
      return imagesContainerWidth;
    } else {
      return offset;
    }
  };

  const move = (clientX) => {
    const offset = getOffset(clientX);
    const percent = (offset / imagesContainerWidth) * 100;
    dividerEl.style.left = `${percent}%`;
    img2ContainerEl.style.width = `${percent}%`;
  };

  const initEvents = () => {
    handleEl.addEventListener('mousedown', () => {
      dragging = true;
    });
    handleEl.addEventListener('mouseup', (event) => {
      dragging = false;
    });
    handleEl.addEventListener('touchstart', () => {
      dragging = true;
    });
    handleEl.addEventListener('touchend', (event) => {
      dragging = false;
    });
    window.addEventListener('mousemove', (event) => {
      if (dragging) {
        move(event.clientX);
      }
    });
    window.addEventListener('touchmove', (event) => {
      if (dragging) {
        move(event.touches[0].clientX);
      }
    });
  };

  const adjustImagesSize = () => {
    imagesContainerWidth = imagesContainerEl.offsetWidth;
    imagesContainerLeftOffset = imagesContainerEl.offsetLeft;
    img1El.style.width = imagesContainerWidth + 'px';
    img2El.style.width = imagesContainerWidth + 'px';
  };

  window.addEventListener('resize', adjustImagesSize);
  adjustImagesSize();
  initEvents();
});
