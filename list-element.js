const ListElement = ({
  title,
  description,
  imgSrc,
  shared,
  mark,
  index,
}) => {
  return (`<div class="character-element-container" data-index=${index}>
        <div class="character-element__title">${title}</div>
        <div class="character-element__image-container"><img src=${imgSrc} alt="portrait" /></div>
        <div class="line-clamp">${description}</div>
        <div class="bottom-bar">
            <div>Shared: ${shared}</div>
            <div>Mark: ${mark}</div>
        </div>
    </div>`)
};

export default ListElement;
