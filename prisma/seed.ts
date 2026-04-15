import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

const themeTokens: Record<string, string> = {
  primary: "#000000",
  "primary-container": "#131b2e",
  "on-primary": "#ffffff",
  "on-primary-container": "#7c839b",
  "on-primary-fixed": "#131b2e",
  "on-primary-fixed-variant": "#3f465c",
  "primary-fixed": "#dae2fd",
  "primary-fixed-dim": "#bec6e0",
  secondary: "#006591",
  "secondary-container": "#39b8fd",
  "on-secondary": "#ffffff",
  "on-secondary-container": "#004666",
  "on-secondary-fixed": "#001e2f",
  "on-secondary-fixed-variant": "#004c6e",
  "secondary-fixed": "#c9e6ff",
  "secondary-fixed-dim": "#89ceff",
  tertiary: "#000000",
  "tertiary-container": "#002113",
  "tertiary-fixed": "#4a90d9",
  "tertiary-fixed-dim": "#3578c2",
  "on-tertiary": "#ffffff",
  "on-tertiary-container": "#009668",
  "on-tertiary-fixed": "#002113",
  "on-tertiary-fixed-variant": "#005236",
  surface: "#f7f9fb",
  "surface-dim": "#d8dadc",
  "surface-bright": "#f7f9fb",
  "surface-container": "#eceef0",
  "surface-container-low": "#f2f4f6",
  "surface-container-lowest": "#ffffff",
  "surface-container-high": "#e6e8ea",
  "surface-container-highest": "#e0e3e5",
  "surface-variant": "#e0e3e5",
  "surface-tint": "#565e74",
  "on-surface": "#191c1e",
  "on-surface-variant": "#45464d",
  "on-background": "#191c1e",
  background: "#f7f9fb",
  outline: "#76777d",
  "outline-variant": "#c6c6cd",
  error: "#ba1a1a",
  "error-container": "#ffdad6",
  "on-error": "#ffffff",
  "on-error-container": "#93000a",
  "inverse-surface": "#2d3133",
  "inverse-on-surface": "#eff1f3",
  "inverse-primary": "#bec6e0",
};


