const FrameIndicator = (props) => {
  const { value } = props;

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "2px 4px",
        width: "30px",
        textAlign: "center",
      }}
    >
      <span>{value}</span>
    </div>
  );
};

export default FrameIndicator;
