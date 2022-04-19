import fs from 'fs';

// Get a file parent path;
export const getParentPath = (filePath) => {
  const splits = filePath.split('\\');
  const parentPath = `${splits[0]}\\${splits[1]}\\${splits[2]}\\${splits[3]}`;
  return parentPath;
};

// Logs a message to the console once a file is updated;
export const logUpdate = (filePath) => {
  const colors = `\x1b[32m`;
  const reset = `\x1b[0m`;
  return console.log(`[${`\x1b[2m`}${new Date().toLocaleTimeString()}${`\x1b[0m`}] ${colors}File "${filePath}" updated.${reset}`);
};

// Logs a error message to the console;
export const logError = (err) => {
  const colors = `\x1b[31m`;
  const reset = `\x1b[0m`;
  return console.log(`[${`\x1b[2m`}${new Date().toLocaleTimeString()}${`\x1b[0m`}] ${colors}${err}${reset}`);
};

// Get '.BABELRC' config as JSON;
export const getBabelRC = () => JSON.parse( fs.readFileSync('.babelrc') );

// Check if '--production' flag is present on the current process;
export const isProduction = () => Boolean( ~process.argv.indexOf('--production') );