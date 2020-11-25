const makeLinkClickable = (text) => {
  text = text.replace(
    /(https:\/\/[^\s]+)/g,
    "<a style='color: #3c00ff' target='_blank' href='$1'>$1</a>"
  );
  return text;
};

module.exports = {
    makeLinkClickable
}