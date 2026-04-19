const fs = require('fs');
const path = require('path');

const walk = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk(path.join(__dirname, 'src'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // replace view/pages -> @pages
    content = content.replace(/from\s+['"](\.\.\/)+view\/pages\/(.*?)['"]/g, (match, p1, p2) => {
        changed = true;
        return `from "@pages/${p2}"`;
    });
    // replace view/components/elements -> @elements
    content = content.replace(/from\s+['"](\.\.\/)+view\/components\/elements\/(.*?)['"]/g, (match, p1, p2) => {
        changed = true;
        return `from "@elements/${p2}"`;
    });
    // replace view/components/fragments -> @fragments
    content = content.replace(/from\s+['"](\.\.\/)+view\/components\/fragments\/(.*?)['"]/g, (match, p1, p2) => {
        changed = true;
        return `from "@fragments/${p2}"`;
    });
    // replace view/components -> @components
    content = content.replace(/from\s+['"](\.\.\/)+view\/components\/(.*?)['"]/g, (match, p1, p2) => {
        changed = true;
        return `from "@components/${p2}"`;
    });
    // replace core/services or cores/services -> @services
    content = content.replace(/from\s+['"](\.\.\/)+cores?\/services\/(.*?)['"]/g, (match, p1, p2) => {
        changed = true;
        return `from "@services/${p2}"`;
    });
    // replace core/mock or cores/mock -> @mock
    content = content.replace(/from\s+['"](\.\.\/)+cores?\/mock\/(.*?)['"]/g, (match, p1, p2) => {
        changed = true;
        return `from "@mock/${p2}"`;
    });
    // replace core/ or cores/ -> @core
    content = content.replace(/from\s+['"](\.\.\/)+cores?\/(.*?)['"]/g, (match, p1, p2) => {
        changed = true;
        return `from "@core/${p2}"`;
    });
    // replace direct @core to @core just in case ?? No wait.

    // Check if there are other broken things such as using @core/services but we already mapped it.

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
}
