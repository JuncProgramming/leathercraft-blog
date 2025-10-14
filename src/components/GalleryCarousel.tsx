const GalleryCarousel = ({ images, projectTitle }: { images: string[], projectTitle: string }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Gallery</h2>
        <span className="text-sm font-medium text-stone-400 tracking-wide">
          {images.length} {images.length === 1 ? 'image' : 'images'}
        </span>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="break-inside-avoid mb-4">
            <img
              src={image}
              alt={`${projectTitle} - Image ${index + 1}`}
              className="w-full rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryCarousel