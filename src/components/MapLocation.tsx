export function MapLocation({ src }: { src: string }) {
  return (
    <iframe
      className="h-full"
      src={src}
      width="100%"
      height="500"
      loading="lazy"
      style={{ border: 0 }}
      aria-hidden="false"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
