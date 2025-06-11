import React, { useState } from "react";

const MyImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) => {
  const [error, setError] = useState(false);

  return (
    <img
      src={error ? "/images/placeholder_image.png" : src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
};

export default MyImage;
