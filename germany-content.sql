-- polosim.de CMS sayfaları: Impressum, Datenschutz, Über PoloSim, Kompatibilität
-- Tekrar çalıştırılabilir: önce aynı slug'ları temizler.

DELETE FROM "Page" WHERE country='DE' AND slug IN ('impressum','datenschutz','ueber-polosim','esim-kompatibilitaet');

INSERT INTO "Page" (id, country, title, slug, body, "metaTitle", "metaDescription", "noIndex", status, "createdAt", "updatedAt") VALUES

-- ─── IMPRESSUM ───────────────────────────────────────────
('page-de-impressum', 'DE', 'Impressum', 'impressum',
'<h2>Angaben gemäß § 5 DDG</h2>
<p><strong>Check for Trips GmbH</strong><br>
Hintergasse 6<br>
65428 Rüsselsheim<br>
Deutschland</p>
<h2>Kontakt</h2>
<p>Telefon: +49 6142 3019620<br>
Telefax: +49 6142 173624<br>
E-Mail: info@checkfortrips.de<br>
Support: support@polosim.com</p>
<h2>Umsatzsteuer-ID</h2>
<p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE310315188</p>
<h2>Vertretungsberechtigte Geschäftsführung</h2>
<p>[Geschäftsführer: BITTE ERGÄNZEN]</p>
<h2>Handelsregister</h2>
<p>[Registergericht und HRB-Nummer: BITTE ERGÄNZEN]</p>
<h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
<p>[Name, Anschrift wie oben: BITTE ERGÄNZEN]</p>
<h2>EU-Streitschlichtung</h2>
<p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr/</a>. Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
<p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>',
'Impressum | PoloSim Germany eSIM', 'Impressum und Anbieterkennzeichnung von polosim.de — Check for Trips GmbH, Rüsselsheim.', true, 'PUBLISHED', now(), now()),

-- ─── DATENSCHUTZ ─────────────────────────────────────────
('page-de-datenschutz', 'DE', 'Datenschutzerklärung', 'datenschutz',
'<h2>1. Verantwortlicher</h2>
<p>Check for Trips GmbH, Hintergasse 6, 65428 Rüsselsheim, Deutschland<br>
E-Mail: info@checkfortrips.de</p>
<h2>2. Welche Daten wir verarbeiten</h2>
<p><strong>Server-Logdaten:</strong> Beim Besuch dieser Website verarbeitet unser Hosting-Server automatisch technische Daten (IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browsertyp). Diese Daten sind für den sicheren Betrieb der Website erforderlich (Art. 6 Abs. 1 lit. f DSGVO) und werden nach kurzer Zeit gelöscht.</p>
<p><strong>Kontaktaufnahme:</strong> Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir Ihre Angaben zur Bearbeitung der Anfrage (Art. 6 Abs. 1 lit. b DSGVO).</p>
<h2>3. Kauf und Zahlung über polosim.com</h2>
<p>Der Kauf von eSIM-Tarifen erfolgt nicht auf dieser Website, sondern auf <a href="https://www.polosim.com" target="_blank" rel="noopener">polosim.com</a>. Für die dort verarbeiteten Bestell- und Zahlungsdaten gilt die Datenschutzerklärung von polosim.com.</p>
<h2>4. Cookies</h2>
<p>Diese Website verwendet keine Tracking-Cookies. Technisch notwendige Cookies können für die Grundfunktionen der Seite gesetzt werden (Art. 6 Abs. 1 lit. f DSGVO).</p>
<h2>5. Ihre Rechte</h2>
<p>Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch (Art. 21). Wenden Sie sich dazu an die oben genannte E-Mail-Adresse. Sie haben außerdem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren — zuständig ist der Hessische Beauftragte für Datenschutz und Informationsfreiheit.</p>
<h2>6. Änderungen</h2>
<p>Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an geänderte Rechtslagen oder Änderungen des Dienstes anzupassen.</p>
<p><em>Stand: Juli 2026</em></p>',
'Datenschutzerklärung | PoloSim Germany eSIM', 'Datenschutzerklärung von polosim.de — welche Daten wir verarbeiten und welche Rechte Sie haben.', true, 'PUBLISHED', now(), now()),

