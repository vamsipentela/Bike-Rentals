const fs = require('fs');
const path = require('path');

const source = 'C:\\Users\\vamsi\\.gemini\\antigravity\\brain\\a80be088-3521-4a5c-8417-a7889761f0bc\\bike_favicon_1775577890589.png';
const dest = path.join(__dirname, 'public', 'favicon.png');

try {
    fs.copyFileSync(source, dest);
    console.log(`Successfully copied ${source} to ${dest}`);
} catch (err) {
    console.error('Error copying file:', err);
    process.exit(1);
}
