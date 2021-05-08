const fs = require('fs');

const FileSystem = {
    /**
     * Generates a temporary project folder path by prefixing the temporary directory for this project
     * @param {*} subFolder
     * @returns
     */
    genrateTmpFolderPath: (subFolder) => `/tmp/roblox-api/${subFolder}`,
    /**
     * Writes a file to system via base64 input
     * @param {*} base64Content
     * @param {*} fileName
     * @param {*} extension
     * @param {*} folderPath
     * @returns
     */
    writeFileToSystemB64: (base64Content, fileName, extension, folderPath = '/tmp/roblox-api') => {
        filePath = `${folderPath}/${fileName}.${extension}`;
        const bin = Buffer.from(base64Content, 'base64');
        fs.mkdirSync(folderPath, {
            recursive: true,
        });
        fs.writeFileSync(filePath, bin, {
            encoding: 'binary',
        });
        return filePath;
    },
};

module.exports = { FileSystem };