-- ─── ÜBER POLOSIM ────────────────────────────────────────
('page-de-ueber', 'DE', 'Über PoloSim', 'ueber-polosim',
'<h2>Wer wir sind</h2>
<p>PoloSim ist die eSIM-Marke der <strong>Check for Trips GmbH</strong> mit Sitz in Rüsselsheim — ein deutsches Unternehmen mit Wurzeln in der Reisebranche. Unsere Mission: mobiles Internet auf Reisen so einfach machen wie das Scannen eines QR-Codes.</p>
<h2>Was wir anbieten</h2>
<ul>
<li><strong>Prepaid eSIM-Datentarife für über 200 Länder</strong> — von Einzelländern bis zu Regionalpaketen (Europa, Asien, Amerika)</li>
<li><strong>Sofortige Lieferung:</strong> QR-Code per E-Mail, direkt nach dem Kauf</li>
<li><strong>Ohne Vertrag:</strong> Prepaid statt Abo — keine Kündigung nötig, keine versteckten Kosten</li>
<li><strong>Faire Erstattung:</strong> 30 Tage Geld-zurück, solange die eSIM nicht installiert wurde</li>
</ul>
<h2>Warum polosim.de?</h2>
<p>Diese Seite bündelt alles rund um eSIM-Tarife, die in Deutschland funktionieren: aktuelle Preise, Schritt-für-Schritt-Anleitungen und ehrliche Antworten auf häufige Fragen. Der Kauf selbst läuft sicher über unsere Hauptplattform <a href="https://www.polosim.com" target="_blank" rel="noopener">polosim.com</a>.</p>
<h2>Kontakt</h2>
<p>Fragen? Unser Support antwortet unter <a href="mailto:support@polosim.com">support@polosim.com</a> — rund um die Uhr.</p>',
'Über PoloSim | Germany eSIM', 'PoloSim ist die eSIM-Marke der Check for Trips GmbH: Prepaid-Datentarife für 200+ Länder, sofort per QR-Code.', false, 'PUBLISHED', now(), now()),

-- ─── KOMPATIBILITÄT ──────────────────────────────────────
('page-de-kompat', 'DE', 'eSIM-Kompatibilität: Welche Handys unterstützen eSIM?', 'esim-kompatibilitaet',
'<p>Bevor du einen eSIM-Tarif kaufst, prüfe kurz, ob dein Smartphone eSIM unterstützt und <strong>ohne SIM-Lock</strong> ist. Hier die Übersicht (Stand 2026):</p>
<h2>Apple iPhone</h2>
<ul>
<li>iPhone XR, XS, XS Max und <strong>alle neueren Modelle</strong> (11, 12, 13, 14, 15, 16, SE ab 2020)</li>
<li>Hinweis: In den USA gekaufte iPhone 14/15/16 sind reine eSIM-Geräte</li>
</ul>
<h2>Samsung Galaxy</h2>
<ul>
<li>Galaxy S20, S21, S22, S23, S24 und neuer</li>
<li>Galaxy Note 20 / Note 20 Ultra</li>
<li>Galaxy Z Fold und Z Flip (alle Generationen)</li>
<li>Galaxy A54/A55 und neuere A-Modelle (je nach Markt — bitte prüfen)</li>
</ul>
<h2>Google Pixel</h2>
<ul>
<li>Pixel 3 und <strong>alle neueren Modelle</strong> (3a, 4, 5, 6, 7, 8, 9, Fold)</li>
</ul>
<h2>Weitere Hersteller</h2>
<ul>
<li>Motorola: Razr-Serie, Edge 40/50 und neuer</li>
<li>Xiaomi: 13/14-Serie und neuer (je nach Markt)</li>
<li>Fairphone 4 und 5</li>
</ul>
<h2>So prüfst du es in 10 Sekunden selbst</h2>
<p>Wähle in der Telefon-App <strong>*#06#</strong> — erscheint eine <strong>EID-Nummer</strong>, unterstützt dein Gerät eSIM.</p>
<p>Alternativ: <em>iPhone:</em> Einstellungen → Mobilfunk → „eSIM hinzufügen". <em>Android:</em> Einstellungen → Netzwerk &amp; Internet → SIMs → „eSIM herunterladen".</p>
<h2>Wichtig: SIM-Lock</h2>
<p>Dein Gerät muss <strong>ohne Netzbetreiber-Sperre (SIM-Lock)</strong> sein. Geräte, die direkt beim Hersteller oder frei im Handel gekauft wurden, sind in der Regel entsperrt.</p>
<p><strong>Gerät kompatibel?</strong> Dann wähle jetzt deinen Tarif: <a href="/packages">Alle Deutschland-Tarife ansehen →</a></p>',
'Welche Handys unterstützen eSIM? Kompatibilitätsliste 2026', 'eSIM-kompatible Geräte 2026: iPhone, Samsung Galaxy, Google Pixel u.v.m. — plus 10-Sekunden-Selbsttest mit *#06#.', false, 'PUBLISHED', now(), now());

SELECT slug, title, status FROM "Page" WHERE country='DE' ORDER BY slug;
