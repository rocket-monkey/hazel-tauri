// Native
const { extname } = require("path");

module.exports = (fileName) => {
  const extension = extname(fileName).slice(1);
  const arch =
    fileName.includes("arm64") || fileName.includes("aarch64") ? "_arm64" : "";

  const isDarwinZip =
    (fileName.includes("mac") || fileName.includes("darwin")) &&
    extension === "zip";
  const isAppTarGz = fileName.endsWith("app.tar.gz");
  if (isDarwinZip || isAppTarGz) {
    return "darwin" + arch;
  }

  // TODO: support windows install+update files too
  // TODO: support linux install+update files too
  if (fileName.endsWith("app.tar.gz.sig")) {
    return "darwin_sig";
  }

  const directCache = ["exe", "dmg", "rpm", "deb", "AppImage"];
  return directCache.includes(extension) ? extension + arch : false;
};
