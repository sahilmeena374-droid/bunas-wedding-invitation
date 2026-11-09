import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import { scrollScrubScenes, scrollScrubTheme } from "@/scroll-scrub-scenes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
  component: Index,
});

type ProgrammeItem = { name: string; date: string; time: string; nameEn: string; dateEn: string; timeEn: string; note?: string };

const programme24: ProgrammeItem[] = [
  { name: "पीला चावल / लग्न", date: "सोमवार, 16 नवम्बर 2026", time: "प्रातः 9:15 बजे", nameEn: "Yellow Rice / Lagna", dateEn: "Monday, 16 November 2026", timeEn: "9:15 AM" },
  { name: "तान सांकड़ी", date: "गुरुवार, 20 नवम्बर 2026", time: "प्रातः 11:15 बजे", nameEn: "Taan Sankadi", dateEn: "Thursday, 20 November 2026", timeEn: "11:15 AM" },
  { name: "महिला संगीत", date: "सोमवार, 23 नवम्बर 2026", time: "सायं 7:15 बजे से", nameEn: "Ladies’ Sangeet", dateEn: "Monday, 23 November 2026", timeEn: "From 7:15 PM" },
  { name: "चाक-भात", date: "मंगलवार, 24 नवम्बर 2026", time: "प्रातः 10:15 बजे", nameEn: "Chak-Bhaat", dateEn: "Tuesday, 24 November 2026", timeEn: "10:15 AM" },
  { name: "प्रीतिभोज", date: "मंगलवार, 24 नवम्बर 2026", time: "दोपहर 2:15 बजे से", nameEn: "Wedding Feast", dateEn: "Tuesday, 24 November 2026", timeEn: "From 2:15 PM" },
  { name: "बारात स्वागत", date: "मंगलवार, 24 नवम्बर 2026", time: "सायं 6:15 बजे", nameEn: "Baraat Welcome", dateEn: "Tuesday, 24 November 2026", timeEn: "6:15 PM" },
  { name: "पाणिग्रहण संस्कार", date: "मंगलवार, 24 नवम्बर 2026", time: "रात्रि के शुभ मुहूर्त में", nameEn: "Wedding Ceremony", dateEn: "Tuesday, 24 November 2026", timeEn: "At the auspicious night muhurat" },
];

const programme26: ProgrammeItem[] = [
  { name: "पीला चावल / लग्न", date: "बुधवार, 18 नवम्बर 2026", time: "प्रातः 10:15 बजे", nameEn: "Yellow Rice / Lagna", dateEn: "Wednesday, 18 November 2026", timeEn: "10:15 AM" },
  { name: "तान सांकड़ी", date: "बुधवार, 25 नवम्बर 2026", time: "प्रातः 10:15 बजे", nameEn: "Taan Sankadi", dateEn: "Wednesday, 25 November 2026", timeEn: "10:15 AM" },
  { name: "महिला संगीत", date: "बुधवार, 25 नवम्बर 2026", time: "सायं 7:15 बजे से", nameEn: "Ladies’ Sangeet", dateEn: "Wednesday, 25 November 2026", timeEn: "From 7:15 PM" },
  { name: "पाणिग्रहण संस्कार", date: "गुरुवार, 26 नवम्बर 2026", time: "रात्रि के शुभ मुहूर्त में", nameEn: "Wedding Ceremony", dateEn: "Thursday, 26 November 2026", timeEn: "At the auspicious night muhurat" },
];

const mapUrl = "https://maps.app.goo.gl/RpCJTvWam1HsaEjS9?g_st=aw";
const invitationUrl = "https://bunara-wedding-invitation.higgsfield.app";
const shareMessage = "बुनस परिवार का स्नेहिल निमंत्रण 🙏\nतीनों शुभ विवाहों का पूरा निमंत्रण, कार्यक्रम, समय और विवाह स्थल देखने के लिए इस लिंक पर जाएँ:";

