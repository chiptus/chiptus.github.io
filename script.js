// const inputs = Array.from(document.querySelectorAll('input'));

const spotlightContainer = document.querySelector('.spotlight-container');
const menuButtons = document.querySelectorAll('.menu ul li');

const inputNameToCssVar = {
  sourceWidth: '--spotlight-source-width',
  width: '--spotlight-width',
  sourcex: '--spotlight-sourcex',
  sourcey: '--spotlight-sourcey',
};

menuButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const sourceWidth = btn.clientWidth;
    const centerTop = btn.offsetTop + btn.clientHeight;
    const centerLeft = btn.offsetLeft;
    const sourceY = (centerTop / spotlightContainer.clientHeight) * 100;
    const leftTriangleWidth =
      (centerLeft / spotlightContainer.clientWidth) * 100;
    // console.log({ width, centerTop, centerLeft });
    setSpotlight({ sourceWidth, sourceY, leftTriangleWidth });
  });
});

function setSpotlight({ sourceWidth, sourceY, leftTriangleWidth }) {
  // console.log({ width, sourceX, sourceY });
  spotlightContainer.style.setProperty(
    inputNameToCssVar.sourceWidth,
    sourceWidth + 'px'
  );
  spotlightContainer.style.setProperty(
    '--spotlight-left-triangle-width',
    leftTriangleWidth + 'vw'
  );
  spotlightContainer.style.setProperty(
    inputNameToCssVar.sourcey,
    `${sourceY}vh`
  );
}
