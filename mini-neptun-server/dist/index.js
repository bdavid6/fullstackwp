"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
//const PORT = process.env.PORT || 3000;
server_1.app.listen(3000, () => {
    console.log(`Server started on PORT: 3000}.`);
});
