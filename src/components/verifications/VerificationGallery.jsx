import { useEffect, useState } from "react";
import SafeImage from "../ui/SafeImage";

export default function VerificationGallery({ images, chargerName }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => setActiveIndex(0), [images]);

  if (!images.length) {
    return (
      <section className="panel" aria-labelledby="gallery-title">
        <h2 id="gallery-title" className="panel__title">Photos</h2>
        <SafeImage src={null} alt={`${chargerName} photo`} className="gallery__main" />
        <p className="muted">The submitter didn't upload any photos.</p>
      </section>
    );
  }

  const active = images[Math.min(activeIndex, images.length - 1)];

  return (
    <section className="panel" aria-labelledby="gallery-title">
      <h2 id="gallery-title" className="panel__title">
        Photos <span className="muted">({images.length})</span>
      </h2>
      <a href={active.url} target="_blank" rel="noreferrer" className="gallery__open" title="Open full size">
        <SafeImage key={active.id} src={active.url} alt={`${chargerName} photo ${activeIndex + 1}`} className="gallery__main" />
      </a>

      {images.length > 1 && (
        <ul className="gallery__thumbs">
          {images.map((image, index) => (
            <li key={image.id}>
              <button
                type="button"
                className={`gallery__thumb ${index === activeIndex ? "is-active" : ""}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show photo ${index + 1}`}
                aria-current={index === activeIndex}
              >
                <SafeImage src={image.url} alt="" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
