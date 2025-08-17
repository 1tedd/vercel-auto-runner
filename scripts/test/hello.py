import json
import datetime

def main():
    """
    Bu fonksiyon, çağrıldığında bir JSON nesnesi oluşturur ve yazdırır.
    """
    now = datetime.datetime.now(datetime.timezone.utc)
    
    data = {
        "mesaj": "Merhaba, bu bir Python scripti!",
        "dil": "Python",
        "zaman_utc": now.isoformat(),
        "basit_hesaplama": {
            "islem": "10 + 5",
            "sonuc": 10 + 5
        }
    }
    
    # JSON çıktısını standart çıktıya yazdır
    print(json.dumps(data, indent=4))

if __name__ == "__main__":
    main()