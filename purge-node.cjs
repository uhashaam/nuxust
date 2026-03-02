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

            // Destructive removal of console calls (including commented ones)
            // This replaces the whole line containing console.XXX with an empty string or just keeps non-console parts
            let lines = content.split('\n');
            let newLines = lines.filter(line => {
                const cleanLine = line.trim();
                return !cleanLine.includes('console.') || cleanLine.startsWith('//') || cleanLine.startsWith('/*');
            });

            // Actually, let's just replace the console pattern specifically to be safer but thorough
            let newContent = content.replace(/\/?\/?\s*console\.(log|error|warn|info|debug)\(.*?\);?/g, '');

            // Also sanitize any direct process.stdout/stderr mentions
            newContent = newContent.replace(/process\.(stdout|stderr)/g, '({write:()=>{}})');

            if (content !== newContent) {
                fs.writeFileSync(filePath, newContent, 'utf8');
                console.log(`Purged: ${filePath}`);
            }
        }
    });
}

walk('server');
