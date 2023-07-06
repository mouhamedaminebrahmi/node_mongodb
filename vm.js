// JavaScript code below
var vm = require("vm");
var { Script } = require("vm");

/**
6 *
7 * @param {string} scriptContent
8 * @returns {Promise<string[]>}
9 */
const interceptLogCalls = async (scriptContent, timeout = 2000) => {
  let contextObj = {
    console: {
      log: (...args) => {
        console.log(...args);
      },
    },
  };

  const promise = new Promise((resolve, reject) => {
    const vmContext = vm.createContext(contextObj);
    const script = new Script(scriptContent);
    script.runInContext(vmContext);
    console.log(vmContext);
    if (script) {
      resolve(script);
    } else {
      reject(new Error("Whoops!"));
    }
  });
  return promise.then((res) => {
    console.log("*******");
    console.log(res);
    console.log("*******");
  });
};

const result = interceptLogCalls(
  `
    const a = 'hello';
    console.log(a, 'world')
    `,
  2000
);

console.log(result); // ['hello world']
