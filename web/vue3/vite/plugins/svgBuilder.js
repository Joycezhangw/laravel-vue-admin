//fs模块是由nodejs内置，无需再安装
import { readFileSync, readdirSync } from 'fs'

let idPerfix = '';
const svgTitle = /<svg([^>+].*?)>/;
const clearHeightWidth = /(width|height)="([^>+].*?)"/g;
const hasViewBox = /(viewBox="[^>+].*?")/g;
const clearReturn = /(\r)|(\n)/g;

/**
 * 查找svg文件
 * @param {String} dir 
 */
function findSvgFile(dir) {
    const svgArr = [];
    const dirents = readdirSync(dir, {
        withFileTypes: true
    });
    for (const dirent of dirents) {
        if (dirent.isDirectory()) {
            svgArr.push(...findSvgFile(dir + dirent.name + '/'));
        } else {
            const svg = readFileSync(dir + dirent.name).toString().replace(clearReturn, '').replace(svgTitle, ($1, $2) => {
                let width = 0, height = 0;
                let content = $2.replace(clearHeightWidth, (s1, s2, s3) => {
                    if (s2 === 'width') {
                        width = s3
                    } else if (s2 === 'height') {
                        height = s3
                    }
                    return ''
                })
                if (!hasViewBox.test($2)) {
                    content += `viewBox="0 0 ${width} ${height}"`;
                }
                return `<symbol id="${idPerfix}-${dirent.name.replace(
                    '.svg',
                    ''
                )}" ${content}>`;
            }).replace('</svg>', '</symbol>');
            svgArr.push(svg);
        }
    }
    return svgArr;
}

/**
 * 生成svg
 * @param {String} path 
 * @param {String} perfix 
 */
export const svgBuilder = (path, perfix = 'icon') => {
    if (path === '') return null;
    idPerfix = perfix
    const res = findSvgFile(path)
    return {
        name: 'svg-transform',
        transformIndexHtml(html) {
            return html.replace(
                '<body>',
                `
            <body>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">
                ${res.join('')}
              </svg>
          `
            )
        }
    }
}