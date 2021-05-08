const { FileSystem } = require('../util/FileSystem');
const text2png = require('text2png');

/**
 * Controller we can use to render text for custom fonts to roblox
 * @author Ahmad Baderkhan
 * @version 2021/05/08 v1
 */
class TextController {
    static DEFAULT_FONT_EXTENSION = '.tff';
    constructor() {}

    /**
     * generates an image render from a user input text , it also takes custom fonts
     * This will allow us to override the roblox limitation of not custom font
     * @param {Express.Request} req
     * @param {Express.Response} res
     */
    generateCustomFontImageText(req, res) {
        const { text, fontFileB64, fontName, fontSize, extension, color } = req.body;
        if (!text || !fontFileB64 || !fontName || !text) {
            return res
                .status(400)
                .send(
                    'Expected body to have "text","fontFileB64","fontName","text" as object properties'
                );
        }

        // write font to file system  in tmp dir
        const fontPath = FileSystem.writeFileToSystemB64(
            fontFileB64,
            fontName,
            TextController.DEFAULT_FONT_EXTENSION,
            FileSystem.genrateTmpFolderPath('fonts')
        );

        res.json({
            image: this.textToPng(text, fontName, fontPath, fontSize, color),
        });
    }

    /**
     * Converts text to a png
     * @param {String} text
     * @param {String} fontName
     * @param {String} fontPathLocal
     * @param {number} fontSize
     * @param {String} color
     * @returns
     */
    textToPng(text, fontName, fontPathLocal, fontSize = '12px', color = 'black') {
        const binImgPng = text2png(text, {
            font: `${fontSize} ${fontName}`,
            localFontPath: fontPathLocal,
            localFontName: fontName,
            color: color,
        });
        return Buffer.from(binImgPng).toString('base64');
    }
}

module.exports = {
    TextController,
};
