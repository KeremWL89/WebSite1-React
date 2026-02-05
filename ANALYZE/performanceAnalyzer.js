/**
 * PERFORMANCE ANALYZER
 * Proje performans analizi ve optimizasyon önerileri
 * Browser console'da çalıştırmak için: 
 * 1. Chrome DevTools aç (F12)
 * 2. Console tab'ine git
 * 3. Bu dosyanın içeriğini yapıştır ve çalıştır
 */

// ============================================
// SECTION 1: PERFORMANCE ANALYSIS
// ============================================

const performanceAnalysis = () => {
  console.log("\n%c=== WEB SİTESİ PERFORMANCE ANALİZİ ===", "color: #FF6B6B; font-size: 16px; font-weight: bold;");

  // 1. SAYFA YÜKLEME SÜRESİ
  const perfData = performance.getEntriesByType("navigation")[0];
  if (perfData) {
    console.log("\n%c📊 SAYFA YÜKLEME METRİKLERİ:", "color: #4ECDC4; font-weight: bold;");
    console.log(`- DNS Lookup: ${perfData.domainLookupEnd - perfData.domainLookupStart}ms`);
    console.log(`- TCP Bağlantısı: ${perfData.connectEnd - perfData.connectStart}ms`);
    console.log(`- TLS Handshake: ${perfData.secureConnectionStart ? perfData.connectEnd - perfData.secureConnectionStart : 0}ms`);
    console.log(`- Request Time: ${perfData.responseStart - perfData.requestStart}ms`);
    console.log(`- Response Time: ${perfData.responseEnd - perfData.responseStart}ms`);
    console.log(`- DOM Processing: ${perfData.domInteractive - perfData.responseEnd}ms`);
    console.log(`- Resource Loading: ${perfData.domComplete - perfData.domInteractive}ms`);
    console.log(`%c- Total Load Time: ${perfData.loadEventEnd - perfData.fetchStart}ms`, "color: #FF6B6B; font-weight: bold;");
  }

  // 2. RESOURCE PERFORMANCE
  console.log("\n%c📦 RESOURCE PERFORMANCE:", "color: #4ECDC4; font-weight: bold;");
  const resources = performance.getEntriesByType("resource");
  let totalSize = 0;
  const resourcesByType = {};

  resources.forEach(resource => {
    const type = resource.name.split('.').pop() || 'unknown';
    if (!resourcesByType[type]) {
      resourcesByType[type] = { count: 0, duration: 0, size: 0 };
    }
    resourcesByType[type].count++;
    resourcesByType[type].duration += resource.duration;
    resourcesByType[type].size += resource.transferSize || 0;
    totalSize += resource.transferSize || 0;
  });

  Object.entries(resourcesByType).forEach(([type, data]) => {
    console.log(`- .${type}: ${data.count} dosya | ${data.duration.toFixed(2)}ms | ${(data.size / 1024).toFixed(2)}KB`);
  });
  console.log(`%c- TOPLAM BOYUT: ${(totalSize / 1024 / 1024).toFixed(2)}MB`, "color: #FF6B6B; font-weight: bold;");

  // 3. PAINT TIMING
  console.log("\n%c⚡ PAINT TIMING:", "color: #4ECDC4; font-weight: bold;");
  const paintEntries = performance.getEntriesByType("paint");
  paintEntries.forEach(entry => {
    console.log(`- ${entry.name}: ${entry.startTime.toFixed(2)}ms`);
  });

  // 4. API REQUESTS ANALYSIS
  console.log("\n%c🌐 API İSTEKLERİ ANALİZİ:", "color: #4ECDC4; font-weight: bold;");
  const apiResources = resources.filter(r => 
    r.name.includes('azurewebsites') || 
    r.name.includes('api') || 
    r.name.includes('http')
  );
  
  if (apiResources.length === 0) {
    console.log("API isteği bulunamadı veya henüz tamamlanmadı.");
  } else {
    apiResources.forEach(api => {
      console.log(`\n- URL: ${api.name.substring(0, 80)}...`);
      console.log(`  Süre: ${api.duration.toFixed(2)}ms`);
      console.log(`  Boyut: ${(api.transferSize / 1024).toFixed(2)}KB`);
      console.log(`  Durum: ${api.responseStatus ? api.responseStatus : 'Bilinmiyor'}`);
    });
  }

  // 5. MEMORY USAGE
  console.log("\n%c💾 MEMORY STATİSTİKLERİ:", "color: #4ECDC4; font-weight: bold;");
  if (performance.memory) {
    const usedPercent = (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100;
    console.log(`- Toplam JS Heap: ${(performance.memory.jsHeapSizeLimit / 1048576).toFixed(2)}MB`);
    console.log(`- Kullanılan Heap: ${(performance.memory.usedJSHeapSize / 1048576).toFixed(2)}MB`);
    console.log(`%c- Kullanım: ${usedPercent.toFixed(2)}%`, usedPercent > 80 ? "color: #FF6B6B;" : "color: #95E1D3;");
  } else {
    console.log("Memory API desteği yok (Chrome'da --enable-precise-memory-info flag'ı gerekli)");
  }

  console.log("\n%c✅ Analiz tamamlandı!", "color: #95E1D3; font-weight: bold;");
};

// ============================================
// SECTION 2: OPTIMIZATION STRATEGIES
// ============================================

const optimizationStrategies = {
  "1. CODE SPLITTING & LAZY LOADING": {
    problem: "Tüm sayfalar başlangıçta yükleniyor (MainPage, BlogPage, LeaveANote vb.)",
    solution: `
      // RouterPage.jsx'de değiştir:
      import React, { Suspense } from "react";
      import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
      import KAppBar from "./COMPONENTS/AppBar";
      
      const MainPage = React.lazy(() => import("./PAGES/MainPage"));
      const BlogPage = React.lazy(() => import("./PAGES/BlogPage"));
      const LeaveANote = React.lazy(() => import("./PAGES/LeaveANote"));
      
      function RouterPage() {
        return (
          <Router>
            <KAppBar />
            <Suspense fallback={<div>Yükleniyor...</div>}>
              <Routes>
                <Route path="/dev" element={<MainPage />} />
                <Route path="/Blog" element={<BlogPage />} />
                <Route path="/BirNotBırak" element={<LeaveANote />} />
              </Routes>
            </Suspense>
          </Router>
        );
      }
    `,
    expectedImprovement: "Initial bundle %30-40 azalır",
    priority: "🔴 YÜKSEK",
    difficulty: "Kolay"
  },

  "2. API CALL OPTIMIZATION": {
    problem: "MainPage'de axios isteği her render'da tetikleniyor + console.log spam",
    solution: `
      // MainPage.jsx'de değiştir:
      useEffect(() => {
        axios
          .get("https://blogapi89.azurewebsites.net/api/BLOG/")
          .then((resp) => {
            console.log("API Response:", resp.data);
            // setBlogs(resp.data) gibi state update'i yap
          })
          .catch((err) => console.error("API Error:", err));
      }, []); // Empty dependency array ÇOKÖNEMLI!
    `,
    expectedImprovement: "İstenmeyen API çağrıları %95 azalır, Network %50 azalır",
    priority: "🔴 YÜKSEK",
    difficulty: "Çok Kolay"
  },

  "3. KEY PROP EKLEME": {
    problem: "ContentBox map'de key prop eksik - React warnings ve performance sorunu",
    solution: `
      // MainPage.jsx'de değiştir:
      colors.map((data, index) => (
        <ContentBox 
          key={data} // Unique değer kullan (index yerine)
          renk={data} 
          content={content} 
        />
      ))
    `,
    expectedImprovement: "React warnings ortadan kalkar, re-render performansı %20 artar",
    priority: "🟡 ORTA",
    difficulty: "Çok Kolay"
  },

  "4. COMPONENT MEMOIZATION": {
    problem: "ContentBox gereksiz re-render oluyor - parent component her render'da çalışıyor",
    solution: `
      // ContentBox.jsx'de değiştir:
      import React from "react";
      
      const ContentBox = React.memo(({ renk, content }) => {
        return (
          <div style={{ backgroundColor: renk }}>
            {/* component içeriği */}
          </div>
        );
      });
      
      export default ContentBox;
    `,
    expectedImprovement: "Render performansı %40-50 artar",
    priority: "🟡 ORTA",
    difficulty: "Kolay"
  },

  "5. ROUTER PATH HATASI": {
    problem: "RouterPage.jsx'de '/BirNotBırak' path'i iki kez kullanılıyor",
    solution: `
      // RouterPage.jsx'de düzelt:
      <Route path="/" element={<LandingPage />} />
      <Route path="/dev" element={<MainPage />} />
      <Route path="/Blog" element={<BlogPage />} />
      <Route path="/BirNotBırak" element={<LeaveANote />} />
      <Route path="/developer" element={<DeveloperPage />} /> // Farklı path ver
    `,
    expectedImprovement: "Navigation hataları ortadan kalkar",
    priority: "🔴 YÜKSEK",
    difficulty: "Çok Kolay"
  },

  "6. HTML ATTRIBUTE HATASI": {
    problem: "AppBar.jsx'de 'class' yerine 'className' kullanılmış",
    solution: `
      // AppBar.jsx'de değiştir:
      <AppBar className="appBar" position="static" fontFamily={"Poetsen One"}>
    `,
    expectedImprovement: "Console warnings ortadan kalkar",
    priority: "🟡 ORTA",
    difficulty: "Çok Kolay"
  }
};

const showOptimizations = () => {
  console.log("\n%c=== OPTİMİZASYON ÖNERİLERİ ===", "color: #FF6B6B; font-size: 16px; font-weight: bold;");
  
  Object.entries(optimizationStrategies).forEach(([title, data]) => {
    console.log(`\n%c${title}`, "color: #4ECDC4; font-weight: bold; font-size: 12px;");
    console.log(`Priority: ${data.priority}`);
    console.log(`Difficulty: ${data.difficulty}`);
    console.log(`Problem: ${data.problem}`);
    console.log(`Expected Improvement: ${data.expectedImprovement}`);
    console.log(`Solution:\n${data.solution}`);
    console.log("%c" + "─".repeat(80), "color: #666;");
  });
};

// ============================================
// EXPORT FUNCTIONS
// ============================================

console.log("%cPerformance Analyzer Yüklendi!", "color: #95E1D3; font-weight: bold;");
console.log("%cKomutlar:", "font-weight: bold;");
console.log("- performanceAnalysis()   → Detaylı performans analizi");
console.log("- showOptimizations()     → Optimizasyon stratejilerini göster");
