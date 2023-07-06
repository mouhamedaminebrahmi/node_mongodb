function promisify(callbackFunction) {
  return (parameter) => {
    return new Promise((resolve, reject) => {
      callbackFunction(parameter, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  };
}
