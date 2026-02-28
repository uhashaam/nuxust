const fs = require('fs');
const path = require('path');

function walk(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            walk(filePath);
        } else if (filePath.endsWith('.ts') || filePath.endsWith('.js')) {
            let content = fs.readFileSync(filePath, 'utf8');
            // Comment out console calls correctly
            const newContent = content.replace(/console\.(log|error|warn|info|debug)\(/g, '// console.$1(');
            if (content !== newContent) {
                fs.writeFileSync(filePath, newContent, 'utf8');
                console.log(`Updated: ${filePath}`);
            }
        }
    });
}

walk('server');
