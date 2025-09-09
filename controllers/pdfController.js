const pdfDocument = require('pdfkit');
const fs = require('fs'); //file system
const path = require('path');
const Revenue = require('../models/revenue');
const { error } = require('console');

const genaratePDF = async (req, res) => {
  try {
    const data = await Revenue.find().lean();

    const document = new pdfDocument();
    const fileName = `RevenueReport.pdf`; // creating file name
    const filePath = path.join(process.cwd(), fileName);
    const stream = fs.createWriteStream(filePath); // write data on it

    document.pipe(stream); // sending pdf data into that file

    // Title
    document.fontSize(20).text('Revenue Report', { align: 'center', underline: true });
    document.moveDown();

    // Header
    document
      .fontSize(12)
      .text('No | Revenue ID       | Sales Data     | Expense Data   | Profit         | Created At');
    document.moveDown(0.5);

    // Rows
    data.forEach((item, index) => {
      const createdAt = item.createdAt
        ? new Date(item.createdAt).toISOString().split('T')[0]
        : '';

      const row =
        `${String(index + 1).padStart(2, ' ')} | ` +
        `${String(item.revenue_id || '').padEnd(16, ' ')} | ` +
        `${(Number(item.salesData) || 0).toFixed(2).padStart(13, ' ')} | ` +
        `${(Number(item.expenseData) || 0).toFixed(2).padStart(13, ' ')} | ` +
        `${(Number(item.profit) || 0).toFixed(2).padStart(13, ' ')} | ` +
        `${createdAt}`;

      document.fontSize(11).text(row).moveDown(0.25); // adds vertical spacing between rows
    });

    document.end();

    // wait for the stream to finish
    stream.on('finish', () => {
      res.download(filePath, fileName, (err) => {
        if (err) {
          console.error('Error sending file:', err);
          if (!res.headersSent) res.status(500).send('Error downloading file');
        }
        // (optional) cleanup
        // fs.unlink(filePath, () => {});
      });
    });

    stream.on('error', (err) => {
      console.error('Write stream error:', err);
      if (!res.headersSent) res.status(500).send('Server error while creating PDF');
    });
  } catch (error) {
    console.error('Error generating pdf:', error);
    res.status(500).send('Server error');
  }
};

module.exports = genaratePDF;