async function shareInvitation(lang: "hi" | "en") {
  const shareData = {
    title: lang === "hi" ? "बुनस परिवार — शुभ विवाह निमंत्रण" : "Bunas Family — Wedding Invitation",
    text: lang === "hi" ? shareMessage : "The Bunas Family warmly invites you. View all wedding details, programmes, timings and venue here:",
    url: invitationUrl,
  };

  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
    }
  }

  try {
    await navigator.clipboard.writeText(invitationUrl);
    window.alert("पूरी विवाह वेबसाइट का लिंक कॉपी हो गया है। अब इसे WhatsApp या किसी भी ऐप में साझा कर सकते हैं।");
  } catch {
    const fallbackMessage = lang === "hi" ? shareMessage : "The Bunas Family warmly invites you. View the complete wedding invitation, programme and venue here:";
    const whatsappUrl = "https://wa.me/?text=" + encodeURIComponent(`${fallbackMessage}\n${invitationUrl}`);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }
}

function Programme({ items, lang }: { items: ProgrammeItem[]; lang: "hi" | "en" }) {
  return (
    <ol className="programme-list">
      {items.map((item, index) => (
        <li className="programme-item" key={`${item.name}-${item.date}`}>
          <span className="programme-index">{String(index + 1).padStart(2, "0")}</span>
          <div className="programme-main">
            <h3>{lang === "hi" ? item.name : item.nameEn}</h3>
            <p>{lang === "hi" ? item.date : item.dateEn}</p>
          </div>
          <span className="programme-time">{lang === "hi" ? item.time : item.timeEn}</span>
        </li>
      ))}
    </ol>
  );
}

