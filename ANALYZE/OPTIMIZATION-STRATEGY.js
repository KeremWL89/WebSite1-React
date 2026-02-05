// PERFORMANCE OPTIMIZATION STRATEGIES
// Projeniz için önerilen optimizasyon yöntemleri

const optimizationTips = {
  "1. CODE SPLITTING & LAZY LOADING": {
    problem: "Tüm sayfalar başlangıçta yükleniyor (MainPage, BlogPage, LeaveANote vb.)",
    solution: "React.lazy() ile dinamik import kullan",
    expectedImprovement: "Initial bundle %30-40 azalır",
    priority: "YÜKSEK"
  },

  "2. API CALL OPTIMIZATION": {
    problem: "MainPage'de axios isteği her render'da tetikleniyor + console.log durdurmaması",
    solution: `
      useEffect(() => {
        axios.get("https://blogapi89.azurewebsites.net/api/BLOG/")
          .then((resp) => setBlogs(resp.data))
          .catch((err) => console.error(err));
      }, []);
    `,
    expectedImprovement: "İstenmeyen API çağrıları %95 azalır",
    priority: "YÜKSEK"
  },

  "3. IMAGE OPTIMIZATION": {
    problem: "Image klasöründe resimlerin boyutu optimize edilmemiş olabilir",
    solution: "WebP format kullan, responsive images ekle, lazy loading özelliği ekle",
    expectedImprovement: "Sayfa yüklemesi %20-30 hızlanır",
    priority: "ORTA"
  },

  "4. BUNDLE SIZE": {
    problem: "Material-UI tüm library yükleniyor, kullanılmayan CSS'ler olabilir",
    solution: "Tree shaking yapılandırması, unused CSS temizleme",
    expectedImprovement: "Bundle %15-25 azalır",
    priority: "ORTA"
  },

  "5. COMPONENT MEMOIZATION": {
    problem: "ContentBox ve diğer components gereksiz re-render oluyor",
    solution: "React.memo() veya useMemo() kullan",
    expectedImprovement: "Render performansı %40-50 artar",
    priority: "ORTA"
  },

  "6. CACHING STRATEGY": {
    problem: "Browser cache ayarı yapılmadığı için her ziyarette veri yeniden yüklenir",
    solution: "Service Worker + localCache implementation",
    expectedImprovement: "Tekrar ziyaret %70 daha hızlı",
    priority: "DÜŞÜK"
  }
};

console.log(optimizationTips);
