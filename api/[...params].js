const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

export default async function handler(req, res) {
  try {
    // URL parametrelerini al
    const { params } = req.query;
    
    if (!params || params.length < 2) {
      return res.status(400).json({
        error: 'Geçersiz URL formatı',
        usage: 'URL formatı: /api/klasor/dosya şeklinde olmalıdır',
        example: '/api/discord/bot'
      });
    }

    const [klasor, dosya] = params;
    
    // Güvenlik kontrolü - sadece belirli karakterlere izin ver
    const guvenliKarakterler = /^[a-zA-Z0-9_-]+$/;
    if (!guvenliKarakterler.test(klasor) || !guvenliKarakterler.test(dosya)) {
      return res.status(400).json({
        error: 'Geçersiz karakter kullanımı',
        message: 'Sadece harf, rakam, tire ve alt çizgi kullanabilirsiniz'
      });
    }

    // Dosya yollarını oluştur (önce .js, sonra .py)
    const jsDosyaYolu = path.join('scripts', klasor, `${dosya}.js`);
    const pyDosyaYolu = path.join('scripts', klasor, `${dosya}.py`);

    if (fs.existsSync(jsDosyaYolu)) {
      // JavaScript dosyasını çalıştır
      const dosyaIcerigi = fs.readFileSync(jsDosyaYolu, 'utf8');
      const sonuc = await calistirilabilirKod(dosyaIcerigi, req, res);
      
      res.status(200).json({
        success: true,
        klasor: klasor,
        dosya: `${dosya}.js`,
        calistirildi: new Date().toISOString(),
        sonuc: sonuc
      });

    } else if (fs.existsSync(pyDosyaYolu)) {
      // Python dosyasını çalıştır
      const pythonProcess = spawn('python', [pyDosyaYolu]);
      let output = '';
      let errorOutput = '';

      pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          return res.status(500).json({
            error: 'Python script hatası',
            message: errorOutput
          });
        }
        try {
          // Python çıktısını JSON olarak parse etmeyi dene
          const sonuc = JSON.parse(output);
          res.status(200).json({
            success: true,
            klasor: klasor,
            dosya: `${dosya}.py`,
            calistirildi: new Date().toISOString(),
            sonuc: sonuc
          });
        } catch (e) {
          // Eğer JSON değilse, ham çıktı olarak gönder
          res.status(200).json({
            success: true,
            klasor: klasor,
            dosya: `${dosya}.py`,
            calistirildi: new Date().toISOString(),
            sonuc: output
          });
        }
      });

    } else {
      return res.status(404).json({
        error: 'Dosya bulunamadı',
        path: `scripts/${klasor}/${dosya}.js veya .py`,
        message: 'Belirtilen dosya mevcut değil'
      });
    }
    
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({
      error: 'Sunucu hatası',
      message: error.message
    });
  }
}

// Güvenli kod çalıştırma fonksiyonu
async function calistirilabilirKod(kod, req, res) {
  try {
    // Kod içinde kullanılabilecek yardımcı fonksiyonlar
    const yardimcilar = {
      console: {
        log: (...args) => console.log('[SCRIPT]', ...args)
      },
      fetch: require('node-fetch'),
      req: req,
      res: res
    };

    // Kodu çalıştır (eval yerine daha güvenli bir yöntem)
    const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
    const calistirilabilirFonksiyon = new AsyncFunction('helpers', kod);
    
    const sonuc = await calistirilabilirFonksiyon(yardimcilar);
    return sonuc || 'Kod başarıyla çalıştırıldı';
    
  } catch (error) {
    throw new Error(`Kod çalıştırma hatası: ${error.message}`);
  }
}