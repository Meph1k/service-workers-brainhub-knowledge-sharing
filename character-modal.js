const Trait = ({
  name,
  value,
}) => (`<div class="trait-container">
  <div class="trait-name">${name}</div>
  <div class="trait-value">${value}</div>
</div>`);

const CharacterModal = ({
  title,
  description,
  imgSrc,
  shared,
  mark,
  traits = [],
  onClickGenerate,
  onClickOutside,
}) => {
  let mappedTraits = '';
  traits.forEach(trait => {
    mappedTraits += Trait(trait);
  });

  setTimeout(() => {
    if (document.getElementsByClassName('generate-button')[0]) {
      document.getElementsByClassName('generate-button')[0].addEventListener('click', onClickGenerate);
    }
    const specifiedElement = document.getElementsByClassName('character-modal-container')[0];
    const specifiedElement2 = document.getElementById('characters-list');
    document.addEventListener('click', (event) => {
      const isClickInside = specifiedElement.contains(event.target) && !specifiedElement2.contains(event.target);
      if (!isClickInside) {
        onClickOutside();
      }
    });
  });

  return (`<div class="modal-container">
      <div class="character-modal-container">
        <div class="character-modal__title">${title}</div>
        <div class="character-modal__image-container"><img src=${imgSrc} alt="portrait" /></div>
        <div class="line-clamp">${description}</div>
        ${mappedTraits}
        <button class="generate-button">Generate</button>
        <div class="bottom-bar">
            <div>Shared: ${shared}</div>
            <div>Mark: ${mark}</div>
        </div>
    </div>
</div>`)
};

export default CharacterModal;
