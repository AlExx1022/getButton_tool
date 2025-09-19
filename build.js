const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

const isDev = process.argv.includes('--dev');

// Read the main source file
const srcPath = path.join(__dirname, 'src', 'core', 'getButton.js');
const distPath = path.join(__dirname, 'dist', 'getButton.js');
const distMinPath = path.join(__dirname, 'dist', 'getButton.min.js');

async function build() {
  try {
    console.log('🏗️  Building getButton...');
    
    // Ensure dist directory exists
    if (!fs.existsSync(path.join(__dirname, 'dist'))) {
      fs.mkdirSync(path.join(__dirname, 'dist'));
    }
    
    // Read source code
    const sourceCode = fs.readFileSync(srcPath, 'utf8');
    
    // Add header comment
    const header = `/*!
 * getButton v1.0.0
 * A lightweight Line QR code button widget
 * https://github.com/yourusername/getButton
 * 
 * Copyright (c) ${new Date().getFullYear()}
 * Licensed under MIT
 */
`;
    
    const codeWithHeader = header + sourceCode;
    
    // Write unminified version
    fs.writeFileSync(distPath, codeWithHeader);
    console.log('✅ Created: dist/getButton.js');
    
    if (!isDev) {
      // Minify for production
      const minified = await minify(sourceCode, {
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        mangle: true,
        format: {
          comments: false
        }
      });
      
      if (minified.error) {
        throw minified.error;
      }
      
      // Write minified version with header
      fs.writeFileSync(distMinPath, header + minified.code);
      console.log('✅ Created: dist/getButton.min.js');
    }
    
    console.log('🎉 Build complete!');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build();
