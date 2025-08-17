# Vercel Otomatik Dosya Çalıştırma Sistemi

Bu proje, Vercel serverless functions kullanarak URL aracılığıyla otomatik olarak **JavaScript** ve **Python** kod dosyalarını çalıştırmanızı sağlar.

## Nasıl Çalışır?

Sistem, dinamik URL routing kullanarak belirtilen klasör ve dosyadaki JavaScript kodunu otomatik olarak çalıştırır.

### URL Formatı
```
https://your-domain.vercel.app/klasor/dosya
```

### Örnek Kullanım
- `https://your-domain.vercel.app/discord/bot` → `scripts/discord/bot.js` dosyasını çalıştırır
- `https://your-domain.vercel.app/test/hello` → `scripts/test/hello.js` veya `scripts/test/hello.py` dosyasını çalıştırır (hangisi varsa)

## Kurulum

1. Bu projeyi klonlayın
2. Vercel CLI'yi yükleyin: `npm install -g vercel`
3. Proje dizininde: `npm install`
4. Yerel test için: `vercel dev`
5. Deploy için: `vercel`

## Dosya Yapısı

```
├── api/
│   └── [...params].js     # Dinamik API route handler
├── scripts/
│   ├── discord/
│   │   └── bot.js         # Discord bot örneği
│   └── test/
│       ├── hello.js       # JS test örneği
│       └── hello.py       # Python test örneği
├── package.json
├── vercel.json
├── requirements.txt     # Python bağımlılıkları
└── README.md
```

## Yeni Kod Dosyası Ekleme

1. `scripts/` klasörü altında istediğiniz klasör yapısını oluşturun.
2. `.js` veya `.py` uzantılı dosyalarınızı ekleyin.
3. **JavaScript için:** Dosyalarınızda `helpers` objesi kullanabilirsiniz:
   - `helpers.console.log()` - Loglama
   - `helpers.fetch()` - HTTP istekleri
   - `helpers.req` - Request objesi
   - `helpers.res` - Response objesi
4. **Python için:**
   - İhtiyaç duyduğunuz paketleri `requirements.txt` dosyasına ekleyin.
   - Script'inizin çıktısı standart çıktıya (`print`) JSON formatında olmalıdır.

## Örnek Kod Dosyaları

### JavaScript (`scripts/ornek/test.js`)
```javascript
helpers.console.log('Kod çalışıyor!');

// HTTP isteği yapma
const response = await helpers.fetch('https://api.example.com/data');
const data = await response.json();

// Sonuç döndürme
return {
  mesaj: 'Başarılı!',
  data: data
};
```

### Python (`scripts/ornek/test.py`)
```python
import json
import datetime

data = {
  "mesaj": "Python'dan selamlar!",
  "zaman": str(datetime.datetime.now())
}

print(json.dumps(data))
```

## Güvenlik

- Sadece alfanumerik karakterler, tire ve alt çizgi kullanılabilir
- Dosyalar `scripts/` klasörü altında olmalıdır
- Kod güvenli bir ortamda çalıştırılır

## API Yanıt Formatı

### Başarılı Yanıt
```json
{
  "success": true,
  "klasor": "test",
  "dosya": "hello",
  "calistirildi": "2024-01-01T12:00:00.000Z",
  "sonuc": "Kod çıktısı"
}
```

### Hata Yanıtı
```json
{
  "error": "Hata türü",
  "message": "Hata açıklaması"
}
```

## Örnekler

### Discord Webhook
`/api/discord/bot` - Discord'a mesaj gönderir

### Basit Test (JS veya Python)
`/test/hello` - Basit hesaplama ve bilgi döndürür

## Notlar

- Her dosya çalıştırıldığında yeni bir serverless function instance'ı oluşturulur
- Dosyalar asenkron olarak çalışabilir
- Console logları Vercel function logs'unda görülebilir
- Maksimum execution time: 10 saniye (Hobby plan)