/**
 * Helper to generate pre-filled WhatsApp link with professional quotation/invoice text
 */

export function generateWhatsAppLink(quotation, clientPhone) {
  const phone = (clientPhone || quotation.client?.phone || '')
    .replace(/[^\d]/g, ''); // strip non-digits

  const documentType = quotation.documentType || 'QUOTATION';
  const docNo = quotation.quotationNo || 'WTX/2026/001';
  const clientName = quotation.client?.name || 'Valued Client';
  const total = quotation.totalAmount?.toLocaleString('en-IN') || '0';
  const totalInWords = quotation.amountInWords || '';

  const itemSummary = (quotation.items || [])
    .map((item, idx) => `  ${idx + 1}. *${item.title}* (${item.duration}) - ₹${item.price?.toLocaleString('en-IN') || item.price}`)
    .join('\n');

  const message = `🦊 *WixFox Technologies*
*Your Growth, Our Technology.*
━━━━━━━━━━━━━━━━━━━━━
📋 *OFFICIAL ${documentType}*
🔢 *Doc No:* ${docNo}
📅 *Date:* ${quotation.date}
⏳ *Valid Till:* ${quotation.validTill}

👤 *Client:* ${clientName}

💼 *Selected Services:*
${itemSummary}

💰 *Total Amount:* ₹${total}/- 
_(${totalInWords})_

📄 *Attached PDF:* Please review the official branded quotation PDF sent above.

Let's build your brand together! 🚀
📞 Phone: +91 8511083277
🌐 Website: https://www.wixfox.com
━━━━━━━━━━━━━━━━━━━━━`;

  const encoded = encodeURIComponent(message);
  
  if (phone) {
    return `https://wa.me/${phone}?text=${encoded}`;
  }
  return `https://api.whatsapp.com/send?text=${encoded}`;
}

export function openWhatsAppChat(phone, message) {
  const cleanPhone = (phone || '').replace(/[^\d]/g, '');
  const encoded = encodeURIComponent(message || '');
  const url = cleanPhone 
    ? `https://wa.me/${cleanPhone}?text=${encoded}`
    : `https://api.whatsapp.com/send?text=${encoded}`;
  
  window.open(url, '_blank');
}
