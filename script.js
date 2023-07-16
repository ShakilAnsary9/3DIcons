const iconPackages = [
  "3d",
  "3d-coin",
  "at",
  "axe",
  "back",
  "backward",
  "bag",
  "battery",
  "bell",
  "blender",
  "bookmark",
  "bookmark-fav",
  "boy",
  "brush",
  "bucket",
  "bulb",
  "calculator",
  "phone-end",
];

const commonIcons = [
  "dynamic-clay.png",
  "dynamic-color.png",
  "dynamic-gradient.png",
  "dynamic-premium.png",
];

const commonIconsMap = new Map();
for (const packageName of iconPackages) {
  commonIconsMap.set(
    packageName,
    commonIcons.map((iconName) => `${packageName}-${iconName}`)
  );
}

function generateIconHTML(packageName, iconName) {
  const altName = iconName.replace(".png", "");
  return `
      <div class="col-6 col-md-3">
        <div class="icon-clay">
          <img src="./images/${packageName}/${iconName}" alt="${altName}" loading="lazy" />
          <div class="icon-down-btn">
            <a href="./images/${packageName}/${iconName}" download="">
              <i class="fi fi-sr-folder-download"></i>
            </a>
          </div>
        </div>
      </div>
    `;
}

// Function to generate the HTML for an icon package
function generateIconPackageHTML(packageName) {
  const iconsHTML = commonIconsMap
    .get(packageName)
    .map((iconName) => generateIconHTML(packageName, iconName))
    .join("");

  return `
      <div class="icon-box">
        <div class="row">
          ${iconsHTML}
          <div class="icon-package d-flex justify-content-between mt-3 mb-2">
            <div class="icon-package-title">${packageName}</div>
            <div class="icon-package-download">
              <a href="./images/${packageName}/${packageName}.zip" download="">
                Download Icon Pack
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
}

// Function to generate the full HTML content with all icon packages
function generateDynamicContent() {
  let dynamicContentColumn1 = "";
  let dynamicContentColumn2 = "";

  // Divide the icon packages evenly between the two columns
  const halfPackagesLength = Math.ceil(iconPackages.length / 2);
  for (let i = 0; i < iconPackages.length; i++) {
    const packageName = iconPackages[i];
    const iconPackageHTML = generateIconPackageHTML(packageName);

    if (i < halfPackagesLength) {
      dynamicContentColumn1 += iconPackageHTML;
    } else {
      dynamicContentColumn2 += iconPackageHTML;
    }
  }

  return { column1: dynamicContentColumn1, column2: dynamicContentColumn2 };
}

// Get the container elements for both columns
const column1 = document.querySelector(
  "#dynamic-icon-boxes > .col-md-6:first-child"
);
const column2 = document.querySelector(
  "#dynamic-icon-boxes > .col-md-6:last-child"
);

// Generate the dynamic content for both columns and add it to the respective containers
const dynamicContent = generateDynamicContent();
column1.innerHTML = dynamicContent.column1;
column2.innerHTML = dynamicContent.column2;
