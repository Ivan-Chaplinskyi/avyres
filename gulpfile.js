const gulp = require("gulp");
const cssnano = require("gulp-cssnano");
const uglify = require("gulp-uglify");
const cssbeautify = require("gulp-cssbeautify");
const beautify = require("gulp-beautify");
const autoprefixer = require('gulp-autoprefixer');
const fs = require('fs');
const Vinyl = require('vinyl');

gulp.task("css", () => {
  return gulp
    .src("./src/css/*.css", { since: gulp.lastRun('css') })
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(gulp.dest("./assets"));
});

gulp.task("js", () => {
  return gulp
    .src("./src/js/*.js", { since: gulp.lastRun('js') })
    .pipe(uglify())
    .pipe(gulp.dest("./assets"));
});

// Unminify files

gulp.task("unmin_css", () => {
  return gulp
    .src("./assets/*.css")
    .pipe(cssbeautify())
    .pipe(gulp.dest("./src/css/"));
});

gulp.task("unmin_js", () =>
  gulp
    .src("./assets/*.js")
    .pipe(beautify.js({ indent_size: 2 }))
    .pipe(gulp.dest("./src/js/"))
);

gulp.task("add_files", (done) => {
  const shopifyignore =
    "gulpfile.js \nsrc \nnode_modules \npackage-lock.json \npackage.json \n.gitignore \nyarn-error.log \nyarn.lock";
  const gitIgnore = "node_modules \nyarn-error.log \nyarn.lock \n./assets/*.css \n./assets/*.js";

  const fileShopifyignore = new Vinyl({
    cwd: './',
    base: './',
    path: './.shopifyignore',
    contents: Buffer.from(shopifyignore)
  })

  const fileGitIgnore = new Vinyl({
    cwd: './',
    base: './',
    path: './.gitignore',
    contents: Buffer.from(gitIgnore)
  })

  fs.writeFile(fileShopifyignore.path, fileShopifyignore.contents, () => console.log('File .shopifyignore added'));
  fs.writeFile(fileGitIgnore.path, fileGitIgnore.contents, () => console.log('File .gitignore added'));

  done();
});

gulp.task("init", gulp.series(["unmin_css", "unmin_js", "add_files"]));
gulp.task("build", gulp.series(["css", "js"]));

// Wather
gulp.task("watch", (done) => {
  gulp.watch("./src/css/*.css", gulp.series(["css"]));
  gulp.watch("./src/js/*.js", gulp.series(["js"]));

  done();
});
gulp.task("default", gulp.series(["watch"]));