const fs = require("fs");
const path = require("path");

const inputDirs = ["../src/questions", "../src/explores"];
const singleFile = "./prepare.ts";
const outputFile = "./output.ts";

// Function to read and process a file
const processFile = (filePath) => {
  try {
    let content = fs.readFileSync(filePath, "utf-8");
    // Remove 'export ' and 'import ...' lines
    content = content.replace(/\bexport\s+/g, "");
    content = content.replace(/^import .*$/gm, "");
    return content;
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
    return "";
  }
};

// Main function to combine files
const combineFiles = () => {
  let combinedContent = "";

  // Process the single prepare.ts file
  const prepareFilePath = path.resolve(__dirname, singleFile);
  if (fs.existsSync(prepareFilePath)) {
    combinedContent += processFile(prepareFilePath) + "\n";
  } else {
    console.warn(`File not found: ${prepareFilePath}`);
  }

  // Process files from input directories
  inputDirs.forEach((dir) => {
    const fullDirPath = path.resolve(__dirname, dir);
    if (fs.existsSync(fullDirPath)) {
      const files = fs.readdirSync(fullDirPath);
      files.forEach((file) => {
        if (file.endsWith(".ts")) {
          const filePath = path.join(fullDirPath, file);
          combinedContent += processFile(filePath) + "\n";
        }
      });
    } else {
      console.warn(`Directory not found: ${fullDirPath}`);
    }
  });

  // Remove multiple consecutive empty lines
  combinedContent = combinedContent.replace(/(\r?\n){3,}/g, "\n\n");
  // Remove empty lines at the beginning of the output
  combinedContent = combinedContent.replace(/^(\r?\n)+/, "");

  // Write combined content to output file
  fs.writeFileSync(
    path.resolve(__dirname, outputFile),
    combinedContent,
    "utf-8"
  );
};

combineFiles();
