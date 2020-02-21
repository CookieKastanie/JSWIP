class ArrayPacketFormat {
    constructor(id) {
        this.id = id;
        this.buffer = new Uint8Array(ArrayPacketFormat.MAXSIZE);
        this.clear();
    }

    clear() {
        this.count = 0;
    }
}

ArrayPacketFormat.MAXSIZE = 32768;