function Index() {
  const [lang, setLang] = useState<"hi" | "en">("hi");
  const english = lang === "en";
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const scenes = english ? [{ ...scrollScrubScenes[0], label: "Welcome", kicker: "With the blessings of Lord Ganesha · Bunas Family", title: "Wedding Invitation", body: "Three wedding celebrations, two auspicious dates in November, and a heartfelt invitation from the Bunas Family.", tags: ["24 November 2026", "26 November 2026"] }] : scrollScrubScenes;
  const t = (hi: string, en: string) => english ? en : hi;
  return (
    <main className={`wedding-site${english ? " lang-en" : " lang-hi"}`}>
      <header className="site-nav">
        <a className="nav-mark" href="#top" aria-label={t("बुनस परिवार विवाह निमंत्रण का मुख्य पृष्ठ", "Bunas Family wedding invitation home")}>श्री</a>
        <a className="nav-family" href="#top">{t("बुनस परिवार", "Bunas Family")} <span>·</span> {t("शुभ विवाह", "Wedding Invitation")}</a>
        <nav aria-label={t("मुख्य मेन्यू", "Main menu")}>
          <a href="#invitation">{t("निमंत्रण", "Invitation")}</a>
          <a href="#celebrations">{t("शुभ कार्यक्रम", "Events")}</a>
          <a href="#venue">{t("विवाह स्थल", "Venue")}</a>
        </nav>
        <button className="language-toggle" type="button" onClick={() => setLang(english ? "hi" : "en")} aria-label={t("Switch to English", "हिंदी में देखें")}>{english ? "हिंदी" : "EN"}</button>
        <button className="nav-share" type="button" onClick={() => shareInvitation(lang)}>{t("साझा करें", "Share")} <span aria-hidden="true">↗</span></button>
      </header>

      <div id="top" className="hero-wrap">
        <ScrollScrub scenes={scenes} theme={scrollScrubTheme} />
        <div className="hero-bottomline" aria-hidden="true">
          <span>{t("बुनस परिवार", "Bunas Family")}</span>
          <span>{t("राजस्थान · भारत", "Rajasthan · India")}</span>
        </div>
      </div>

      <section className="intro-band" id="invitation">
        <div className="section-number">01 <span>· {t("स्नेहिल निमंत्रण", "A Warm Invitation")}</span></div>
        <div className="intro-copy">
          <p className="eyebrow">{t("श्री गणेश जी के आशीर्वाद से", "With the blessings of Lord Ganesha")}</p>
          <h2>{english ? <>With joy and celebration,<br /><em>you are cordially invited.</em></> : <>हर्ष और उल्लास के साथ,<br /><em>आप सादर आमंत्रित हैं।</em></>}</h2>
          <p className="intro-lede">{t("बुनस परिवार आपको एवं आपके परिजनों को तीन शुभ विवाह समारोहों में स्नेहपूर्वक आमंत्रित करता है।", "The Bunas Family warmly invites you and your family to celebrate three auspicious wedding ceremonies.")}</p>
        </div>
        <div className="date-stamp">
          <span>{t("शुभ विवाह समारोह", "Wedding Celebrations")}</span>
          <strong>24 <small>{t("एवं", "&")}</small> 26</strong>
          <span>{t("नवम्बर 2026", "November 2026")}</span>
        </div>
      </section>

      <section className="cover-reproduction">
        <div className="cover-frame">
          <div className="cover-topline"><span>{t("॥ श्री गणेशाय नमः ॥", "॥ With the blessings of Lord Ganesha ॥")}</span><span>{t("बुनस परिवार", "Bunas Family")}</span></div>
          <div className="cover-ganesha"><img src="/assets/brand/ganesha-mark.png" alt={t("मूल निमंत्रण पत्र से गणेश जी का प्रतीक", "Ganesha medallion from the original invitation")} /></div>
          <p className="cover-script">{t("शुभ विवाह", "Wedding Invitation")}</p>
          <div className="couple-trio">
            <article className="cover-couple">
              <span className="cover-label">{t("मंगलवार · 24 नवम्बर 2026", "Tuesday · 24 November 2026")}</span>
              <h3>{english ? <>Nisha <i>&</i> Rohit</> : <>निशा <i>एवं</i> रोहित</>}</h3>
              <p>{t("रोहित (ख्याली)", "Rohit (Khyali)")}</p>
            </article>
            <article className="cover-couple">
              <span className="cover-label">{t("मंगलवार · 24 नवम्बर 2026", "Tuesday · 24 November 2026")}</span>
              <h3>{english ? <>Vandana <i>&</i> Kartik</> : <>वंदना <i>एवं</i> कार्तिक</>}</h3>
              <p>{t("वंदना · कार्तिक", "Vandana · Kartik")}</p>
            </article>
            <article className="cover-couple">
              <span className="cover-label">{t("गुरुवार · 26 नवम्बर 2026", "Thursday · 26 November 2026")}</span>
              <h3>{english ? <>Kishor <i>&</i> Anuradha</> : <>किशोर <i>एवं</i> अनुराधा</>}</h3>
              <p>{t("किशोर (करण)", "Kishor (Karan)")}</p>
            </article>
          </div>
          <div className="cover-feast">{t("प्रीतिभोज · मंगलवार, 24 नवम्बर 2026", "Wedding Feast · Tuesday, 24 November 2026")}</div>
          <p className="cover-footer">{t("बुनस परिवार का स्नेहिल निमंत्रण", "A heartfelt invitation from the Bunas Family")}</p>
        </div>
        <div className="cover-caption">
          <span>{t("भाग 1", "Part 1")}</span>
          <p>{t("परिवार और प्रियजनों के साथ साझा करने के लिए सुसज्जित डिजिटल निमंत्रण।", "A digital invitation designed to share with family and loved ones.")}</p>
          <a className="source-card-link" href="/assets/print/cover-original.jpg" target="_blank" rel="noreferrer">
            <img src="/assets/print/cover-original.jpg" alt={t("मूल मुद्रित विवाह निमंत्रण का मुखपृष्ठ", "Front of the original printed Hindi wedding invitation")} loading="lazy" />
            <span>{t("मूल निमंत्रण पत्र देखें ↗", "View original printed card (Hindi) ↗")}</span>
          </a>
        </div>
      </section>

      <section className="inside-section" aria-labelledby="inside-title">
        <div className="section-number">02 <span>· {t("भाग 2 · भीतरी निमंत्रण", "Part 2 · Inside Invitation")}</span></div>
        <div className="inside-heading">
          <p className="eyebrow">{t("तीन जोड़े · दो शुभ विवाह तिथियाँ", "Three Couples · Two Wedding Dates")}</p>
          <h2 id="inside-title">{english ? <>Three auspicious unions,<br /><em>one joyful celebration.</em></> : <>तीन मंगल परिणय,<br /><em>एक साथ उत्सव।</em></>}</h2>
        </div>
        <div className="inside-pages">
          <article className="inside-page">
            <div className="page-ornament">✳</div>
            <p className="page-kicker">{t("मंगलवार · 24 नवम्बर 2026", "Tuesday · 24 November 2026")}</p>
            <h3>{english ? <>Nisha <span>&</span> Rohit</> : <>निशा <span>एवं</span> रोहित</>}</h3>
            <p className="hindi-names">{t("सौ. का. निशा · चि. रोहित (ख्याली)", "Nisha · Rohit (Khyali)")}</p>
            <div className="page-divider"><span>❧</span></div>
            <h3>{english ? <>Vandana <span>&</span> Kartik</> : <>वंदना <span>एवं</span> कार्तिक</>}</h3>
            <p className="hindi-names">{t("सौ. का. वंदना · चि. कार्तिक", "Vandana · Kartik")}</p>
            <div className="page-bottom">{t("॥ मंगल परिणय ॥", "॥ Wedding Blessings ॥")}</div>
            <p className="page-note">{t("आप सपरिवार पधारकर नवयुगलों को अपना स्नेह एवं आशीर्वाद प्रदान करें।", "Please join us with your family and bless the couples with your love and good wishes.")}</p>
          </article>
          <article className="inside-page inside-page-alt">
            <div className="page-ornament">✳</div>
            <p className="page-kicker">{t("गुरुवार · 26 नवम्बर 2026", "Thursday · 26 November 2026")}</p>
            <h3>{english ? <>Kishor <span>&</span> Anuradha</> : <>किशोर <span>एवं</span> अनुराधा</>}</h3>
            <p className="hindi-names">{t("चि. किशोर (करण) · सौ. का. अनुराधा", "Kishor (Karan) · Anuradha")}</p>
            <div className="page-divider"><span>❧</span></div>
            <p className="page-blessing">{t("श्री विनायक जी महाराज की असीम अनुकम्पा से", "By the infinite grace of Lord Vinayak")}</p>
            <div className="page-bottom">{t("॥ मंगल परिणय ॥", "॥ Wedding Blessings ॥")}</div>
            <p className="page-note">{t("आपकी गरिमामयी उपस्थिति एवं शुभाशीष की हार्दिक अभिलाषा है।", "We would be honoured by your gracious presence and blessings.")}</p>
          </article>
        </div>
        <div className="printed-spread">
          <a href="/assets/print/inside-original-upright.jpg" target="_blank" rel="noreferrer">
            <img src="/assets/print/inside-original-upright.jpg" alt={t("दोनों कार्यक्रमों सहित मूल मुद्रित निमंत्रण पत्र", "Inside pages of the original printed Hindi wedding invitation")} loading="lazy" />
          </a>
          <p className="inside-footnote">{t("डिजिटल निमंत्रण के साथ मूल दो-पृष्ठीय निमंत्रण पत्र।", "The original two-page printed invitation is included for reference.")}</p>
        </div>
      </section>

      <section className="celebrations-section" id="celebrations">
        <div className="section-number">03 <span>· {t("मांगलिक कार्यक्रम", "Wedding Programme")}</span></div>
        <div className="celebrations-title">
          <p className="eyebrow">{t("आइए, शुभ अवसर के साक्षी बनें", "Join us in celebrating")}</p>
          <h2>{english ? <>Be part of these <em>auspicious celebrations.</em></> : <>शुभ अवसरों के <em>साक्षी बनें।</em></>}</h2>
          <p>{t("नीचे दिए गए सभी समय मूल निमंत्रण पत्र के अनुसार हैं। विवाह संस्कार कार्ड में उल्लिखित शुभ मुहूर्त में सम्पन्न होंगे।", "All timings below follow the printed invitation. Wedding ceremonies will take place at the auspicious muhurat stated on the card.")}</p>
        </div>
        <div className="programme-grid">
          <article className="programme-card">
            <div className="programme-card-head">
              <span className="date-day">24</span>
              <div><span className="date-month">{t("नवम्बर 2026", "November 2026")}</span><h3>{t("निशा-रोहित एवं वंदना-कार्तिक", "Nisha–Rohit & Vandana–Kartik")}</h3><p>{t("मंगलवार · दो विवाह", "Tuesday · Two weddings")}</p></div>
            </div>
            <Programme items={programme24} lang={lang} />
            <div className="procession-note"><strong>{t("सायं 5:15 बजे", "5:15 PM")}</strong><span>{t("बारात मंडावरा से कोटड़ी धायलान पहुँचेगी।", "The baraat will arrive in Kotdi Dhayalan from Mandawara.")}</span></div>
          </article>
          <article className="programme-card programme-card-second">
            <div className="programme-card-head">
              <span className="date-day">26</span>
              <div><span className="date-month">{t("नवम्बर 2026", "November 2026")}</span><h3>{t("किशोर एवं अनुराधा", "Kishor & Anuradha")}</h3><p>{t("गुरुवार · एक विवाह", "Thursday · One wedding")}</p></div>
            </div>
            <Programme items={programme26} lang={lang} />
            <div className="procession-note"><strong>{t("दोपहर 2:15 बजे", "2:15 PM")}</strong><span>{t("बारात कोटड़ी धायलान से भगवानपुरा (चिपलाटा) के लिए प्रस्थान करेगी।", "The baraat will depart from Kotdi Dhayalan for Bhagwanpura (Chipalata).")}</span></div>
          </article>
        </div>
      </section>

      <section className="venue-section" id="venue">
        <div className="venue-copy">
          <div className="section-number">04 <span>· {t("विवाह स्थल", "Wedding Venue")}</span></div>
          <p className="eyebrow">{t("आपकी उपस्थिति ही हमारा आशीर्वाद है", "Your presence is our blessing")}</p>
          <h2>{english ? <>We look forward to welcoming you<br /><em>in Kotdi Dhayalan.</em></> : <>आपसे भेंट होगी<br /><em>कोटड़ी धायलान में।</em></>}</h2>
          <p className="venue-address">{english ? <>Kotdi Dhayalan<br />Sikar · Rajasthan<br />India</> : <>कोटड़ी धायलान<br />सीकर मार्ग · जिला सीकर<br />राजस्थान, भारत</>}</p>
          <a className="map-link" href={mapUrl} target="_blank" rel="noreferrer">{t("विवाह स्थल का रास्ता देखें", "Get directions to the venue")} <span>↗</span></a>
          <p className="map-caption">{t("यह मार्ग मूल निमंत्रण पत्र पर दिए गए क्यूआर कोड से लिया गया है।", "Directions are taken from the QR code printed on the original invitation.")}</p>
        </div>
        <div className="venue-art" aria-hidden="true">
          <div className="venue-sun" />
          <div className="venue-line venue-line-one" />
          <div className="venue-line venue-line-two" />
          <div className="venue-label">{t("सीकर · राजस्थान", "Sikar · Rajasthan")}</div>
          <div className="venue-pin">✦</div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-ganesha"><img src="/assets/brand/ganesha-mark.png" alt={t("गणेश जी का प्रतीक", "Ganesha medallion")} /></div>
        <p className="eyebrow">{t("॥ श्री गणेशाय नमः ॥", "॥ With the blessings of Lord Ganesha ॥")}</p>
        <h2>{english ? <>With warm regards,<br /><em>The Bunas Family.</em></> : <>स्नेह सहित,<br /><em>बुनस परिवार।</em></>}</h2>
        <p className="footer-invite">{t("बुनस परिवार का स्नेहिल निमंत्रण", "A heartfelt invitation from the Bunas Family")}</p>
        <button className="footer-share" type="button" onClick={() => shareInvitation(lang)}>{t("पूरी वेबसाइट साझा करें", "Share the full website")} <span>↗</span></button>
        <div className="footer-bottom"><span>{t("24 एवं 26 नवम्बर 2026", "24 & 26 November 2026")}</span><span>{t("परिवार और प्रियजनों के लिए स्नेहपूर्वक निर्मित", "Made with love for family and friends")}</span></div>
      </footer>
    </main>
  );
}
