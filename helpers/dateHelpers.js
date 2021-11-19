const convertTimeForFormat = () => (
  new Date().toISOString().toLocaleLowerCase().split('t')[0]
);

module.exports = {
  convertTimeForFormat,
};
