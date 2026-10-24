import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Convert number into Indian currency words representation (e.g. 4200 -> "Four Thousand Two Hundred Only")
 */
export function numberToIndianWords(num) {
  if (!num || isNaN(num)) return 'Zero Only';
  
  const a = [
    '', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ',
    'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '
  ];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function inWords(n) {
    if (n.length > 9) return 'Overflow';
    const numPadded = ('000000000' + n).substr(-9);
    const match = numPadded.match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!match) return '';

    let str = '';
    str += Number(match[1]) !== 0 ? (a[Number(match[1])] || b[match[1][0]] + ' ' + a[match[1][1]]) + 'Crore ' : '';
    str += Number(match[2]) !== 0 ? (a[Number(match[2])] || b[match[2][0]] + ' ' + a[match[2][1]]) + 'Lakh ' : '';
    str += Number(match[3]) !== 0 ? (a[Number(match[3])] || b[match[3][0]] + ' ' + a[match[3][1]]) + 'Thousand ' : '';
    str += Number(match[4]) !== 0 ? (a[Number(match[4])] || b[match[4][0]] + ' ' + a[match[4][1]]) + 'Hundred ' : '';
    str += Number(match[5]) !== 0 ? ((str !== '') ? 'and ' : '') + (a[Number(match[5])] || b[match[5][0]] + ' ' + a[match[5][1]]) : '';

    return str.trim();
  }

  const result = inWords(Math.round(num).toString());
  return result ? `${result} Only` : 'Zero Only';
}

/**
 * Generate pixel-perfect A4 PDF from a DOM element
 */
export async function downloadQuotationPDF(elementId, filename = 'WixFox_Quotation.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return false;
  }

  try {
    // Render canvas with high resolution scale
    const canvas = await html2canvas(element, {
      scale: 2.5,
      useCORS: true,
      logging: false,
      backgroundColor: '#FFFFFF',
      windowWidth: 794
    });

    const imgData = canvas.toDataURL('image/png', 1.0);

    // Standard A4 dimensions in mm: 210 x 297
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, '', 'FAST');
    pdf.save(filename);
    return true;
  } catch (err) {
    console.error('PDF Generation failed:', err);
    throw err;
  }
}
