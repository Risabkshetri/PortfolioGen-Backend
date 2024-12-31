const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const Handlebars = require('handlebars');
const archiver = require('archiver');

class PortfolioGenerator {
  constructor() {
    this.templatesDir = path.join(__dirname, '../Templates');
  }

  async readTemplate(templateName) {
    const templatePath = path.join(this.templatesDir, templateName);
    try {
      const [html, css, js] = await Promise.all([
        fsPromises.readFile(path.join(templatePath, 'index.html'), 'utf-8'),
        fsPromises.readFile(path.join(templatePath, 'style.css'), 'utf-8'),
        fsPromises.readFile(path.join(templatePath, 'script.js'), 'utf-8')
      ]);
      return { html, css, js };
    } catch (error) {
      throw new Error(`Error reading template: ${error.message}`);
    }
  }

  async generatePortfolio(templateName, portfolioData) {
    try {
      // Read template files
      const template = await this.readTemplate(templateName);
      
      // Compile template with Handlebars
      const compiledTemplate = Handlebars.compile(template.html);
      const html = compiledTemplate(portfolioData);

      // Create temporary directory for the user
      const tempDir = path.join(__dirname, '../temp', `portfolio-${Date.now()}`);
      await fsPromises.mkdir(tempDir, { recursive: true });

      // Create ZIP file
      const zipPath = path.join(tempDir, 'portfolio.zip');
      const output = fs.createWriteStream(zipPath);
      const archive = archiver('zip', { zlib: { level: 9 } });

      return new Promise((resolve, reject) => {
        output.on('close', () => resolve(zipPath));
        archive.on('error', reject);

        archive.pipe(output);

        // Add files to ZIP
        archive.append(html, { name: 'portfolio/index.html' });
        archive.append(template.css, { name: 'portfolio/style.css' });
        archive.append(template.js, { name: 'portfolio/script.js' });

        // Add images folder if needed
        // archive.directory('path/to/images', 'images');

        archive.finalize();
      });
    } catch (error) {
      throw new Error(`Error generating portfolio: ${error.message}`);
    }
  }

  async cleanup(zipPath) {
    try {
      await fsPromises.unlink(zipPath);
      // Also remove parent temp directory
      const tempDir = path.dirname(zipPath);
      await fsPromises.rmdir(tempDir);
    } catch (error) {
      console.error('Error cleaning up:', error);
    }
  }
}

module.exports = new PortfolioGenerator();