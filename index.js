const { server_boot } = require("./app");

const { admin_boot } = require("./admin");
server_boot();
admin_boot();

console.log(`server on ${new Date().toString()} port 3000`);
console.log(`server on ${new Date().toString()} port 3001`);
