/* ============================================================
   Reiseführer AIDAnova · Hamburg – Kopenhagen – Oslo – Kristiansand
   31.12.2026 – 09.01.2027
   ============================================================ */

/* Ausgangspunkte je Ort – die Routen starten am jeweiligen Liegeplatz
   bzw. in Hamburg am Hotel (Novotel Hamburg City Alster). */
const BASES = {
  hamburg: { name: "Novotel Hamburg City Alster", hint: "an eurem Hotel (Novotel, Lübecker Straße)", mapsName: "Novotel Hamburg City Alster, Lübecker Straße 3, 22087 Hamburg", lat: 53.5591, lng: 10.0248 },
  steinwerder: { name: "Cruise Center Steinwerder", hint: "am Cruise Center Steinwerder", mapsName: "Cruise Center Steinwerder, Buchheisterstraße 16, Hamburg", lat: 53.5294, lng: 9.9613 },
  kopenhagen: { name: "Oceankaj Kopenhagen", hint: "am Liegeplatz Oceankaj", mapsName: "Oceankaj, København", lat: 55.7181, lng: 12.6291 },
  oslo: { name: "Kreuzfahrt-Liegeplatz Oslo", hint: "am Liegeplatz Oslo", mapsName: "Søndre Akershuskai, Oslo", lat: 59.9047, lng: 10.7392 },
  kristiansand: { name: "Kreuzfahrt-Liegeplatz Kristiansand", hint: "am Liegeplatz Kristiansand", mapsName: "Kristiansand cruise terminal", lat: 58.1378, lng: 7.9935 },
};

/* Kinderwagen-Hinweise (im Winter: Schnee und Glätte mitdenken) */
const STROLLER = {
  yes:     { label: "Kinderwagen ok",    emoji: "🛒", cls: "stroller-yes" },
  careful: { label: "Pflaster/Steigung", emoji: "⚠",  cls: "stroller-careful" },
  no:      { label: "Trage besser",      emoji: "🤱", cls: "stroller-no" },
};

