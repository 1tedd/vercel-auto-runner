// Discord Bot Örnek Kodu
// Bu dosya /api/discord/bot URL'si ile çalıştırılır

// Basit bir Discord webhook mesajı gönderme örneği
const discordWebhookUrl = 'YOUR_DISCORD_WEBHOOK_URL_HERE';

const mesaj = {
  content: 'Merhaba! Bu mesaj Vercel serverless function ile gönderildi!',
  embeds: [{
    title: 'Otomatik Sistem',
    description: 'Bu kod otomatik olarak çalıştırıldı',
    color: 0x00ff00,
    timestamp: new Date().toISOString(),
    fields: [
      {
        name: 'Çalıştırılan Dosya',
        value: 'scripts/discord/bot.js',
        inline: true
      },
      {
        name: 'Zaman',
        value: new Date().toLocaleString('tr-TR'),
        inline: true
      }
    ]
  }]
};

// Webhook'a mesaj gönder (eğer URL tanımlıysa)
if (discordWebhookUrl && discordWebhookUrl !== 'YOUR_DISCORD_WEBHOOK_URL_HERE') {
  try {
    const response = await helpers.fetch(discordWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mesaj)
    });
    
    if (response.ok) {
      helpers.console.log('Discord mesajı başarıyla gönderildi!');
      return 'Discord mesajı başarıyla gönderildi!';
    } else {
      helpers.console.log('Discord mesajı gönderilemedi:', response.status);
      return 'Discord mesajı gönderilemedi';
    }
  } catch (error) {
    helpers.console.log('Hata:', error.message);
    return 'Hata oluştu: ' + error.message;
  }
} else {
  helpers.console.log('Discord webhook URL tanımlanmamış');
  return 'Discord bot kodu çalıştırıldı (webhook URL tanımlanmamış)';
}