const fs = require("fs");
const path = require("path");
const gulp = require("gulp");
const vsftp = require("gulp-vsftp");
const zip = require("gulp-zip");
const moment = require("moment-kirk");
const packageInfo = require("./package.json");

const proDirectory = "dist";

// npm i -D gulp@3.9.1 gulp-vsftp@0.7.8 gulp-zip@4.1.0 moment-kirk@1.0.1

/* Generation build time is stored in the production catalog */
gulp.task("buildTime", () =>
  fs.writeFile(
    path.resolve(proDirectory) + "/buildTime.txt",
    moment(new Date()).format("YYYY-MM-DD HH:mm:ss") +
      " " +
      packageInfo.version,
    function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!", path.resolve());
    }
  )
);

/* Packaging catalogue */
gulp.task("zip", () =>
  gulp
    .src(path.resolve(proDirectory + "/**"))
    .pipe(
      zip(
        "pc-[" +
          packageInfo.version +
          "]-[" +
          moment(new Date()).format("YYYY-MM-DD HH-mm-ss") +
          "].zip"
      )
    )
    .pipe(gulp.dest("backup"))
);

/* Upload production catalog to test environment */
gulp.task("test", function() {
  return gulp.src(proDirectory + "/**").pipe(
    vsftp({
      host: "192.168.1.22",
      user: "root",
      pass: "root",
      cleanFiles: true,
      remotePath: "/usr/html/"
    })
  );
});

/* If there are other environments, you can continue to write */
