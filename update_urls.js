const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/vamsi/OneDrive/Documents/bike rentals/client/src';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            results.push(file);
        }
    });
    return results;
}

const files = walk(dir);
let changedFiles = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Pattern 1: 'http://localhost:5000/api/...' -> process.env.REACT_APP_API_URL + '/api/...'
    content = content.replace(/'http:\/\/localhost:5000([^']*)'/g, "process.env.REACT_APP_API_URL + '$1'");
    
    // Pattern 2: `http://localhost:5000/api/...` -> `${process.env.REACT_APP_API_URL}/api/...`
    content = content.replace(/`http:\/\/localhost:5000([^`]*)`/g, "`${process.env.REACT_APP_API_URL}$1`");
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        changedFiles++;
        console.log('Updated: ' + file);
    }
});
console.log('Total files updated: ' + changedFiles);
