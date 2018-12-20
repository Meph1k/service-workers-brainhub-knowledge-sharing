import CharacterModal from './character-modal';
import { getCutText } from './utils';

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const getRandomTitle = () => {
  const titles = ['Ravaged Snow', 'The Seventh Mist', 'Gate of Angel', 'The Night\'s Name', 'The Voyages of the Danger', 'Flowers in the Night'];
  const randomIndex = getRandomArbitrary(0, 6);

  return titles[randomIndex];
};

const getRandomDescription = () => {
  const descriptions = [`Chestnut, oily hair is pulled back to reveal a thin, radiant face. Beady hazel eyes, set concealed within their sockets, watch thoughtfully over the tribes they've been seperated from for so long.
A large beard gracefully compliments his nose and mouth and leaves a beautiful memory of his adventurous love life.

This is the face of Isaac Chilson, a true romanticist among vampires. He stands small among others, despite his athletic frame.

There's something wonderful about him, perhaps it's his gentleness or perhaps it's simply a feeling of coldness. But nonetheless, people tend to stay on his good side, while wishing they were more like him.`,
  `Green, long hair tight in a ponytail reveals a chiseled, wild face. Dead green eyes, set well within their sockets, watch devotedly over the mountains they've befriended for so long.
A scar stretching from the bottom of the right cheek , running towards his upper lip and ending under his left eye leaves an amusing memory of true friendship.

This is the face of Alluin Moonfall, a true genius among night elves. He stands towering above others, despite his brawny frame.

There's something curious about him, perhaps it's a feeling of shame or perhaps it's simply a feeling of indifference. But nonetheless, people tend to share local gossip with him, while trying to please him.`,
  `Blue, perfectly groomed hair neatly coiffured to reveal a bony, anguished face. Smart red eyes, set a-symmetrically within their sockets, watch delightedly over the castle they've sought solace in for so long.
A tattoo of an eagle claw is almost hidden just below her left eye and leaves an aching memory of liberated love.

The is the face of Nafareath Moonwalker, a true vindicator among elves. She stands average among others, despite her skinny frame.

There's something inexplicable about her, perhaps it's a feeling of delight or perhaps it's simply her gentleness. But nonetheless, people tend to ask her to tell stories, while trying to avoid her.`,
  `Blonde, layered hair is pulled back to reveal a strong, radiant face. Glistening silver eyes, set handsomely within their sockets, watch vigorously over the sea they've kept safe for so long.
A tattoo of a small cross is prominently featured on the left side of her neck and leaves a gracious memory of a new life.

The is the face of Nafareath Dawnfury, a true spectacle among elves. She stands high among others, despite her light frame.

There's something charming about her, perhaps it's her disposition or perhaps it's simply her odd friends. But nonetheless, people tend to ask her about her adventures, while secretly training to become more like her.
`, `Light green, shoulder-length hair neatly coiffured to reveal a round, worried face. Dancing sapphire eyes, set elegantly within their sockets, watch gratefully over the river they've sworn to protect for so long.
A gunshot left a mark stretching from the top of the left cheek , running towards the other eye and ending on her left cheekbone and leaves an aching burden of return to home.

The is the face of Yneasia Stagrunner, a true angel among night elves. She stands awkwardly among others, despite her thin frame.

There's something different about her, perhaps it's her suffering or perhaps it's simply her sympathy. But nonetheless, people tend to welcome her with open arms, while thinking of ways to become her friend.`,
  `Brown, dreadlocks is pulled back to reveal a long, warm face. Narrow amber eyes, set rooted within their sockets, watch delicately over the rivers they've rarely felt at home at for so long.
A beard charmingly compliments his eyes and hair and leaves a heartbreaking memory of his fortunate adventures.

This is the face of Cade Falkner, a true friend among dwarves. He stands gracefully among others, despite his sturdy frame.

There's something appealing about him, perhaps it's his personality or perhaps it's simply his humility. But nonetheless, people tend to keep their distance, while trying to subtly look more like him.`,
  `Silver, wavy hair braided to reveal a fine, cheerful face. Beady aquamarine eyes, set appealingly within their sockets, watch wearily over the lands they've befriended for so long.
Fallen debry left a mark stretching from just under the right eye , running across the nose and ending on her right cheekbone and leaves an aching burden of her fortunate destiny.

The is the face of Lelarea Lunadancer, a true spectacle among elves. She stands average among others, despite her slim frame.

There's something alluring about her, perhaps it's her friendly demeanor or perhaps it's simply her gentleness. But nonetheless, people tend to ask her about her latest victory, while trying to hide from her.
`];

  const randomIndex = getRandomArbitrary(0, 7);

  return descriptions[randomIndex];
};

const getRandomPortrait = () => {
  const portraits = ['https://i.pinimg.com/originals/cf/61/d5/cf61d563013cf829deb56e10b32e681b.jpg', 'https://i.pinimg.com/236x/81/71/8b/81718bce7ad49b589d508b6d197214d6--paint-tool-sai-character-art.jpg', 'http://3.bp.blogspot.com/-BeEO51brzj8/TnFCwxq42kI/AAAAAAAAAnc/KLjra5HxWOU/s1600/warrior_female.jpg', 'https://i.pinimg.com/236x/b1/bc/3a/b1bc3a51d2d417b2b705c48a93a9156c.jpg', 'https://vignette.wikia.nocookie.net/moon-guard/images/d/d3/A7c7259ef6050e967a93aa799d2d685d--fantasy-male-digital-portrait.jpg/revision/latest?cb=20171224092829', 'http://strefarpg.net/uploads/monthly_2018_01/3e176c52813aac48a4ad8e3b4b612c2a--fantasy-rpg-character-portraits.jpg.f6e3ac45eb067aeee527a515dacd2a43.jpg']

  const randomIndex = getRandomArbitrary(0, 6);

  return portraits[randomIndex];
}

const listElementsData = [];

for (let i = 0; i < 100; i++) {
  listElementsData.push({
    index: 0,
    title: getRandomTitle(),
    description: getRandomDescription(),
    imgSrc: getRandomPortrait(),
    shared: getRandomArbitrary(0, 10000),
    mark: getRandomArbitrary(0, 5),
    openModal: () => {
      document.getElementById('modal').innerHTML = CharacterModal(listElementsData[i]);
      getCutText();
    },
    onClickOutside: () => {
      document.getElementById('modal').innerHTML = '';
    },
    traits: [{
      name: 'strength',
      value: getRandomArbitrary(8, 19),
    }, {
      name: 'stamina',
      value: getRandomArbitrary(8, 19),
    }, {
      name: 'agility',
      value: getRandomArbitrary(8, 19),
    }, {
      name: 'intelligence',
      value: getRandomArbitrary(8, 19),
    }, {
      name: 'wisdom',
      value: getRandomArbitrary(8, 19),
    }, {
      name: 'charisma',
      value: getRandomArbitrary(8, 19),
    }],
    onClickGenerate: () => {
      listElementsData[i].traits = listElementsData[i].traits.map(item => ({
        ...item,
        value: getRandomArbitrary(8, 19),
      }))
    }
  });
}

export default listElementsData;
