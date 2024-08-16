var colorHistory = [];

const getcolor = () => {
  const randomnumber = Math.floor(Math.random() * 16777215);
  const hexnumber = "#" + randomnumber.toString(16);
  console.log(hexnumber);
  document.body.style.backgroundColor = hexnumber;

  // Convert HEX to RGB
  const rgb = hexToRgb(hexnumber);
  const hsl = rgbToHsl(...rgb);

  document.getElementById(
    "colorcode"
  ).innerText = `HEX: ${hexnumber}, \nRGB: ${rgb.join(", ")},\n HSL: ${hsl.join(
    ", "
  )}`;

  navigator.clipboard.writeText(hexnumber);

  // Add color to history
  colorHistory.push({ hex: hexnumber, rgb: rgb, hsl: hsl });
};



// Function to convert HEX to RGB
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
}

// Function to convert RGB to HSL
// Function to convert RGB to HSL
function rgbToHsl(r, g, b) {
  (r /= 255), (g /= 255), (b /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h.toFixed(2), s.toFixed(2), l.toFixed(2)];
}

document.getElementById("btn").addEventListener("click", getcolor);

// init call
getcolor();

document.getElementById("paletteIcon").addEventListener("click", function () {
  document.getElementById("colorInput").click();
});

document.getElementById("colorInput").addEventListener("input", function () {
  const hexColor = this.value;
  document.body.style.backgroundColor = hexColor;
  const rgb = hexToRgb(hexColor);
  const hsl = rgbToHsl(...rgb);
  const colorCode = `HEX: ${hexColor}, RGB: ${rgb.join(", ")}, HSL: ${hsl.join(
    ", "
  )}`;
  document.getElementById("colorcode").innerText = colorCode;

  // Add color to history
  colorHistory.push({ hex: hexColor, rgb: rgb, hsl: hsl });
});

document.getElementById("historyIcon").addEventListener("click", function () {
  // Clear history body
  document.getElementById("historyBody").innerHTML = "";

  // Add each color in history to the modal body
  colorHistory.forEach(function (color) {
    var colorElement = document.createElement("div");
    colorElement.style.backgroundColor = color.hex;
    colorElement.innerText = `HEX: ${color.hex}, RGB: ${color.rgb.join(
      ", "
    )}, HSL: ${color.hsl.join(", ")}`;
    document.getElementById("historyBody").appendChild(colorElement);
  });

  // Open the modal
  var historyModal = new bootstrap.Modal(
    document.getElementById("historyModal")
  );
  historyModal.show();
});

document.getElementById("clipboardIcon").addEventListener("click", function () {
  // Get the color codes
  const colorCode = document.getElementById("colorcode").innerText;

  // Copy color codes to clipboard
  navigator.clipboard.writeText(colorCode).then(
    function () {
      // Success feedback
      alert("Copied to clipboard");
    },
    function () {
      // Error feedback
      alert("Failed to copy text");
    }
  );
});

document.getElementById("editIcon").addEventListener("click", function () {
  // Get the color codes
  const colorCode = document.getElementById("colorcode").innerText;

  // Prompt the user to edit the color codes
  const newColorCode = prompt("Edit the color codes:", colorCode);

  if (newColorCode) {
    // Update the color codes and background color
    document.getElementById("colorcode").innerText = newColorCode;
    document.body.style.backgroundColor = newColorCode
      .split(", ")[0]
      .split(": ")[1];
  }
});
