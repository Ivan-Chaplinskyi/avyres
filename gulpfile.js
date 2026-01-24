const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css"); // Заміна для cssnano
const terser = require("gulp-terser");     // Заміна для uglify (підтримує ES6)
const cssbeautify = require("gulp-cssbeautify");
const beautify = require("gulp-beautify");
const autoprefixer = require('gulp-autoprefixer');
const fs = require('fs');

// --- TASKS FOR MINIFICATION ---

gulp.task("css", () => {
  return gulp
    .src("./src/css/*.css", { since: gulp.lastRun('css') })
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({ 
      compatibility: 'ie11', // Або '*' для максимального стиснення
      level: 2 // Глибока оптимізація (об'єднання селекторів тощо)
    }))
    .pipe(gulp.dest("./assets"));
});

gulp.task("js", () => {
  return gulp
    .src("./src/js/*.js", { since: gulp.lastRun('js') })
    .pipe(terser({
      toplevel: true,
      format: {
        comments: false, // Видаляє всі коментарі
      },
    }))
    .on('error', function (error) {
      console.error("JS Error:", error.toString()); // Показує помилку, але не зупиняє watch
      this.emit('end');
    })
    .pipe(gulp.dest("./assets"));
});

// --- TASKS FOR UN-MINIFICATION (Reverse) ---

gulp.task("unmin_css", () => {
  return gulp
    .src("./assets/*.css")
    .pipe(cssbeautify({ indent: '  ' }))
    .pipe(gulp.dest("./src/css/"));
});

gulp.task("unmin_js", () =>
  gulp
    .src("./assets/*.js")
    .pipe(beautify.js({ indent_size: 2 }))
    .pipe(gulp.dest("./src/js/"))
);

// --- SYSTEM TASKS ---

gulp.task("add_files", (done) => {
  const shopifyignore =
    "gulpfile.js \nsrc \nnode_modules \npackage-lock.json \npackage.json \n.gitignore \nyarn-error.log \nyarn.lock";
  const gitIgnore = "node_modules \nyarn-error.log \nyarn.lock \n./assets/*.css \n./assets/*.js";

  // Використовуємо стандартний fs для простоти
  fs.writeFile('.shopifyignore', shopifyignore, (err) => {
    if (err) console.error(err);
    else console.log('File .shopifyignore updated');
  });

  fs.writeFile('.gitignore', gitIgnore, (err) => {
    if (err) console.error(err);
    else console.log('File .gitignore updated');
  });

  done();
});

// --- RUN COMMANDS ---

gulp.task("init", gulp.series(["unmin_css", "unmin_js", "add_files"]));
gulp.task("build", gulp.parallel("css", "js")); // Parallel швидше для білду

// Watcher
gulp.task("watch", (done) => {
  // Watch CSS
  gulp.watch("./src/css/*.css", gulp.series("css"));
  
  // Watch JS
  gulp.watch("./src/js/*.js", gulp.series("js"));
  
  // Можна додати сповіщення про старт
  console.log("🚀 Gulp watcher started...");
  done();
});

gulp.task("default", gulp.series("build", "watch"));