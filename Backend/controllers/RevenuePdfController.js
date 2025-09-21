const pdfDocument = require('pdfkit');
const fs = require('fs'); //file system
const path = require('path');
const Revenue = require('../models/revenue');
const { error } = require('console');

const Revenuepdfgenerator = async (req, res) => {
  try {
    const data = await Revenue.find().lean();

    const document = new pdfDocument({ margin: 40 });
    const fileName = `RevenueReport.pdf`; // creating file name
    const filePath = path.join(process.cwd(), fileName);
    const stream = fs.createWriteStream(filePath); // write data on it
    document.pipe(stream); // sending pdf data into that file

    // Title
    document
      .fontSize(22)
      .fillColor('#2E8B57')
      .text('Revenue Report', { align: 'center', underline: true })
      .moveDown(1);

    // Table header
    const colX = [50, 90, 180, 270, 360, 450];
    document
      .fontSize(12)
      .fillColor('#000')
      .text('No', colX[0], document.y, { continued: true })
      .text('Revenue ID', colX[1], document.y, { continued: true })
      .text('Sales Data', colX[2], document.y, { continued: true })
      .text('Expense Data', colX[3], document.y, { continued: true })
      .text('Profit', colX[4], document.y, { continued: true })
      .text('Created At', colX[5], document.y)
      .moveDown(0.2);
    document.moveTo(colX[0], document.y).lineTo(colX[5] + 100, document.y).stroke();
    document.moveDown(0.3);

    // Table rows
    let totalSales = 0,
      totalExpense = 0,
      totalProfit = 0;
    data.forEach((item, index) => {
      const createdAt = item.createdAt
        ? new Date(item.createdAt).toISOString().split('T')[0]
        : '';
      totalSales += Number(item.salesData) || 0;
      totalExpense += Number(item.expenseData) || 0;
      totalProfit += Number(item.profit) || 0;
      document
        .fontSize(11)
        .text(index + 1, colX[0], document.y, { continued: true })
        .text(String(item.revenue_id || ''), colX[1], document.y, { continued: true })
        .text((Number(item.salesData) || 0).toFixed(2), colX[2], document.y, { continued: true })
        .text((Number(item.expenseData) || 0).toFixed(2), colX[3], document.y, { continued: true })
        .text((Number(item.profit) || 0).toFixed(2), colX[4], document.y, { continued: true })
        .text(createdAt, colX[5], document.y)
        .moveDown(0.2);
      document.moveTo(colX[0], document.y).lineTo(colX[5] + 100, document.y).strokeColor('#eee').stroke();
    });
    document.moveDown(0.5);

    // Summary row
    document
      .fontSize(12)
      .fillColor('#2E8B57')
      .text('Total', colX[1], document.y, { continued: true })
      .text(totalSales.toFixed(2), colX[2], document.y, { continued: true })
      .text(totalExpense.toFixed(2), colX[3], document.y, { continued: true })
      .text(totalProfit.toFixed(2), colX[4], document.y)
      .moveDown(1);

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

module.exports = Revenuepdfgenerator;
