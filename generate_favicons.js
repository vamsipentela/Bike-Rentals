const fs = require('fs');
const path = require('path');

const sourcePath = 'C:/Users/vamsi/.gemini/antigravity/brain/2d335262-7242-4379-b43c-8ae0e55037b6/round_bike_favicon_v2_1775577067196.png';
const targets = [
    'public/bike-32x32.png',
    'public/bike-16x16.png',
    'public/bike.ico'
];

try {
    const data = fs.readFileSync(sourcePath);
    targets.forEach(target => {
        fs.writeFileSync(target, data);
        console.log(`Created ${target}`);
    });
} catch (err) {
    console.error('Error processing favicons:', err);
}
