// components/Card/Base/CardImage.tsx

interface Props {
  src: string;
}

const CardImage = ({ src }: Props) => {
  return (
    <img
      src={src}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: 8,
      }}
    />
  );
};

export default CardImage;
