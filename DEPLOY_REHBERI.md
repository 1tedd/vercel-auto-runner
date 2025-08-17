# GitHub + Vercel Deploy Rehberi

Bu rehber, sisteminizi GitHub'a yükleyip Vercel ile public yapmanız için adım adım talimatlar içerir.

## 1. GitHub'a Yükleme

### Adım 1: GitHub Repository Oluşturun
1. GitHub'da yeni repository oluşturun (örn: `vercel-auto-runner`)
2. Public olarak ayarlayın
3. README eklemeden oluşturun

### Adım 2: Projeyi GitHub'a Push Edin
```bash
# Git başlatın
git init

# Dosyaları ekleyin
git add .

# İlk commit
git commit -m "İlk commit: Vercel otomatik dosya çalıştırma sistemi"

# GitHub repository'nizi bağlayın (YOUR_USERNAME değiştirin)
git remote add origin https://github.com/YOUR_USERNAME/vercel-auto-runner.git

# Main branch'e push edin
git branch -M main
git push -u origin main
```

## 2. Vercel'e Deploy

### Adım 1: Vercel Hesabı
1. [vercel.com](https://vercel.com) adresine gidin
2. GitHub hesabınızla giriş yapın

### Adım 2: Repository'yi Import Edin
1. Vercel dashboard'da "New Project" tıklayın
2. GitHub'dan repository'nizi seçin
3. "Import" tıklayın
4. Ayarları varsayılan bırakın
5. "Deploy" tıklayın

### Adım 3: Deploy Tamamlandı!
- Vercel size bir URL verecek (örn: `https://vercel-auto-runner-abc123.vercel.app`)
- Bu URL'niz artık hazır!

## 3. Nasıl Kullanılır?

### Yeni Kod Dosyası Ekleme
1. `scripts/` klasörü altında istediğiniz yapıyı oluşturun.
2. `.js` veya `.py` uzantılı dosyanızı ekleyin.
3. **Eğer Python paketi kullanacaksanız:** Paket adını `requirements.txt` dosyasına ekleyin.
4. Değişiklikleri GitHub'a push edin.
5. Vercel otomatik olarak yeniden deploy eder.

### URL Formatı
```
https://YOUR-VERCEL-URL.vercel.app/klasor/dosya
```

### Örnekler
- `https://YOUR-VERCEL-URL.vercel.app/test/hello`
- `https://YOUR-VERCEL-URL.vercel.app/discord/bot`

## 4. Yeni Dosya Ekleme Örneği

### GitHub'da Yeni Dosya Ekleme (Python Örneği)
1. GitHub repository'nizde `scripts/` klasörüne gidin.
2. "Add file" > "Create new file" tıklayın.
3. Dosya adını yazın: `ornek/selam.py`
4. Kod içeriğini ekleyin:

```python
import json
from datetime import datetime

def run():
    data = {
        "mesaj": "Bu bir Python scriptinden gelen otomatik mesajdır!",
        "timestamp": datetime.utcnow().isoformat()
    }
    print(json.dumps(data, indent=2))

if __name__ == "__main__":
    run()
```

const mesaj = 'Bu kod otomatik çalıştırıldı!';
const zaman = new Date().toLocaleString('tr-TR');

return {
  mesaj: mesaj,
  zaman: zaman,
  durum: 'başarılı'
5. "Commit new file" tıklayın.
6. Vercel otomatik olarak yeni değişiklikleri deploy edecektir.
7. URL'ye gidin: `https://YOUR-VERCEL-URL.vercel.app/ornek/selam`

## 5. Önemli Notlar

### Güvenlik
- Sadece güvenli kodlar ekleyin
- Hassas bilgileri (API key, şifre) kod içine yazmayın
- Environment variables kullanın

### Limitler
- Vercel Hobby plan: 10 saniye execution time
- 100 GB bandwidth/ay
- 100 GB-hours function execution/ay

### Dosya Yapısı
```
scripts/
├── discord/
│   └── bot.js          # /discord/bot
├── test/
│   ├── hello.js        # /test/hello
│   └── hello.py        # /test/hello
└── ornek/
    └── selam.py        # /ornek/selam
```

## 6. Troubleshooting

### Dosya Bulunamadı Hatası
- Dosya yolunu kontrol edin
- `.js` uzantısı olduğundan emin olun
- `scripts/` klasörü altında olduğundan emin olun

### Kod Çalışmıyor
- Syntax hatalarını kontrol edin
- `helpers` objesi kullandığınızdan emin olun
- Vercel function logs'unu kontrol edin

### Deploy Edilmiyor
- GitHub'a push ettiğinizden emin olun
- Vercel dashboard'da build logs'unu kontrol edin

## 7. Gelişmiş Özellikler

### Environment Variables
Vercel dashboard'da Settings > Environment Variables'dan ekleyebilirsiniz.

### Custom Domain
Vercel dashboard'da Settings > Domains'den özel domain ekleyebilirsiniz.

### Analytics
Vercel dashboard'da Analytics sekmesinden kullanım istatistiklerini görebilirsiniz.