class ArtworkPiece extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        .artwork {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          overflow: hidden;
          transition: transform 0.2s;
          display: flex;
          flex-direction: column;
          height: 100%;
          cursor: pointer;
        }
        .artwork:hover {
          transform: translateY(-5px);
        }
        img {
          width: 100%;
          height: 250px; /* Fixed height */
          object-fit: cover; /* Crop image to fit */
        }
        .artwork-info {
          padding: 1rem;
          flex-grow: 1;
        }
        h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.2rem;
        }
        p {
          margin: 0;
          font-size: 0.9rem;
          color: #555;
        }
      </style>
      <div class="artwork">
        <img src="${this.getAttribute('img-src')}" alt="${this.getAttribute('title')}">
        <div class="artwork-info">
          <h3>${this.getAttribute('title')}</h3>
          <p>${this.getAttribute('description')}</p>
        </div>
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('artwork-piece', ArtworkPiece);

const gallery = document.getElementById('gallery');
const modal = document.getElementById('artwork-modal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.querySelector('.close');

const artworks = [
  {
    title: 'Starry Night',
    description: 'A famous oil painting by Vincent van Gogh.',
    imgSrc: 'https://picsum.photos/id/10/800/600',
    essay: 'This is an essay about Starry Night. The swirling clouds and vibrant stars create a sense of wonder and awe. Van Gogh painted this from his asylum room, and it reflects his turbulent emotions and his connection to the cosmos.',
    backgroundUrl: 'https://www.transparenttextures.com/patterns/concrete-wall.png'
  },
  {
    title: 'Mona Lisa',
    description: 'A half-length portrait painting by Leonardo da Vinci.',
    imgSrc: 'https://picsum.photos/id/20/800/600',
    essay: 'The Mona Lisa\'s enigmatic smile has captivated viewers for centuries. Leonardo da Vinci\'s masterful use of sfumato, a technique of subtle gradations of light and shadow, gives the painting its lifelike quality.',
    backgroundUrl: 'https://www.transparenttextures.com/patterns/old-wall.png'
  },
  {
    title: 'The Persistence of Memory',
    description: 'A 1931 painting by artist Salvador Dalí.',
    imgSrc: 'https://picsum.photos/id/30/800/600',
    essay: 'Dalí\'s melting clocks are a powerful symbol of the fluidity of time and the subconscious mind. The dreamlike landscape and bizarre imagery are hallmarks of Surrealism.',
    backgroundUrl: 'https://www.transparenttextures.com/patterns/wood-pattern.png'
  },
  {
    title: 'The Scream',
    description: 'A composition created by Norwegian artist Edvard Munch.',
    imgSrc: 'https://picsum.photos/id/40/800/600',
    essay: 'The Scream is an icon of existential angst. The swirling, blood-red sky and the figure\'s tormented expression convey a sense of overwhelming anxiety and despair.',
    backgroundUrl: 'https://www.transparenttextures.com/patterns/dark-denim.png'
  },
    {
    title: 'Girl with a Pearl Earring',
    description: 'An oil painting by Dutch Golden Age painter Johannes Vermeer.',
    imgSrc: 'https://picsum.photos/id/50/800/600',
    essay: 'Vermeer\'s use of light is extraordinary in this painting. The way the light catches the girl\'s pearl earring and her luminous eyes makes her seem both real and mysterious.',
    backgroundUrl: 'https://www.transparenttextures.com/patterns/elegant-grid.png'
  },
  {
    title: 'The Night Watch',
    description: 'An oil painting by Rembrandt van Rijn.',
    imgSrc: 'https://picsum.photos/id/60/800/600',
    essay: 'This is not just a group portrait; it\'s a dynamic scene full of action and drama. Rembrandt\'s use of chiaroscuro, the strong contrast between light and dark, creates a sense of movement and excitement.',
    backgroundUrl: 'https://www.transparenttextures.com/patterns/asfalt.png'
  }
];

artworks.forEach(art => {
  const artworkElement = document.createElement('artwork-piece');
  artworkElement.setAttribute('title', art.title);
  artworkElement.setAttribute('description', art.description);
  artworkElement.setAttribute('img-src', art.imgSrc);

  artworkElement.addEventListener('click', () => {
    openModal(art);
  });

  gallery.appendChild(artworkElement);
});

function openModal(art) {
  modalContent.innerHTML = `
    <div class="modal-background" style="background-image: url(${art.backgroundUrl});">
        <div class="modal-artwork-container">
            <img src="${art.imgSrc}" alt="${art.title}" class="modal-artwork-image">
        </div>
    </div>
    <div class="modal-essay">
        <h2>${art.title}</h2>
        <p>${art.essay}</p>
    </div>
  `;
  modal.style.display = 'block';
}

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});