/* Generisches SVG-Bild für Essen & Trinken */
const FOOD_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#e2e3f0"/>
        <stop offset="1" stop-color="#b9bfe2"/>
      </linearGradient>
    </defs>
    <rect width="320" height="200" fill="url(#g)"/>
    <g transform="translate(160 100)" fill="none" stroke="#27306b" stroke-width="3" stroke-linecap="round">
      <circle r="42" fill="#f8f8fd"/>
      <circle r="30" stroke-width="2"/>
      <path d="M -55 0 L -42 0 M -50 -10 L -50 10 M -47 -10 L -47 10 M -44 -10 L -44 10"/>
      <path d="M 55 0 L 42 0 M 49 -10 Q 60 -5 60 10"/>
    </g>
    <text x="160" y="170" text-anchor="middle" font-family="Cormorant Garamond, serif" font-style="italic" font-size="20" fill="#27306b">Guten Appetit · Velbekomme</text>
  </svg>`);

/* Bilder (Wikimedia Commons, alle geprüft) */
const IMG = {
  aidanova: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/AIDAnova_%28ship%2C_2018%29_in_the_port_of_Hamburg_%28cropped%29.jpg/1280px-AIDAnova_%28ship%2C_2018%29_in_the_port_of_Hamburg_%28cropped%29.jpg",
  aidanova2: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/AIDAnova_29-04-2024.jpg/1280px-AIDAnova_29-04-2024.jpg",
  aidanova3: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/AIDAnova_4405.jpg/1280px-AIDAnova_4405.jpg",
  landungsbruecken: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Landungsbr%C3%BCcken.wmt.jpg",
  elphi: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Elbphilharmonie_2025.jpg/1280px-Elbphilharmonie_2025.jpg",
  speicherstadt: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Speicherstadt_abends.jpg/1280px-Speicherstadt_abends.jpg",
  wunderland: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Miniatur_wunderland.jpg/1280px-Miniatur_wunderland.jpg",
  rathaus_hh: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Hamburg_Rathausmarkt_und_Rathaus.jpg/1280px-Hamburg_Rathausmarkt_und_Rathaus.jpg",
  michel: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Hamburg-Michaeliskirche-Hafen.jpg/1280px-Hamburg-Michaeliskirche-Hafen.jpg",
  alster: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Binnenalster_b.jpg/1280px-Binnenalster_b.jpg",
  elbtunnel: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Alter_Elbtunnel_Hamburg_menschenleer.jpg/1280px-Alter_Elbtunnel_Hamburg_menschenleer.jpg",
  hafencity: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Projekt_Hei%C3%9Fluftballon_-_Highflyer_-IMG-1414.jpg/1280px-Projekt_Hei%C3%9Fluftballon_-_Highflyer_-IMG-1414.jpg",
  cruisecenter: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Hamburg_Cruise_Center_Steinwerder_12.JPG/1280px-Hamburg_Cruise_Center_Steinwerder_12.JPG",
  nyhavn: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/The_Nyhavn_Canal_3.jpg/1280px-The_Nyhavn_Canal_3.jpg",
  amalienborg: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Amalienborg_Palace_%28cropped%29.jpg/1280px-Amalienborg_Palace_%28cropped%29.jpg",
  marmor: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Marmor_kirken%2C_K%C3%B6penhamn_juli_2003.jpg",
  kastellet: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Kastellet_aerial.jpg/1280px-Kastellet_aerial.jpg",
  rundetaarn: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Copenhagen_-_Rundet%C3%A5rn_-_2013.jpg/1280px-Copenhagen_-_Rundet%C3%A5rn_-_2013.jpg",
  stroeget: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Str%C3%B8get%2C_Copenhagen.jpg/1280px-Str%C3%B8get%2C_Copenhagen.jpg",
  torvehallerne: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Blick_auf_die_Markthallen.jpg/1280px-Blick_auf_die_Markthallen.jpg",
  christiansborg: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Christiansborg_Slot_Copenhagen_2014_01.jpg/1280px-Christiansborg_Slot_Copenhagen_2014_01.jpg",
  christianshavn: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Christianshavns_Kanal_-_Kayaks.jpg/1280px-Christianshavns_Kanal_-_Kayaks.jpg",
  opera_osl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Oslo_Opera_House_-_2025.jpg/1280px-Oslo_Opera_House_-_2025.jpg",
  akershus: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/14-09-02-oslo-RalfR-370.jpg/1280px-14-09-02-oslo-RalfR-370.jpg",
  rathaus_osl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Lh%C3%B4tel_de_ville_dOslo_%284854168964%29.jpg/1280px-Lh%C3%B4tel_de_ville_dOslo_%284854168964%29.jpg",
  akerbrygge: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Oslo_Aker_Brygge_2005_June_19.jpg/1280px-Oslo_Aker_Brygge_2005_June_19.jpg",
  munch: "https://upload.wikimedia.org/wikipedia/commons/7/71/The_new_Munch_Museum_%28white_color_sign%29.jpg",
  vigeland: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Vigeland_Sculpture_Park_-_Panoramic_view_towards_the_Monolith%2C_Oslo%2C_Norway.jpg/1280px-Vigeland_Sculpture_Park_-_Panoramic_view_towards_the_Monolith%2C_Oslo%2C_Norway.jpg",
  holmenkollen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Bakken2.jpg/1280px-Bakken2.jpg",
  fram: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Fram_Museum_building%2C_February_2018.jpg/1280px-Fram_Museum_building%2C_February_2018.jpg",
  karljohan: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Karl_Johans_gate_sett_fra_Akersgata%2C_Oslo.jpg/1280px-Karl_Johans_gate_sett_fra_Akersgata%2C_Oslo.jpg",
  schloss_osl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Slottet_i_Oslo_1.jpg/1280px-Slottet_i_Oslo_1.jpg",
  nasjonalmuseet: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Nye_Nasjonalmuseet_%282022%29_%282%29.jpg/1280px-Nye_Nasjonalmuseet_%282022%29_%282%29.jpg",
  kunstsilo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Kunstsilo_art_museum_Kristiansand_1.jpg/1280px-Kunstsilo_art_museum_Kristiansand_1.jpg",
  kilden: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Kilden_Performing_Arts_Centre_3.jpg/1280px-Kilden_Performing_Arts_Centre_3.jpg",
  posebyen: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Posebyen_i_Kristiansand.jpg/1280px-Posebyen_i_Kristiansand.jpg",
  christiansholm: "https://upload.wikimedia.org/wikipedia/commons/9/98/Christiansholm_festning_twierdza1_ks_ubt.jpg",
  dom_krs: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Kristiansand_domkirke_Agder_3.jpg/1280px-Kristiansand_domkirke_Agder_3.jpg",
  fiskebrygga: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Fiskebrygga_Kristiansand_1.jpg/1280px-Fiskebrygga_Kristiansand_1.jpg",
  markens: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Markens_gate-2013.JPG/1280px-Markens_gate-2013.JPG",
  gravane: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Gravanekanalen_16.jpg/1280px-Gravanekanalen_16.jpg",
};

/* ============================================================
   TAGE
   Felder je Station: name, mapsName, desc, image | illu, lat, lng,
     stroller, transit, viewpoint, time, onboard, badges, ticketUrl, inRoute
   Je Tag: base (Schlüssel aus BASES), route { fromBase, mode } oder noRoute
   ============================================================ */
const ZONES = [
  /* ---------------------------------------------------------- */
  {
    id: "silvester",
    tag: "Do 31.12. · Anreise",
    title: "Ankunft & Silvester in Hamburg",
    summary: "Morgens Flug nach Hamburg, Gepäck abstellen, Rathaus und Alster ansehen, mittags ausruhen – und abends ins neue Jahr: Feuerwerk über Elbe und Alster.",
    walkFromHotel: "Ab Hotel ca. 25 Min. zu Fuß oder U3 bis Rathaus",
    image: IMG.landungsbruecken,
    base: "hamburg",
    noteLabel: "🚆 Anreise &amp; Silvester",
    transportNote: "Flug um 07:00 Uhr ab Stuttgart, Landung gegen 08:10 Uhr. Euer Hotel ist das <strong>Novotel Hamburg City Alster</strong> (Lübecker Straße 3) direkt an der U-Bahn-Station <em>Lübecker Straße</em>. Vom Flughafen: <strong>Taxi</strong> in rund 20–25 Minuten (mit Gepäck am bequemsten) oder <strong>S1</strong> bis Hauptbahnhof und weiter mit der <strong>U3</strong> zwei Stationen bis <em>Lübecker Straße</em>. <strong>Check-in erst ab 15 Uhr</strong> – das Gepäck könnt ihr vormittags an der Rezeption abgeben und nach einem frühen Zimmer fragen. In die Innenstadt sind es rund 25 Minuten zu Fuß über St. Georg oder wenige Minuten mit der U3. <strong>Silvester mit Kleinkind:</strong> An den Landungsbrücken und am Stintfang ist der Blick am besten, dort ist es aber auch am vollsten. Ruhiger ist die <strong>Binnenalster</strong>. Von den U-Bahn-Stationen Landungsbrücken und Baumwall sieht man wegen Sichtblenden nichts, und der Alte Elbtunnel ist nachts gesperrt. Ob es 2026/27 Feuerwerks-Verbotszonen gibt, steht kurz vorher auf hamburg.de.",
    route: { fromBase: true, mode: "walking" },
    sights: [
      {
        name: "Hamburger Rathaus",
        mapsName: "Hamburger Rathaus, Rathausmarkt 1, Hamburg",
        desc: "Neorenaissance-Prachtbau am Rathausmarkt, Sitz von Senat und Bürgerschaft. Der Innenhof mit dem Hygieia-Brunnen ist frei zugänglich und ein guter erster Halt.",
        image: IMG.rathaus_hh,
        lat: 53.5503, lng: 9.9926,
        stroller: "yes",
        transit: "U3 Rathaus · 10 Min. zu Fuß ab Hbf",
        badges: ["Innenhof frei", "Führungen: an Feiertagen prüfen"],
      },
      {
        name: "Binnenalster & Jungfernstieg",
        mapsName: "Jungfernstieg, Hamburg",
        desc: "Flanierpromenade am Wasser, direkt neben dem Rathaus. An Silvester die <strong>familienfreundlichere Alternative</strong> zu den Landungsbrücken: weiter Blick über das Wasser, mehr Platz und kurze Wege zurück.",
        image: IMG.alster,
        lat: 53.5521, lng: 9.9934,
        stroller: "yes",
        viewpoint: true,
        transit: "U1/U2/S1 Jungfernstieg",
        badges: ["Silvester-Tipp mit Kind", "Breite Wege"],
      },
      {
        name: "St. Michaelis („Michel“)",
        mapsName: "Hauptkirche St. Michaelis, Englische Planke 1, Hamburg",
        desc: "Hamburgs Wahrzeichen. Ein <strong>Aufzug</strong> fährt auf die Aussichtsplattform in rund 106 Metern Höhe – der beste Rundblick über Hafen und Stadt, auch mit Kinderwagen erreichbar.",
        image: IMG.michel,
        lat: 53.5484, lng: 9.9789,
        stroller: "careful",
        viewpoint: true,
        transit: "S1/S3 Stadthausbrücke",
        badges: ["Turm mit Aufzug", "Silvester: Zeiten verkürzt"],
        ticketUrl: "https://www.st-michaelis.de/",
      },
      {
        name: "Landungsbrücken",
        mapsName: "St. Pauli Landungsbrücken, Hamburg",
        desc: "Die schwimmenden Anleger am Elbufer – an Silvester der berühmteste Feuerwerks-Spot Hamburgs, entsprechend voll. Tagsüber der Startpunkt für Hafenrundfahrten und Fischbrötchen.",
        image: IMG.landungsbruecken,
        lat: 53.5456, lng: 9.9704,
        stroller: "careful",
        viewpoint: true,
        transit: "U3/S1/S3 Landungsbrücken",
        badges: ["Silvester sehr voll", "Rampen je nach Tide steil"],
      },
    ],
    restaurants: [
      {
        name: "Daniel Wischer",
        mapsName: "Daniel Wischer, Spitalerstraße, Hamburg",
        desc: "Hamburgs ältester Fischbrater (seit 1924), zwischen Hauptbahnhof und Rathaus. Backfisch mit Kartoffelsalat – unkompliziert und schnell, gut für den Anreisetag.",
        lat: 53.5509, lng: 10.0006,
        price: "12–20 € / Gericht",
        badges: ["Fisch-Klassiker", "Nahe Hbf"],
      },
      {
        name: "Café Paris",
        mapsName: "Café Paris, Rathausstraße, Hamburg",
        desc: "Französische Brasserie in einer alten Schlachterei mit Jugendstil-Kacheln, direkt am Rathaus. Für ein frühes Silvester-Abendessen reservieren.",
        lat: 53.5497, lng: 9.9944,
        price: "18–32 € / Hauptgericht",
        badges: ["Silvester: reservieren", "Schönes Ambiente"],
      },
      {
        name: "Old Commercial Room",
        mapsName: "Old Commercial Room, Englische Planke, Hamburg",
        desc: "Traditionsrestaurant gegenüber dem Michel, bekannt für Labskaus – das Seemannsgericht aus Corned Beef, Kartoffeln und Roter Bete. Passt gut zur bevorstehenden Seereise.",
        lat: 53.5481, lng: 9.9784,
        price: "20–35 € / Hauptgericht",
        badges: ["Labskaus probieren", "Reservieren"],
      },
    ],
  },

  /* ---------------------------------------------------------- */
  {
    id: "neujahr",
    tag: "Fr 01.01. · Neujahr",
    title: "Elbphilharmonie, Speicherstadt & Miniatur Wunderland",
    summary: "Ausschlafen, dann auf die Plaza der Elbphilharmonie, durch die HafenCity und die Speicherstadt – und um 13 Uhr ins Miniatur Wunderland.",
    walkFromHotel: "U3 ab Lübecker Straße direkt bis Baumwall",
    image: IMG.speicherstadt,
    base: "hamburg",
    noteLabel: "🗓️ Neujahrstag",
    transportNote: "Am Neujahrstag sind Läden geschlossen und viele Lokale öffnen spät oder gar nicht – plant das Essen deshalb grob vor. Vom Hotel fährt die <strong>U3</strong> ab <em>Lübecker Straße</em> ohne Umsteigen bis <em>Baumwall</em> – gegenüber der Elbphilharmonie (ca. 15 Min.). <strong>Miniatur Wunderland um 13:00 Uhr:</strong> Tickets gibt es nur mit Zeitfenster – laut eurem Reiseplan ist die Buchungsbestätigung noch offen, das bitte unbedingt vorher erledigen. Rechnet mit 2–3 Stunden. Die Plaza der Elbphilharmonie ist mit Gratis-Ticket vor Ort zugänglich (online gegen kleine Gebühr reservierbar); ob und wie lange sie an Neujahr öffnet, steht auf elbphilharmonie.de.",
    route: { fromBase: true, mode: "transit" },
    sights: [
      {
        name: "Elbphilharmonie – Plaza",
        mapsName: "Elbphilharmonie, Platz der Deutschen Einheit 1, Hamburg",
        desc: "Die gebogene Rolltreppe „Tube“ bringt euch auf die öffentliche Plaza in 37 Metern Höhe. Ein Rundgang außen herum bietet den Blick über Hafen, Elbe und Stadt.",
        image: IMG.elphi,
        lat: 53.5413, lng: 9.9842,
        stroller: "yes",
        viewpoint: true,
        time: "ca. 10:30",
        transit: "U3 Baumwall · U4 Überseequartier",
        badges: ["Plaza-Ticket gratis", "Neujahr: Zeiten prüfen", "Aufzüge vorhanden"],
        ticketUrl: "https://www.elbphilharmonie.de/de/plaza",
      },
      {
        name: "HafenCity & Marco-Polo-Terrassen",
        mapsName: "Marco-Polo-Terrassen, Hamburg",
        desc: "Hamburgs neuestes Viertel, mit breiten Promenaden direkt am Wasser. Die Marco-Polo-Terrassen sind stufenförmig zur Elbe abgetreppt – über Rampen auch mit Kinderwagen gut erreichbar.",
        image: IMG.hafencity,
        lat: 53.5405, lng: 9.9931,
        stroller: "yes",
        time: "ca. 11:30",
        badges: ["Kostenlos", "Promenaden am Wasser"],
      },
      {
        name: "Speicherstadt",
        mapsName: "Speicherstadt, Hamburg",
        desc: "Rote Backsteinspeicher auf Eichenpfählen, verbunden durch Fleete und Brücken. Am schönsten ist der Blick vom Wasserschloss am Holländischbrookfleet. Ab der Dämmerung sind die Speicher angestrahlt.",
        image: IMG.speicherstadt,
        lat: 53.5440, lng: 9.9870,
        stroller: "careful",
        time: "ca. 12:15",
        badges: ["UNESCO-Welterbe", "Teils Kopfsteinpflaster"],
      },
      {
        name: "Miniatur Wunderland",
        mapsName: "Miniatur Wunderland, Kehrwieder 2, Hamburg",
        desc: "Die größte Modelleisenbahn der Welt: ganze Länder im Maßstab 1:87, ein Flughafen mit startenden Flugzeugen, Tag- und Nachtwechsel. Für Kleinkinder ein Fest – Kinderwagen sind erlaubt, es gibt Aufzüge.",
        image: IMG.wunderland,
        lat: 53.5438, lng: 9.9889,
        stroller: "yes",
        time: "13:00 (geplant)",
        badges: ["Zeitfenster-Ticket", "Buchung noch offen!", "2–3 Std. einplanen"],
        ticketUrl: "https://www.miniatur-wunderland.de/",
      },
    ],
    restaurants: [
      {
        name: "Störtebeker Elbphilharmonie",
        mapsName: "Störtebeker Elbphilharmonie, Hamburg",
        desc: "Brauhaus-Restaurant direkt in der Elbphilharmonie, mit norddeutscher Küche und Blick auf den Hafen. Praktisch, weil ihr ohnehin dort seid.",
        lat: 53.5414, lng: 9.9845,
        price: "16–28 € / Hauptgericht",
        badges: ["In der Elbphilharmonie", "Neujahr: prüfen"],
      },
      {
        name: "Fleetschlösschen",
        mapsName: "Fleetschlösschen, Brooktorkai, Hamburg",
        desc: "Winziges ehemaliges Zollhaus am Fleet, heute ein Café mit wenigen Plätzen. Für einen Kaffee oder eine Suppe zwischen Speicherstadt und Wunderland.",
        lat: 53.5432, lng: 9.9978,
        price: "5–14 € / Snack",
        badges: ["Sehr klein", "Speicherstadt"],
      },
      {
        name: "Restaurant im Miniatur Wunderland",
        mapsName: "Miniatur Wunderland Restaurant, Hamburg",
        desc: "Im Wunderland selbst gibt es Gastronomie – praktisch mit Kleinkind, weil ihr den Besuch für eine Pause nicht unterbrechen müsst.",
        lat: 53.5438, lng: 9.9889,
        price: "8–16 € / Gericht",
        badges: ["Ohne Unterbrechung", "Mit Kind praktisch"],
      },
    ],
  },

  /* ---------------------------------------------------------- */
  {
    id: "einschiffung",
    tag: "Sa 02.01. · Einschiffung",
    title: "Hafen, Elbtunnel & Leinen los",
    summary: "Vormittags Hafenrundfahrt und Alter Elbtunnel, dann mit dem Gepäck zum Cruise Center Steinwerder. Check-in 15–16 Uhr, um 19 Uhr legt die AIDAnova ab.",
    walkFromHotel: "U3 direkt zu den Landungsbrücken, Taxi zum Terminal",
    image: IMG.aidanova,
    base: "hamburg",
    noteLabel: "🚢 Einschiffung",
    transportNote: "<strong>Ablauf:</strong> Im Novotel ist <strong>Check-out bis 12 Uhr</strong> – also morgens auschecken und die Koffer an der Rezeption lassen. Mit der <strong>U3</strong> geht es ohne Umsteigen von <em>Lübecker Straße</em> zu den <em>Landungsbrücken</em> (ca. 17 Min.). Gegen 13:30 Uhr zurück zum Hotel, Gepäck holen und mit dem <strong>Taxi</strong> zum Terminal (ca. 20–25 Min.). <strong>Check-in 15:00–16:00 Uhr</strong> am <strong>Cruise Center Steinwerder</strong> (Kronprinzkai, Buchheisterstraße 16, 20457 Hamburg) auf der Südseite der Elbe. Die Vormittagsrunde endet am Alten Elbtunnel; von dessen Südausgang ist das Terminal noch rund 2 km entfernt, daher steht es nicht in der Fußroute. Plant den Check-in lieber früh im Zeitfenster, damit ihr die Kabine in Ruhe beziehen könnt. <strong>Abfahrt 19:00 Uhr</strong> – das Auslaufen bei Nacht ist ein Höhepunkt.",
    route: { fromBase: true, mode: "transit" },
    sights: [
      {
        name: "Hafenrundfahrt ab Landungsbrücken",
        mapsName: "St. Pauli Landungsbrücken Brücke 1, Hamburg",
        desc: "Eine Stunde mit der Barkasse zwischen Containerriesen, Docks und – bei passendem Wasserstand – durch die Fleete der Speicherstadt. Ein guter Vorgeschmack auf die Schiffsreise.",
        image: IMG.landungsbruecken,
        lat: 53.5456, lng: 9.9704,
        stroller: "careful",
        time: "ca. 10:30",
        transit: "U3 ab Lübecker Straße, ohne Umsteigen",
        badges: ["Witterungsabhängig", "Barkasse: Kinderwagen falten"],
      },
      {
        name: "Alter Elbtunnel",
        mapsName: "St. Pauli Elbtunnel, Hamburg",
        desc: "426 Meter unter der Elbe hindurch, in 24 Metern Tiefe. Fußgänger fahren mit großen Aufzügen hinunter – mit Kinderwagen problemlos. Vom Südufer habt ihr den klassischen Blick auf die Landungsbrücken.",
        image: IMG.elbtunnel,
        lat: 53.5459, lng: 9.9666,
        stroller: "yes",
        viewpoint: true,
        time: "ca. 12:00",
        badges: ["Kostenlos für Fußgänger", "Aufzüge", "Nachts gesperrt"],
      },
      {
        name: "Cruise Center Steinwerder",
        mapsName: "Cruise Center Steinwerder, Buchheisterstraße 16, Hamburg",
        desc: "Hier geht es an Bord. Gepäck wird am Terminal abgegeben und zur Kabine gebracht – nehmt alles für die ersten Stunden (Wickeltasche, Medikamente, Jacke) ins Handgepäck.",
        image: IMG.cruisecenter,
        lat: 53.5294, lng: 9.9613,
        stroller: "yes",
        time: "15:00–16:00 Check-in",
        badges: ["Ausweise bereithalten", "Taxi ab Hotel ca. 20–25 Min."],
        inRoute: false,
      },
      {
        name: "Auslaufen auf der Elbe",
        desc: "Um 19 Uhr legt die AIDAnova ab. Geht an Deck: Elbphilharmonie, Landungsbrücken und Blankenese ziehen beleuchtet vorbei. Warm anziehen – auf der Elbe ist es im Januar windig und kalt.",
        illu: { emoji: "🌃", label: "Leinen los · 19:00", from: "#1b2152", to: "#40509a" },
        onboard: true,
        stroller: "yes",
        time: "19:00",
        badges: ["Warme Kleidung", "Mützen nicht vergessen"],
      },
    ],
    restaurants: [
      {
        name: "Brücke 10",
        mapsName: "Brücke 10, Landungsbrücken, Hamburg",
        desc: "Der Fischbrötchen-Klassiker direkt auf den Landungsbrücken – Matjes, Bismarck, Krabben. Schnell und ideal vor dem Check-in.",
        lat: 53.5454, lng: 9.9719,
        price: "5–12 € / Brötchen",
        badges: ["Fischbrötchen", "Schnell"],
      },
      {
        name: "Blockbräu",
        mapsName: "Blockbräu, Bei den St. Pauli-Landungsbrücken, Hamburg",
        desc: "Hausbrauerei über den Landungsbrücken mit großem Fensterblick auf den Hafen. Deftige norddeutsche Küche, viel Platz für eine Gruppe.",
        lat: 53.5458, lng: 9.9690,
        price: "15–26 € / Hauptgericht",
        badges: ["Hafenblick", "Viel Platz"],
      },
      {
        name: "Erstes Abendessen an Bord",
        mapsName: "Cruise Center Steinwerder, Hamburg",
        desc: "Nach dem Check-in sind die Buffet-Restaurants an Bord geöffnet – im Reisepreis enthalten, ohne Reservierung. Danach rechtzeitig an Deck fürs Auslaufen.",
        lat: 53.5294, lng: 9.9613,
        price: "inklusive",
        badges: ["Buffet inklusive", "Vor 19 Uhr essen"],
      },
    ],
  },

  /* ---------------------------------------------------------- */
  {
    id: "seetag1",
    tag: "So 03.01. · Seetag",
    title: "Erster Seetag – das Schiff entdecken",
    summary: "Ein ganzer Tag an Bord der AIDAnova: Theatrium, Beach Club unter dem Folien-Dach, Studio X, Mini Club für den Kleinen – und abends die erste große Show.",
    walkFromHotel: "Den ganzen Tag an Bord",
    image: IMG.aidanova2,
    noRoute: true,
    noteLabel: "⚓ An Bord",
    transportNote: "<strong>Tipps für den ersten Seetag:</strong> Das Tagesprogramm steht in der <strong>AIDA-App</strong> (myAIDA) – am Vorabend durchsehen und Favoriten markieren. <strong>À-la-carte-Restaurants</strong> und Shows mit Platzvergabe gleich am ersten Tag in der App reservieren, an Seetagen sind sie schnell ausgebucht. Für den <strong>Mini Club</strong> (6–36 Monate) ist eine Eingewöhnung nötig – den Termin früh buchen, dann habt ihr an den Hafentagen und am zweiten Seetag freie Stunden. Auf Nordsee und Skagerrak kann es im Januar Seegang geben: Wer empfindlich ist, fragt im Bordhospital oder an der Rezeption nach Mitteln gegen Seekrankheit.",
    sights: [
      {
        name: "Theatrium",
        desc: "Das Herz des Schiffs: eine runde Bühne über drei Decks, mitten im Schiff. Tagsüber Quiz, Bingo und Vorträge, abends die großen Produktionsshows – an Seetagen gibt es das dichteste Programm.",
        illu: { emoji: "🎭", label: "Theatrium", from: "#3a1f5c", to: "#7a3d8f" },
        onboard: true,
        stroller: "yes",
        time: "ganztags · Shows abends",
        badges: ["Plätze früh sichern", "Programm in der App"],
      },
      {
        name: "Beach Club",
        desc: "Strandatmosphäre unter einem lichtdurchlässigen Foliendach – deshalb auch im norwegischen Winter nutzbar. Liegen, Pool, Bar und Livemusik; abends wird es zur Partyfläche.",
        illu: { emoji: "🏖️", label: "Beach Club", from: "#0f6b7a", to: "#3fb4b0" },
        onboard: true,
        stroller: "yes",
        time: "tagsüber am schönsten",
        badges: ["Wetterunabhängig", "Abends Party"],
      },
      {
        name: "Mini Club & Kids Club",
        desc: "Der <strong>Mini Club</strong> betreut Kinder von 6 bis 36 Monaten – genau richtig für euren Sohn. Ab 3 Jahren gibt es den Kids Club. Eltern-Kind-Spielzeiten sind kostenlos, die Betreuung kostet extra.",
        illu: { emoji: "🧸", label: "Mini Club", from: "#c0567a", to: "#f2a07b" },
        onboard: true,
        stroller: "yes",
        time: "Eingewöhnung am 1. Tag",
        badges: ["6–36 Monate", "Eingewöhnung 15 €", "Betreuung 10 €/Std."],
      },
      {
        name: "Studio X",
        desc: "Das erste TV-Studio auf See: Live-Shows, Quizformate und Talkrunden mit Publikum. Ein guter Programmpunkt für den Abend, wenn der Kleine schläft und zwei von euch frei haben.",
        illu: { emoji: "📺", label: "Studio X", from: "#1b2152", to: "#c0392b" },
        onboard: true,
        stroller: "yes",
        time: "abends",
        badges: ["Quizshows", "Programm in der App"],
      },
      {
        name: "Four Elements",
        desc: "Kletterpark und Wasserrutschen über mehrere Decks am Heck. Im Januar auf der Nordsee ist der Außenbereich wetterabhängig und kann geschlossen sein – an einem ruhigen, trockenen Tag aber ein Erlebnis.",
        illu: { emoji: "🧗", label: "Four Elements", from: "#1f5c3a", to: "#5bb37a" },
        onboard: true,
        stroller: "no",
        time: "wetterabhängig",
        badges: ["Klettern ab 6 J. / 140 cm", "Im Winter oft zu"],
      },
      {
        name: "Mystery Room",
        desc: "Escape-Room an Bord: Als Team Rätsel lösen, um wieder herauszukommen. Ideal für zwei oder drei Erwachsene, während der Kleine im Mini Club oder beim Mittagsschlaf ist.",
        illu: { emoji: "🔐", label: "Mystery Room", from: "#2a2a2a", to: "#6b5b3a" },
        onboard: true,
        stroller: "no",
        time: "mit Reservierung",
        badges: ["Gegen Aufpreis", "In der App buchen"],
      },
    ],
    restaurants: [
      {
        name: "Buffet-Restaurants",
        desc: "Fünf Buffet-Restaurants mit wechselnden Themen sind im Reisepreis enthalten – ohne Reservierung. Mit Kleinkind am entspanntesten zu Randzeiten.",
        price: "inklusive",
        badges: ["Keine Reservierung", "Hochstühle vorhanden"],
        onboard: true,
      },
      {
        name: "Sushi, Steakhouse & Teppanyaki",
        desc: "Sushi House, Churrascaria Steakhouse, Teppanyaki Asia Grill und das Gourmet-Restaurant Rossini kosten Aufpreis und brauchen eine Reservierung – an Seetagen früh in der App buchen.",
        price: "Aufpreis",
        badges: ["Reservierung nötig", "Seetag = früh buchen"],
        onboard: true,
      },
      {
        name: "Bars & Lounges",
        desc: "Lanai Bar für den Nachmittag, Hemingway Lounge mit Bücherregalen für ruhige Stunden, Rock Box mit Livemusik am Abend. Getränke kosten extra, sofern ihr kein Paket gebucht habt.",
        price: "Getränke extra",
        badges: ["Lanai Bar", "Hemingway Lounge"],
        onboard: true,
      },
    ],
  },

  /* ---------------------------------------------------------- */
  {
    id: "kopenhagen",
    tag: "Mo 04.01. · Kopenhagen",
    title: "Kopenhagen – Nyhavn, Königsschloss & Rundetårn",
    summary: "09:00 bis 18:00 Uhr. Von der Kleinen Meerjungfrau über Amalienborg nach Nyhavn, dann durch die Fußgängerzone zum Runden Turm und in die Markthallen.",
    walkFromHotel: "Shuttle oder Bus 25 + Metro, in der Stadt zu Fuß",
    image: IMG.nyhavn,
    base: "kopenhagen",
    noteLabel: "📍 Landgang Kopenhagen",
    transportNote: "Die AIDAnova liegt in Kopenhagen meist am <strong>Oceankaj</strong> – rund 6–8 km außerhalb. Zu Fuß ist das nicht sinnvoll. Optionen: <strong>AIDA-Shuttle</strong> (fuhr zuletzt zur Kleinen Meerjungfrau bzw. in Richtung Zentrum; Preis und Haltestelle in der App), <strong>Bus 25</strong> zur Metrostation Orientkaj und weiter mit der <strong>M4</strong>, oder Taxi. Die Route unten beginnt deshalb an der Meerjungfrau. <strong>Montags im Januar zu:</strong> Rosenborg, Nationalmuseum und Glyptotek – und der <strong>Tivoli</strong> hat seine Wintersaison am 3. Januar beendet. Sonnenuntergang gegen 15:50 Uhr. Gezahlt wird in Kronen (DKK), Karte geht praktisch überall. Die genaue „Alle an Bord“-Zeit steht im Tagesprogramm.",
    route: { fromBase: false, mode: "walking" },
    sights: [
      {
        name: "Kastellet & Kleine Meerjungfrau",
        mapsName: "Den lille Havfrue, Langelinie, København",
        desc: "Die nur 1,25 m kleine Bronzefigur sitzt auf einem Stein an der Uferpromenade Langelinie. Gleich dahinter liegt das <strong>Kastellet</strong>, eine fünfeckige Sternfestung mit Wällen, Windmühle und roten Kasernen – frei zugänglich und schön für einen Rundgang.",
        image: IMG.kastellet,
        lat: 55.6929, lng: 12.5993,
        stroller: "yes",
        time: "ca. 09:45",
        badges: ["Kostenlos", "Wälle: leichte Steigung"],
      },
      {
        name: "Marmorkirche",
        mapsName: "Frederiks Kirke, Frederiksgade 4, København",
        desc: "Die runde Kirche mit einer der größten Kuppeln Skandinaviens liegt in Sichtachse zum Königsschloss. Der Innenraum ist meist frei zugänglich.",
        image: IMG.marmor,
        lat: 55.6850, lng: 12.5896,
        stroller: "careful",
        time: "ca. 11:00",
        badges: ["Eintritt frei", "Stufen am Eingang"],
      },
      {
        name: "Amalienborg",
        mapsName: "Amalienborg Slotsplads, København",
        desc: "Vier gleiche Rokokopalais um einen achteckigen Platz – die Winterresidenz der Königsfamilie. Um <strong>12:00 Uhr</strong> ist täglich Wachablösung der Leibgarde mit Bärenfellmützen.",
        image: IMG.amalienborg,
        lat: 55.6840, lng: 12.5932,
        stroller: "yes",
        time: "12:00 Wachablösung",
        badges: ["Platz kostenlos", "Wachablösung 12 Uhr"],
      },
      {
        name: "Nyhavn",
        mapsName: "Nyhavn, København",
        desc: "Der bunte Hafenkanal mit Holzschiffen und Giebelhäusern – das Postkartenmotiv Kopenhagens. Guter Ort für die Mittagspause; die Lokale direkt am Kanal sind teurer als eine Straße weiter.",
        image: IMG.nyhavn,
        lat: 55.6797, lng: 12.5909,
        stroller: "careful",
        time: "ca. 12:30",
        badges: ["Kopfsteinpflaster", "Fotospot"],
      },
      {
        name: "Christiansborg",
        mapsName: "Christiansborg Slot, København",
        desc: "Parlament, Regierungssitz und Oberstes Gericht unter einem Dach. Der Turm ist der höchste der Stadt und kostenlos – im Winter sind die Öffnungszeiten aber eingeschränkt, montags vorher prüfen.",
        image: IMG.christiansborg,
        lat: 55.6757, lng: 12.5800,
        stroller: "yes",
        viewpoint: true,
        time: "ca. 13:45",
        badges: ["Turm kostenlos", "Montags prüfen"],
      },
      {
        name: "Strøget",
        mapsName: "Amagertorv, København",
        desc: "Eine der längsten Fußgängerzonen Europas zieht sich vom Rathausplatz bis Kongens Nytorv. Am Amagertorv mit dem Storchenbrunnen liegen die Designläden von Illums Bolighus und Royal Copenhagen.",
        image: IMG.stroeget,
        lat: 55.6788, lng: 12.5790,
        stroller: "yes",
        time: "ca. 14:15",
        badges: ["Autofrei", "Shopping"],
      },
      {
        name: "Rundetårn",
        mapsName: "Rundetårn, Købmagergade 52A, København",
        desc: "Statt Treppen führt eine <strong>spiralförmige Rampe</strong> nach oben – mit Kinderwagen also machbar. Oben wartet ein Rundblick über die Dächer der Altstadt.",
        image: IMG.rundetaarn,
        lat: 55.6814, lng: 12.5758,
        stroller: "yes",
        viewpoint: true,
        time: "ca. 14:45",
        badges: ["Rampe statt Treppe", "Kleiner Eintritt"],
        ticketUrl: "https://www.rundetaarn.dk/",
      },
      {
        name: "Torvehallerne",
        mapsName: "Torvehallerne, Frederiksborggade 21, København",
        desc: "Zwei gläserne Markthallen mit rund 60 Ständen: Smørrebrød, Fisch, Kaffee, Gebäck. Warm, überdacht und ideal für den letzten Snack, bevor es zurück zum Schiff geht.",
        image: IMG.torvehallerne,
        lat: 55.6839, lng: 12.5696,
        stroller: "yes",
        time: "ca. 15:30",
        badges: ["Überdacht", "Metro Nørreport"],
      },
      {
        name: "Christianshavn (Alternative)",
        mapsName: "Christianshavns Kanal, København",
        desc: "Kanalviertel nach Amsterdamer Vorbild mit Hausbooten und der Erlöserkirche mit ihrer Außenwendeltreppe. Eine ruhigere Alternative, falls euch die Innenstadt zu voll ist.",
        image: IMG.christianshavn,
        lat: 55.6724, lng: 12.5908,
        stroller: "careful",
        badges: ["Optional", "Ruhiger"],
        inRoute: false,
      },
    ],
    restaurants: [
      {
        name: "Schønnemann",
        mapsName: "Restaurant Schønnemann, Hauser Plads, København",
        desc: "Smørrebrød-Institution seit 1877 in einem gemütlichen Kellerlokal – das dänische belegte Roggenbrot in klassischer Form. Nur mittags geöffnet, Reservierung sinnvoll.",
        lat: 55.6821, lng: 12.5735,
        price: "120–200 DKK / Teller",
        badges: ["Seit 1877", "Mittags", "Reservieren"],
      },
      {
        name: "Hallernes Smørrebrød",
        mapsName: "Hallernes Smørrebrød, Torvehallerne, København",
        desc: "Smørrebrød zum Mitnehmen oder an der Theke in den Torvehallerne – schneller und günstiger als im Restaurant und gut mit Kleinkind.",
        lat: 55.6839, lng: 12.5696,
        price: "60–110 DKK / Stück",
        badges: ["Schnell", "In den Markthallen"],
      },
      {
        name: "Lagkagehuset",
        mapsName: "Lagkagehuset, København",
        desc: "Dänische Bäckereikette mit Filialen in der ganzen Innenstadt. Probiert eine Kanelsnegl (Zimtschnecke) oder ein Tebirkes – perfekt für die Kaffeepause.",
        lat: 55.6790, lng: 12.5800,
        price: "30–60 DKK / Gebäck",
        badges: ["Zimtschnecken", "Mehrere Filialen"],
      },
    ],
  },

  /* ---------------------------------------------------------- */
  {
    id: "oslo1",
    tag: "Di 05.01. · Oslo ab 14:00",
    title: "Oslo am Nachmittag – Oper, MUNCH & Festung",
    summary: "Ankunft um 14 Uhr, die AIDAnova bleibt über Nacht. Erst aufs Dach der Oper, dann ins MUNCH-Museum und abends über die Festung zur Aker Brygge.",
    walkFromHotel: "Alles zu Fuß ab Liegeplatz (ca. 1 km ins Zentrum)",
    image: IMG.opera_osl,
    base: "oslo",
    noteLabel: "📍 Landgang",
    transportNote: "Von den Kreuzfahrt-Liegeplätzen in Oslo sind es rund <strong>1 km bzw. 15 Minuten</strong> ins Zentrum. Welcher Kai es genau wird (Søndre Akershuskai, Revierkaia oder Filipstad), steht kurz vorher in der AIDA-App – die Route startet vorläufig an der Akershuskai. <strong>Wichtig:</strong> Die Sonne geht gegen 15:25 Uhr unter. Nach der Ankunft habt ihr nur gut eine Stunde Tageslicht – deshalb zuerst das Opernhaus. Das MUNCH hat dienstags bis 18 Uhr geöffnet. Da das Schiff über Nacht bleibt, könnt ihr abends in Ruhe in der Stadt essen. Gezahlt wird in Norwegischen Kronen (NOK); Norwegen ist nahezu bargeldlos.",
    route: { fromBase: true, mode: "walking" },
    sights: [
      {
        name: "Opernhaus Oslo",
        mapsName: "Operahuset, Kirsten Flagstads plass 1, Oslo",
        desc: "Wie ein Eisberg aus weißem Marmor ragt die Oper aus dem Fjord. Über die schrägen Dachflächen kann man bis ganz nach oben gehen. Bei Eis und Schnee sind Teile des Dachs gesperrt – dann ist der untere Bereich trotzdem sehenswert.",
        image: IMG.opera_osl,
        lat: 59.9075, lng: 10.7527,
        stroller: "careful",
        viewpoint: true,
        time: "ca. 14:30 (vor Sonnenuntergang)",
        badges: ["Dach kostenlos", "Bei Eis rutschig"],
      },
      {
        name: "MUNCH",
        mapsName: "MUNCH, Edvard Munchs plass 1, Oslo",
        desc: "Das 13-stöckige Museum gleich neben der Oper zeigt das Werk Edvard Munchs – darunter wechselnd Fassungen von „Der Schrei“. Aus den oberen Etagen blickt ihr über Fjord und Stadt. Dienstags 10–18 Uhr.",
        image: IMG.munch,
        lat: 59.9056, lng: 10.7552,
        stroller: "yes",
        viewpoint: true,
        time: "ca. 15:30–17:30",
        badges: ["Di bis 18 Uhr", "Aufzüge", "Bei Dunkelheit ideal"],
        ticketUrl: "https://www.munch.no/en/",
      },
      {
        name: "Festung Akershus",
        mapsName: "Akershus festning, Oslo",
        desc: "Mittelalterliche Burg und Festung über dem Hafen, bis heute militärisch genutzt. Das Gelände ist abends beleuchtet und frei zugänglich – ein stimmungsvoller Spaziergang mit Blick auf den Fjord.",
        image: IMG.akershus,
        lat: 59.9061, lng: 10.7377,
        stroller: "careful",
        viewpoint: true,
        time: "ca. 17:45",
        badges: ["Gelände kostenlos", "Kopfsteinpflaster"],
      },
      {
        name: "Rathaus Oslo",
        mapsName: "Oslo rådhus, Rådhusplassen 1, Oslo",
        desc: "Der Backsteinbau mit den zwei Türmen ist das Wahrzeichen am Hafen. Hier wird jedes Jahr am 10. Dezember der Friedensnobelpreis verliehen.",
        image: IMG.rathaus_osl,
        lat: 59.9121, lng: 10.7337,
        stroller: "yes",
        time: "ca. 18:15",
        badges: ["Außen jederzeit", "Innen tagsüber prüfen"],
      },
      {
        name: "Aker Brygge",
        mapsName: "Aker Brygge, Oslo",
        desc: "Ehemaliges Werftgelände, heute Promenade mit Restaurants direkt am Wasser. Der natürliche Ort für das Abendessen am ersten Oslo-Abend.",
        image: IMG.akerbrygge,
        lat: 59.9099, lng: 10.7250,
        stroller: "yes",
        time: "Abendessen",
        badges: ["Promenade", "Viele Restaurants"],
      },
      {
        name: "Karl Johans gate",
        mapsName: "Karl Johans gate, Oslo",
        desc: "Osloer Hauptstraße vom Bahnhof bis zum Schloss, abends hell beleuchtet. Vorbei am Parlament (Storting) und dem Nationaltheater – ein schöner Rückweg zum Schiff.",
        image: IMG.karljohan,
        lat: 59.9158, lng: 10.7319,
        stroller: "yes",
        time: "Abendspaziergang",
        badges: ["Fußgängerzone", "Beleuchtet"],
      },
    ],
    restaurants: [
      {
        name: "Vippa",
        mapsName: "Vippa, Akershusstranda 25, Oslo",
        desc: "Food-Hall in einer alten Hafenhalle auf der Landzunge Vippetangen – ganz nah an den Kreuzfahrtkais. Verschiedene Stände von norwegisch bis international, entspannte Atmosphäre.",
        lat: 59.9038, lng: 10.7432,
        price: "150–250 NOK / Gericht",
        badges: ["Nah am Schiff", "Viel Auswahl"],
      },
      {
        name: "Lofoten Fiskerestaurant",
        mapsName: "Lofoten Fiskerestaurant, Aker Brygge, Oslo",
        desc: "Fischrestaurant am Ende der Aker Brygge mit Blick auf den Fjord. Norwegischer Fisch in klassischer Zubereitung – für ein besonderes Abendessen reservieren.",
        lat: 59.9086, lng: 10.7231,
        price: "350–500 NOK / Hauptgericht",
        badges: ["Fisch", "Reservieren"],
      },
      {
        name: "Fiskeriet Youngstorget",
        mapsName: "Fiskeriet Youngstorget, Oslo",
        desc: "Fischladen und einfaches Lokal: Fish &amp; Chips und Fischsuppe, schnell und vergleichsweise günstig – für norwegische Verhältnisse.",
        lat: 59.9153, lng: 10.7495,
        price: "180–300 NOK / Gericht",
        badges: ["Fish & Chips", "Unkompliziert"],
      },
    ],
  },

  /* ---------------------------------------------------------- */
  {
    id: "oslo2",
    tag: "Mi 06.01. · Oslo bis 18:00",
    title: "Oslo am Tag – Holmenkollen, Vigeland & Schloss",
    summary: "Ein ganzer Tag mit Tageslicht: morgens mit der U-Bahn hinauf zur Holmenkollen-Schanze, mittags durch den verschneiten Vigelandpark, nachmittags Schloss und Nationalmuseum.",
    walkFromHotel: "U-Bahn (T-bane) Linie 1, sonst zu Fuß",
    image: IMG.holmenkollen,
    base: "oslo",
    noteLabel: "📍 Landgang",
    transportNote: "Tageslicht von etwa 9:15 bis 15:30 Uhr – Holmenkollen deshalb am Vormittag, wenn der Blick am klarsten ist. Die <strong>T-bane Linie 1</strong> (Richtung Frognerseteren) fährt ab Jernbanetorget bzw. Nationaltheatret in rund 25 Minuten zur Station <em>Holmenkollen</em>. Zurück bis <em>Majorstuen</em>, von dort sind es wenige Minuten zum Vigelandpark. Tickets am einfachsten über die <strong>Ruter-App</strong>. Die Fähre nach Bygdøy fährt im Winter nicht – zum Frammuseum geht es mit <strong>Bus 30</strong>. Abfahrt 18:00 Uhr: Seid rechtzeitig vor der „Alle an Bord“-Zeit zurück.",
    route: { fromBase: true, mode: "transit" },
    sights: [
      {
        name: "Holmenkollen",
        mapsName: "Holmenkollbakken, Kongeveien 5, Oslo",
        desc: "Die berühmte Skisprungschanze über der Stadt. Im Sprungturm liegt das Skimuseum, oben eine Aussichtsplattform mit Blick über Oslo und den Fjord. Im Januar oft verschneit – entsprechend festes Schuhwerk.",
        image: IMG.holmenkollen,
        lat: 59.9644, lng: 10.6668,
        stroller: "careful",
        viewpoint: true,
        time: "ca. 09:30–11:30",
        transit: "T-bane 1 bis Holmenkollen",
        badges: ["Skimuseum + Turm", "Schnee: Trage praktisch"],
        ticketUrl: "https://www.holmenkollen.com/en",
      },
      {
        name: "Vigelandpark",
        mapsName: "Vigelandsparken, Oslo",
        desc: "Über 200 Skulpturen von Gustav Vigeland, die alle Lebensalter zeigen – vom Baby bis zum Greis. Im Schnee besonders eindrucksvoll. Rund um die Uhr geöffnet und kostenlos.",
        image: IMG.vigeland,
        lat: 59.9266, lng: 10.7017,
        stroller: "careful",
        time: "ca. 12:00",
        transit: "T-bane bis Majorstuen",
        badges: ["Kostenlos", "Immer offen", "Wege evtl. vereist"],
      },
      {
        name: "Königliches Schloss",
        mapsName: "Det kongelige slott, Slottsplassen 1, Oslo",
        desc: "Das Stadtschloss am oberen Ende der Karl Johans gate, umgeben vom Schlosspark. Täglich um 13:30 Uhr findet die Wachablösung statt.",
        image: IMG.schloss_osl,
        lat: 59.9172, lng: 10.7276,
        stroller: "yes",
        time: "13:30 Wachablösung",
        badges: ["Außen kostenlos", "Wachablösung 13:30"],
      },
      {
        name: "Nationalmuseum",
        mapsName: "Nasjonalmuseet, Brynjulf Bulls plass 3, Oslo",
        desc: "Das größte Kunstmuseum der nordischen Länder, 2022 eröffnet. Hier hängt die gemalte Fassung von Munchs „Der Schrei“ von 1893, dazu Design, Kunsthandwerk und Gegenwartskunst.",
        image: IMG.nasjonalmuseet,
        lat: 59.9112, lng: 10.7297,
        stroller: "yes",
        time: "ca. 14:30–16:30",
        badges: ["„Der Schrei“", "Aufzüge", "Zeiten prüfen"],
        ticketUrl: "https://www.nasjonalmuseet.no/en/",
      },
      {
        name: "Frammuseum (Alternative)",
        mapsName: "Frammuseet, Bygdøynesveien 39, Oslo",
        desc: "Hier steht das Polarschiff „Fram“, mit dem Nansen und Amundsen in die Arktis und Antarktis fuhren – man kann an Bord gehen. Eine gute Alternative zum Nationalmuseum, wenn ihr lieber Schiffe als Gemälde seht.",
        image: IMG.fram,
        lat: 59.9034, lng: 10.6996,
        stroller: "yes",
        transit: "Bus 30 nach Bygdøy",
        badges: ["Optional", "Für Schiffsfans"],
        ticketUrl: "https://frammuseum.no/",
        inRoute: false,
      },
    ],
    restaurants: [
      {
        name: "Frognerseteren",
        mapsName: "Frognerseteren Restaurant, Oslo",
        desc: "Historisches Holzhaus-Restaurant oberhalb von Holmenkollen, eine Station weiter mit der T-bane. Berühmt für seinen Apfelkuchen – und den Blick über die Stadt.",
        lat: 59.9771, lng: 10.6767,
        price: "100–300 NOK",
        badges: ["Apfelkuchen", "Aussicht"],
      },
      {
        name: "Mathallen Oslo",
        mapsName: "Mathallen Oslo, Vulkan 5, Oslo",
        desc: "Überdachte Markthalle mit Ständen und kleinen Restaurants – von norwegischem Käse bis Tapas. Etwas abseits der Route, aber warm und vielseitig.",
        lat: 59.9221, lng: 10.7520,
        price: "150–300 NOK / Gericht",
        badges: ["Überdacht", "Viel Auswahl"],
      },
      {
        name: "Baker Hansen",
        mapsName: "Baker Hansen, Oslo",
        desc: "Bäckereikette mit Filialen in der ganzen Stadt. Probiert eine Skolebolle (Hefebrötchen mit Vanillecreme und Kokos) – ein norwegischer Klassiker.",
        lat: 59.9140, lng: 10.7380,
        price: "40–80 NOK / Gebäck",
        badges: ["Skolebolle", "Mehrere Filialen"],
      },
    ],
  },

  /* ---------------------------------------------------------- */
  {
    id: "kristiansand",
    tag: "Do 07.01. · Kristiansand",
    title: "Kristiansand – Holzhäuser, Festung & Kunstsilo",
    summary: "08:00 bis 18:00 Uhr in Norwegens südlichster Großstadt: alte weiße Holzhäuser in Posebyen, die runde Festung am Wasser, der Fischmarkt und das neue Kunstsilo.",
    walkFromHotel: "Alles zu Fuß ab Liegeplatz",
    image: IMG.posebyen,
    base: "kristiansand",
    noteLabel: "📍 Landgang",
    transportNote: "Kristiansand ist klein und flach: Vom Liegeplatz läuft ihr in <strong>10–20 Minuten</strong> ins Zentrum, das schachbrettartig angelegt ist. Liegt das Schiff an einem entfernteren Kai, fahren Shuttlebusse. Tageslicht etwa 9:10 bis 15:55 Uhr – deshalb zuerst das Holzhausviertel Posebyen, danach Festung und Fischmarkt. Das <strong>Kunstsilo</strong> öffnet erst um 11 Uhr und hat donnerstags lange geöffnet; es eignet sich gut für den Nachmittag, wenn es dunkel wird.",
    route: { fromBase: true, mode: "walking" },
    sights: [
      {
        name: "Posebyen",
        mapsName: "Posebyen, Kristiansand",
        desc: "Das alte Viertel im Norden der Innenstadt mit niedrigen weißen Holzhäusern, Gärten und Gassen – eines der größten zusammenhängenden Holzhausviertel Nordeuropas. Ruhig, idyllisch und im Winter besonders stimmungsvoll.",
        image: IMG.posebyen,
        lat: 58.1491, lng: 7.9982,
        stroller: "careful",
        time: "ca. 09:30",
        badges: ["Kostenlos", "Teils Kopfsteinpflaster"],
      },
      {
        name: "Dom von Kristiansand",
        mapsName: "Kristiansand domkirke, Kirkegata 3, Kristiansand",
        desc: "Neugotische Kathedrale am Marktplatz, eine der größten Kirchen Norwegens. Ob sie geöffnet ist, hängt vom Tag ab – von außen und vom Marktplatz ist sie ohnehin das Zentrum der Stadt.",
        image: IMG.dom_krs,
        lat: 58.1461, lng: 7.9946,
        stroller: "yes",
        time: "ca. 10:15",
        badges: ["Innen: Zeiten prüfen"],
      },
      {
        name: "Markens gate",
        mapsName: "Markens gate, Kristiansand",
        desc: "Die Hauptfußgängerzone durch die Innenstadt (Kvadraturen), mit Läden und Cafés. Eben und breit, gut zu schieben.",
        image: IMG.markens,
        lat: 58.1431, lng: 7.9981,
        stroller: "yes",
        time: "ca. 10:45",
        badges: ["Fußgängerzone", "Cafés"],
      },
      {
        name: "Festung Christiansholm",
        mapsName: "Christiansholm festning, Kristiansand",
        desc: "Eine kleine runde Festung aus dem 17. Jahrhundert direkt am Wasser, an der Strandpromenade gelegen. Von außen und vom Wall aus schön, mit Blick auf Schären und Hafen.",
        image: IMG.christiansholm,
        lat: 58.1441, lng: 8.0034,
        stroller: "careful",
        viewpoint: true,
        time: "ca. 11:15",
        badges: ["Außen kostenlos", "Strandpromenade"],
      },
      {
        name: "Fiskebrygga",
        mapsName: "Fiskebrygga, Kristiansand",
        desc: "Der Fischmarkt am Hafenbecken mit Fischhändlern und Restaurants auf Stegen über dem Wasser. Der klassische Ort fürs Mittagessen – Fischsuppe oder Krabben.",
        image: IMG.fiskebrygga,
        lat: 58.1408, lng: 7.9951,
        stroller: "yes",
        time: "Mittagessen",
        badges: ["Fischmarkt", "Mittags"],
      },
      {
        name: "Kunstsilo",
        mapsName: "Kunstsilo, Sjølystveien 8, Kristiansand",
        desc: "Ein Getreidesilo von 1935, 2024 zum Kunstmuseum umgebaut – mit einer der größten Sammlungen nordischer Moderne. Spektakuläre Architektur innen, oben ein Blick über Hafen und Stadt.",
        image: IMG.kunstsilo,
        lat: 58.1382, lng: 7.9970,
        stroller: "yes",
        viewpoint: true,
        time: "ca. 13:30–15:30",
        badges: ["Ab 11 Uhr", "Do lange offen", "Aufzüge"],
        ticketUrl: "https://kunstsilo.no/",
      },
      {
        name: "Kilden",
        mapsName: "Kilden teater og konserthus, Kristiansand",
        desc: "Das Konzert- und Theaterhaus gleich neben dem Kunstsilo mit seiner geschwungenen Holzfassade, die wie eine Welle aus dem Gebäude ragt. Ein kurzer Fotostopp auf dem Rückweg zum Schiff.",
        image: IMG.kilden,
        lat: 58.1392, lng: 7.9971,
        stroller: "yes",
        time: "Rückweg",
        badges: ["Außen kostenlos", "Architektur"],
      },
    ],
    restaurants: [
      {
        name: "Bølgen & Moi",
        mapsName: "Bølgen & Moi Kristiansand, Fiskebrygga",
        desc: "Fischrestaurant direkt an der Fiskebrygga mit Blick aufs Hafenbecken. Frischer Fisch aus dem Skagerrak, Fischsuppe als Klassiker.",
        lat: 58.1406, lng: 7.9953,
        price: "250–400 NOK / Hauptgericht",
        badges: ["Fisch", "Hafenblick"],
      },
      {
        name: "Kunstsilo Brasseri",
        mapsName: "Kunstsilo Brasseri, Kristiansand",
        desc: "Die Brasserie im Kunstsilo – passend, wenn ihr den Nachmittag dort verbringt. Leichte nordische Küche in besonderer Architektur.",
        lat: 58.1382, lng: 7.9970,
        price: "200–350 NOK / Gericht",
        badges: ["Im Museum", "Nachmittags"],
      },
      {
        name: "Kafé im Markens gate",
        mapsName: "kafé Markens gate Kristiansand",
        desc: "In der Fußgängerzone gibt es mehrere Cafés und Bäckereien für eine warme Pause am Vormittag – Kaffee und Kanelbolle gehören in Norwegen einfach dazu.",
        lat: 58.1431, lng: 7.9981,
        price: "50–120 NOK",
        badges: ["Kaffeepause", "Zentral"],
      },
    ],
  },

  /* ---------------------------------------------------------- */
  {
    id: "seetag2",
    tag: "Fr 08.01. · Seetag",
    title: "Zweiter Seetag – Spa, Brauhaus & Abschied",
    summary: "Der letzte volle Tag an Bord: Sauna mit Meerblick, ein Frühschoppen im Brauhaus, die Abschiedsshow im Theatrium – und abends die Koffer packen.",
    walkFromHotel: "Den ganzen Tag an Bord",
    image: IMG.aidanova3,
    noRoute: true,
    noteLabel: "⚓ An Bord",
    transportNote: "Am letzten Seetag kommen die <strong>Infos zur Ausschiffung</strong> (Zeitfenster, Gepäck, Kabinenräumung) – im Tagesprogramm bzw. in der App nachsehen und ein möglichst frühes Zeitfenster wählen, denn euer Rückflug geht schon um 13:30 Uhr. Wer den Spa nutzen möchte: Sauna und Whirlpools sind an Seetagen gefragt, deshalb vormittags gehen. Mit vier Erwachsenen könnt ihr euch gut abwechseln – zwei im Spa, zwei mit dem Kleinen im Mini Club oder in der Kabine.",
    sights: [
      {
        name: "Body & Soul Spa",
        desc: "Saunalandschaft mit Meerblick und ein eigenes Sonnendeck mit Liegen, Strandkörben und Whirlpools. Nach Kopenhagen, Oslo und Kristiansand im Winter genau das Richtige zum Aufwärmen.",
        illu: { emoji: "🧖", label: "Body & Soul Spa", from: "#3a5f7a", to: "#8fb8c8" },
        onboard: true,
        stroller: "no",
        time: "vormittags am ruhigsten",
        badges: ["Spa-Zugang gegen Aufpreis", "Erwachsene im Wechsel"],
      },
      {
        name: "Brauhaus",
        desc: "Im Brauhaus wird an Bord eigenes Bier gebraut. Am Seetag gibt es oft einen Frühschoppen mit Spielen – gemütlich und kinderfreundlich zur Mittagszeit.",
        illu: { emoji: "🍺", label: "Brauhaus", from: "#6b3a1a", to: "#c48a3a" },
        onboard: true,
        stroller: "yes",
        time: "mittags",
        badges: ["Frühschoppen", "Programm in der App"],
      },
      {
        name: "Fitness & Kurse",
        desc: "Über 30 Fitness- und Entspannungskurse pro Woche sind im Reisepreis enthalten – von Yoga bis Rückenfit. Ein guter Ausgleich nach den Landgängen.",
        illu: { emoji: "🧘", label: "Fitness & Yoga", from: "#1f5c55", to: "#4fb39a" },
        onboard: true,
        stroller: "no",
        time: "morgens",
        badges: ["Viele Kurse inklusive"],
      },
      {
        name: "Abschiedsabend im Theatrium",
        desc: "Am letzten Abend gibt es meist eine große Show im Theatrium. Danach Koffer packen – Infos dazu kommen über Tagesprogramm und App.",
        illu: { emoji: "✨", label: "Abschiedsshow", from: "#3a1f5c", to: "#c0567a" },
        onboard: true,
        stroller: "yes",
        time: "abends",
        badges: ["Plätze früh sichern"],
      },
    ],
    restaurants: [
      {
        name: "Gourmet-Restaurant Rossini",
        desc: "Das gehobene À-la-carte-Restaurant an Bord, gegen Aufpreis – ein schöner Rahmen für den letzten Abend. Rechtzeitig in der App reservieren.",
        price: "Aufpreis",
        badges: ["Letzter Abend", "Reservieren"],
        onboard: true,
      },
      {
        name: "Time Machine",
        desc: "Event-Restaurant mit Show und Menü – ein Erlebnis-Abendessen gegen Aufpreis, das vorab reserviert werden muss.",
        price: "Aufpreis",
        badges: ["Event-Dinner", "Vorab buchen"],
        onboard: true,
      },
      {
        name: "Buffet-Restaurants",
        desc: "Für den unkomplizierten Tag mit Kleinkind: die inklusiven Buffets, zu Randzeiten am entspanntesten.",
        price: "inklusive",
        badges: ["Keine Reservierung"],
        onboard: true,
      },
    ],
  },

  /* ---------------------------------------------------------- */
  {
    id: "heimreise",
    tag: "Sa 09.01. · Heimreise",
    title: "Ankunft in Hamburg & Rückflug",
    summary: "Um 8 Uhr läuft die AIDAnova wieder in Hamburg ein. Ausschiffung, Taxi zum Flughafen, um 13:30 Uhr Rückflug nach Stuttgart.",
    walkFromHotel: "Taxi Steinwerder → Flughafen (ca. 30–40 Min.)",
    image: IMG.cruisecenter,
    base: "steinwerder",
    noteLabel: "✈️ Heimreise",
    transportNote: "<strong>Zeitplan:</strong> Ankunft 08:00 Uhr, Ausschiffung gestaffelt nach Zeitfenster. Für den Flug um 13:30 Uhr solltet ihr spätestens gegen <strong>11:30 Uhr am Flughafen</strong> sein. Vom Cruise Center Steinwerder ist ein <strong>Taxi</strong> mit Gepäck und Kinderwagen die einfachste Lösung – je nach Verkehr 30–40 Minuten. Mit Bus und S-Bahn dauert es deutlich länger und ist mit Koffern umständlich. Plant das Frühstück früh und wählt ein frühes Ausschiffungsfenster, dann bleibt genug Puffer. Landung in Stuttgart um 14:40 Uhr (Eurowings EW 2043).",
    route: { fromBase: true, mode: "driving" },
    sights: [
      {
        name: "Ausschiffung",
        mapsName: "Cruise Center Steinwerder, Buchheisterstraße 16, Hamburg",
        desc: "Nach dem Frühstück verlasst ihr das Schiff nach Zeitfenster. Das Gepäck holt ihr im Terminal ab; Taxis warten in der Regel vor dem Gebäude.",
        image: IMG.cruisecenter,
        lat: 53.5294, lng: 9.9613,
        stroller: "yes",
        time: "ab ca. 08:30",
        badges: ["Frühes Zeitfenster wählen"],
        inRoute: false,
      },
      {
        name: "Flughafen Hamburg",
        mapsName: "Hamburg Airport, Flughafenstraße 1-3, Hamburg",
        desc: "Rückflug mit Eurowings EW 2043 um 13:30 Uhr, Landung in Stuttgart um 14:40 Uhr. Mit Kleinkind lohnt sich ein großzügiger Puffer für Gepäckaufgabe und Sicherheitskontrolle.",
        illu: { emoji: "✈️", label: "Rückflug · 13:30", from: "#27306b", to: "#4fd1a5" },
        lat: 53.6304, lng: 9.9882,
        stroller: "yes",
        time: "spätestens 11:30",
        badges: ["2 Std. vorher da sein"],
      },
    ],
    restaurants: [
      {
        name: "Frühstück an Bord",
        desc: "Das letzte Frühstücksbuffet an Bord – früh gehen, damit ihr entspannt zum Ausschiffungsfenster bereit seid.",
        price: "inklusive",
        badges: ["Früh gehen"],
        onboard: true,
      },
    ],
  },
];

/* ============================================================
   WISSENSWERTES – Schlüssel = Name der Station
   ============================================================ */
const FACTS = {
  "Hamburger Rathaus": {
    text: "Das Rathaus wurde 1886–1897 erbaut und steht auf rund 4.000 Eichenpfählen, weil der Untergrund an der Alster sumpfig ist. Es hat 647 Räume. Im Innenhof erinnert der Hygieia-Brunnen an die Cholera-Epidemie von 1892, die zum Bau einer modernen Trinkwasserversorgung führte.",
    url: "https://de.wikipedia.org/wiki/Hamburger_Rathaus",
  },
  "Binnenalster & Jungfernstieg": {
    text: "Die Alster ist eigentlich ein kleiner Fluss, der schon im Mittelalter für eine Mühle aufgestaut wurde – so entstanden Binnen- und Außenalster. Der Jungfernstieg verdankt seinen Namen der Überlieferung, dass Hamburger Familien hier sonntags ihre unverheirateten Töchter spazieren führten.",
    url: "https://de.wikipedia.org/wiki/Alster",
  },
  "St. Michaelis („Michel“)": {
    text: "Der Turm des Michel ist 132 Meter hoch und trägt die größte Turmuhr Deutschlands – jedes Zifferblatt misst acht Meter. Werktags um 10 und 21 Uhr, sonntags um 12 Uhr bläst ein Türmer einen Choral in alle vier Himmelsrichtungen. Für Seeleute auf der Elbe war der Michel jahrhundertelang das Zeichen, dass Hamburg erreicht ist.",
    url: "https://de.wikipedia.org/wiki/Hauptkirche_Sankt_Michaelis",
  },
  "Landungsbrücken": {
    text: "Die Anleger sind schwimmende Pontons, die sich mit Ebbe und Flut heben und senken – der Tidenhub beträgt hier rund 3,5 Meter. Deshalb sind die Rampen je nach Wasserstand flach oder steil. Das Empfangsgebäude mit dem Pegelturm stammt von 1906–1910.",
    url: "https://de.wikipedia.org/wiki/St._Pauli-Landungsbr%C3%BCcken",
  },
  "Elbphilharmonie – Plaza": {
    text: "Am 11. Januar 2017 eröffnet – ihr seid also fast genau zum zehnten Geburtstag da. Der gläserne Aufbau sitzt auf einem alten Kaispeicher; die gebogene Rolltreppe „Tube“ ist 82 Meter lang. Die Baukosten stiegen von ursprünglich geplanten 77 Millionen auf rund 866 Millionen Euro.",
    url: "https://de.wikipedia.org/wiki/Elbphilharmonie",
  },
  "HafenCity & Marco-Polo-Terrassen": {
    text: "Die HafenCity ist eines der größten innerstädtischen Bauprojekte Europas – auf ehemaligen Hafenflächen entsteht ein ganzer Stadtteil. Die Gebäude stehen auf Warften, also aufgeschütteten Sockeln, die sie vor Sturmfluten schützen. Die Promenaden am Wasser dürfen dagegen überflutet werden.",
    url: "https://de.wikipedia.org/wiki/Hamburg-HafenCity",
  },
  "Speicherstadt": {
    text: "Der größte historische Lagerhauskomplex der Welt steht auf Eichenpfählen und ist seit 2015 UNESCO-Welterbe. Für den Bau ab 1883 mussten rund 20.000 Menschen ihre Wohnungen verlassen. In den Speichern lagerten Kaffee, Tee, Gewürze und Orientteppiche.",
    url: "https://de.wikipedia.org/wiki/Speicherstadt",
  },
  "Miniatur Wunderland": {
    text: "Gegründet von den Zwillingsbrüdern Frederik und Gerrit Braun und 2001 eröffnet, gilt es laut Guinness-Buch als größte Modelleisenbahnanlage der Welt. Der Flughafen „Knuffingen“ lässt Modellflugzeuge tatsächlich starten und landen, und etwa alle 15 Minuten wird es in der ganzen Anlage Nacht.",
    url: "https://de.wikipedia.org/wiki/Miniatur_Wunderland",
  },
  "Hafenrundfahrt ab Landungsbrücken": {
    text: "Der Hamburger Hafen gehört zu den größten Containerhäfen Europas und liegt rund 100 Kilometer von der Nordsee entfernt – Schiffe kommen über die Elbe bis mitten in die Stadt. Die flachen Barkassen können bei passendem Wasserstand sogar durch die Fleete der Speicherstadt fahren.",
    url: "https://de.wikipedia.org/wiki/Hamburger_Hafen",
  },
  "Alter Elbtunnel": {
    text: "Der Tunnel wurde 1911 eröffnet, damit Hafenarbeiter trockenen Fußes zu den Werften auf der Südseite kamen. Er ist 426 Meter lang und liegt etwa 24 Meter unter dem Wasserspiegel. Autos werden bis heute mit großen Aufzügen hinunter- und wieder hinaufgefahren.",
    url: "https://de.wikipedia.org/wiki/St.-Pauli-Elbtunnel",
  },
  "Cruise Center Steinwerder": {
    text: "Hamburg hat drei Kreuzfahrtterminals: Altona, HafenCity und Steinwerder. Das Terminal Steinwerder wurde 2015 eröffnet und ist auf die größten Kreuzfahrtschiffe ausgelegt – deshalb legt hier auch die AIDAnova an.",
    url: "https://de.wikipedia.org/wiki/Hamburg_Cruise_Center_Steinwerder",
  },
  "Auslaufen auf der Elbe": {
    text: "Bei Wedel begrüßt und verabschiedet die Schiffsbegrüßungsanlage Willkomm-Höft seit 1952 große Schiffe mit ihrer Nationalhymne. Sie ist allerdings nur tagsüber in Betrieb – bei eurem Auslaufen um 19 Uhr im Januar bleibt es dort also still. Bis zur Elbmündung in die Nordsee dauert es mehrere Stunden.",
    url: "https://de.wikipedia.org/wiki/Schiffsbegr%C3%BC%C3%9Fungsanlage_Willkomm-H%C3%B6ft",
  },
  "Theatrium": {
    text: "Die AIDAnova wurde 2018 bei der Meyer Werft in Papenburg gebaut und ist 337 Meter lang. Sie war das erste Kreuzfahrtschiff, das vollständig mit Flüssigerdgas (LNG) betrieben werden kann, und erhielt 2019 als erstes Kreuzfahrtschiff den Umweltpreis „Blauer Engel“. An Bord ist Platz für bis zu 6.654 Gäste in 2.626 Kabinen.",
    url: "https://de.wikipedia.org/wiki/AIDAnova",
  },
  "Beach Club": {
    text: "Das Dach des Beach Clubs besteht aus einer Folie, die UV-Licht durchlässt – man kann darunter also sogar braun werden. Gleichzeitig hält sie Wind und Regen ab, weshalb der Bereich auf Nordlandreisen im Winter genauso genutzt wird wie in der Karibik.",
    url: "https://de.wikipedia.org/wiki/AIDAnova",
  },
  "Mini Club & Kids Club": {
    text: "Babys dürfen bei AIDA ab einem Alter von sechs Monaten mit an Bord. Für die Betreuung im Mini Club ist zuerst eine Eingewöhnung mit einem Elternteil Pflicht (45 Minuten, 15 Euro); danach kostet jede Betreuungsstunde 10 Euro. Gemeinsame Spielzeiten für Eltern und Kinder sind kostenlos.",
    url: "https://aida.de/willkommen/familie/babies-kleinkinder",
  },
  "Studio X": {
    text: "Mit dem Studio X brachte AIDA ein echtes TV-Studio an Bord – mit Kameras, Bühne und Publikumsrängen. Die Shows werden live produziert und teils auf die Bildschirme an Bord übertragen.",
    url: "https://de.wikipedia.org/wiki/AIDAnova",
  },
  "Four Elements": {
    text: "Der Bereich am Heck verbindet Klettergarten, Wasserrutschen und Pools über mehrere Decks. Klettern dürfen Kinder ab sechs Jahren und 140 cm Größe – auf späteren Reisen also etwas für euren Sohn, wenn er größer ist.",
    url: "https://de.wikipedia.org/wiki/AIDAnova",
  },
  "Mystery Room": {
    text: "Escape Rooms an Bord funktionieren wie an Land: Ein Team wird in einen Raum gesperrt und muss gemeinsam Rätsel lösen, um innerhalb der Zeit wieder herauszukommen. Ideal für eine Gruppe aus zwei bis vier Erwachsenen.",
    url: "https://de.wikipedia.org/wiki/Escape_Room",
  },
  "Kastellet & Kleine Meerjungfrau": {
    text: "Die Figur von Edvard Eriksen wurde 1913 aufgestellt und ist Hans Christian Andersens Märchen nachempfunden. Sie wurde mehrfach beschädigt und zweimal sogar enthauptet (1964 und 1998). Das Kastellet gleich daneben ist eine der besterhaltenen Sternfestungen Nordeuropas und bis heute militärisch genutzt.",
    url: "https://de.wikipedia.org/wiki/Kleine_Meerjungfrau",
  },
  "Marmorkirche": {
    text: "Der Bau begann 1749, wurde 1770 aus Geldmangel gestoppt und blieb über hundert Jahre eine Ruine. Erst 1894 wurde die Kirche vollendet – teils mit günstigerem Marmor. Ihre Kuppel gehört zu den größten Skandinaviens.",
    url: "https://de.wikipedia.org/wiki/Frederikskirche",
  },
  "Amalienborg": {
    text: "Ursprünglich wurden die vier Palais für Adelsfamilien gebaut; nach dem Brand von Schloss Christiansborg 1794 zog die Königsfamilie hierher. Die Leibgarde marschiert täglich von ihrer Kaserne durch die Stadt zur Wachablösung – mit Bärenfellmützen und Musik, wenn der Monarch anwesend ist.",
    url: "https://de.wikipedia.org/wiki/Schloss_Amalienborg",
  },
  "Nyhavn": {
    text: "Der Kanal wurde 1670–1673 gegraben, um Schiffe direkt bis zum Königsplatz zu bringen. Früher ein raues Seemannsviertel mit Kneipen, heute das bekannteste Fotomotiv Kopenhagens. Hans Christian Andersen wohnte nacheinander in drei verschiedenen Häusern am Kanal.",
    url: "https://de.wikipedia.org/wiki/Nyhavn",
  },
  "Christiansborg": {
    text: "Christiansborg ist weltweit das einzige Gebäude, in dem Parlament, Regierungschef und Oberstes Gericht gemeinsam untergebracht sind. Das heutige Schloss ist bereits das dritte an dieser Stelle – die Vorgänger brannten ab. Der Turm ist der höchste der Stadt.",
    url: "https://de.wikipedia.org/wiki/Christiansborg",
  },
  "Strøget": {
    text: "Strøget wurde 1962 zur Fußgängerzone und gilt als eine der ersten und längsten Europas. Damals befürchteten Händler den Ruin – heute ist sie die meistbesuchte Einkaufsstraße der Stadt und ein Vorbild für Fußgängerzonen weltweit.",
    url: "https://de.wikipedia.org/wiki/Str%C3%B8get",
  },
  "Rundetårn": {
    text: "König Christian IV. ließ den Turm 1642 als Sternwarte bauen – sie gilt als älteste noch betriebene Sternwarte Europas. Statt einer Treppe führt eine rund 200 Meter lange Wendelrampe nach oben. Der Überlieferung nach ritt Zar Peter der Große 1716 zu Pferd hinauf, die Zarin folgte in einer Kutsche.",
    url: "https://de.wikipedia.org/wiki/Rundet%C3%A5rn",
  },
  "Torvehallerne": {
    text: "Die beiden Glashallen wurden 2011 eröffnet, auf dem Gelände des alten Gemüsemarkts am Israels Plads. Sie haben sich schnell zum Treffpunkt für Feinschmecker entwickelt – von Smørrebrød über Fischstände bis zu Kopenhagens Kaffeeröstern.",
    url: "https://da.wikipedia.org/wiki/Torvehallerne",
  },
  "Christianshavn (Alternative)": {
    text: "Christian IV. ließ den Stadtteil im 17. Jahrhundert nach dem Vorbild Amsterdams mit Kanälen anlegen. Die Erlöserkirche hat eine Außenwendeltreppe, die sich um die Turmspitze windet. In der Nähe liegt die Freistadt Christiania, seit 1971 ein selbstverwaltetes Wohnprojekt.",
    url: "https://de.wikipedia.org/wiki/Christianshavn",
  },
  "Opernhaus Oslo": {
    text: "Das 2008 eröffnete Opernhaus wurde vom norwegischen Büro Snøhetta entworfen und soll an einen Gletscher erinnern, der aus dem Fjord ragt. Die Dachflächen sind mit italienischem Carrara-Marmor belegt und ausdrücklich zum Betreten gedacht – das Dach gehört allen.",
    url: "https://de.wikipedia.org/wiki/Opernhaus_Oslo",
  },
  "MUNCH": {
    text: "Das Museum wurde 2021 eröffnet und ist 60 Meter hoch. Es bewahrt den Nachlass, den Edvard Munch der Stadt Oslo vermachte – darunter mehrere Fassungen von „Der Schrei“, die abwechselnd gezeigt werden, weil die empfindlichen Werke nicht dauerhaft Licht ausgesetzt sein dürfen.",
    url: "https://de.wikipedia.org/wiki/Munch-Museum_Oslo",
  },
  "Festung Akershus": {
    text: "Die Burg entstand um 1300 unter König Håkon V. und wurde später von Christian IV. zum Renaissanceschloss umgebaut. Belagerungen hielt sie stets stand – erst 1940 wurde sie von deutschen Truppen kampflos übernommen. Heute befinden sich hier das Widerstandsmuseum und die Grabstätte norwegischer Könige.",
    url: "https://de.wikipedia.org/wiki/Festung_Akershus",
  },
  "Rathaus Oslo": {
    text: "Der Bau dauerte von 1931 bis 1950, unterbrochen durch den Zweiten Weltkrieg. Jedes Jahr am 10. Dezember – dem Todestag Alfred Nobels – wird hier der Friedensnobelpreis verliehen. Die übrigen Nobelpreise werden in Stockholm vergeben.",
    url: "https://de.wikipedia.org/wiki/Rathaus_Oslo",
  },
  "Aker Brygge": {
    text: "Bis 1982 baute hier die Werft Akers Mekaniske Verksted Schiffe. Nach der Schließung wurde das Gelände in ein Viertel mit Wohnungen, Büros und Restaurants verwandelt – heute eine der beliebtesten Promenaden der Stadt.",
    url: "https://de.wikipedia.org/wiki/Aker_Brygge",
  },
  "Karl Johans gate": {
    text: "Die Straße ist nach König Karl III. Johan benannt, einem früheren französischen Marschall namens Jean-Baptiste Bernadotte, der König von Schweden und Norwegen wurde. Sie verbindet den Hauptbahnhof mit dem Schloss und führt am Parlament vorbei.",
    url: "https://de.wikipedia.org/wiki/Karl_Johans_gate",
  },
  "Holmenkollen": {
    text: "Seit 1892 finden am Holmenkollen Skisprungwettbewerbe statt – das Holmenkollen-Skifest gilt als eines der ältesten Wintersportereignisse der Welt. Die heutige Schanze wurde 2010 eröffnet. Das Skimuseum im Turm gilt als das älteste der Welt.",
    url: "https://de.wikipedia.org/wiki/Holmenkollbakken",
  },
  "Vigelandpark": {
    text: "Gustav Vigeland schuf die über 200 Skulpturen aus Bronze, Granit und Schmiedeeisen in mehr als 20 Jahren. Herzstück ist der 14 Meter hohe Monolith, aus einem einzigen Granitblock gehauen, mit 121 ineinander verschlungenen menschlichen Figuren.",
    url: "https://de.wikipedia.org/wiki/Vigelandsanlegget",
  },
  "Königliches Schloss": {
    text: "Das Schloss wurde 1825–1849 für König Karl Johan gebaut, der die Fertigstellung allerdings nicht mehr erlebte. Es ist bis heute die offizielle Residenz des norwegischen Königs. Der Schlosspark ist öffentlich und ganzjährig zugänglich.",
    url: "https://de.wikipedia.org/wiki/K%C3%B6nigliches_Schloss_Oslo",
  },
  "Nationalmuseum": {
    text: "Das 2022 eröffnete Gebäude ist das größte Kunstmuseum der nordischen Länder. Es bündelt mehrere frühere Museen unter einem Dach. Auf dem Dach liegt die „Lichthalle“, ein Ausstellungsraum aus Glas, der abends leuchtet.",
    url: "https://de.wikipedia.org/wiki/Nationalmuseum_Oslo",
  },
  "Frammuseum (Alternative)": {
    text: "Die „Fram“ gilt als das Holzschiff, das am weitesten in den Norden und den Süden vorgedrungen ist. Fridtjof Nansen ließ sich mit ihr im Packeis treiben, Roald Amundsen fuhr mit ihr zu seiner Südpol-Expedition. Im Museum kann man an Bord gehen.",
    url: "https://de.wikipedia.org/wiki/Frammuseum",
  },
  "Posebyen": {
    text: "Kristiansand wurde 1641 von König Christian IV. gegründet und im Schachbrettmuster angelegt, dem „Kvadraturen“. Posebyen im Norden ist der Teil, der von den Stadtbränden weitgehend verschont blieb – deshalb stehen hier noch die niedrigen Holzhäuser des 18. und 19. Jahrhunderts.",
    url: "https://en.wikipedia.org/wiki/Posebyen",
  },
  "Dom von Kristiansand": {
    text: "Die heutige Kathedrale von 1885 ist bereits die vierte Kirche an dieser Stelle – die Vorgänger wurden durch Stadtbrände zerstört. Mit rund 1.800 Plätzen gehört sie zu den größten Kirchen Norwegens.",
    url: "https://en.wikipedia.org/wiki/Kristiansand_Cathedral",
  },
  "Markens gate": {
    text: "Die Straße ist Teil des rechtwinkligen Straßennetzes, das Christian IV. bei der Stadtgründung 1641 festlegte. Kristiansand war damit eine der ersten nach einem Plan angelegten Städte Norwegens.",
    url: "https://no.wikipedia.org/wiki/Markens_gate",
  },
  "Festung Christiansholm": {
    text: "Die runde Festung wurde im 17. Jahrhundert auf einer kleinen Insel zum Schutz des Hafens gebaut. Ihre Mauern sind mehrere Meter dick. Heute ist sie über einen Damm mit der Strandpromenade verbunden und wird für Veranstaltungen genutzt.",
    url: "https://no.wikipedia.org/wiki/Christiansholm_festning",
  },
  "Fiskebrygga": {
    text: "Kristiansand liegt am Skagerrak, dem Meeresarm zwischen Norwegen und Dänemark, den ihr mit der AIDAnova durchquert. Der Fischmarkt ist seit jeher der Treffpunkt am Hafen; heute sitzen die Restaurants auf Stegen direkt über dem Wasser.",
    url: "https://de.wikipedia.org/wiki/Kristiansand",
  },
  "Kunstsilo": {
    text: "Das Getreidesilo von 1935 war jahrzehntelang ein Industriebau am Hafen. 2024 wurde es als Kunstmuseum eröffnet, das unter anderem die Sammlung des Investors Nicolai Tangen zeigt – eine der größten Sammlungen nordischer Kunst der Moderne. Die runden Silo-Röhren sind im Inneren als Hallen erlebbar.",
    url: "https://no.wikipedia.org/wiki/Kunstsilo",
  },
  "Kilden": {
    text: "Das Theater- und Konzerthaus wurde 2012 eröffnet. Die markante Fassade ist eine riesige, gewellte Holzwand, die sich vom Inneren nach außen über den Vorplatz wölbt – eines der auffälligsten modernen Bauwerke Norwegens.",
    url: "https://no.wikipedia.org/wiki/Kilden_teater_og_konserthus",
  },
  "Fitness & Kurse": {
    text: "Die AIDAnova ist das erste Schiff der Helios-Klasse. Nach ihr baute die Meyer Werft weitere Schiffe dieses Typs, darunter die AIDAcosma (2021). Alle sind für den Betrieb mit Flüssigerdgas ausgelegt, das deutlich weniger Schwefel und Feinstaub ausstößt als Schweröl.",
    url: "https://de.wikipedia.org/wiki/Helios-Klasse",
  },
  "Abschiedsabend im Theatrium": {
    text: "Das Erkennungszeichen von AIDA sind der rote Kussmund und die Augen am Bug. Entworfen hat sie der Rostocker Künstler Feliks Büttner in den 1990er-Jahren – seitdem tragen alle Schiffe der Flotte das Motiv. AIDA Cruises hat seinen Sitz in Rostock.",
    url: "https://de.wikipedia.org/wiki/AIDA_Cruises",
  },
  "Flughafen Hamburg": {
    text: "Der Hamburger Flughafen wurde 1911 eröffnet und gehört damit zu den ältesten noch betriebenen Verkehrsflughäfen der Welt. Seit 2016 trägt er den Namen „Hamburg Airport Helmut Schmidt“, nach dem früheren Bundeskanzler und Hamburger.",
    url: "https://de.wikipedia.org/wiki/Flughafen_Hamburg",
  },
  "Body & Soul Spa": {
    text: "Wellness gehört bei AIDA zum Konzept: Das Spa-Deck hat eigene Liegeflächen, Strandkörbe und mehrere Whirlpools. Nach einem kalten Landgang im norwegischen Winter ist eine Sauna mit Meerblick besonders reizvoll.",
    url: "https://aida.de/willkommen/aida-stories/tipps-fuer-den-seetag",
  },
  "Brauhaus": {
    text: "AIDA braut auf mehreren Schiffen eigenes Bier an Bord – frisch gezapft und unfiltriert. Auf Reiseberichten zur AIDAnova sind Frühschoppen mit Spielen wie Maßkrugstemmen ein fester Seetag-Programmpunkt.",
    url: "https://aida.de/willkommen/aida-stories/tipps-fuer-den-seetag",
  },
};

/* ============================================================
   Google-Maps-Helfer
   ============================================================ */
function mapsPlaceUrl(item) {
  const q = encodeURIComponent(item.mapsName || item.name);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

function routeUrl(zone) {
  const cfg = zone.route || { fromBase: false, mode: "walking" };
  const stops = zone.sights.filter((s) => s.inRoute !== false && s.lat);
  if (!stops.length) return null;
  const base = zone.base ? BASES[zone.base] : null;
  const points = cfg.fromBase && base ? [base, ...stops] : stops;
  if (points.length < 2) return null;

  const origin = `${points[0].lat},${points[0].lng}`;
  const last = points[points.length - 1];
  const destination = `${last.lat},${last.lng}`;
  const waypoints = points.slice(1, -1).map((s) => `${s.lat},${s.lng}`).join("|");

  const mode = ["transit", "driving"].includes(cfg.mode) ? cfg.mode : "walking";
  let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=${mode}`;
  if (waypoints) url += `&waypoints=${encodeURIComponent(waypoints)}`;
  return url;
}

