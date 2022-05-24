document.getElementById("togglebutton").addEventListener("click", () => {
  console.log("Button clicked");
  let bodyTag = document.getElementById("rtlwrapper");

  if (!bodyTag.dir) {
    bodyTag.dir = "RTL";
  } else {
    bodyTag.dir = "";
  }
});
