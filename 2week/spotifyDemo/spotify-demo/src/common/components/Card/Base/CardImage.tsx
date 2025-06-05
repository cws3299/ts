interface Props {
  src: string;
}

const CardImage = ({ src }: Props) => {
  return <img src={src} style={{ width: "100%", borderRadius: 8 }} />;
};

export default CardImage;
