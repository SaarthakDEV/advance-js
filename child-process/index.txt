import cp from "child_process";
import { stderr, stdout } from "process";
import fs from "fs";

// Spawn
const prog = {
  list: "ls",
  copy: "cp",
  folder: "mkdir",
};

const child = cp.spawn(prog.list, ["new"]);
child.stdout.on("data", (data) => {
  console.log(data.toString());
});
child.stderr.on("data", (err) => {
  console.log("Error encountered", err.toString());
});
child.on("error", (err) => {
  console.error("Child process cannot created");
});

const child2 = cp.spawn(prog.copy, ["child-process.js", "index.txt"]);
child2.on("exit", () => console.log("Completed process"));

const child7 = cp.spawn("ls", ["-a"], { stdio: "pipe"})
// child7.stdout.on("data", (data) => console.log)

const out = fs.openSync("./logs/out.txt", "a")
const err = fs.openSync("./logs/err.txt", "a")
const child8 = cp.spawn("node", ["./child-detach.js", "john doe"], { detached: true, stdio: ["ignore", out, err]})
child8.unref();

// Exec
const prog1 = {
  list: "ls",
  remove: "rm",
};
const child3 = cp.exec(prog1.remove + " -r css", (error, stdout) => {
  if (error) console.log(error);
  console.log("buffer: ", stdout);
});
const child4 = cp.exec(prog1.list, { cwd: ".."}, (error, stdout) => {
    if(error){
        console.log(error)
    }
    console.log("stdout: ", stdout)
})

// execFile()
const child5 = cp.execFile("ls", ["-a", "-l"], { cwd: ".."}, (error, stdout, stderr) => {
    if(error){
        console.log(error)
    }
    console.log("stdout: ", stdout)
})

// fork()
// const names = ["jack", "john", "james"]
// const child6 = cp.fork("fork-file.js", names);

// child6.on("message", (data) => {
//     console.log("Received from parent", data)
// })

// const intervalID = setInterval(() => {
//     child6.send({
//         name: "John doe",
//         age: 30,
//         city: "Alaska"
//     })
// }, [1000])

// setTimeout(() => {
//     clearInterval(intervalID);
//     child6.kill();
// }, 5000)


// child6.on("exit", () => {
//     console.log("Hey world")
// })