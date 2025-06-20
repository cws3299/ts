interface Props {
  src: string;
}

const CardImage = ({ src }: Props) => {
  return (
    <img
      src={src}
      style={{
        width: "100%",
        aspectRatio: "1",
        objectFit: "cover",
        borderRadius: 8,
        display: "block",
      }}
    />
  );
};

export default CardImage;
