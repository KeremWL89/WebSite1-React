# 📊 PERFORMANCE ANALYZER - KULLANIM REHBERİ

## 📂 Dosya Yapısı
```
ANALYZE/
├── performanceAnalyzer.js  ← Ana analiz dosyası
└── README.md               ← Bu dosya
```

## 🚀 NASIL KULLANILIR?

### Yöntem 1: Browser Console'da Çalıştırma (EN KOLAY)
1. Web sitenizi tarayıcıda aç
2. **F12** tuşuna bas (DevTools aç)
3. **Console** tab'ine git
4. `performanceAnalyzer.js` dosyasının içeriğini kopyala-yapıştır
5. Aşağıdaki komutları çalıştır:

```javascript
// Performans analizi yap
performanceAnalysis()

// Optimizasyon önerilerini gör
showOptimizations()
```

### Yöntem 2: HTML'de Dahil Etme
`public/index.html`'e ekle:
```html
<script src="%PUBLIC_URL%/../ANALYZE/performanceAnalyzer.js"></script>
```

## 📈 ANALİZ ÇIKTıSı NE İÇERİR?

### 1. **Sayfa Yükleme Metrikleri**
- DNS Lookup: Domain adresinin IP adresine çevrilme süresi
- TCP Bağlantısı: Server'a bağlanma süresi
- Request/Response: Veri gönderme-alma süresi
- Total Load Time: Toplam yükleme süresi ⭐

### 2. **Resource Performance**
- .js dosyaları kaç tanesi, toplam kilo, yükleme süresi
- .css dosyaları
- Resimler
- Diğer kaynaklar

### 3. **API Requests**
- Azure API çağrılarının süresi
- İndirilen veri boyutu
- Response status

### 4. **Memory Usage**
- JavaScript Heap kullanımı
- Bellek yüzdesi

## 🎯 ÖNERİLEN OPTİMİZASYON SIRASI

| # | Öneri | Zorluk | Etki |
|---|-------|--------|------|
| 1 | API Call Optimization | ⭐ Çok Kolay | 🔴 Çok Yüksek |
| 2 | Code Splitting & Lazy Loading | ⭐ Kolay | 🔴 Çok Yüksek |
| 3 | Key Prop Ekleme | ⭐ Çok Kolay | 🟡 Orta |
| 4 | Router Path Hatası | ⭐ Çok Kolay | 🔴 Yüksek |
| 5 | Component Memoization | ⭐⭐ Kolay | 🟡 Orta |
| 6 | HTML Attribute Hatası | ⭐ Çok Kolay | 🟡 Düşük |

## 💡 HIZLI BAŞLANGIÇ

Hemen yap:
```javascript
// 1. MainPage.jsx'de useEffect'e empty dependency array ekle
useEffect(() => {
  axios.get("...").then(resp => console.log(resp));
}, []); // Bu kritik!

// 2. ContentBox'a key ekle
{colors.map((data, index) => (
  <ContentBox key={data} renk={data} content={content} />
))}

// 3. AppBar.jsx'de class → className
<AppBar className="appBar" position="static">
```

**Yapılınca → Yeniden ölçüm yap:** `performanceAnalysis()`

## 📊 BAŞARI KRİTERLERİ

✅ Total Load Time: < 3 saniye (hedef)
✅ Memory: < %70 kullanım
✅ API Response: < 500ms

## 🔧 İLERİ OPTIMIZASYONLAR

Eğer daha hızlandırmak istersen:
- Service Worker + PWA yapılandırması
- Image optimization (WebP, lazy loading)
- CDN kullanımı
- Bundle analyzer (webpack-bundle-analyzer)

---
**Son Güncelleme:** Feb 5, 2026
