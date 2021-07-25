const baikal =  new URL('.././src/baikal.jpg', import.meta.url);
const elbrus1 = new URL('.././src/elements-elbrus1.jpg', import.meta.url);
const dombai1 = new URL('.././src/elements-dombai1.jpg', import.meta.url);
const elbrus2 = new URL('.././src/elements-elbrus2.jpg', import.meta.url);
const dombai2 = new URL('.././src/elements-dombai2.jpg', import.meta.url);
const karachaevo = new URL('.././src/elements-karachaevo.jpg', import.meta.url);

export const initialCards = [
  {
    name: 'Карачаевск',
    link: baikal
  },
  {
    name: 'Эльбрус',
    link: elbrus1
  },
  {
    name: 'Домбай',
    link: dombai1
  },
  {
    name: 'Эльбрус',
    link: elbrus2
  },
  {
    name: 'Домбай',
    link: dombai2
  },
  {
    name: 'Карачаево-Черкесия',
    link: karachaevo
  }
];