/* ============================================================
   Rendering
   ============================================================ */
function renderCard(item, type) {
  const tpl = document.getElementById("card-template");
  const node = tpl.content.firstElementChild.cloneNode(true);
  const wrap = node.querySelector(".card-image-wrap");
  const img = node.querySelector(".card-image");

  if (type === "sight" && item.illu && !item.image) {
    // Illustration statt Foto (Bereiche an Bord)
    const illu = document.createElement("div");
    illu.className = "card-illu";
    illu.style.background = `linear-gradient(135deg, ${item.illu.from}, ${item.illu.to})`;
    illu.innerHTML = `<span class="illu-emoji">${item.illu.emoji}</span><span class="illu-label">${item.illu.label}</span>`;
    wrap.replaceWith(illu);
  } else if (type === "restaurant") {
    img.src = FOOD_SVG;
    img.dataset.fallback = "true";
    img.alt = "";
  } else {
    img.src = item.image || FOOD_SVG;
    img.alt = item.name;
    img.onerror = () => { img.src = FOOD_SVG; img.dataset.fallback = "true"; };
  }

  node.querySelector(".card-title").textContent = item.name;
  node.querySelector(".card-type").textContent =
    item.onboard ? "An Bord" : type === "restaurant" ? "Essen" : "Sehenswürdigkeit";
  node.querySelector(".card-desc").innerHTML = item.desc;

  const badgesEl = node.querySelector(".card-badges");
  const add = (cls, text) => {
    const b = document.createElement("span");
    b.className = "badge " + cls;
    b.textContent = text;
    badgesEl.appendChild(b);
  };

  if (type === "restaurant") {
    if (item.price) add("price", item.price);
  } else if (item.stroller) {
    const s = STROLLER[item.stroller];
    add(s.cls, `${s.emoji} ${s.label}`);
  }
  if (type === "sight" && item.time) add("time", `🕘 ${item.time}`);
  if (type === "sight" && item.viewpoint) add("view", "🔭 Aussichtspunkt");
  if (type === "sight" && item.transit) add("transit", `🚊 ${item.transit}`);
  (item.badges || []).forEach((b) => add("tip", b));

  const link = node.querySelector(".card-link");
  if (item.mapsName) {
    link.href = mapsPlaceUrl(item);
  } else {
    link.remove();
  }

  const facts = type === "sight" ? FACTS[item.name] : null;
  const anchor = node.querySelector(".card-link");
  const insert = (el) => (anchor ? anchor.parentNode.insertBefore(el, anchor) : node.querySelector(".card-body").appendChild(el));

  if (facts) {
    const det = document.createElement("details");
    det.className = "facts";
    det.innerHTML =
      '<summary><span class="facts-icon">💡</span><span class="facts-title">Wissenswertes</span><span class="facts-chevron">▾</span></summary>';
    const body = document.createElement("div");
    body.className = "facts-body";
    if (facts.image) {
      const fi = document.createElement("img");
      fi.className = "facts-image";
      fi.src = facts.image;
      fi.alt = item.name;
      fi.loading = "lazy";
      fi.onerror = () => fi.remove();
      body.appendChild(fi);
    }
    const p = document.createElement("p");
    p.className = "facts-text";
    p.textContent = facts.text;
    body.appendChild(p);
    if (facts.url) {
      const a = document.createElement("a");
      a.className = "facts-link";
      a.href = facts.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.innerHTML = "<span>📖</span><span>Mehr dazu nachlesen</span>";
      body.appendChild(a);
    }
    det.appendChild(body);
    insert(det);
  }

  if (type === "sight" && item.ticketUrl) {
    const t = document.createElement("a");
    t.className = "card-ticket";
    t.href = item.ticketUrl;
    t.target = "_blank";
    t.rel = "noopener";
    t.innerHTML = `<span>🎟️</span><span>Tickets / Infos (offiziell)</span>`;
    insert(t);
  }

  return node;
}

