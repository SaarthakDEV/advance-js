const { Readable } = require("stream");

const arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

class ReadableStream extends Readable {
  constructor(array) {
    super({ encoding: "utf-8" });
    this.array = array;
    this.index = 0;
  }

  _read() {
    if (this.index <= this.array.length) {
      const chunk = this.array[this.index];

      // Proper way to emit error
      // this.destroy(new Error("Error incoming"));

      this.push(chunk);
      this.index += 1;
    } else {
      // Signal end of stream
      this.push(null);
    }
  }
}

const nameStream = new ReadableStream(arr);

nameStream.on("data", (chunks) => {
  console.log(chunks);
});
nameStream.on("end", () => {
  console.log("chunks ended");
});

nameStream.on("error", (err) => {
  console.log("Handled");
  console.log(err);
});
