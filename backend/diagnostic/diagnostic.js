// Seeing if Python imports work properly
const { spawn } = require("child_process");
const path = require("path");

const testVenvImport = () => {
  console.log("Running diagnostic script...");
  const diagnosticScriptPath = path.join(__dirname, "hello.py");
  const childPython = spawn("python", [diagnosticScriptPath]);

  childPython.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });
  childPython.stdout.on("err", (data) => {
    console.log(`stderr: ${data}`);
  });
  childPython.stdout.on("close", (code) => {
    console.log(`diagnostic script exited with code ${code}`);
  });
};

module.exports = { testVenvImport };
