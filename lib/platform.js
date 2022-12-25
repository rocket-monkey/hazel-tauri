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
  const isWindowsZip = fileName.endsWith(".msi.zip");
  const isLinuxTarGz = fileName.endsWith(".AppImage.tar.gz");

  if (isDarwinZip || isAppTarGz) {
    return "darwin" + arch;
  } else if (isWindowsZip) {
    return "windows" + arch;
  } else if (isLinuxTarGz) {
    return "linux" + arch;
  }

  if (fileName.endsWith("app.tar.gz.sig")) {
    return "darwin_sig";
  } else if (fileName.endsWith("msi.zip.sig")) {
    return "windows_sig";
  } else if (fileName.endsWith("AppImage.tar.gz.sig")) {
    return "linux_sig";
  }

  const directCache = ["msi", "dmg", "rpm", "deb", "AppImage"];
  return directCache.includes(extension) ? extension + arch : false;
};