async function main() {
  console.log("🌱 Seeding database...");

  // --- Theme Tokens ---
  console.log("  → Theme tokens...");
  for (const [tokenName, tokenValue] of Object.entries(themeTokens)) {
    await prisma.themeSetting.upsert({
      where: { tokenName },
      update: { tokenValue },
      create: { tokenName, tokenValue },
    });
  }
  console.log(`    ✓ ${Object.keys(themeTokens).length} theme tokens seeded`);

  // --- Admin User ---
  console.log("  → Admin user...");
  const passwordHash = await bcrypt.hash("Admin123!", 10);
  await prisma.adminUser.upsert({
    where: { email: "admin@atamanlab.com" },
    update: { passwordHash },
    create: {
      email: "admin@atamanlab.com",
      name: "Admin",
      passwordHash,
    },
  });
  console.log("    ✓ Admin user seeded");

  // --- Brands ---
  console.log("  → Brands...");
  const brandList = [
    { name: "Aqualytic", slug: "aqualytic", logoUrl: "/uploads/brands/aqualytic.jpg" },
    { name: "Arctiko", slug: "arctiko", logoUrl: "/uploads/brands/arctiko.jpg" },
    { name: "Asecos", slug: "asecos", logoUrl: "/uploads/brands/asecos.jpg" },
    { name: "Bandelin", slug: "bandelin", logoUrl: "/uploads/brands/bandelin.jpg" },
    { name: "Behr", slug: "behr", logoUrl: "/uploads/brands/behr.jpg" },
    { name: "BINDER", slug: "binder", logoUrl: "/uploads/brands/binder.jpg" },
    { name: "Bochem", slug: "bochem", logoUrl: "/uploads/brands/bochem.jpg" },
    { name: "Bohlender", slug: "bohlender", logoUrl: "/uploads/brands/bohlender.jpg" },
    { name: "Brand", slug: "brand", logoUrl: "/uploads/brands/brand.jpg" },
    { name: "Büchi", slug: "buechi", logoUrl: "/uploads/brands/buechi.jpg" },
    { name: "Bürkle", slug: "buerkle", logoUrl: "/uploads/brands/buerkle.jpg" },
    { name: "Duran", slug: "duran", logoUrl: "/uploads/brands/duran.jpg" },
    { name: "Elma", slug: "elma", logoUrl: "/uploads/brands/elma.jpg" },
    { name: "Enbio", slug: "enbio", logoUrl: "/uploads/brands/enbio.jpg" },
    { name: "Eppendorf", slug: "eppendorf", logoUrl: "/uploads/brands/eppendorf.jpg" },
    { name: "Esco", slug: "esco", logoUrl: "/uploads/brands/esco.jpg" },
    { name: "Fritsch", slug: "fritsch", logoUrl: "/uploads/brands/fritsch.jpg" },
    { name: "GE Healthcare", slug: "ge-healthcare", logoUrl: "/uploads/brands/ge-healthcare.jpg" },
    { name: "GFL", slug: "gfl", logoUrl: "/uploads/brands/gfl.jpg" },
    { name: "Hach Lange", slug: "hach-lange", logoUrl: "/uploads/brands/hach-lange.jpg" },
    { name: "Hettich", slug: "hettich", logoUrl: "/uploads/brands/hettich.jpg" },
    { name: "Hirschmann", slug: "hirschmann", logoUrl: "/uploads/brands/hirschmann.jpg" },
    { name: "Huber", slug: "huber", logoUrl: "/uploads/brands/huber.jpg" },
    { name: "Hydrolab", slug: "hydrolab", logoUrl: "/uploads/brands/hydrolab.jpg" },
    { name: "IKA", slug: "ika", logoUrl: "/uploads/brands/ika.jpg" },
    { name: "ISOLAB", slug: "isolab", logoUrl: "/uploads/brands/isolab.jpg" },
    { name: "Julabo", slug: "julabo", logoUrl: "/uploads/brands/julabo.jpg" },
    { name: "KERN", slug: "kern", logoUrl: "/uploads/brands/kern.jpg" },
    { name: "KNF", slug: "knf", logoUrl: "/uploads/brands/knf.jpg" },
    { name: "Krüss", slug: "kruess", logoUrl: "/uploads/brands/kruess.jpg" },
    { name: "La-Pha-Pack", slug: "la-pha-pack", logoUrl: "/uploads/brands/la-pha-pack.jpg" },
    { name: "LAUDA", slug: "lauda", logoUrl: "/uploads/brands/lauda.jpg" },
    { name: "Lenz", slug: "lenz", logoUrl: "/uploads/brands/lenz.jpg" },
    { name: "LLG", slug: "llg", logoUrl: "/uploads/brands/llg.jpg" },
    { name: "Macherey-Nagel", slug: "macherey-nagel", logoUrl: "/uploads/brands/macherey-nagel.jpg" },
    { name: "Memmert", slug: "memmert", logoUrl: "/uploads/brands/memmert.jpg" },
    { name: "Mettler Toledo", slug: "mettler-toledo", logoUrl: "/uploads/brands/mettler-toledo.jpg" },
    { name: "Miele", slug: "miele", logoUrl: "/uploads/brands/miele.jpg" },
    { name: "MPW", slug: "mpw", logoUrl: "/uploads/brands/mpw.jpg" },
    { name: "Nabertherm", slug: "nabertherm", logoUrl: "/uploads/brands/nabertherm.jpg" },
    { name: "OHAUS", slug: "ohaus", logoUrl: "/uploads/brands/ohaus.jpg" },
    { name: "Radwag", slug: "radwag", logoUrl: "/uploads/brands/radwag.jpg" },
    { name: "Retsch", slug: "retsch", logoUrl: "/uploads/brands/retsch.jpg" },
    { name: "Sartorius", slug: "sartorius", logoUrl: "/uploads/brands/sartorius.jpg" },
    { name: "Thermo Fisher", slug: "thermo", logoUrl: "/uploads/brands/thermo.jpg" },
    { name: "VITLAB", slug: "vitlab", logoUrl: "/uploads/brands/vitlab.jpg" },
    { name: "Witeg", slug: "witeg", logoUrl: "/uploads/brands/witeg.jpg" },
    { name: "Xylen", slug: "xylen", logoUrl: "/uploads/brands/xylen.jpg" },
    { name: "Zeltex", slug: "zeltex", logoUrl: "/uploads/brands/zeltex.jpg" },
  ];

  for (let i = 0; i < brandList.length; i++) {
    const b = brandList[i];
    await prisma.brand.upsert({
      where: { slug: b.slug },
      update: { ...b, displayOrder: i },
      create: { ...b, displayOrder: i },
    });
  }
  console.log(`    ✓ ${brandList.length} brands seeded`);


  // --- Categories ---
  console.log("  → Categories...");
  const categories = [
    {
      name: "Spektrofotometreler",
      slug: "spektrofotometreler",
      description: "UV-Vis ve görünür bölge spektrofotometreleri",
      iconName: "biotech",
    },
    {
      name: "Santrifüjler",
      slug: "santrifujler",
      description: "Laboratuvar ve klinik santrifüj cihazları",
      iconName: "settings_suggest",
    },
    {
      name: "Mikroskoplar",
      slug: "mikroskoplar",
      description: "Optik ve dijital mikroskop sistemleri",
      iconName: "search",
    },
    {
      name: "Etüvler",
      slug: "etuvler",
      description: "Kurutma ve sterilizasyon etüvleri",
      iconName: "thermostat",
    },
  ];

  const createdCategories: Record<string, number> = {};
  for (const cat of categories) {
    const record = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    createdCategories[cat.slug] = record.id;
  }
  console.log(`    ✓ ${categories.length} categories seeded`);


  // --- Products ---
  console.log("  → Products...");
  const products = [
    // Spektrofotometreler
    {
      name: "UV-1800 Çift Işınlı Spektrofotometre",
      slug: "uv-1800-cift-isinli-spektrofotometre",
      categoryId: createdCategories["spektrofotometreler"],
      modelNumber: "UV-1800",
      shortDescription: "190-1100 nm dalga boyu aralığında yüksek hassasiyetli çift ışınlı UV-Vis spektrofotometre.",
      fullDescription: "UV-1800, araştırma ve kalite kontrol laboratuvarları için tasarlanmış çift ışınlı bir spektrofotometredir.",
      features: JSON.stringify(["Çift ışınlı optik sistem", "USB ve Ethernet bağlantısı", "Dahili yazıcı desteği"]),
      specifications: JSON.stringify([
        { key: "Dalga Boyu Aralığı", value: "190-1100 nm" },
        { key: "Bant Genişliği", value: "1 nm" },
        { key: "Fotometrik Aralık", value: "-4 ~ 4 Abs" },
      ]),
      stockStatus: true,
      isNew: true,
      images: JSON.stringify(["/uploads/images/hero-lab.jpg"]),
      documents: JSON.stringify([]),
      accessories: JSON.stringify([]),
    },
    {
      name: "VIS-7220G Görünür Bölge Spektrofotometre",
      slug: "vis-7220g-gorunur-bolge-spektrofotometre",
      categoryId: createdCategories["spektrofotometreler"],
      modelNumber: "VIS-7220G",
      shortDescription: "320-1100 nm aralığında ekonomik görünür bölge spektrofotometresi.",
      fullDescription: "VIS-7220G, eğitim ve rutin analizler için ideal bir giriş seviyesi spektrofotometredir.",
      features: JSON.stringify(["Tek ışınlı optik", "LCD ekran", "Otomatik dalga boyu ayarı"]),
      specifications: JSON.stringify([
        { key: "Dalga Boyu Aralığı", value: "320-1100 nm" },
        { key: "Bant Genişliği", value: "4 nm" },
        { key: "Fotometrik Aralık", value: "0-2 Abs" },
      ]),
      stockStatus: true,
      isNew: false,
      images: JSON.stringify(["/uploads/images/news-safety.jpg"]),
      documents: JSON.stringify([]),
      accessories: JSON.stringify([]),
    },
    // Santrifüjler
    {
      name: "CF-16RN Yüksek Hızlı Santrifüj",
      slug: "cf-16rn-yuksek-hizli-santrifuj",
      categoryId: createdCategories["santrifujler"],
      modelNumber: "CF-16RN",
      shortDescription: "16.000 RPM kapasiteli soğutmalı mikro santrifüj.",
      fullDescription: "CF-16RN, moleküler biyoloji ve biyokimya laboratuvarları için tasarlanmış yüksek hızlı soğutmalı santrifüjdür.",
      features: JSON.stringify(["Soğutma sistemi (-20°C ~ +40°C)", "Değiştirilebilir rotorlar", "Otomatik kapak kilidi"]),
      specifications: JSON.stringify([
        { key: "Maksimum Hız", value: "16.000 RPM" },
        { key: "Maksimum RCF", value: "17.800 × g" },
        { key: "Kapasite", value: "24 × 1.5/2.0 ml" },
      ]),
      stockStatus: true,
      isNew: true,
      images: JSON.stringify(["/uploads/images/product-centrifuge.jpg"]),
      documents: JSON.stringify([]),
      accessories: JSON.stringify([]),
    },
    {
      name: "CF-5K Klinik Santrifüj",
      slug: "cf-5k-klinik-santrifuj",
      categoryId: createdCategories["santrifujler"],
      modelNumber: "CF-5K",
      shortDescription: "5.000 RPM kapasiteli klinik tip santrifüj.",
      fullDescription: "CF-5K, hastane ve klinik laboratuvarlarında kan ve idrar numunelerinin ayrıştırılması için tasarlanmış kompakt santrifüjdür.",
      features: JSON.stringify(["Sessiz çalışma", "Zamanlayıcı", "Dengesizlik algılama"]),
      specifications: JSON.stringify([
        { key: "Maksimum Hız", value: "5.000 RPM" },
        { key: "Maksimum RCF", value: "2.800 × g" },
        { key: "Kapasite", value: "12 × 15 ml" },
      ]),
      stockStatus: true,
      isNew: false,
      images: JSON.stringify(["/uploads/images/news-pipette.jpg"]),
      documents: JSON.stringify([]),
      accessories: JSON.stringify([]),
    },
    // Mikroskoplar
    {
      name: "BM-500T Trinoküler Biyolojik Mikroskop",
      slug: "bm-500t-trinokuler-biyolojik-mikroskop",
      categoryId: createdCategories["mikroskoplar"],
      modelNumber: "BM-500T",
      shortDescription: "Araştırma sınıfı trinoküler biyolojik mikroskop.",
      fullDescription: "BM-500T, plan akromatik objektifleri ve Köhler aydınlatma sistemi ile profesyonel araştırma ve eğitim uygulamaları için idealdir.",
      features: JSON.stringify(["Plan akromatik objektifler", "Köhler aydınlatma", "Kamera bağlantı portu"]),
      specifications: JSON.stringify([
        { key: "Büyütme", value: "40x - 1000x" },
        { key: "Oküler", value: "WF10x/22mm" },
        { key: "Aydınlatma", value: "LED, 3W" },
      ]),
      stockStatus: true,
      isNew: false,
      images: JSON.stringify(["/uploads/images/product-microscope.jpg"]),
      documents: JSON.stringify([]),
      accessories: JSON.stringify([]),
    },
    {
      name: "SM-200 Stereo Mikroskop",
      slug: "sm-200-stereo-mikroskop",
      categoryId: createdCategories["mikroskoplar"],
      modelNumber: "SM-200",
      shortDescription: "Endüstriyel muayene ve eğitim amaçlı stereo mikroskop.",
      fullDescription: "SM-200, geniş çalışma mesafesi ve ergonomik tasarımı ile kalite kontrol ve eğitim uygulamalarında kullanılır.",
      features: JSON.stringify(["Çift LED aydınlatma", "Geniş çalışma mesafesi", "Zoom objektif"]),
      specifications: JSON.stringify([
        { key: "Büyütme", value: "7x - 45x" },
        { key: "Çalışma Mesafesi", value: "100 mm" },
        { key: "Aydınlatma", value: "Üst ve alt LED" },
      ]),
      stockStatus: true,
      isNew: true,
      images: JSON.stringify(["/uploads/images/product-spectro.jpg"]),
      documents: JSON.stringify([]),
      accessories: JSON.stringify([]),
    },
    // Etüvler
    {
      name: "DO-50 Doğal Konveksiyonlu Etüv",
      slug: "do-50-dogal-konveksiyonlu-etuv",
      categoryId: createdCategories["etuvler"],
      modelNumber: "DO-50",
      shortDescription: "50 litre kapasiteli doğal konveksiyonlu kurutma etüvü.",
      fullDescription: "DO-50, laboratuvar numunelerinin kurutulması ve sterilizasyonu için tasarlanmış kompakt bir etüvdür.",
      features: JSON.stringify(["Dijital PID kontrol", "Zamanlayıcı", "Aşırı ısınma koruması"]),
      specifications: JSON.stringify([
        { key: "Kapasite", value: "50 L" },
        { key: "Sıcaklık Aralığı", value: "RT+5 ~ 250°C" },
        { key: "Hassasiyet", value: "±0.5°C" },
      ]),
      stockStatus: true,
      isNew: false,
      images: JSON.stringify(["/uploads/images/news-lab.jpg"]),
      documents: JSON.stringify([]),
      accessories: JSON.stringify([]),
    },
    {
      name: "FO-120 Zorlamalı Konveksiyonlu Etüv",
      slug: "fo-120-zorlamali-konveksiyonlu-etuv",
      categoryId: createdCategories["etuvler"],
      modelNumber: "FO-120",
      shortDescription: "120 litre kapasiteli zorlamalı konveksiyonlu etüv.",
      fullDescription: "FO-120, büyük hacimli numunelerin kurutulması için fan destekli konveksiyon sistemi ile homojen sıcaklık dağılımı sağlar.",
      features: JSON.stringify(["Fan destekli konveksiyon", "Programlanabilir sıcaklık profili", "RS-232 veri çıkışı"]),
      specifications: JSON.stringify([
        { key: "Kapasite", value: "120 L" },
        { key: "Sıcaklık Aralığı", value: "RT+5 ~ 300°C" },
        { key: "Hassasiyet", value: "±0.3°C" },
      ]),
      stockStatus: true,
      isNew: false,
      images: JSON.stringify(["/uploads/images/news-safety.jpg"]),
      documents: JSON.stringify([]),
      accessories: JSON.stringify([]),
    },
  ];
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
  console.log(`    ✓ ${products.length} products seeded`);


  // --- News Articles (tr, en, de) ---
  console.log("  → News articles...");
  const newsArticles = [
    // Article 1: Yeni Web Sitemiz Yayında!
    {
      slug: "yeni-web-sitemiz-yayinda",
      locale: "tr",
      title: "Yeni Web Sitemiz Yayında!",
      categoryBadge: "DUYURU",
      excerpt: "Tamamen yenilenen web sitemiz ile markalarımıza, haberlerimize ve iletişim bilgilerimize artık çok daha kolay ulaşabilirsiniz.",
      content: "Uzun süredir üzerinde çalıştığımız yeni web sitemizi nihayet yayına aldık!\n\nModern tasarımı, üç dil desteği (Almanca, Türkçe, İngilizce) ve gelişmiş kullanıcı deneyimi ile laboratuvar ekipmanı dünyasına açılan kapınız olmayı hedefliyoruz.\n\nYeni sitemizde neler var?\n\n• Çalıştığımız 40'tan fazla markanın detaylı bilgileri\n• Güncel haberler ve sektörel içerikler\n• Kurumsal bilgilerimiz ve vizyon/misyonumuz\n• Kolay ulaşılabilir iletişim formu\n\nGeri bildirimlerinizi bekliyoruz — sizin için daha iyi bir deneyim sunmak önceliğimiz.",
      coverImageUrl: "/uploads/images/news-website.jpg",
      publishedAt: new Date("2026-04-15"),
    },
    {
      slug: "yeni-web-sitemiz-yayinda",
      locale: "en",
      title: "Our New Website Is Live!",
      categoryBadge: "ANNOUNCEMENT",
      excerpt: "With our completely redesigned website, you can now access our brands, news, and contact information much more easily.",
      content: "We have finally launched our new website that we have been working on for a long time!\n\nWith its modern design, three-language support (German, Turkish, English) and enhanced user experience, we aim to be your gateway to the world of laboratory equipment.\n\nWhat's new on our site?\n\n• Detailed information on over 40 brands we work with\n• Up-to-date news and industry content\n• Our corporate information and vision/mission\n• Easy-to-reach contact form\n\nWe look forward to your feedback — providing you with a better experience is our priority.",
      coverImageUrl: "/uploads/images/news-website.jpg",
      publishedAt: new Date("2026-04-15"),
    },
    {
      slug: "yeni-web-sitemiz-yayinda",
      locale: "de",
      title: "Unsere neue Website ist online!",
      categoryBadge: "ANKÜNDIGUNG",
      excerpt: "Mit unserer komplett überarbeiteten Website können Sie jetzt viel einfacher auf unsere Marken, Neuigkeiten und Kontaktinformationen zugreifen.",
      content: "Wir haben endlich unsere neue Website veröffentlicht, an der wir lange gearbeitet haben!\n\nMit ihrem modernen Design, der Unterstützung von drei Sprachen (Deutsch, Türkisch, Englisch) und einer verbesserten Benutzererfahrung möchten wir Ihr Tor zur Welt der Laborgeräte sein.\n\nWas gibt es Neues auf unserer Seite?\n\n• Detaillierte Informationen zu über 40 Marken, mit denen wir zusammenarbeiten\n• Aktuelle Nachrichten und Brancheninhalte\n• Unsere Unternehmensinformationen und Vision/Mission\n• Leicht erreichbares Kontaktformular\n\nWir freuen uns auf Ihr Feedback — Ihnen ein besseres Erlebnis zu bieten, hat für uns Priorität.",
      coverImageUrl: "/uploads/images/news-website.jpg",
      publishedAt: new Date("2026-04-15"),
    },

    // Article 2: Güvenlik Dolabı Seçimi
    {
      slug: "laboratuvar-guvenlik-dolabi-secimi",
      locale: "tr",
      title: "Laboratuvarınız İçin Doğru Güvenlik Dolabını Nasıl Seçersiniz?",
      categoryBadge: "REHBER",
      excerpt: "Kimyasal madde depolama standartları ve laboratuvarınız için doğru güvenlik dolabı seçiminin püf noktaları.",
      content: "Laboratuvar güvenliği denildiğinde akla ilk gelen konulardan biri kimyasal maddelerin doğru depolanmasıdır. Özellikle yanıcı, aşındırıcı ve toksik kimyasallar söz konusu olduğunda, EN 14470-1 ve TRGS 510 standartlarına uyum sadece yasal bir zorunluluk değil, çalışan güvenliğinin de temelidir.\n\nPeki doğru güvenlik dolabını nasıl seçersiniz?\n\n1. Depolayacağınız kimyasalın türünü belirleyin (yanıcı, asit, baz, toksik)\n2. İhtiyacınız olan depolama kapasitesini hesaplayın\n3. Laboratuvarınızdaki yerleşim planını göz önünde bulundurun\n4. Havalandırma gereksinimlerini kontrol edin\n\nDoğru ürün seçimi konusunda ücretsiz danışmanlık için bizimle iletişime geçin.",
      coverImageUrl: "/uploads/images/news-safety.jpg",
      publishedAt: new Date("2026-03-20"),
    },
    {
      slug: "laboratuvar-guvenlik-dolabi-secimi",
      locale: "en",
      title: "How to Choose the Right Safety Cabinet for Your Laboratory?",
      categoryBadge: "GUIDE",
      excerpt: "Chemical storage standards and tips for choosing the right safety cabinet for your laboratory.",
      content: "When it comes to laboratory safety, one of the first topics that comes to mind is the proper storage of chemicals. Especially when dealing with flammable, corrosive, and toxic chemicals, compliance with EN 14470-1 and TRGS 510 standards is not only a legal requirement but also the foundation of employee safety.\n\nSo how do you choose the right safety cabinet?\n\n1. Determine the type of chemicals you will store (flammable, acid, base, toxic)\n2. Calculate the storage capacity you need\n3. Consider the layout plan of your laboratory\n4. Check ventilation requirements\n\nContact us for free consultation on choosing the right product.",
      coverImageUrl: "/uploads/images/news-safety.jpg",
      publishedAt: new Date("2026-03-20"),
    },
    {
      slug: "laboratuvar-guvenlik-dolabi-secimi",
      locale: "de",
      title: "Wie wählen Sie den richtigen Sicherheitsschrank für Ihr Labor?",
      categoryBadge: "RATGEBER",
      excerpt: "Chemikalien-Lagerungsstandards und Tipps zur Auswahl des richtigen Sicherheitsschranks für Ihr Labor.",
      content: "Wenn es um Laborsicherheit geht, ist eines der ersten Themen die ordnungsgemäße Lagerung von Chemikalien. Insbesondere bei brennbaren, ätzenden und giftigen Chemikalien ist die Einhaltung der Normen EN 14470-1 und TRGS 510 nicht nur eine gesetzliche Pflicht, sondern auch die Grundlage für die Sicherheit der Mitarbeiter.\n\nWie wählen Sie also den richtigen Sicherheitsschrank?\n\n1. Bestimmen Sie die Art der Chemikalien, die Sie lagern werden (brennbar, Säure, Base, giftig)\n2. Berechnen Sie die benötigte Lagerkapazität\n3. Berücksichtigen Sie den Grundriss Ihres Labors\n4. Überprüfen Sie die Belüftungsanforderungen\n\nKontaktieren Sie uns für eine kostenlose Beratung zur richtigen Produktauswahl.",
      coverImageUrl: "/uploads/images/news-safety.jpg",
      publishedAt: new Date("2026-03-20"),
    },

    // Article 3: Avrupa Üretimi
    {
      slug: "neden-avrupa-uretimi-laboratuvar-ekipmani",
      locale: "tr",
      title: "Neden Avrupa Üretimi Laboratuvar Ekipmanı Tercih Etmelisiniz?",
      categoryBadge: "BLOG",
      excerpt: "Kalite standartları, teknik destek erişimi ve uzun vadeli maliyet avantajları açısından Avrupa üretimi ekipmanların farkı.",
      content: "Laboratuvar ekipmanı seçerken fiyat önemli bir faktör olsa da, uzun vadede asıl belirleyici olan kalite, güvenilirlik ve teknik destek erişimidir.\n\nAvrupa üretimi laboratuvar ekipmanlarının avantajları:\n\n• Sıkı kalite kontrol standartları (CE, ISO, DIN)\n• Uzun ömürlü ve dayanıklı malzeme kullanımı\n• Kolay erişilebilir yedek parça ve servis ağı\n• Kapsamlı teknik dokümantasyon\n• Çevresel sürdürülebilirlik standartlarına uyum\n\nAtamanlab olarak, Almanya ve Avrupa'nın önde gelen üreticileriyle kurduğumuz doğrudan ortaklıklar sayesinde, müşterilerimize orijinal ürünleri rekabetçi fiyatlarla sunabiliyoruz.",
      coverImageUrl: "/uploads/images/news-lab.jpg",
      publishedAt: new Date("2026-03-01"),
    },
    {
      slug: "neden-avrupa-uretimi-laboratuvar-ekipmani",
      locale: "en",
      title: "Why Should You Choose European-Made Laboratory Equipment?",
      categoryBadge: "BLOG",
      excerpt: "The difference of European-made equipment in terms of quality standards, technical support access, and long-term cost advantages.",
      content: "While price is an important factor when choosing laboratory equipment, what really matters in the long run is quality, reliability, and access to technical support.\n\nAdvantages of European-made laboratory equipment:\n\n• Strict quality control standards (CE, ISO, DIN)\n• Long-lasting and durable material usage\n• Easily accessible spare parts and service network\n• Comprehensive technical documentation\n• Compliance with environmental sustainability standards\n\nAs Atamanlab, thanks to our direct partnerships with leading manufacturers in Germany and Europe, we can offer our customers original products at competitive prices.",
      coverImageUrl: "/uploads/images/news-lab.jpg",
      publishedAt: new Date("2026-03-01"),
    },
    {
      slug: "neden-avrupa-uretimi-laboratuvar-ekipmani",
      locale: "de",
      title: "Warum sollten Sie europäische Laborgeräte bevorzugen?",
      categoryBadge: "BLOG",
      excerpt: "Der Unterschied europäischer Geräte in Bezug auf Qualitätsstandards, technischen Support und langfristige Kostenvorteile.",
      content: "Obwohl der Preis bei der Auswahl von Laborgeräten ein wichtiger Faktor ist, sind Qualität, Zuverlässigkeit und der Zugang zu technischem Support langfristig entscheidend.\n\nVorteile europäischer Laborgeräte:\n\n• Strenge Qualitätskontrollstandards (CE, ISO, DIN)\n• Langlebige und robuste Materialverwendung\n• Leicht zugängliches Ersatzteil- und Servicenetzwerk\n• Umfassende technische Dokumentation\n• Einhaltung von Umwelt-Nachhaltigkeitsstandards\n\nAls Atamanlab können wir dank unserer direkten Partnerschaften mit führenden Herstellern in Deutschland und Europa unseren Kunden Originalprodukte zu wettbewerbsfähigen Preisen anbieten.",
      coverImageUrl: "/uploads/images/news-lab.jpg",
      publishedAt: new Date("2026-03-01"),
    },

    // Article 4: ACHEMA 2027
    {
      slug: "achema-2027-hazirliklari",
      locale: "tr",
      title: "ACHEMA 2027: Hazırlıklarımız Devam Ediyor",
      categoryBadge: "ETKİNLİK",
      excerpt: "Dünyanın en büyük kimya mühendisliği fuarı ACHEMA 2027 için hazırlıklarımız tüm hızıyla devam ediyor.",
      content: "Üç yılda bir düzenlenen ve kimya mühendisliği, çevre koruma ve biyoteknoloji alanlarının en prestijli buluşma noktası olan ACHEMA fuarı, 14-18 Haziran 2027 tarihleri arasında Frankfurt am Main'de gerçekleşecek.\n\nAtamanlab olarak bu önemli etkinliğe hazırlanıyoruz. Fuarda iş ortaklarımızın en yeni ürünlerini tanıtmayı ve sektör profesyonelleriyle bir araya gelmeyi planlıyoruz.\n\nACHEMA, her edisyonunda 160.000'den fazla ziyaretçiyi ve 3.800'den fazla katılımcıyı ağırlayan devasa bir platform.",
      coverImageUrl: "/uploads/images/news-event.jpg",
      publishedAt: new Date("2026-02-15"),
    },
    {
      slug: "achema-2027-hazirliklari",
      locale: "en",
      title: "ACHEMA 2027: Our Preparations Are Underway",
      categoryBadge: "EVENT",
      excerpt: "Our preparations for ACHEMA 2027, the world's largest chemical engineering trade fair, are in full swing.",
      content: "ACHEMA, the most prestigious meeting point for chemical engineering, environmental protection, and biotechnology, held every three years, will take place from June 14-18, 2027 in Frankfurt am Main.\n\nAs Atamanlab, we are preparing for this important event. We plan to showcase our partners' latest products and meet with industry professionals at the fair.\n\nACHEMA is a massive platform that hosts over 160,000 visitors and more than 3,800 exhibitors in each edition.",
      coverImageUrl: "/uploads/images/news-event.jpg",
      publishedAt: new Date("2026-02-15"),
    },
    {
      slug: "achema-2027-hazirliklari",
      locale: "de",
      title: "ACHEMA 2027: Unsere Vorbereitungen laufen",
      categoryBadge: "VERANSTALTUNG",
      excerpt: "Unsere Vorbereitungen für die ACHEMA 2027, die weltweit größte Messe für chemische Technik, laufen auf Hochtouren.",
      content: "Die ACHEMA, der renommierteste Treffpunkt für chemische Technik, Umweltschutz und Biotechnologie, findet alle drei Jahre statt und wird vom 14. bis 18. Juni 2027 in Frankfurt am Main ausgerichtet.\n\nAls Atamanlab bereiten wir uns auf dieses wichtige Ereignis vor. Wir planen, die neuesten Produkte unserer Partner vorzustellen und uns mit Branchenexperten auf der Messe zu treffen.\n\nDie ACHEMA ist eine riesige Plattform, die in jeder Ausgabe über 160.000 Besucher und mehr als 3.800 Aussteller empfängt.",
      coverImageUrl: "/uploads/images/news-event.jpg",
      publishedAt: new Date("2026-02-15"),
    },

    // Article 5: Bakım 5 Yol
    {
      slug: "laboratuvar-ekipmani-bakimi-5-yol",
      locale: "tr",
      title: "Laboratuvar Ekipmanı Bakımı: Ömrü Uzatmanın 5 Yolu",
      categoryBadge: "BLOG",
      excerpt: "Düzenli bakım ve doğru kullanım ile laboratuvar ekipmanlarınızın ömrünü önemli ölçüde uzatabilirsiniz.",
      content: "Laboratuvar ekipmanları ciddi yatırımlar gerektirir. Bu yatırımın karşılığını en iyi şekilde almak için düzenli bakım şarttır.\n\n1. Periyodik Kalibrasyon: Ölçüm cihazlarınızı düzenli olarak kalibre ettirin. Bu hem doğru sonuçlar hem de yasal uyumluluk için kritiktir.\n\n2. Temizlik Protokolleri: Her kullanım sonrası cihazlarınızı üretici talimatlarına uygun şekilde temizleyin.\n\n3. Çevre Koşulları: Sıcaklık, nem ve toz kontrolü ekipman ömrünü doğrudan etkiler.\n\n4. Eğitimli Personel: Cihazları kullanan personelin düzenli eğitim alması hatalı kullanımı önler.\n\n5. Orijinal Yedek Parça: Bakım ve onarımda mutlaka orijinal yedek parça kullanın.\n\nBakım planlaması ve yedek parça temini konusunda destek için bizimle iletişime geçin.",
      coverImageUrl: "/uploads/images/news-business.jpg",
      publishedAt: new Date("2026-02-01"),
    },
    {
      slug: "laboratuvar-ekipmani-bakimi-5-yol",
      locale: "en",
      title: "Laboratory Equipment Maintenance: 5 Ways to Extend Its Lifespan",
      categoryBadge: "BLOG",
      excerpt: "With regular maintenance and proper use, you can significantly extend the lifespan of your laboratory equipment.",
      content: "Laboratory equipment requires significant investment. Regular maintenance is essential to get the best return on this investment.\n\n1. Periodic Calibration: Have your measuring instruments calibrated regularly. This is critical for both accurate results and legal compliance.\n\n2. Cleaning Protocols: Clean your devices after each use according to the manufacturer's instructions.\n\n3. Environmental Conditions: Temperature, humidity, and dust control directly affect equipment lifespan.\n\n4. Trained Personnel: Regular training for staff using the equipment prevents misuse.\n\n5. Original Spare Parts: Always use original spare parts for maintenance and repairs.\n\nContact us for support with maintenance planning and spare parts procurement.",
      coverImageUrl: "/uploads/images/news-business.jpg",
      publishedAt: new Date("2026-02-01"),
    },
    {
      slug: "laboratuvar-ekipmani-bakimi-5-yol",
      locale: "de",
      title: "Wartung von Laborgeräten: 5 Wege zur Verlängerung der Lebensdauer",
      categoryBadge: "BLOG",
      excerpt: "Mit regelmäßiger Wartung und sachgemäßer Nutzung können Sie die Lebensdauer Ihrer Laborgeräte erheblich verlängern.",
      content: "Laborgeräte erfordern erhebliche Investitionen. Regelmäßige Wartung ist unerlässlich, um die beste Rendite aus dieser Investition zu erzielen.\n\n1. Periodische Kalibrierung: Lassen Sie Ihre Messgeräte regelmäßig kalibrieren. Dies ist sowohl für genaue Ergebnisse als auch für die gesetzliche Konformität entscheidend.\n\n2. Reinigungsprotokolle: Reinigen Sie Ihre Geräte nach jedem Gebrauch gemäß den Anweisungen des Herstellers.\n\n3. Umgebungsbedingungen: Temperatur-, Feuchtigkeits- und Staubkontrolle wirken sich direkt auf die Lebensdauer der Geräte aus.\n\n4. Geschultes Personal: Regelmäßige Schulungen für das Personal, das die Geräte bedient, verhindert Fehlbedienung.\n\n5. Original-Ersatzteile: Verwenden Sie bei Wartung und Reparatur immer Original-Ersatzteile.\n\nKontaktieren Sie uns für Unterstützung bei der Wartungsplanung und Ersatzteilbeschaffung.",
      coverImageUrl: "/uploads/images/news-business.jpg",
      publishedAt: new Date("2026-02-01"),
    },

    // Article 6: Pipet Seçim Rehberi
    {
      slug: "pipet-secim-rehberi",
      locale: "tr",
      title: "Pipet Seçim Rehberi: Hangi Pipet Sizin İçin Doğru?",
      categoryBadge: "REHBER",
      excerpt: "Tek kanallı, çok kanallı, elektronik — laboratuvarınızın ihtiyacına göre doğru pipet seçimi için kapsamlı rehber.",
      content: "Pipetler, hemen her laboratuvarın vazgeçilmez araçlarıdır. Ancak doğru pipet seçimi, uygulamanıza ve iş akışınıza bağlı olarak büyük fark yaratabilir.\n\nTek Kanallı Pipetler:\n• Genel amaçlı kullanım\n• Hassas dozajlama gerektiren uygulamalar\n• 0.1 µL - 10 mL hacim aralığı\n\nÇok Kanallı Pipetler:\n• Yüksek verimlilik gerektiren uygulamalar\n• Mikro plaka çalışmaları\n• 8 veya 12 kanallı seçenekler\n\nElektronik Pipetler:\n• Tekrarlayan dozajlama işlemleri\n• Ergonomik avantaj\n• Programlanabilir protokoller\n\nDoğru pipet seçimi için laboratuvarınızın günlük iş akışını, numune türlerini ve hacim gereksinimlerini değerlendirmeniz önemlidir.\n\nDetaylı bilgi ve karşılaştırma için bizimle iletişime geçin.",
      coverImageUrl: "/uploads/images/news-pipette.jpg",
      publishedAt: new Date("2026-01-20"),
    },
    {
      slug: "pipet-secim-rehberi",
      locale: "en",
      title: "Pipette Selection Guide: Which Pipette Is Right for You?",
      categoryBadge: "GUIDE",
      excerpt: "Single-channel, multi-channel, electronic — a comprehensive guide to choosing the right pipette for your laboratory needs.",
      content: "Pipettes are indispensable tools in almost every laboratory. However, choosing the right pipette can make a big difference depending on your application and workflow.\n\nSingle-Channel Pipettes:\n• General-purpose use\n• Applications requiring precise dosing\n• Volume range of 0.1 µL - 10 mL\n\nMulti-Channel Pipettes:\n• Applications requiring high throughput\n• Microplate work\n• 8 or 12 channel options\n\nElectronic Pipettes:\n• Repetitive dispensing tasks\n• Ergonomic advantage\n• Programmable protocols\n\nTo choose the right pipette, it is important to evaluate your laboratory's daily workflow, sample types, and volume requirements.\n\nContact us for detailed information and comparisons.",
      coverImageUrl: "/uploads/images/news-pipette.jpg",
      publishedAt: new Date("2026-01-20"),
    },
    {
      slug: "pipet-secim-rehberi",
      locale: "de",
      title: "Pipetten-Auswahlratgeber: Welche Pipette ist die richtige für Sie?",
      categoryBadge: "RATGEBER",
      excerpt: "Einkanal, Mehrkanal, elektronisch — ein umfassender Ratgeber zur Auswahl der richtigen Pipette für Ihre Laborbedürfnisse.",
      content: "Pipetten sind in fast jedem Labor unverzichtbare Werkzeuge. Die Wahl der richtigen Pipette kann jedoch je nach Anwendung und Arbeitsablauf einen großen Unterschied machen.\n\nEinkanal-Pipetten:\n• Allgemeine Verwendung\n• Anwendungen, die präzises Dosieren erfordern\n• Volumenbereich von 0,1 µL - 10 mL\n\nMehrkanal-Pipetten:\n• Anwendungen mit hohem Durchsatz\n• Mikroplattenarbeiten\n• 8- oder 12-Kanal-Optionen\n\nElektronische Pipetten:\n• Wiederholende Dosieraufgaben\n• Ergonomischer Vorteil\n• Programmierbare Protokolle\n\nUm die richtige Pipette auszuwählen, ist es wichtig, den täglichen Arbeitsablauf Ihres Labors, die Probentypen und die Volumenanforderungen zu bewerten.\n\nKontaktieren Sie uns für detaillierte Informationen und Vergleiche.",
      coverImageUrl: "/uploads/images/news-pipette.jpg",
      publishedAt: new Date("2026-01-20"),
    },

    // Article 7: 2026 Trendler
    {
      slug: "2026-laboratuvar-teknoloji-trendleri",
      locale: "tr",
      title: "2026 Yılında Laboratuvar Teknolojilerinde Öne Çıkan Trendler",
      categoryBadge: "SEKTÖR",
      excerpt: "Otomasyon, sürdürülebilirlik ve dijitalleşme — 2026'da laboratuvar sektörünü şekillendiren ana trendler.",
      content: "Laboratuvar teknolojileri her geçen yıl daha hızlı gelişiyor. 2026'da öne çıkan trendler:\n\nOtomasyon ve Robotik:\nManuel işlemlerin otomasyonu, hata oranını düşürürken verimliliği artırıyor. Özellikle numune hazırlama ve analiz süreçlerinde robotik çözümler yaygınlaşıyor.\n\nSürdürülebilir Laboratuvar:\nEnerji verimli cihazlar, geri dönüştürülebilir sarf malzemeleri ve karbon ayak izi azaltma hedefleri sektörün gündeminde.\n\nDijital Dönüşüm:\nBulut tabanlı veri yönetimi, IoT sensörleri ve uzaktan izleme sistemleri laboratuvar operasyonlarını dönüştürüyor.\n\nKişiselleştirilmiş Tıp:\nBiyoteknoloji ve genomik alanındaki gelişmeler, laboratuvar ekipmanı talebini artırıyor.\n\nBu trendleri yakından takip ediyor ve müşterilerimize en güncel çözümleri sunuyoruz.",
      coverImageUrl: "/uploads/images/hero-lab.jpg",
      publishedAt: new Date("2026-01-05"),
    },
    {
      slug: "2026-laboratuvar-teknoloji-trendleri",
      locale: "en",
      title: "Emerging Trends in Laboratory Technologies in 2026",
      categoryBadge: "INDUSTRY",
      excerpt: "Automation, sustainability, and digitalization — the main trends shaping the laboratory sector in 2026.",
      content: "Laboratory technologies are advancing faster every year. The emerging trends in 2026:\n\nAutomation and Robotics:\nAutomation of manual processes reduces error rates while increasing efficiency. Robotic solutions are becoming widespread, especially in sample preparation and analysis processes.\n\nSustainable Laboratory:\nEnergy-efficient devices, recyclable consumables, and carbon footprint reduction targets are on the industry's agenda.\n\nDigital Transformation:\nCloud-based data management, IoT sensors, and remote monitoring systems are transforming laboratory operations.\n\nPersonalized Medicine:\nAdvances in biotechnology and genomics are increasing the demand for laboratory equipment.\n\nWe closely follow these trends and offer our customers the most up-to-date solutions.",
      coverImageUrl: "/uploads/images/hero-lab.jpg",
      publishedAt: new Date("2026-01-05"),
    },
    {
      slug: "2026-laboratuvar-teknoloji-trendleri",
      locale: "de",
      title: "Aufkommende Trends in der Labortechnologie im Jahr 2026",
      categoryBadge: "BRANCHE",
      excerpt: "Automatisierung, Nachhaltigkeit und Digitalisierung — die wichtigsten Trends, die den Laborsektor 2026 prägen.",
      content: "Labortechnologien entwickeln sich jedes Jahr schneller. Die aufkommenden Trends im Jahr 2026:\n\nAutomatisierung und Robotik:\nDie Automatisierung manueller Prozesse senkt die Fehlerquote und steigert gleichzeitig die Effizienz. Robotiklösungen verbreiten sich zunehmend, insbesondere bei der Probenvorbereitung und Analyse.\n\nNachhaltiges Labor:\nEnergieeffiziente Geräte, recycelbare Verbrauchsmaterialien und Ziele zur Reduzierung des CO₂-Fußabdrucks stehen auf der Agenda der Branche.\n\nDigitale Transformation:\nCloud-basiertes Datenmanagement, IoT-Sensoren und Fernüberwachungssysteme transformieren den Laborbetrieb.\n\nPersonalisierte Medizin:\nFortschritte in der Biotechnologie und Genomik steigern die Nachfrage nach Laborgeräten.\n\nWir verfolgen diese Trends genau und bieten unseren Kunden die aktuellsten Lösungen.",
      coverImageUrl: "/uploads/images/hero-lab.jpg",
      publishedAt: new Date("2026-01-05"),
    },
  ];

  for (const article of newsArticles) {
    await prisma.newsArticle.upsert({
      where: { slug_locale: { slug: article.slug, locale: article.locale } },
      update: article,
      create: article,
    });
  }
  console.log(`    ✓ ${newsArticles.length} news articles seeded (${newsArticles.length / 3} articles × 3 locales)`);


  // --- Team Members ---
  console.log("  → Team members...");
  const teamMembers = [
    {
      fullName: "Mehmet Ataman",
      title: "Genel Müdür / Geschäftsführer",
      expertiseLabel: "Laboratuvar Ekipmanları & İhracat",
      photoUrl: "/uploads/images/team-placeholder.jpg",
      displayOrder: 1,
    },
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { id: member.displayOrder },
      update: member,
      create: member,
    });
  }
  console.log(`    ✓ ${teamMembers.length} team members seeded`);

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });