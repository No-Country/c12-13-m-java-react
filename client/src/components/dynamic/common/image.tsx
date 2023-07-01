import ImageNext from "next/image";

type ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  layout?: "fixed" | "intrinsic" | "responsive" | "fill" | undefined;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down" | undefined;
  containerClassName?: string;
};

export default function Image({
  src,
  alt,
  width,
  height,
  className,
  layout,
  objectFit,
  containerClassName,
}: ImageProps) {
  return (
    <div className={`image-container ${containerClassName}`}>
      <ImageNext
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        layout={layout}
        objectFit={objectFit}
      />
    </div>
  );
}
