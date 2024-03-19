const { server_boot } = require("./app");
const { socket_boot } = require("./socket");
const { admin_boot } = require("./admin/admin");
server_boot();
admin_boot();
socket_boot();

console.log(`server on ${new Date().toString()} port 3000`);
console.log(`server on ${new Date().toString()} port 3001`);
console.log(`server on ${new Date().toString()} port 3002`);
