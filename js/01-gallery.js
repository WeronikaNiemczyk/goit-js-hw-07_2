import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);
const galleryPlace = document.querySelector(".gallery");

const gallery = galleryItems
  .map(
    (item) =>
      `<div class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          data-source="${item.original}"
          alt="${item.description}"
        />
      </a>
    </div>`
  )
  .join("");

galleryPlace.innerHTML = gallery;
// console.log(gallery);

galleryPlace.addEventListener("click", (event) => {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) return;

  const source = event.target.dataset.source;
  // console.log(source);
  // console.log(event);
  // console.log("Event target" + event.target);

  const instance = basicLightbox.create(
    `
        <img src="${source}" width="800" height="600">
    `,
    {
      onShow: () => {
        galleryPlace.addEventListener("keydown", onEsc);
      },
      onClose: () => {
        galleryPlace.removeEventListener("keydown", onEsc);
      },
    }
  );
  const onEsc = (event) => {
    if (event.key !== "Escape") {
      return;
    } else {
      instance.close();
      console.log(event.key);
    }
  };
  instance.show();
});
