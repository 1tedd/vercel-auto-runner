// Basit Test Kodu
// Bu dosya /api/test/hello URL'si ile çalıştırılır

helpers.console.log('Merhaba! Test kodu çalışıyor...');

// Basit bir hesaplama
const sayi1 = 10;
const sayi2 = 20;
const toplam = sayi1 + sayi2;

helpers.console.log(`${sayi1} + ${sayi2} = ${toplam}`);

// Tarih ve saat bilgisi
const simdi = new Date();
const turkiyeZamani = simdi.toLocaleString('tr-TR', {
  timeZone: 'Europe/Istanbul'
});

helpers.console.log('Türkiye saati:', turkiyeZamani);

// Request bilgilerini logla
helpers.console.log('Request method:', helpers.req.method);
helpers.console.log('Request URL:', helpers.req.url);

// Sonuç döndür
return {
  mesaj: 'Test kodu başarıyla çalıştırıldı!',
  hesaplama: `${sayi1} + ${sayi2} = ${toplam}`,
  zaman: turkiyeZamani,
  requestMethod: helpers.req.method,
  requestUrl: helpers.req.url
};