function renderZone(zone) {
  const tpl = document.getElementById("zone-template");
  const node = tpl.content.firstElementChild.cloneNode(true);
  node.dataset.zone = zone.id;

  node.querySelector(".zone-image").src = zone.image;
  node.querySelector(".zone-image").alt = zone.title;
  node.querySelector(".zone-tag").textContent = zone.tag;
  node.querySelector(".zone-title").textContent = zone.title;
  node.querySelector(".zone-summary").textContent = zone.summary;

  const onboardDay = zone.sights.every((s) => s.onboard);
  node.querySelector(".zone-stats").innerHTML = `
    <span>${zone.sights.length}</span>&nbsp;${onboardDay ? "Programmpunkte" : "Stationen"} ·
    <span>${zone.restaurants.length}</span>&nbsp;Essen
    <br><span style="color:#565c7a; font-weight:400;">${zone.walkFromHotel}</span>
  `;
  node.querySelector(".zone-section h4").textContent = onboardDay ? "An Bord der AIDAnova" : "Stationen";

  const sightsEl = node.querySelector(".cards.sights");
  zone.sights.forEach((s) => sightsEl.appendChild(renderCard(s, "sight")));

  const restEl = node.querySelector(".cards.restaurants");
  zone.restaurants.forEach((r) => restEl.appendChild(renderCard(r, "restaurant")));

  const restSection = restEl.parentElement;
  const restHeader = restSection.querySelector("h4");
  restEl.classList.add("is-hidden");
  restSection.classList.add("collapsible", "is-collapsed");
  restHeader.innerHTML = `
    <span>Essen &amp; Trinken <span class="section-count">(${zone.restaurants.length})</span></span>
    <span class="section-icon">▾</span>
  `;
  restHeader.setAttribute("role", "button");
  restHeader.setAttribute("tabindex", "0");
  const toggleRest = (e) => {
    if (e) e.preventDefault();
    const collapsed = restSection.classList.toggle("is-collapsed");
    restEl.classList.toggle("is-hidden", collapsed);
  };
  restHeader.addEventListener("click", toggleRest);
  restHeader.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleRest(); }
  });

  if (zone.transportNote) {
    const note = document.createElement("p");
    note.style.cssText = "background:#eceefb;border:1px solid #c5c9e8;border-radius:12px;padding:0.8rem 1rem;font-size:0.9rem;color:#27306b;margin:0 0 1.4rem;";
    note.innerHTML = `<strong>${zone.noteLabel || "🚊 Anreise &amp; Verkehr"}:</strong> ${zone.transportNote}`;
    node.querySelector(".zone-body").prepend(note);
  }

  const actions = node.querySelector(".zone-actions");
  const url = zone.noRoute ? null : routeUrl(zone);
  if (!url) {
    actions.remove();
  } else {
    const routeBtn = node.querySelector(".route-btn");
    routeBtn.href = url;
    const mode = (zone.route && zone.route.mode) || "walking";
    const base = zone.base ? BASES[zone.base] : null;
    const fromBase = zone.route && zone.route.fromBase && base;
    const icon = routeBtn.querySelector("span:first-child");
    const label = routeBtn.querySelector("span:last-child");
    const hint = node.querySelector(".route-hint");
    if (mode === "transit") {
      icon.textContent = "🚊";
      label.innerHTML = "Route mit Bahn&nbsp;&amp; Bus in Google&nbsp;Maps";
      hint.textContent = fromBase
        ? `Startet ${base.hint} und verbindet die Stationen mit Bahn, Bus und Fußwegen.`
        : "Verbindet die Stationen der Reihe nach mit Bahn, Bus und Fußwegen.";
    } else if (mode === "driving") {
      icon.textContent = "🚕";
      label.innerHTML = "Taxi-Route in Google&nbsp;Maps";
      hint.textContent = `Startet ${base ? base.hint : "am Terminal"} und zeigt die Fahrt zum Flughafen.`;
    } else {
      icon.textContent = "🚶";
      label.innerHTML = "Als Spaziergang in Google&nbsp;Maps";
      hint.textContent = fromBase
        ? `Startet ${base.hint} und läuft die Stationen der Reihe nach ab.`
        : "Läuft die Stationen der Reihe nach ab, alles zu Fuß.";
    }
  }

  const toggle = node.querySelector(".zone-toggle");
  const body = node.querySelector(".zone-body");
  toggle.addEventListener("click", () => {
    const open = node.classList.toggle("is-open");
    body.hidden = !open;
    if (open) requestAnimationFrame(() => node.scrollIntoView({ behavior: "smooth", block: "start" }));
  });

  return node;
}

function init() {
  const root = document.getElementById("zones");
  ZONES.forEach((z) => root.appendChild(renderZone(z)));
  const link = document.getElementById("hotel-link");
  if (link) link.href = mapsPlaceUrl(BASES.steinwerder);
}

document.addEventListener("DOMContentLoaded", init);
