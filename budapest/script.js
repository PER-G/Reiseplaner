/* ============================================================
   Reiseführer Budapest · Daten & Rendering
   23.–30. Oktober 2026 · 4 Erwachsene + Baby
   Viel zu Fuß, weite Strecken mit Tram & Metro
   ============================================================ */

/* Ausgangspunkt der Routen: eure Unterkunft im Corvin Plaza (Corvin-negyed).
   Sehr gut angebunden: An der Haltestelle Corvin-negyed halten sowohl
   die Metro M3 als auch die Tram 4/6, die rund um die Uhr fährt. */
const BASIS = {
  name: "Corvin Plaza · Corvin-negyed",
  address: "Futó utca, VIII. Bezirk · M3 und Tram 4/6 vor der Tür",
  mapsName: "Corvin Plaza, Budapest",
  lat: 47.4860,
  lng: 19.0733,
};

/* Kinderwagen-Hinweise */
const STROLLER = {
  yes:     { label: "Kinderwagen ok",    emoji: "🛒", cls: "stroller-yes" },
  careful: { label: "Steigung/Pflaster", emoji: "⚠",  cls: "stroller-careful" },
  no:      { label: "Trage besser",      emoji: "🤱", cls: "stroller-no" },
};

/* Generisches SVG-Bild für Restaurants */
const FOOD_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#dce7ea"/>
        <stop offset="1" stop-color="#a8c4cb"/>
      </linearGradient>
    </defs>
    <rect width="320" height="200" fill="url(#g)"/>
    <g transform="translate(160 100)" fill="none" stroke="#15535f" stroke-width="3" stroke-linecap="round">
      <circle r="42" fill="#f7fbfb"/>
      <circle r="30" stroke-width="2"/>
      <path d="M -55 0 L -42 0 M -50 -10 L -50 10 M -47 -10 L -47 10 M -44 -10 L -44 10"/>
      <path d="M 55 0 L 42 0 M 49 -10 Q 60 -5 60 10"/>
    </g>
    <text x="160" y="170" text-anchor="middle" font-family="Cormorant Garamond, serif" font-style="italic" font-size="20" fill="#15535f">Budapest · jó étvágyat</text>
  </svg>`);

/* ============================================================
   TAGE
   Felder: name, mapsName, desc, image, lat, lng,
           stroller, transit, viewpoint, badges, ticketUrl, inRoute
   Pro Tag: route.fromBase (Start an eurer Unterkunft), route.mode
   ============================================================ */
const ZONES = [
  {
    id: "ankunft",
    tag: "Fr 23.10. · Ankunft",
    title: "Ankunft & Donaukorso bei Nacht",
    summary: "Landung am Abend, mit dem 100E direkt ins Zentrum. Danach nur noch Koffer abstellen, ein gutes Abendessen – und die beleuchtete Kettenbrücke.",
    walkFromHotel: "100E + 1 Station M3 bis vor die Haustür",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Sz%C3%A9chenyi_Chain_Bridge_in_Budapest_at_night.jpg/1280px-Sz%C3%A9chenyi_Chain_Bridge_in_Budapest_at_night.jpg",
    transportNote: "Vom Terminal 2 fährt der <strong>Bus 100E „Airport Express“</strong> rund um die Uhr Richtung Innenstadt – ca. 30–45 Min., 2.500 HUF pro Person (mit Wochenkarte nur 1.000 HUF Aufpreis). <strong>Steigt schon an der ersten Haltestelle <em>Kálvin tér</em> aus</strong>, nicht erst an der Endstation: Von dort bringt euch die <strong>M3 in einer einzigen Station</strong> nach Corvin-negyed, direkt vor die Unterkunft. Eine Bahn zum Flughafen gibt es in Budapest nicht; der 100E ist die offizielle Schnellverbindung. <strong>Wichtig:</strong> Der 23. Oktober ist ungarischer Nationalfeiertag (Aufstand 1956) – Geschäfte sind zu, Restaurants aber offen, und rund um das Parlament kann es Veranstaltungen und Absperrungen geben.",
    route: { fromBase: true, mode: "walking" },
    sights: [
      {
        name: "Donaukorso & Kettenbrücke",
        mapsName: "Széchenyi Lánchíd, Budapest",
        desc: "Der Uferweg auf der Pester Seite ist abends am schönsten: Burgpalast und Kettenbrücke angestrahlt, die Donau schwarz und glänzend. Eben und breit – wenn ihr nach dem Flug noch Energie habt, der perfekte erste Eindruck. Sonst hebt ihr ihn euch für Tag 1 auf.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Sz%C3%A9chenyi_Chain_Bridge_in_Budapest_at_night.jpg/1280px-Sz%C3%A9chenyi_Chain_Bridge_in_Budapest_at_night.jpg",
        lat: 47.4986, lng: 19.0433,
        stroller: "yes",
        viewpoint: true,
        transit: "M3 bis Ferenciek tere (2 Stat.), 5 Min. zu Fuß",
        badges: ["Kostenlos", "Abends angestrahlt"],
      },
    ],
    restaurants: [
      {
        name: "A Grund (Ruinengarten)",
        mapsName: "A Grund, Nagytemplom utca, Budapest",
        desc: "Ruinenbar mit großem überdachtem Innenhof, buchstäblich um die Ecke von eurer Unterkunft. Unkompliziertes Essen, Streetfood-Stände und viel Platz – die naheliegendste Lösung, wenn ihr spät und müde ankommt.",
        lat: 47.4866, lng: 19.0772,
        price: "2.500–5.500 HUF / Gericht",
        badges: ["5 Min. zu Fuß", "Viel Platz", "Öffnungszeiten vorher prüfen"],
      },
      {
        name: "Corvin Plaza & Üllői-Arkaden",
        mapsName: "Corvin Plaza, Budapest",
        desc: "Direkt an eurer Haustür: Im Corvin Plaza gibt es einen Food-Court, unter den Arkaden entlang der Üllői út reihen sich Sushi, Gyros, Burger und Bäckereien. Die sicherste Option, wenn alles andere schon zu hat.",
        lat: 47.4860, lng: 19.0733,
        price: "2.000–5.000 HUF / Gericht",
        badges: ["Direkt vor der Tür", "Viel Auswahl", "Auch spät noch offen"],
      },
      {
        name: "Hungarikum Bisztró",
        mapsName: "Hungarikum Bisztró, Budapest",
        desc: "Das wohl beliebteste traditionelle Lokal der Stadt: Gulasch, Entenbrust, Paprikahuhn, oft mit Live-Zither. Klein und immer voll – für fünf Personen unbedingt vorher reservieren. Vom Corvin-negyed mit der M3 etwa 20 Min.",
        lat: 47.5057, lng: 19.0518,
        price: "4.500–8.000 HUF / Hauptgericht",
        badges: ["Traditionell", "Unbedingt reservieren", "20 Min. mit der M3"],
      },
    ],
  },

  {
    id: "pest",
    tag: "Sa 24.10. · Tag 1",
    title: "Pester Innenstadt – der Überblick",
    summary: "Erster voller Tag zum Ankommen in der Stadt: Basilika mit Panoramaterrasse, Parlament an der Donau, das Schuh-Mahnmal und die Fußgängerzonen rund um Váci utca.",
    walkFromHotel: "M3 zwei Stationen, dann alles zu Fuß",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Szent_Istvan_Bazilika-view2011-kpjas.jpg/1280px-Szent_Istvan_Bazilika-view2011-kpjas.jpg",
    transportNote: "Mit der <strong>M3 ab Corvin-negyed zwei Stationen bis Ferenciek tere</strong> (oder drei bis Deák Ferenc tér), danach ist die ganze Runde flach und zu Fuß machbar (ca. 4 km verteilt über den Tag). Falls die Füße müde werden, fährt die <strong>Tram 2</strong> am Donauufer entlang – eine der schönsten Straßenbahnstrecken der Welt, mit Blick auf Burg und Parlament. Für das Parlament gilt: <strong>Innenbesichtigung nur mit vorab gebuchter Führung</strong>, Zeitfenster und Ausweis nötig. Von außen und vom Kossuth tér ist es jederzeit frei zugänglich.",
    route: { fromBase: true, mode: "walking" },
    sights: [
      {
        name: "St.-Stephans-Basilika",
        mapsName: "Szent István-bazilika, Budapest",
        desc: "Größte Kirche der Stadt, innen golden und monumental. Das Beste ist aber die <strong>Panoramaterrasse</strong> an der Kuppel: 360°-Rundblick über ganz Budapest – und es gibt einen Aufzug, ihr müsst also nicht die 364 Stufen laufen.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Szent_Istvan_Bazilika-view2011-kpjas.jpg/1280px-Szent_Istvan_Bazilika-view2011-kpjas.jpg",
        lat: 47.5008, lng: 19.0539,
        stroller: "yes",
        viewpoint: true,
        transit: "M3 bis Deák Ferenc tér (3 Stat.), 5 Min. zu Fuß",
        badges: ["Aufzug zur Kuppel", "Kirche: Spende", "Terrasse: Ticket"],
        ticketUrl: "https://www.bazilika.biz/en",
      },
      {
        name: "Parlament (Országház)",
        mapsName: "Országház, Budapest",
        desc: "Das drittgrößte Parlamentsgebäude der Welt, 268 Meter neogotische Donaufront – von außen das Wahrzeichen schlechthin. Der beste Blick darauf ist vom Kossuth tér oder vom Budaer Ufer gegenüber.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Hungarian_Parliament_Building_from_across_the_Danube%2C_2025-01-11.jpg/1280px-Hungarian_Parliament_Building_from_across_the_Danube%2C_2025-01-11.jpg",
        lat: 47.5072, lng: 19.0455,
        stroller: "yes",
        transit: "M2 bis Kossuth Lajos tér",
        badges: ["Außen jederzeit frei", "Innen nur mit Führung", "Vorab buchen"],
        ticketUrl: "https://www.parlament.hu/en/web/house-of-the-national-assembly/visit",
      },
      {
        name: "Schuhe am Donauufer",
        mapsName: "Shoes on the Danube Bank, Budapest",
        desc: "60 Paar eiserne Schuhe am Kai, zum Gedenken an die 1944/45 von Pfeilkreuzlern hier erschossenen Juden. Ein stilles, sehr eindringliches Mahnmal direkt am Wasser, wenige Minuten südlich des Parlaments.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Shoes_Danube_Promenade_IMGP1297.jpg/1280px-Shoes_Danube_Promenade_IMGP1297.jpg",
        lat: 47.5042, lng: 19.0445,
        stroller: "yes",
        badges: ["Kostenlos", "Frei zugänglich", "Still & bewegend"],
      },
      {
        name: "Vörösmarty tér & Váci utca",
        mapsName: "Vörösmarty tér, Budapest",
        desc: "Der Platz am Ende der Fußgängerzone, mit dem Traditionscafé Gerbeaud an der Stirnseite. Von hier zieht sich die Váci utca als Einkaufsmeile nach Süden bis zur Großen Markthalle – flach und autofrei.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Vaci_utca_2014_2.jpg/1280px-Vaci_utca_2014_2.jpg",
        lat: 47.4961, lng: 19.0510,
        stroller: "yes",
        transit: "M1 bis Vörösmarty tér",
        badges: ["Autofrei", "Älteste Metro Europas (M1)"],
      },
    ],
    restaurants: [
      {
        name: "Café Gerbeaud",
        mapsName: "Café Gerbeaud, Budapest",
        desc: "Prachtcafé von 1858 am Vörösmarty tér, mit Stuck, Kristalllüstern und der berühmten Esterházy-Torte. Touristisch und teuer, aber einmal muss man dort gesessen haben.",
        lat: 47.4963, lng: 19.0509,
        price: "2.500–6.000 HUF / Kaffee & Kuchen",
        badges: ["Institution seit 1858", "Touristisch", "Sehr schön"],
      },
      {
        name: "Belvárosi Disznótoros",
        mapsName: "Belvárosi Disznótoros, Budapest",
        desc: "Ungarische Fleischtheke zum Selbstzeigen: Würste, Schnitzel, Hausmannskost, am Stehtisch gegessen. Extrem günstig und authentisch – das Gegenstück zum Prachtcafé.",
        lat: 47.4936, lng: 19.0557,
        price: "2.000–4.000 HUF / Portion",
        badges: ["Sehr günstig", "Authentisch", "Eher Stehplätze"],
      },
      {
        name: "Füge & Mangó Free Bakery",
        mapsName: "Füge és Mangó Free Bakery, Budapest",
        desc: "Komplett glutenfreie Bäckerei mitten im Zentrum: Brot, Zimtschnecken, Kuchen und Torten. Ein reiner GF-Betrieb, also ohne Kontaminationsrisiko.",
        lat: 47.4947, lng: 19.0577,
        price: "1.200–3.000 HUF / Stück",
        badges: ["Glutenfrei", "100 % GF-Betrieb", "Zentral"],
      },
    ],
  },

  {
    id: "burgberg",
    tag: "So 25.10. · Tag 2",
    title: "Burgberg Buda & Fischerbastei",
    summary: "Über die Donau auf den Burgberg: Standseilbahn, Burgpalast mit Nationalgalerie, Matthiaskirche und die Fischerbastei – der berühmteste Aussichtspunkt der Stadt.",
    walkFromHotel: "Tram/Bus hinüber, oben alles zu Fuß",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Budapest_Fisherman%27s_Bastion-20080321-RM-100000.jpg/1280px-Budapest_Fisherman%27s_Bastion-20080321-RM-100000.jpg",
    transportNote: "Heute Nacht wurde die Uhr zurückgestellt – ihr habt eine Stunde geschenkt bekommen. Zum Burgberg fahrt ihr am besten mit der <strong>M3 bis Deák Ferenc tér</strong> (3 Stationen) und steigt dort in den <strong>Bus 16</strong> um, der direkt auf den Burgberg fährt. Alternativ bis Ferenciek tere, zu Fuß über die <strong>Kettenbrücke</strong> und mit der historischen <strong>Standseilbahn (Sikló)</strong> hinauf. <strong>Mit Kinderwagen ist Bus 16 die bequemste Variante</strong> – die Standseilbahn ist eng und hat Stufen. Oben ist alles Kopfsteinpflaster, aber flach. Sonntag ist gut gewählt: Die Nationalgalerie hat offen (montags wäre sie zu).",
    route: { fromBase: false, mode: "walking" },
    sights: [
      {
        name: "Budavári Sikló (Standseilbahn)",
        mapsName: "Budavári Sikló, Budapest",
        desc: "Historische Standseilbahn von 1870, die in zwei Minuten vom Fuß der Kettenbrücke auf den Burgberg fährt. Kurz, nostalgisch und mit schönem Blick zurück auf die Donau – aber eng und mit Stufen.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Budapest_Funicular_R01.jpg/1280px-Budapest_Funicular_R01.jpg",
        lat: 47.4982, lng: 19.0394,
        stroller: "careful",
        transit: "Fuß der Kettenbrücke, Buda-Seite",
        badges: ["Eigenes Ticket", "Oft Schlange", "Eng mit Kinderwagen"],
      },
      {
        name: "Burgpalast (Budavári Palota)",
        mapsName: "Budavári Palota, Budapest",
        desc: "Der mächtige Palast über der Donau, heute Museumskomplex. Allein die Terrassen und Innenhöfe lohnen – von hier blickt ihr über die ganze Pester Seite. Außengelände frei zugänglich.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Budav%C3%A1ri_Palota%2C_ABCDEF_%C3%A9p%C3%BClet.jpg/1280px-Budav%C3%A1ri_Palota%2C_ABCDEF_%C3%A9p%C3%BClet.jpg",
        lat: 47.4961, lng: 19.0397,
        stroller: "careful",
        viewpoint: true,
        transit: "Bus 16 bis Clark Ádám tér / Dísz tér",
        badges: ["Terrassen kostenlos", "UNESCO-Welterbe"],
      },
      {
        name: "Ungarische Nationalgalerie",
        mapsName: "Magyar Nemzeti Galéria, Budapest",
        desc: "Im Burgpalast: ungarische Kunst vom Mittelalter bis zur Moderne. Für euch besonders interessant sind die <strong>ungarischen Impressionisten</strong> – Szinyei Merse, Rippl-Rónai, Csontváry. Montags geschlossen.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Buda--Castles01.jpg/1280px-Buda--Castles01.jpg",
        lat: 47.4962, lng: 19.0398,
        stroller: "yes",
        badges: ["Montags geschlossen", "Ungarische Impressionisten", "Aufzüge"],
        ticketUrl: "https://mng.hu/en/",
      },
      {
        name: "Matthiaskirche",
        mapsName: "Mátyás-templom, Budapest",
        desc: "Krönungskirche der ungarischen Könige mit dem unverwechselbaren bunten Zsolnay-Ziegeldach. Innen kein gotisches Grau, sondern farbige Ornamentmalerei in jedem Winkel – überraschend und schön.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/MatyasTemplomFotoThalerTamas20162.JPG/1280px-MatyasTemplomFotoThalerTamas20162.JPG",
        lat: 47.5020, lng: 19.0341,
        stroller: "careful",
        badges: ["Ticket nötig", "Buntes Zsolnay-Dach", "Kopfsteinpflaster"],
        ticketUrl: "https://matyas-templom.hu/en",
      },
      {
        name: "Fischerbastei",
        mapsName: "Halászbástya, Budapest",
        desc: "Märchenhafte Türmchen-Terrasse direkt neben der Matthiaskirche – <strong>der</strong> Postkartenblick auf Parlament und Donau. Die unteren Terrassen sind kostenlos; nur die oberen Türme kosten Eintritt und lohnen kaum.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Budapest_Fisherman%27s_Bastion-20080321-RM-100000.jpg/1280px-Budapest_Fisherman%27s_Bastion-20080321-RM-100000.jpg",
        lat: 47.5024, lng: 19.0347,
        stroller: "careful",
        viewpoint: true,
        badges: ["Untere Terrassen frei", "Bester Postkartenblick", "Morgens am leersten"],
      },
    ],
    restaurants: [
      {
        name: "Ruszwurm Cukrászda",
        mapsName: "Ruszwurm Cukrászda, Budapest",
        desc: "Älteste Konditorei der Stadt (1827), winzig, mit Kirschholz-Vitrinen. Berühmt für ihre Cremeschnitte (Krémes). Nur wenige Tische – notfalls zum Mitnehmen und draußen essen.",
        lat: 47.5017, lng: 19.0330,
        price: "1.500–3.000 HUF / Stück",
        badges: ["Seit 1827", "Sehr klein", "Krémes probieren"],
      },
      {
        name: "Pest-Buda Bistro",
        mapsName: "Pest-Buda Bistro, Budapest",
        desc: "Kleines, feines Bistro in der Burggasse mit moderner ungarischer Küche – deutlich besser als die Touristenlokale ringsum. Reservierung empfohlen, gerade zu fünft.",
        lat: 47.5015, lng: 19.0334,
        price: "6.000–11.000 HUF / Hauptgericht",
        badges: ["Gehoben", "Reservieren", "Sehr gute Küche"],
      },
      {
        name: "Free! Gluten Free Bakery",
        mapsName: "Free Gluten Free Bakery, Fény utca, Budapest",
        desc: "Komplett glutenfreie Handwerksbäckerei auf der Budaer Seite nahe Széll Kálmán tér – alles auch lactose- und sojafrei. Gut auf dem Weg hinauf oder hinunter vom Burgberg.",
        lat: 47.5085, lng: 19.0255,
        price: "1.000–3.000 HUF / Stück",
        badges: ["Glutenfrei", "100 % GF-Betrieb", "Nahe Széll Kálmán tér"],
      },
    ],
  },

  {
    id: "juedisch",
    tag: "Mo 26.10. · Tag 3",
    title: "Jüdisches Viertel & Große Markthalle",
    summary: "Montag sind fast alle Museen zu – perfekt für den Tag, an dem es ohnehin um Markthalle, Synagoge, Ruinenbars und Essen geht.",
    walkFromHotel: "15 Min. zu Fuß zur Markthalle, zurück per Tram 4/6",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/VasarcsarnokFotoThalerTamas.JPG/1280px-VasarcsarnokFotoThalerTamas.JPG",
    transportNote: "<strong>Montags sind praktisch alle Budapester Museen geschlossen</strong> – deshalb liegt dieser Tag bewusst hier. Die Große Markthalle öffnet schon um 6 Uhr und schließt um 17 Uhr (montags etwas früher), also am besten vormittags hin – von eurer Unterkunft sind es <strong>15 Min. zu Fuß die Üllői út hinunter</strong> oder eine Station mit der M3 bis Kálvin tér. Weiter ins jüdische Viertel mit <strong>Tram 47 oder 49</strong> bis Astoria (oder 20 Min. zu Fuß über die Károly körút); zurück fährt die <strong>Tram 4/6</strong> ab Blaha Lujza tér in zwei Stationen bis vor die Haustür. Die Dohány-Synagoge ist <strong>samstags und an jüdischen Feiertagen geschlossen</strong>, montags aber offen. Für die Synagoge gilt: Schultern und Knie bedeckt, Männer bekommen am Eingang eine Kippa.",
    route: { fromBase: true, mode: "walking" },
    sights: [
      {
        name: "Große Markthalle",
        mapsName: "Nagyvásárcsarnok, Budapest",
        desc: "Dreischiffige Stahlkonstruktion von 1897 mit Zsolnay-Dach. Unten Paprika, Salami und Gemüse, oben Imbissstände mit Lángos und Gulasch. Der wichtigste Food-Spot der Stadt – und ebenerdig mit Aufzug.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/VasarcsarnokFotoThalerTamas.JPG/1280px-VasarcsarnokFotoThalerTamas.JPG",
        lat: 47.4874, lng: 19.0587,
        stroller: "yes",
        transit: "M4 / Tram 47,49 bis Fővám tér",
        badges: ["Mo–Fr ab 6 Uhr", "Sonntags zu", "Lángos probieren", "Aufzug vorhanden"],
      },
      {
        name: "Dohány-Synagoge",
        mapsName: "Dohány utcai zsinagóga, Budapest",
        desc: "Größte Synagoge Europas (1859), maurisch-byzantinisch mit zwei Zwiebeltürmen. Dahinter der Gedenkpark mit dem silbernen Trauerweiden-Denkmal und das Jüdische Museum. Sehr eindrücklich erklärt.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Synagogue-Budapest.jpg/1280px-Synagogue-Budapest.jpg",
        lat: 47.4958, lng: 19.0611,
        stroller: "yes",
        transit: "M2 bis Astoria, 3 Min. zu Fuß",
        badges: ["Samstags geschlossen", "Ticket inkl. Museum", "Schultern bedeckt"],
        ticketUrl: "https://www.dohany-zsinagoga.hu/en",
      },
      {
        name: "Szimpla Kert (Ruinenbar)",
        mapsName: "Szimpla Kert, Budapest",
        desc: "Die erste und berühmteste Ruinenbar: ein verfallenes Mietshaus voller Trödel, ausgedienter Trabant inklusive. Tagsüber fast leer und entspannt zu besichtigen – abends rappelvoll.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Szimpla_Kert_Trabant.jpg/1280px-Szimpla_Kert_Trabant.jpg",
        lat: 47.4977, lng: 19.0632,
        stroller: "careful",
        badges: ["Tagsüber ruhig", "Eintritt frei", "Abends sehr voll"],
      },
    ],
    restaurants: [
      {
        name: "Gettó Gulyás",
        mapsName: "Gettó Gulyás, Budapest",
        desc: "Moderne Version der ungarischen Klassiker: Gulasch, Paprikahuhn, Entenkeule – ehrlich gekocht, faire Preise, mitten im jüdischen Viertel. Reservieren lohnt sich.",
        lat: 47.4984, lng: 19.0624,
        price: "3.500–7.000 HUF / Hauptgericht",
        badges: ["Ungarische Klassiker", "Reservieren", "Sehr beliebt"],
      },
      {
        name: "Karaván Street Food",
        mapsName: "Karaván Street Food, Budapest",
        desc: "Hof voller Foodtrucks direkt neben Szimpla Kert: Lángos, Burger, vegane Stände, ungarische Spezialitäten. Ideal, wenn fünf Leute fünf verschiedene Sachen wollen.",
        lat: 47.4976, lng: 19.0629,
        price: "2.000–4.500 HUF / Portion",
        badges: ["Street Food", "Viel Auswahl", "Draußen"],
      },
      {
        name: "New York Café",
        mapsName: "New York Café, Budapest",
        desc: "Oft als „schönstes Café der Welt“ bezeichnet: Marmor, Gold, Deckenfresken, einst Treffpunkt der Literaten. Teuer und mit Schlange – aber als Erlebnis schwer zu toppen.",
        lat: 47.4971, lng: 19.0702,
        price: "4.000–9.000 HUF / Gedeck",
        badges: ["Spektakulär", "Oft Schlange", "Teuer"],
      },
    ],
  },

  {
    id: "gellert",
    tag: "Di 27.10. · Tag 4",
    title: "Gellértberg, Zitadelle & Ludwig Museum",
    summary: "Der beste Panoramablick der Stadt von der frisch wiedereröffneten Zitadelle – und am Nachmittag moderne Kunst im Ludwig Museum an der Donau.",
    walkFromHotel: "Tram 4/6 direkt bis Szent Gellért tér",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Gell%C3%A9rtHillSkyline.jpg/1280px-Gell%C3%A9rtHillSkyline.jpg",
    transportNote: "Heute habt ihr Glück mit der Lage: Die <strong>Tram 4/6</strong> fährt ab Corvin-negyed <strong>ohne Umsteigen in vier Stationen bis <em>Szent Gellért tér</em></strong> – über die Petőfi-Brücke und am Donauufer entlang. Der Aufstieg auf den Gellértberg dauert 20–30 Minuten über Serpentinenwege – <strong>mit Kinderwagen anstrengend, aber zu viert gut machbar</strong>; alternativ fährt <strong>Bus 27</strong> ab Móricz Zsigmond körtér fast bis oben. Am Nachmittag zurück ans Ufer und mit der <strong>Tram 2</strong> (die Panoramastrecke!) nach Süden bis <em>Müpa</em> zum Ludwig Museum. Die Zitadelle ist seit März 2026 nach elf Jahren Umbau wieder offen: Der Park oben ist kostenlos.",
    route: { fromBase: true, mode: "transit" },
    sights: [
      {
        name: "Freiheitsbrücke",
        mapsName: "Szabadság híd, Budapest",
        desc: "Die schönste der Donaubrücken: grün lackierter Jugendstil-Stahl mit vergoldeten Turul-Vögeln auf den Pfeilern. Ein Fußweg führt hinüber, direkt von der Markthalle zum Gellértberg.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Szabads%C3%A1g_h%C3%ADd_Budapest_September_2013.JPG/1280px-Szabads%C3%A1g_h%C3%ADd_Budapest_September_2013.JPG",
        lat: 47.4861, lng: 19.0556,
        stroller: "yes",
        transit: "Tram 47,49 bis Szent Gellért tér",
        badges: ["Kostenlos", "Jugendstil", "Zu Fuß überquerbar"],
      },
      {
        name: "Gellért-Bad",
        mapsName: "Gellért Gyógyfürdő, Budapest",
        desc: "Das prachtvollste Thermalbad der Stadt: Jugendstilhalle mit Zsolnay-Majolika, Buntglas und Säulen. Auch wenn ihr nicht badet – der Eingangsbereich allein ist sehenswert.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Budapest%2C_Gell%C3%A9rt_f%C3%BCrd%C5%91.jpg/1280px-Budapest%2C_Gell%C3%A9rt_f%C3%BCrd%C5%91.jpg",
        lat: 47.4836, lng: 19.0520,
        stroller: "yes",
        badges: ["Ticket vorab online", "Badesachen mitbringen", "Thermalwasser: nichts fürs Baby"],
        ticketUrl: "https://www.gellertbath.hu/en",
      },
      {
        name: "Gellértberg",
        mapsName: "Gellért-hegy, Budapest",
        desc: "235 Meter hoher Felsen über der Donau, mit Serpentinenwegen durch den Park hinauf. Auf halber Höhe gibt es schon mehrere Terrassen mit freiem Blick über die Brücken.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Gell%C3%A9rtHillSkyline.jpg/1280px-Gell%C3%A9rtHillSkyline.jpg",
        lat: 47.4866, lng: 19.0400,
        stroller: "careful",
        viewpoint: true,
        transit: "Bus 27 ab Móricz Zsigmond körtér",
        badges: ["Kostenlos", "20–30 Min. Aufstieg", "Steile Serpentinen"],
      },
      {
        name: "Zitadelle (neu eröffnet)",
        mapsName: "Citadella, Budapest",
        desc: "Die Festung von 1854 war elf Jahre lang gesperrt und ist seit März 2026 wieder offen – mit 6.000 m² öffentlichem Park, begehbaren Wehrgängen und Panoramaterrassen. <strong>Der beste Rundblick über Budapest</strong>, der Park ist kostenlos.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Citadella_-_Budapest.jpg/1280px-Citadella_-_Budapest.jpg",
        lat: 47.4869, lng: 19.0462,
        stroller: "careful",
        viewpoint: true,
        badges: ["Seit März 2026 wieder offen", "Park kostenlos", "Ausstellung mit Ticket"],
      },
      {
        name: "Freiheitsstatue",
        mapsName: "Szabadság-szobor, Budapest",
        desc: "Die 14 Meter hohe Frau mit dem Palmwedel auf dem Gellértberg, von fast überall in der Stadt zu sehen. 1947 als sowjetisches Befreiungsdenkmal errichtet, heute allgemein der Freiheit gewidmet.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Budapest_Gell%C3%A9rt_socha_svobody_1.jpg/1280px-Budapest_Gell%C3%A9rt_socha_svobody_1.jpg",
        lat: 47.4868, lng: 19.0468,
        stroller: "careful",
        badges: ["Kostenlos", "Wahrzeichen"],
      },
      {
        name: "Ludwig Museum (MÜPA)",
        mapsName: "Ludwig Múzeum, Budapest",
        desc: "Das wichtigste Museum für zeitgenössische Kunst in Ungarn, im markanten Palast der Künste an der Donau. Internationale Gegenwartskunst und wechselnde Ausstellungen – modern, hell, barrierefrei.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Budapest_-_M%C3%BCpa_%281%29.jpg/1280px-Budapest_-_M%C3%BCpa_%281%29.jpg",
        lat: 47.4696, lng: 19.0714,
        stroller: "yes",
        transit: "Tram 2 bis Müpa (Panoramastrecke!)",
        badges: ["Montags geschlossen", "Zeitgenössische Kunst", "Barrierefrei"],
        ticketUrl: "https://www.ludwigmuseum.hu/en",
      },
    ],
    restaurants: [
      {
        name: "Hadik Kávéház",
        mapsName: "Hadik Kávéház, Budapest",
        desc: "Literaturcafé von 1906 an der Bartók Béla út, dem charmantesten Café-Boulevard Budas. Ungarische Küche auf gutem Niveau, entspannt und bei Einheimischen beliebt.",
        lat: 47.4818, lng: 19.0487,
        price: "3.500–7.000 HUF / Hauptgericht",
        badges: ["Seit 1906", "Wenig Touristen", "Nahe Gellért"],
      },
      {
        name: "Szatyor Bár és Galéria",
        mapsName: "Szatyor Bár, Budapest",
        desc: "Direkt neben dem Hadik, künstlerisch-schräg eingerichtet, mit Wandmalereien und großen Tischen. Gut für einen langen Nachmittag zu fünft.",
        lat: 47.4817, lng: 19.0485,
        price: "3.000–6.000 HUF / Gericht",
        badges: ["Große Tische", "Künstlerisch", "Entspannt"],
      },
      {
        name: "Bálna Budapest",
        mapsName: "Bálna Budapest",
        desc: "Der „Wal“ – ein Glasbau über alten Speicherhäusern am Donauufer, mit mehreren Restaurants und Terrassen zum Wasser. Praktischer Zwischenstopp auf der Tram-2-Strecke.",
        lat: 47.4846, lng: 19.0636,
        price: "3.000–7.000 HUF / Gericht",
        badges: ["Am Donauufer", "Mehrere Lokale", "An der Tram 2"],
      },
    ],
  },

  {
    id: "stadtwaeldchen",
    tag: "Mi 28.10. · Tag 5",
    title: "Stadtwäldchen & Haus der Musik",
    summary: "Heldenplatz, Märchenburg am See, das spektakuläre Haus der Ungarischen Musik, das neue Ethnographische Museum – und zum Abschluss das Széchenyi-Thermalbad.",
    walkFromHotel: "Tram 4/6 + M1, im Park alles zu Fuß",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/HUN-2015-Budapest-Heroes%E2%80%99_Square.jpg/1280px-HUN-2015-Budapest-Heroes%E2%80%99_Square.jpg",
    transportNote: "Am schnellsten mit der <strong>Tram 4/6 ab Corvin-negyed bis Oktogon</strong> (4 Stationen) und dort in die <strong>M1</strong> umsteigen – die älteste U-Bahn Kontinentaleuropas von 1896, selbst ein Denkmal – bis <em>Hősök tere</em> oder <em>Széchenyi fürdő</em>. Zusammen rund 20 Minuten. Achtung: Die M1-Stationen sind flach, haben aber <strong>nur Treppen, keine Aufzüge</strong>; mit Kinderwagen seid ihr zu viert aber schnell oben. Im Stadtwäldchen selbst ist alles eben, breit und autofrei. <strong>Tipp fürs Bad:</strong> Thermalwasser ist für ein Baby zu heiß – ihr seid aber vier Erwachsene, also können zwei baden gehen, während die anderen mit dem Kleinen im Park bleiben.",
    route: { fromBase: true, mode: "transit" },
    sights: [
      {
        name: "Heldenplatz (Hősök tere)",
        mapsName: "Hősök tere, Budapest",
        desc: "Monumentaler Platz am Ende der Andrássy-Prachtstraße, mit der Millenniumssäule und den Statuen der sieben Stammesfürsten. Riesig, eben und kostenlos – ein beeindruckender Auftakt zum Park.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/HUN-2015-Budapest-Heroes%E2%80%99_Square.jpg/1280px-HUN-2015-Budapest-Heroes%E2%80%99_Square.jpg",
        lat: 47.5150, lng: 19.0778,
        stroller: "yes",
        transit: "M1 bis Hősök tere",
        badges: ["Kostenlos", "UNESCO-Welterbe", "Viel Platz"],
      },
      {
        name: "Vajdahunyad-Burg",
        mapsName: "Vajdahunyad vára, Budapest",
        desc: "Eine Fantasieburg am Parksee, 1896 als Zusammenstellung ungarischer Baustile gebaut – gotisch, romanisch und barock in einem. Der Innenhof ist frei zugänglich und wirkt wie eine Filmkulisse.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Vajdahunyad_v%C3%A1ra_Budapest_September_2013.jpg/1280px-Vajdahunyad_v%C3%A1ra_Budapest_September_2013.jpg",
        lat: 47.5148, lng: 19.0825,
        stroller: "careful",
        badges: ["Hof kostenlos", "Teils Kopfsteinpflaster", "Sehr fotogen"],
      },
      {
        name: "Haus der Ungarischen Musik",
        mapsName: "Magyar Zene Háza, Budapest",
        desc: "Der architektonische Star des Parks: ein schwebendes, durchlöchertes Dach von Sou Fujimoto mit 30.000 goldenen Blättern an der Unterseite. Innen interaktive Klangausstellung – auch für Kinder spannend.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/House_of_Hungarian_Music_%283%29.jpg/1280px-House_of_Hungarian_Music_%283%29.jpg",
        lat: 47.5141, lng: 19.0806,
        stroller: "yes",
        badges: ["Montags geschlossen", "Interaktiv", "Barrierefrei", "Moderne Architektur"],
        ticketUrl: "https://hungarianmusichouse.hu/en",
      },
      {
        name: "Ethnographisches Museum",
        mapsName: "Néprajzi Múzeum, Budapest",
        desc: "Spektakulärer Neubau am Parkrand: eine geschwungene Schlucht aus Glas, deren <strong>begrünte Dachfläche komplett begehbar</strong> ist – kostenlos, mit Blick über den Heldenplatz. Innen Ungarns Volkskultur.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/N%C3%A9prajzi_M%C3%BAzeum_%2840%29.jpg/1280px-N%C3%A9prajzi_M%C3%BAzeum_%2840%29.jpg",
        lat: 47.5165, lng: 19.0775,
        stroller: "yes",
        viewpoint: true,
        badges: ["Dach kostenlos begehbar", "Montags geschlossen", "Barrierefrei"],
        ticketUrl: "https://www.neprajz.hu/en",
      },
      {
        name: "Széchenyi-Thermalbad",
        mapsName: "Széchenyi Gyógyfürdő, Budapest",
        desc: "Das größte Heilbad Europas, neobarock in Buttergelb, mit den berühmten Außenbecken, in denen bei Dampf Schach gespielt wird. 15 Innen- und 3 Außenbecken, 18 bis 38 °C.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Budapest_Sz%C3%A9chenyi_Baths_R02.jpg/1280px-Budapest_Sz%C3%A9chenyi_Baths_R02.jpg",
        lat: 47.5188, lng: 19.0817,
        stroller: "yes",
        transit: "M1 bis Széchenyi fürdő",
        badges: ["Ticket vorab online", "Badesachen & Flipflops", "Nichts fürs Baby"],
        ticketUrl: "https://www.szechenyibath.hu/en",
      },
    ],
    restaurants: [
      {
        name: "Gundel",
        mapsName: "Gundel Étterem, Budapest",
        desc: "Ungarns berühmtestes Restaurant seit 1894, direkt am Stadtwäldchen neben dem Zoo. Klassische Küche im großen Stil – hier wurde der Gundel-Palatschinken erfunden. Für einen besonderen Abend.",
        lat: 47.5173, lng: 19.0829,
        price: "9.000–18.000 HUF / Hauptgericht",
        badges: ["Legendär", "Gehoben", "Reservieren"],
      },
      {
        name: "Pántlika Bisztró",
        mapsName: "Pántlika Bisztró, Budapest",
        desc: "Retro-Pavillon aus den 1960ern mitten im Park, mit Terrasse und Langos. Unkompliziert, günstig und entspannt – genau richtig für eine Pause zwischen den Museen.",
        lat: 47.5162, lng: 19.0869,
        price: "2.500–5.000 HUF / Gericht",
        badges: ["Im Park", "Günstig", "Terrasse"],
      },
      {
        name: "La Cipolla",
        mapsName: "La Cipolla Budapest, Dózsa György út",
        desc: "Komplett glutenfreies Restaurant mit Pizza, Pasta, Risotto und Desserts – nördlich des Stadtwäldchens. Reiner GF-Betrieb, also ohne Kontaminationsrisiko.",
        lat: 47.5212, lng: 19.0712,
        price: "3.500–7.000 HUF / Gericht",
        badges: ["Glutenfrei", "100 % GF-Betrieb", "Pizza & Pasta"],
      },
    ],
  },

  {
    id: "andrassy",
    tag: "Do 29.10. · Tag 6",
    title: "Andrássy, Oper & Impressionismus",
    summary: "Die Prachtstraße hinauf, vorbei an der Staatsoper – und dann ins Museum der Bildenden Künste, wo seit dem 28.10. die große Gauguin-Schau mit Monet, Cézanne und van Gogh läuft.",
    walkFromHotel: "Tram 4/6 bis Oktogon, dann Andrássy zu Fuß",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Budapest_Fine_Arts_Museum_R01.jpg/1280px-Budapest_Fine_Arts_Museum_R01.jpg",
    transportNote: "Mit der <strong>Tram 4/6 bis Oktogon</strong> seid ihr in 4 Stationen mitten auf der Andrássy út. Von dort könnt ihr wahlweise stadteinwärts zur Oper laufen (10 Min.) oder stadtauswärts zum Heldenplatz. Die <strong>Andrássy út</strong> ist 2,5 km lang, flach, breit und von Platanen gesäumt – ideal zum Schieben. Lauft so weit ihr mögt und steigt unterwegs in die <strong>M1</strong> ein, die genau darunter verläuft und alle paar hundert Meter hält. <strong>Zum Museum:</strong> Das Szépművészeti ist dienstags bis sonntags 10–18 Uhr offen (letzter Einlass 17 Uhr), montags geschlossen. Für die Gauguin-Sonderausstellung solltet ihr ein <strong>Zeitfenster vorab online buchen</strong> – sie ist am 28.10. erst eröffnet worden und entsprechend gefragt.",
    route: { fromBase: true, mode: "walking" },
    sights: [
      {
        name: "Ungarische Staatsoper",
        mapsName: "Magyar Állami Operaház, Budapest",
        desc: "Neorenaissance-Prachtbau von 1884, nach jahrelanger Restaurierung wieder in vollem Glanz. Von außen frei zu bestaunen; drinnen gibt es Führungen – oder gleich Karten für eine Vorstellung.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Opera_blue.jpg/1280px-Opera_blue.jpg",
        lat: 47.5028, lng: 19.0586,
        stroller: "yes",
        transit: "M1 bis Opera",
        badges: ["Außen frei", "Führungen buchbar", "Frisch restauriert"],
        ticketUrl: "https://www.opera.hu/en/",
      },
      {
        name: "Andrássy út",
        mapsName: "Andrássy út, Budapest",
        desc: "Budapests Prachtboulevard und UNESCO-Welterbe: 2,5 km Neorenaissance-Palais, Botschaften und Cafés, vom Zentrum bis zum Heldenplatz. Darunter fährt die Millenniums-U-Bahn von 1896.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Andr%C3%A1ssi%C3%BAtl%C3%A9gifot%C3%B3.jpg/1280px-Andr%C3%A1ssi%C3%BAtl%C3%A9gifot%C3%B3.jpg",
        lat: 47.5060, lng: 19.0640,
        stroller: "yes",
        transit: "M1 fährt direkt darunter",
        badges: ["UNESCO-Welterbe", "Breit & flach", "Ideal zum Schieben"],
      },
      {
        name: "Museum der Bildenden Künste",
        mapsName: "Szépművészeti Múzeum, Budapest",
        desc: "Ungarns große internationale Sammlung am Heldenplatz: alte Meister, Ägypten, und eine starke Abteilung französischer Impressionisten. <strong>Ab 28.10.2026 läuft hier „Bonjour Monsieur Gauguin!“</strong> mit rund 150 Werken von Gauguin, Monet, Cézanne, van Gogh und Pissarro.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Budapest_Fine_Arts_Museum_R01.jpg/1280px-Budapest_Fine_Arts_Museum_R01.jpg",
        lat: 47.5161, lng: 19.0776,
        stroller: "yes",
        viewpoint: false,
        transit: "M1 bis Hősök tere",
        badges: ["Gauguin-Schau ab 28.10.", "Montags geschlossen", "Zeitfenster buchen", "Aufzüge"],
        ticketUrl: "https://www.mfab.hu/",
      },
    ],
    restaurants: [
      {
        name: "Bohémtanya Gluténmentes",
        mapsName: "Bohémtanya Vendéglő, Paulay Ede utca, Budapest",
        desc: "Komplett glutenfreies Wirtshaus nahe der Oper, das trotzdem klassische ungarische Küche kocht – Gulasch, Schnitzel, Palatschinken. Die seltene Kombination aus deftig und sicher glutenfrei.",
        lat: 47.4989, lng: 19.0594,
        price: "3.500–7.000 HUF / Hauptgericht",
        badges: ["Glutenfrei", "100 % GF-Betrieb", "Ungarische Küche"],
      },
      {
        name: "Két Szerecsen",
        mapsName: "Két Szerecsen Bisztró, Budapest",
        desc: "Bistro an der Nagymező utca („Budapester Broadway“), gleich bei der Oper. Mediterran-ungarische Karte, von morgens bis spät offen, verlässlich gut.",
        lat: 47.5035, lng: 19.0598,
        price: "4.000–8.000 HUF / Hauptgericht",
        badges: ["Durchgehend offen", "Nahe Oper", "Verlässlich"],
      },
      {
        name: "Menza",
        mapsName: "Menza Étterem, Liszt Ferenc tér, Budapest",
        desc: "Retro-Design im Stil der 1970er am Liszt Ferenc tér, mit modernisierten ungarischen Gerichten. Große Terrasse, faire Preise – gut für eine Gruppe.",
        lat: 47.5042, lng: 19.0651,
        price: "3.500–7.000 HUF / Hauptgericht",
        badges: ["Retro-Design", "Gut für Gruppen", "Terrasse"],
      },
    ],
  },

  {
    id: "abreise",
    tag: "Fr 30.10. · Abreise",
    title: "Halber Tag & Heimflug",
    summary: "Ein ruhiger Vormittag auf der Margareteninsel oder in der Markthalle, früh Mittagessen – und mit genug Puffer zum Flughafen.",
    walkFromHotel: "Tram 4/6 direkt zur Insel, dann M3 + 100E",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Budapest_Donauinsel_2.jpg/1280px-Budapest_Donauinsel_2.jpg",
    transportNote: "<strong>Zeitplan:</strong> Abflug 20:40 Uhr (EW&nbsp;2785) → spätestens 18:00 Uhr am Flughafen → M3 eine Station bis Kálvin tér, dort in den 100E (ca. 40 Min. plus Puffer) → <strong>gegen 16:45 Uhr von der Unterkunft los</strong>. Bis etwa 16 Uhr habt ihr also frei. Praktisch: Die <strong>Tram 4/6 fährt ab Corvin-negyed ohne Umsteigen bis <em>Margitsziget</em></strong>, mitten auf der Margaretenbrücke – die Insel ist autofrei, flach und hat breite Wege, perfekt zum Schieben. Wer lieber in der Stadt bleibt: Die Hold utcai Vásárcsarnok ist eine kleine Markthalle mit sehr gutem Mittagstisch (M3 bis Arany János utca).",
    route: { fromBase: true, mode: "transit" },
    sights: [
      {
        name: "Margareteninsel",
        mapsName: "Margitsziget, Budapest",
        desc: "2,5 km lange autofreie Parkinsel mitten in der Donau: alte Platanen, Klosterruinen, ein Musikbrunnen und ein japanischer Garten. Der ruhigste Ort der Stadt – und der entspannteste letzte Vormittag.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Budapest_Donauinsel_2.jpg/1280px-Budapest_Donauinsel_2.jpg",
        lat: 47.5270, lng: 19.0497,
        stroller: "yes",
        transit: "Tram 4/6 ab Corvin-negyed, ohne Umsteigen",
        badges: ["Autofrei", "Kostenlos", "Breite, ebene Wege"],
      },
    ],
    restaurants: [
      {
        name: "Hold utcai Vásárcsarnok",
        mapsName: "Hold utcai Vásárcsarnok, Budapest",
        desc: "Kleine, elegante Markthalle nahe dem Parlament, oben mit mehreren sehr guten Mittagstischen (u. a. ungarische Klassiker und Street Food). Wochentags vormittags – also am Freitag perfekt.",
        lat: 47.5041, lng: 19.0513,
        price: "2.500–6.000 HUF / Gericht",
        badges: ["Werktags vormittags", "Mehrere Stände", "Zentral"],
      },
      {
        name: "Café Gerlóczy",
        mapsName: "Gerlóczy Kávéház, Budapest",
        desc: "Falls ihr es ruhig ausklingen lassen wollt: Frühstück oder ein letzter Kaffee an einem der schönsten kleinen Plätze der Innenstadt – mit der M3 drei Stationen bis Deák Ferenc tér, dann fünf Minuten zu Fuß.",
        lat: 47.4938, lng: 19.0565,
        price: "2.500–6.000 HUF / Gericht",
        badges: ["Frühstück", "Zentral", "Ruhiger Platz"],
      },
    ],
  },
];

/* ============================================================
   WISSENSWERTES
   Kurzer Hintergrundartikel je Ziel, Schlüssel = Name der
   Sehenswürdigkeit. Felder: text, url (zum Nachlesen), image (optional)
   ============================================================ */
const FACTS = {
  "Donaukorso & Kettenbrücke": {
    text: "Bis 1849 gab es keine feste Brücke zwischen Buda und Pest – im Winter kam man nur über das Eis hinüber, bei Treibeis gar nicht. Graf István Széchenyi trieb den Bau an, nachdem er angeblich acht Tage lang nicht zur Beerdigung seines Vaters gelangen konnte. Um die Löwen an den Brückenköpfen rankt sich bis heute das Gerücht, der Bildhauer habe die Zungen vergessen – tatsächlich sind sie vorhanden, nur von unten nicht zu sehen.",
    url: "https://de.wikipedia.org/wiki/Sz%C3%A9chenyi-Kettenbr%C3%BCcke",
  },
  "St.-Stephans-Basilika": {
    text: "Die Basilika ist exakt 96 Meter hoch – genau wie die Kuppel des Parlaments. Das ist kein Zufall: Eine Bauvorschrift untersagt in Budapest höhere Gebäude, weltliche und geistliche Macht sollen auf Augenhöhe stehen. Die Zahl verweist auf das Jahr 896, die ungarische Landnahme. In einer Seitenkapelle wird die „Heilige Rechte“ aufbewahrt, die mumifizierte rechte Hand von Staatsgründer Stephan I.",
    url: "https://de.wikipedia.org/wiki/St.-Stephans-Basilika_(Budapest)",
  },
  "Parlament (Országház)": {
    text: "Mit 268 Metern Länge und 691 Räumen ist es das größte Gebäude Ungarns – errichtet 1885–1904 für ein Land, das damals ein Vielfaches seiner heutigen Fläche umfasste. Verbaut wurden rund 40 Millionen Ziegel und etwa 40 Kilogramm Gold. Unter der Kuppel liegt die Stephanskrone, bewacht von zwei Gardisten; dort darf nicht fotografiert werden.",
    url: "https://de.wikipedia.org/wiki/Parlamentsgeb%C3%A4ude_(Budapest)",
  },
  "Schuhe am Donauufer": {
    text: "Das Mahnmal von 2005 erinnert an Juden, die 1944/45 von Pfeilkreuzlern am Ufer erschossen und in die Donau gestoßen wurden. Sie mussten vorher ihre Schuhe ausziehen – Leder war im Krieg ein wertvoller Rohstoff. Die 60 Paar aus Eisen sind originalgetreu im Stil der 1940er-Jahre gefertigt: Männer-, Frauen- und Kinderschuhe, manche achtlos hingeworfen, andere ordentlich nebeneinander.",
    url: "https://de.wikipedia.org/wiki/Schuhe_am_Donauufer",
  },
  "Vörösmarty tér & Váci utca": {
    text: "Die Váci utca ist seit dem 18. Jahrhundert die Hauptgeschäftsstraße von Pest. Unter dem Vörösmarty tér endet die M1 von 1896 – die erste elektrische Untergrundbahn des europäischen Festlands, gebaut für die Millenniumsfeiern. Sie ist heute UNESCO-Welterbe, fährt nur wenige Meter unter der Oberfläche und hat ihre historische Gestaltung mit Holz und Gusseisen behalten.",
    url: "https://de.wikipedia.org/wiki/V%C3%A1ci_utca",
  },
  "Budavári Sikló (Standseilbahn)": {
    text: "Die Standseilbahn von 1870 war eine der ersten der Welt und wurde ursprünglich gebaut, damit Beamte bequem zu ihren Büros im Burgpalast kamen. Im Zweiten Weltkrieg wurde sie völlig zerstört und erst 1986 wieder aufgebaut. Die Fahrt dauert keine zwei Minuten und überwindet dabei rund 50 Höhenmeter.",
    url: "https://de.wikipedia.org/wiki/Budav%C3%A1ri_Sikl%C3%B3",
  },
  "Burgpalast (Budavári Palota)": {
    text: "Der Palast wurde in seiner Geschichte mehrfach zerstört und wieder aufgebaut – zuletzt 1945, als sich hier deutsche und sowjetische Truppen wochenlange Häuserkämpfe lieferten. Bei der Enttrümmerung stieß man auf Teile der mittelalterlichen Burg von König Matthias Corvinus, die man längst für verloren gehalten hatte. Heute beherbergt der Komplex die Nationalgalerie und die Széchenyi-Nationalbibliothek.",
    url: "https://de.wikipedia.org/wiki/Burgpalast",
  },
  "Ungarische Nationalgalerie": {
    text: "Die Sammlung zeigt, wie eigenständig die ungarische Moderne war: Pál Szinyei Merse malte sein impressionistisches „Picknick im Mai“ bereits 1873 – zeitgleich mit den Franzosen, ohne deren Werke je gesehen zu haben. Der eigenwilligste Fall ist Tivadar Csontváry, ein Apotheker, der erst mit über vierzig zu malen begann und heute als ungarischer Nationalmaler gilt.",
    url: "https://de.wikipedia.org/wiki/Ungarische_Nationalgalerie",
  },
  "Matthiaskirche": {
    text: "Offiziell heißt sie Liebfrauenkirche; den Namen Matthiaskirche trägt sie nach König Matthias Corvinus, der hier zweimal heiratete. Während der Osmanenherrschaft diente sie rund 145 Jahre lang als Moschee. Das bunte Dach aus Zsolnay-Keramik kam erst bei der großen Restaurierung im 19. Jahrhundert dazu – die frostfeste Glasur war damals eine Erfindung der Manufaktur in Pécs.",
    url: "https://de.wikipedia.org/wiki/Matthiaskirche_(Budapest)",
  },
  "Fischerbastei": {
    text: "Trotz des wehrhaften Aussehens hat die Fischerbastei nie der Verteidigung gedient – sie wurde 1895–1902 von Frigyes Schulek rein als Aussichtsterrasse gebaut. Die sieben Türme stehen für die sieben magyarischen Stämme, die 896 das Karpatenbecken besiedelten. Ihren Namen trägt sie, weil im Mittelalter die Fischerzunft diesen Abschnitt der Stadtmauer zu verteidigen hatte.",
    url: "https://de.wikipedia.org/wiki/Fischerbastei",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Budapest_panorama_from_fisherman%27s_bastion.jpg",
  },
  "Große Markthalle": {
    text: "Die 1897 eröffnete Halle war für ihre Zeit Hochtechnologie: Ein eigener Kanal führte von der Donau unter das Gebäude, damit Waren per Schiff direkt angeliefert werden konnten. Das Dach trägt farbige Zsolnay-Ziegel. Nach schweren Kriegsschäden und Jahrzehnten des Verfalls wurde sie 1994 vollständig restauriert wiedereröffnet.",
    url: "https://de.wikipedia.org/wiki/Gro%C3%9Fe_Markthalle",
  },
  "Dohány-Synagoge": {
    text: "Mit rund 3.000 Plätzen ist sie die größte Synagoge Europas. Der maurisch-byzantinische Stil war im 19. Jahrhundert bewusst gewählt. Im Hof steht Imre Vargas Trauerweide aus Metall: Auf jedem ihrer Blätter steht der Name eines Holocaust-Opfers. Im Nachbarhaus wurde 1860 Theodor Herzl geboren, der Begründer des politischen Zionismus.",
    url: "https://de.wikipedia.org/wiki/Gro%C3%9Fe_Synagoge_(Budapest)",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Budapest_-_A_holokauszt_%C3%A1ldozatainak_eml%C3%A9km%C5%B1ve_%2838404557112%29.jpg/1280px-Budapest_-_A_holokauszt_%C3%A1ldozatainak_eml%C3%A9km%C5%B1ve_%2838404557112%29.jpg",
  },
  "Szimpla Kert (Ruinenbar)": {
    text: "2002 mietete eine Gruppe Freunde ein leerstehendes, verfallenes Mietshaus im alten jüdischen Viertel und möblierte es mit Sperrmüll – daraus wurde die erste „Ruinenkneipe“ und ein weltweit kopiertes Konzept. Möglich war das, weil das Viertel nach dem Krieg jahrzehntelang vernachlässigt wurde und viele Eigentumsfragen ungeklärt blieben. Sonntagvormittags findet hier heute ein Bauernmarkt statt.",
    url: "https://en.wikipedia.org/wiki/Szimpla_Kert",
  },
  "Freiheitsbrücke": {
    text: "Bis 1945 hieß sie Franz-Josephs-Brücke – der Kaiser schlug 1896 persönlich den letzten, versilberten Niet ein, der bis heute markiert ist. Auf den vier Masten sitzen Turul-Vögel, die mythischen Raubvögel der ungarischen Gründungssage. Sie war nach dem Zweiten Weltkrieg die erste Donaubrücke, die wieder aufgebaut wurde.",
    url: "https://de.wikipedia.org/wiki/Freiheitsbr%C3%BCcke_(Budapest)",
  },
  "Gellért-Bad": {
    text: "Schon die Osmanen nutzten die heißen Quellen an dieser Stelle. Das heutige Jugendstilbad entstand mitten im Ersten Weltkrieg (1912–1918); die Majolika stammt von der Manufaktur Zsolnay aus Pécs. Das Wellenbad im Außenbereich von 1927 war eines der ersten seiner Art weltweit.",
    url: "https://de.wikipedia.org/wiki/Hotel_Gell%C3%A9rt",
  },
  "Gellértberg": {
    text: "Der Berg ist nach Bischof Gerhard (ungarisch Gellért) benannt, der 1046 bei einem Heidenaufstand der Legende nach in einem Fass den Felsen hinab in die Donau gestoßen wurde. Im Inneren des Berges liegt die Felsenkapelle, eine in den Stein gehauene Kirche: Die Kommunisten mauerten sie 1951 zu, erst 1989 wurde sie wieder geöffnet.",
    url: "https://de.wikipedia.org/wiki/Gell%C3%A9rtberg",
  },
  "Zitadelle (neu eröffnet)": {
    text: "Die Habsburger errichteten die Festung 1851 nach dem niedergeschlagenen Freiheitskampf – ausdrücklich so, dass die Kanonen auf die eigene Stadt gerichtet werden konnten. Entsprechend verhasst war sie bei den Budapestern. 1894 wurde sie der Stadt übergeben, die symbolisch ein Stück der Mauer schleifen ließ. Nach elf Jahren Sperrung ist sie seit März 2026 wieder zugänglich.",
    url: "https://de.wikipedia.org/wiki/Zitadelle_(Budapest)",
  },
  "Freiheitsstatue": {
    text: "Die 14 Meter hohe Figur wurde 1947 als sowjetisches Befreiungsdenkmal errichtet. Nach 1989 entfernte man den Rotarmisten am Sockel und die Inschrift – die Frau mit dem Palmwedel blieb und ist heute all jenen gewidmet, die ihr Leben für Ungarns Unabhängigkeit und Freiheit gaben. Die abgeräumten Figuren stehen im Memento Park am Stadtrand.",
    url: "https://de.wikipedia.org/wiki/Freiheitsstatue_(Budapest)",
  },
  "Ludwig Museum (MÜPA)": {
    text: "Die Sammlung geht auf den Aachener Schokoladenfabrikanten Peter Ludwig zurück, der ab den 1980er-Jahren mehrere Museen in Europa mit Gegenwartskunst ausstattete – Budapest erhielt seine Dauerleihgabe noch vor dem Mauerfall. Seit 2005 sitzt das Museum im Müpa, dessen Konzertsaal zu den akustisch besten Europas zählt.",
    url: "https://de.wikipedia.org/wiki/M%C3%BCpa_Budapest",
  },
  "Heldenplatz (Hősök tere)": {
    text: "Der Platz entstand 1896 zur Millenniumsfeier. Auf der Kolonnade standen ursprünglich auch Habsburgerherrscher – sie wurden nach 1945 durch ungarische Freiheitskämpfer ersetzt. Im Juni 1989 versammelten sich hier rund 250.000 Menschen zur Umbettung von Imre Nagy, dem hingerichteten Ministerpräsidenten des Aufstands von 1956. Es war einer der Schlüsselmomente der ungarischen Wende.",
    url: "https://de.wikipedia.org/wiki/Heldenplatz_(Budapest)",
  },
  "Vajdahunyad-Burg": {
    text: "1896 stand hier nur eine Kulisse aus Holz und Pappe – ein Architektur-Potpourri, das über zwanzig ungarische Bauwerke zitierte, von romanisch über gotisch bis barock. Sie kam so gut an, dass man sie wenige Jahre später in Stein nachbaute. Im Hof sitzt die Kapuzenfigur „Anonymus“, der namenlose Chronist des Königs; sein Federkiel ist blank poliert, weil Studenten ihn vor Prüfungen anfassen.",
    url: "https://de.wikipedia.org/wiki/Burg_Vajdahunyad",
  },
  "Haus der Ungarischen Musik": {
    text: "Der Entwurf des Japaners Sou Fujimoto setzte sich in einem Wettbewerb gegen rund 170 Einsendungen durch. Das schwebende Dach ist von etwa hundert Löchern durchbrochen, durch die Bäume hindurchwachsen; an seiner Unterseite glitzern rund 30.000 goldene Blätter. Die Glasfassade ist stellenweise gemustert, damit Vögel sie erkennen und nicht dagegen fliegen.",
    url: "https://de.wikipedia.org/wiki/Haus_der_Musik_Budapest",
  },
  "Ethnographisches Museum": {
    text: "Das 2022 eröffnete Haus liegt zu großen Teilen unter der Erde – oberirdisch sieht man vor allem die geschwungene, begehbare Dachwiese, die wie eine Schlucht aus dem Park aufsteigt. Die Fassade besteht aus hunderttausenden Metallgitter-„Pixeln“, die Volkskunstmuster abbilden. Die Sammlung gehört mit weit über 200.000 Objekten zu den größten ihrer Art in Europa.",
    url: "https://de.wikipedia.org/wiki/Ethnografisches_Museum_Budapest",
  },
  "Széchenyi-Thermalbad": {
    text: "Das Wasser stammt aus über 1.200 Metern Tiefe und tritt mit rund 74 °C aus – die Quelle wurde 1879 bei einer Bohrung entdeckt. Mit 18 Becken ist es einer der größten Badekomplexe Europas. Die Schachspieler, die im dampfenden Außenbecken über ihren Brettern sitzen, sind keine Inszenierung für Touristen, sondern seit Jahrzehnten Alltag.",
    url: "https://de.wikipedia.org/wiki/Sz%C3%A9chenyi-Heilbad",
  },
  "Ungarische Staatsoper": {
    text: "Kaiser Franz Joseph finanzierte den Bau unter einer Bedingung: Das Haus dürfe nicht größer werden als die Wiener Oper. Architekt Miklós Ybl hielt sich daran – machte es dafür prunkvoller. Gustav Mahler war hier von 1888 bis 1891 Direktor. Nach fünf Jahren Restaurierung ist die Oper seit 2022 wieder geöffnet; ihre Akustik gilt als eine der besten Europas.",
    url: "https://de.wikipedia.org/wiki/Ungarische_Staatsoper",
  },
  "Andrássy út": {
    text: "Die Prachtstraße entstand 1872–1885 und ist seit 2002 UNESCO-Welterbe. Weil oberirdische Bahnen auf ihr verboten waren, verlegte man die Strecke kurzerhand darunter – so entstand 1896 die M1, die erste U-Bahn des europäischen Festlands. Die Hausnummer 60 war erst Sitz der Pfeilkreuzler, dann der kommunistischen Geheimpolizei; heute ist dort das Museum „Haus des Terrors“.",
    url: "https://de.wikipedia.org/wiki/Andr%C3%A1ssy_%C3%BAt",
  },
  "Museum der Bildenden Künste": {
    text: "Das Museum besitzt nach Madrid die zweitgrößte El-Greco-Sammlung der Welt. 1983 wurden sieben Meisterwerke gestohlen, darunter zwei Raffaels – sie tauchten wenige Wochen später in Griechenland wieder auf, der spektakulärste Kunstraub der ungarischen Geschichte. Vom 28.10.2026 bis Februar 2027 läuft hier „Bonjour Monsieur Gauguin!“ mit rund 150 Werken.",
    url: "https://de.wikipedia.org/wiki/Sz%C3%A9pm%C5%B1v%C3%A9szeti_M%C3%BAzeum",
  },
  "Margareteninsel": {
    text: "Benannt ist die Insel nach Margarete, der Tochter König Bélas IV.: Nach dem Mongolensturm von 1241/42 gelobte er, sie Gott zu weihen – sie lebte hier im Dominikanerinnenkloster, dessen Ruinen noch stehen. Lange war der Zutritt kostenpflichtig, erst im 20. Jahrhundert wurde die Insel öffentlicher Park. Heute ist sie autofrei; in der Saison spielt der Musikbrunnen zu jeder vollen Stunde.",
    url: "https://de.wikipedia.org/wiki/Margareteninsel_(Budapest)",
  },
};

/* ============================================================
   Google-Maps-Helfer
   ============================================================ */
function mapsPlaceUrl(item) {
  const q = encodeURIComponent(item.mapsName || `${item.name}, Budapest`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

function mapsBaseUrl() {
  const q = encodeURIComponent(BASIS.mapsName);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

function routeUrl(zone) {
  const cfg = zone.route || { fromBase: false, mode: "walking" };
  const stops = zone.sights.filter((s) => s.inRoute !== false);
  if (!stops.length) return "#";

  const points = cfg.fromBase
    ? [{ lat: BASIS.lat, lng: BASIS.lng }, ...stops]
    : stops;

  const origin = `${points[0].lat},${points[0].lng}`;
  const last = points[points.length - 1];
  const destination = `${last.lat},${last.lng}`;
  const waypoints = points
    .slice(1, -1)
    .map((s) => `${s.lat},${s.lng}`)
    .join("|");

  const mode = cfg.mode === "transit" ? "transit" : "walking";
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
  const img = node.querySelector(".card-image");
  if (type === "restaurant") {
    img.src = FOOD_SVG;
    img.dataset.fallback = "true";
    img.alt = "";
  } else {
    img.src = item.image || FOOD_SVG;
    img.alt = item.name;
    img.onerror = () => {
      img.src = FOOD_SVG;
      img.dataset.fallback = "true";
    };
  }
  node.querySelector(".card-title").textContent = item.name;
  node.querySelector(".card-type").textContent =
    type === "restaurant" ? "Food-Spot" : "Sehenswürdigkeit";
  node.querySelector(".card-desc").innerHTML = item.desc;

  const badgesEl = node.querySelector(".card-badges");
  if (type === "restaurant") {
    if (item.price) {
      const p = document.createElement("span");
      p.className = "badge price";
      p.textContent = item.price;
      badgesEl.appendChild(p);
    }
  } else if (item.stroller) {
    const s = STROLLER[item.stroller];
    const sb = document.createElement("span");
    sb.className = "badge " + s.cls;
    sb.textContent = `${s.emoji} ${s.label}`;
    badgesEl.appendChild(sb);
  }

  if (type === "sight" && item.viewpoint) {
    const v = document.createElement("span");
    v.className = "badge view";
    v.textContent = "🔭 Aussichtspunkt";
    badgesEl.appendChild(v);
  }

  if (type === "sight" && item.transit) {
    const t = document.createElement("span");
    t.className = "badge transit";
    t.textContent = `🚊 ${item.transit}`;
    badgesEl.appendChild(t);
  }

  (item.badges || []).forEach((b) => {
    const tag = document.createElement("span");
    tag.className = /glutenfrei|GF-Betrieb/i.test(b) ? "badge gf" : "badge tip";
    tag.textContent = b;
    badgesEl.appendChild(tag);
  });

  const link = node.querySelector(".card-link");
  link.href = mapsPlaceUrl(item);

  // Wissenswertes (aufklappbar) – nur bei Sehenswürdigkeiten
  const facts = type === "sight" ? FACTS[item.name] : null;
  if (facts) {
    const det = document.createElement("details");
    det.className = "facts";

    const sum = document.createElement("summary");
    sum.innerHTML =
      '<span class="facts-icon">💡</span>' +
      '<span class="facts-title">Wissenswertes</span>' +
      '<span class="facts-chevron">▾</span>';
    det.appendChild(sum);

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
    link.parentNode.insertBefore(det, link);
  }

  if (type === "sight" && item.ticketUrl) {
    const ticketBtn = document.createElement("a");
    ticketBtn.className = "card-ticket";
    ticketBtn.href = item.ticketUrl;
    ticketBtn.target = "_blank";
    ticketBtn.rel = "noopener";
    ticketBtn.innerHTML = `<span>🎟️</span><span>Tickets / Infos (offiziell)</span>`;
    link.parentNode.insertBefore(ticketBtn, link);
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

  const stats = node.querySelector(".zone-stats");
  stats.innerHTML = `
    <span>${zone.sights.length}</span>&nbsp;Sehenswürdigkeiten ·
    <span>${zone.restaurants.length}</span>&nbsp;Food-Spots
    <br><span style="color:#4f6468; font-weight:400;">${zone.walkFromHotel}</span>
  `;

  const sightsEl = node.querySelector(".cards.sights");
  zone.sights.forEach((s) => sightsEl.appendChild(renderCard(s, "sight")));

  const restEl = node.querySelector(".cards.restaurants");
  zone.restaurants.forEach((r) => restEl.appendChild(renderCard(r, "restaurant")));

  const restSection = restEl.parentElement;
  const restHeader = restSection.querySelector("h4");
  restEl.classList.add("is-hidden");
  restSection.classList.add("collapsible", "is-collapsed");
  restHeader.innerHTML = `
    <span>Food-Spots <span class="section-count">(${zone.restaurants.length})</span></span>
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
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleRest();
    }
  });

  if (zone.transportNote) {
    const note = document.createElement("p");
    note.style.cssText = "background:#e9f3f5;border:1px solid #bdd7dc;border-radius:12px;padding:0.8rem 1rem;font-size:0.9rem;color:#15535f;margin:0 0 1.4rem;";
    note.innerHTML = `<strong>🚊 Anreise &amp; Verkehr:</strong> ${zone.transportNote}`;
    node.querySelector(".zone-body").prepend(note);
  }

  const routeBtn = node.querySelector(".route-btn");
  routeBtn.href = routeUrl(zone);

  const transit = (zone.route && zone.route.mode) === "transit";
  const fromBase = zone.route && zone.route.fromBase;
  const icon = routeBtn.querySelector("span:first-child");
  const label = routeBtn.querySelector("span:last-child");
  if (transit) {
    icon.textContent = "🚊";
    label.innerHTML = "Route mit Tram&nbsp;&amp; Metro in Google&nbsp;Maps";
  } else {
    icon.textContent = "🚶";
    label.innerHTML = "Als Spaziergang in Google&nbsp;Maps";
  }
  const hint = node.querySelector(".route-hint");
  if (transit && fromBase) {
    hint.textContent = "Startet an eurer Unterkunft (Corvin-negyed) und verbindet die Stationen mit Tram, Metro & Bus.";
  } else if (transit) {
    hint.textContent = "Verbindet die Stationen der Reihe nach mit Tram, Metro & Bus.";
  } else if (fromBase) {
    hint.textContent = "Startet an eurer Unterkunft (Corvin-negyed) und läuft die Stationen der Reihe nach ab, alles zu Fuß.";
  } else {
    hint.textContent = "Läuft die Stationen der Reihe nach ab, alles zu Fuß.";
  }

  const toggle = node.querySelector(".zone-toggle");
  const body = node.querySelector(".zone-body");
  toggle.addEventListener("click", () => {
    const open = node.classList.toggle("is-open");
    body.hidden = !open;
    if (open) {
      requestAnimationFrame(() => {
        node.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  });

  return node;
}

function init() {
  const root = document.getElementById("zones");
  ZONES.forEach((z) => root.appendChild(renderZone(z)));
  document.getElementById("hotel-link").href = mapsBaseUrl();
}

document.addEventListener("DOMContentLoaded", init);
