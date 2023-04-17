const LeftSectionItem = ({ iconClass, topText, bottomText }) => {
  const containerDivStyle = {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    background: "#e1e2e3",
    minWidth: "150px",
  };
  const fontAwesomeStyle = {
    fontSize: "2rem",
    color: "#b01c00"
  };

  const textContainerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  };

  const topTextStyle = {
    fontWeight: "700",
    fontSize: "1rem",
  };
  return (
    <div style={containerDivStyle}>
      <i className={iconClass} style={fontAwesomeStyle}></i>
      <div style={textContainerStyle}>
        <span style={topTextStyle}>{topText}</span>
        <span>{bottomText}</span>
      </div>
    </div>
  );
};

export default LeftSectionItem;
