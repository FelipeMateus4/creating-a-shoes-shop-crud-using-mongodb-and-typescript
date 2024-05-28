"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
server_1.app.listen(server_1.PORT, () => {
    console.log(`Server running at http://localhost:${server_1.PORT}`);
});
