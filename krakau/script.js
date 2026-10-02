/* ============================================================
   Reiseführer Krakau · Daten & Rendering
   25.–31. Oktober 2026 · eine Woche, alles mit Tram, Bus & Bahn
   ============================================================ */

/* Ausgangspunkt für die Routen: Hauptbahnhof Kraków Główny.
   Dort kommt der Flughafenzug an, von dort fahren alle Trams. */
const BASIS = {
  name: "Kraków Główny",
  address: "Hauptbahnhof · Pawia, 31-154 Kraków",
  mapsName: "Kraków Główny, Kraków",
  lat: 50.0678,
  lng: 19.9476,
};

/* Kinderwagen-Hinweise:
   - "yes"      = eben, breite Wege, gut zu schieben
   - "careful"  = Kopfsteinpflaster, Steigung oder einzelne Stufen
   - "no"       = viele Treppen → Trage zwingend                */
const STROLLER = {
  yes:     { label: "Kinderwagen ok",   emoji: "🛒", cls: "stroller-yes" },
  careful: { label: "Kopfsteinpflaster", emoji: "⚠",  cls: "stroller-careful" },
  no:      { label: "Trage zwingend",   emoji: "🤱", cls: "stroller-no" },
};

/* Generisches SVG-Bild für Restaurants (keine Wiki-Quelle) */
const FOOD_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#e3e8e1"/>
        <stop offset="1" stop-color="#b3c8bb"/>
      </linearGradient>
    </defs>
    <rect width="320" height="200" fill="url(#g)"/>
    <g transform="translate(160 100)" fill="none" stroke="#24564a" stroke-width="3" stroke-linecap="round">
      <circle r="42" fill="#f8fbf9"/>
      <circle r="30" stroke-width="2"/>
      <path d="M -55 0 L -42 0 M -50 -10 L -50 10 M -47 -10 L -47 10 M -44 -10 L -44 10"/>
      <path d="M 55 0 L 42 0 M 49 -10 Q 60 -5 60 10"/>
    </g>
    <text x="160" y="170" text-anchor="middle" font-family="Cormorant Garamond, serif" font-style="italic" font-size="20" fill="#24564a">Kraków · smacznego</text>
  </svg>`);

/* ============================================================
   TAGE

   Felder pro Location:
   - name, mapsName, desc, image, lat, lng
   - stroller   "yes" | "careful" | "no"
   - transit    Linie/Haltestelle (blaues Badge)
   - badges     weitere Hinweise ("Glutenfrei" → grün)
   - ticketUrl  offizielle Ticket-Seite
   - inRoute    false = nicht in die Auto-Route aufnehmen
   - price      nur bei Restaurants

   Pro Tag:
   - route.fromBase  true = Route startet am Hauptbahnhof
   - route.mode      "walking" | "transit"
   ============================================================ */
const ZONES = [
  {
    id: "altstadt",
    tag: "So 25.10. · Ankunft",
    title: "Ankunft & Altstadt",
    summary: "Mit dem Flughafenzug in 20 Minuten in die Stadt. Dann der größte mittelalterliche Marktplatz Europas, die Tuchhallen und der Trompeter vom Marienturm.",
    walkFromHotel: "ab Hauptbahnhof alles zu Fuß (10 Min.)",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Sukiennice_and_Main_Market_Square_Krakow_Poland.JPG/1280px-Sukiennice_and_Main_Market_Square_Krakow_Poland.JPG",
    transportNote: "Vom Flughafen fährt der Zug <strong>SKA1</strong> alle 30 Minuten direkt zum Hauptbahnhof Kraków Główny (ca. 20 Min., 20 PLN – eigenes Ticket, nicht im MPK-Tarif enthalten!). Vom Bahnhof sind es durch die Galeria Krakowska und den Planty-Park nur 10 Minuten zu Fuß zum Hauptmarkt. Heute braucht ihr noch gar kein Nahverkehrsticket. Denkt an die Zeitumstellung in der Nacht – ihr gewinnt eine Stunde.",
    route: { fromBase: true, mode: "walking" },
    sights: [
      {
        name: "Rynek Główny (Hauptmarkt)",
        mapsName: "Rynek Główny, Kraków",
        desc: "Mit 200 × 200 Metern der größte mittelalterliche Marktplatz Europas, seit 1257 fast unverändert. Rundherum Cafés, Pferdekutschen und Blumenstände. Komplett eben – aber durchgehend Kopfsteinpflaster.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Sukiennice_and_Main_Market_Square_Krakow_Poland.JPG/1280px-Sukiennice_and_Main_Market_Square_Krakow_Poland.JPG",
        lat: 50.0617, lng: 19.9373,
        stroller: "careful",
        transit: "Tram 1/6/8/13 bis Plac Wszystkich Świętych",
        badges: ["UNESCO-Welterbe", "Kostenlos"],
      },
      {
        name: "Tuchhallen (Sukiennice)",
        mapsName: "Sukiennice, Kraków",
        desc: "Die Renaissance-Markthalle mitten auf dem Platz – seit 700 Jahren Handelsort, heute Souvenirstände im Erdgeschoss und oben die polnische Malerei des 19. Jahrhunderts.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Krakow_Sukiennice_A01.jpg/1280px-Krakow_Sukiennice_A01.jpg",
        lat: 50.0616, lng: 19.9374,
        stroller: "yes",
        badges: ["Erdgeschoss frei", "Galerie: Mo zu, Di frei", "Überdacht bei Regen"],
        ticketUrl: "https://mnk.pl/en/branches/mnk-sukiennice/",
      },
      {
        name: "Marienkirche (Bazylika Mariacka)",
        mapsName: "Bazylika Mariacka, Kraków",
        desc: "Gotische Backsteinkirche mit dem weltberühmten Veit-Stoß-Altar. Jede volle Stunde bläst ein Trompeter vom höheren Turm den Hejnał – und bricht mitten im Ton ab. Ein Gänsehaut-Moment.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Exterior_of_Saint_Mary_Basilica_in_Krak%C3%B3w%2C_2022.jpg/1280px-Exterior_of_Saint_Mary_Basilica_in_Krak%C3%B3w%2C_2022.jpg",
        lat: 50.0617, lng: 19.9394,
        stroller: "careful",
        badges: ["Ticket für Besichtigung", "Hejnał zur vollen Stunde", "Turm: nur Treppen"],
        ticketUrl: "https://mariacki.com/en/",
      },
      {
        name: "Planty-Park",
        mapsName: "Planty, Kraków",
        desc: "Vier Kilometer Grüngürtel rund um die Altstadt, angelegt auf der geschleiften Stadtmauer. Im Oktober leuchtet das Laub – der schönste und ruhigste Weg vom Bahnhof in die Stadt.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Planty_Park%2C_autumn%2C_Old_Town%2C_Krakow%2C_Poland.jpg/1280px-Planty_Park%2C_autumn%2C_Old_Town%2C_Krakow%2C_Poland.jpg",
        lat: 50.0625, lng: 19.9330,
        stroller: "yes",
        badges: ["Kostenlos", "Ebene Wege", "Herbstlaub"],
      },
    ],
    restaurants: [
      {
        name: "Pod Aniołami",
        mapsName: "Pod Aniołami, Grodzka, Kraków",
        desc: "Traditionelle polnische Küche in einem gotischen Gewölbekeller aus dem 13. Jahrhundert, vieles vom Buchenholzgrill. Rustikal, atmosphärisch – der Klassiker für den ersten Abend.",
        lat: 50.0589, lng: 19.9375,
        price: "60–110 PLN / Hauptgericht",
        badges: ["Traditionell", "Reservieren", "Gewölbekeller"],
      },
      {
        name: "Glonojad",
        mapsName: "Glonojad, Plac Matejki, Kraków",
        desc: "Günstiges vegetarisches Bistro direkt am Barbakan, beliebt bei Einheimischen: Bowls, Suppen, Pierogi, Frühstück den ganzen Tag. Allergene sind auf der Karte markiert.",
        lat: 50.0657, lng: 19.9410,
        price: "25–45 PLN / Gericht",
        badges: ["Vegetarisch", "Gesund", "Glutenfrei möglich", "Günstig"],
      },
      {
        name: "Charlotte",
        mapsName: "Charlotte Chleb i Wino, Plac Szczepański, Kraków",
        desc: "Französische Bäckerei und Weinbar am Plac Szczepański mit eigener Backstube im Keller. Gutes Frühstück ab früh morgens – praktisch für den ersten Morgen.",
        lat: 50.0631, lng: 19.9336,
        price: "20–45 PLN / Frühstück",
        badges: ["Frühstück", "Terrasse"],
      },
    ],
  },

  {
    id: "wawel",
    tag: "Mo 26.10. · Tag 2",
    title: "Wawel & die Weichsel",
    summary: "Der Königshügel mit Schloss, Kathedrale und Drachenhöhle – darunter die Weichselpromenade und die Liebesschlösser-Brücke nach Podgórze.",
    walkFromHotel: "Tram bis Wawel, dann alles zu Fuß",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Krak%C3%B3w_-_Wawel_-_Widok_od_wschodu_01.jpg/1280px-Krak%C3%B3w_-_Wawel_-_Widok_od_wschodu_01.jpg",
    transportNote: "Mit <strong>Tram 1, 6, 8 oder 13</strong> bis <em>Wawel</em> bzw. <em>Plac Wszystkich Świętych</em>, dann 5 Minuten zu Fuß. Der Aufgang auf den Wawel-Hügel ist gepflastert und steigt an – zu zweit mit Kinderwagen gut machbar, allein mühsam. Oben ist alles eben. Danach führt eine Rampe hinunter zur Weichselpromenade, die komplett flach ist. Tipp: Die Drachenhöhle schließt meist Ende Oktober für den Winter – vorab auf wawel.krakow.pl prüfen.",
    route: { fromBase: false, mode: "walking" },
    sights: [
      {
        name: "Königsschloss Wawel",
        mapsName: "Zamek Królewski na Wawelu, Kraków",
        desc: "Residenz der polnischen Könige über der Weichsel, mit prachtvollem Renaissance-Arkadenhof. Der Burghof selbst ist frei zugänglich; für die Prunkräume und die Schatzkammer braucht ihr Zeitfenster-Tickets.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Krak%C3%B3w_-_Wawel_-_Widok_od_wschodu_01.jpg/1280px-Krak%C3%B3w_-_Wawel_-_Widok_od_wschodu_01.jpg",
        lat: 50.0540, lng: 19.9354,
        stroller: "careful",
        transit: "Tram 1/6/8/13 bis Wawel",
        badges: ["Hof kostenlos", "Ausstellungen mit Zeitfenster", "UNESCO-Welterbe"],
        ticketUrl: "https://wawel.krakow.pl/en",
      },
      {
        name: "Wawel-Kathedrale",
        mapsName: "Katedra Wawelska, Kraków",
        desc: "Krönungs- und Grabkirche der polnischen Könige, ein Flickenteppich aus acht Jahrhunderten Baustil. Die Sigismundkapelle mit goldener Kuppel ist das Juwel. Glocke und Krypta nur über enge Treppen.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Wawel_-_Cathedral%2C_Castle.jpg/1280px-Wawel_-_Cathedral%2C_Castle.jpg",
        lat: 50.0543, lng: 19.9353,
        stroller: "careful",
        badges: ["Eigenes Ticket", "Krypta & Glocke: Treppen"],
        ticketUrl: "https://katedra-wawelska.pl/en/",
      },
      {
        name: "Drachenhöhle (Smocza Jama)",
        mapsName: "Smocza Jama, Kraków",
        desc: "Kalksteinhöhle im Burgberg, der Sage nach Heimat des Wawel-Drachen. Unten speit eine Metallskulptur alle paar Minuten echtes Feuer. Der Abstieg führt über 135 enge Wendelstufen.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Krak%C3%B3w_-_Wawel_-_Widok_od_wschodu_01.jpg/1280px-Krak%C3%B3w_-_Wawel_-_Widok_od_wschodu_01.jpg",
        lat: 50.0533, lng: 19.9339,
        stroller: "no",
        badges: ["135 Wendelstufen", "Saison prüfen – oft bis Ende Okt.", "Feuerspeiender Drache"],
        ticketUrl: "https://wawel.krakow.pl/en",
      },
      {
        name: "Weichselpromenade (Bulwary Wiślane)",
        mapsName: "Bulwary Wiślane, Kraków",
        desc: "Breiter, autofreier Uferweg unterhalb des Wawel. Komplett eben, Blick zurück auf die Burg, im Herbst sehr ruhig. Die beste Kinderwagen-Strecke der ganzen Stadt.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Krakow_Kladka_Bernatka_3.jpg/1280px-Krakow_Kladka_Bernatka_3.jpg",
        lat: 50.0518, lng: 19.9370,
        stroller: "yes",
        badges: ["Autofrei", "Kostenlos", "Ideal zum Schieben"],
      },
      {
        name: "Kładka Bernatka (Fußgängerbrücke)",
        mapsName: "Kładka Bernatka, Kraków",
        desc: "Elegante Bogenbrücke über die Weichsel, behängt mit tausenden Liebesschlössern und akrobatischen Skulpturen. Verbindet Kazimierz mit Podgórze – mit Rampen auf beiden Seiten.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Krakow_Kladka_Bernatka_3.jpg/1280px-Krakow_Kladka_Bernatka_3.jpg",
        lat: 50.0493, lng: 19.9475,
        stroller: "yes",
        badges: ["Rampen", "Kostenlos", "Schöner Fotostopp"],
      },
    ],
    restaurants: [
      {
        name: "Zapiekane Gluten Free Bistro",
        mapsName: "Zapiekane Gluten Free Bistro, Koletek, Kraków",
        desc: "Komplett glutenfreies Bistro am Fuß des Wawel: glutenfreie Pierogi, Pizza, Brot und Donuts. Ein reiner GF-Betrieb, also ohne Kontaminationsrisiko – und nur wenige Minuten von der Burg.",
        lat: 50.0528, lng: 19.9389,
        price: "30–60 PLN / Gericht",
        badges: ["Glutenfrei", "100 % GF-Betrieb", "Pierogi & Pizza"],
      },
      {
        name: "Miód Malina",
        mapsName: "Miód Malina, Grodzka, Kraków",
        desc: "Warme, farbenfrohe Stube an der Grodzka mit polnisch-italienischer Karte: Ente mit Honig, Pierogi, Rote-Bete-Suppe. Gemütlich, sehr beliebt – abends unbedingt reservieren.",
        lat: 50.0582, lng: 19.9377,
        price: "50–90 PLN / Hauptgericht",
        badges: ["Traditionell", "Reservieren"],
      },
      {
        name: "Pod Baranem",
        mapsName: "Pod Baranem, Świętej Gertrudy, Kraków",
        desc: "Klassisches polnisches Restaurant direkt am Planty-Ring unterhalb des Wawel. Hausmannskost auf hohem Niveau, ruhige Räume – gut mit Kind, weil es nie zu laut wird.",
        lat: 50.0567, lng: 19.9406,
        price: "55–95 PLN / Hauptgericht",
        badges: ["Ruhig", "Nahe Wawel"],
      },
    ],
  },

  {
    id: "kazimierz",
    tag: "Di 27.10. · Tag 3",
    title: "Kazimierz – das jüdische Viertel",
    summary: "Sieben Synagogen auf engstem Raum, der alte Remuh-Friedhof, der Plac Nowy mit seiner Rundhalle – und abends das lebendigste Viertel der Stadt.",
    walkFromHotel: "Tram ~10 Min., vor Ort alles zu Fuß",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Szeroka_street%2C_Kazimierz%2C_Krakow%2C_Poland.jpg/1280px-Szeroka_street%2C_Kazimierz%2C_Krakow%2C_Poland.jpg",
    transportNote: "Mit <strong>Tram 3, 19 oder 24</strong> ab Hauptbahnhof bis <em>Miodowa</em> oder <em>Plac Wolnica</em> (ca. 10 Min.). Kazimierz ist danach komplett fußläufig – alle Stationen liegen in einem Quadrat von 600 Metern. Achtung: Die Synagogen und der Remuh-Friedhof sind <strong>samstags (Schabbat) geschlossen</strong>; Dienstag passt also perfekt. Männer brauchen auf dem Friedhof eine Kopfbedeckung (liegt am Eingang bereit).",
    route: { fromBase: false, mode: "walking" },
    sights: [
      {
        name: "Plac Nowy",
        mapsName: "Plac Nowy, Kraków",
        desc: "Herz von Kazimierz mit der runden Markthalle „Okrąglak“ in der Mitte, aus deren Fenstern rund um die Uhr Zapiekanki verkauft werden. Tagsüber Trödelmarkt, abends Bar-Szene.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/20240624_190424_Plac_Nowy_sercem_Kazimierza_01.jpg/1280px-20240624_190424_Plac_Nowy_sercem_Kazimierza_01.jpg",
        lat: 50.0516, lng: 19.9448,
        stroller: "careful",
        transit: "Tram 3/19/24 bis Miodowa",
        badges: ["Kostenlos", "Trödelmarkt", "Kopfsteinpflaster"],
      },
      {
        name: "Ulica Szeroka",
        mapsName: "Ulica Szeroka, Kraków",
        desc: "Keine Straße, sondern ein langgezogener Platz – das historische Zentrum des jüdischen Kazimierz. Hier stehen gleich mehrere Synagogen nebeneinander, dazu Restaurants mit Klezmermusik.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Szeroka_street%2C_Kazimierz%2C_Krakow%2C_Poland.jpg/1280px-Szeroka_street%2C_Kazimierz%2C_Krakow%2C_Poland.jpg",
        lat: 50.0517, lng: 19.9475,
        stroller: "careful",
        badges: ["Kostenlos", "Klezmer am Abend"],
      },
      {
        name: "Remuh-Synagoge & Friedhof",
        mapsName: "Synagoga Remuh, Kraków",
        desc: "Kleine Synagoge von 1553, bis heute in Gebrauch. Dahinter der alte Friedhof mit der „Klagemauer“ aus Grabsteinfragmenten, die die Nazis zerschlugen. Ein stiller, sehr bewegender Ort.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Remuh_Synagogue%2C_40_Szeroka_street%2C_Kazimierz%2C_Krakow%2C_Poland.jpg/1280px-Remuh_Synagogue%2C_40_Szeroka_street%2C_Kazimierz%2C_Krakow%2C_Poland.jpg",
        lat: 50.0523, lng: 19.9470,
        stroller: "careful",
        badges: ["Samstags geschlossen", "Kippa für Männer", "Kleines Ticket"],
      },
      {
        name: "Alte Synagoge (Stara Synagoga)",
        mapsName: "Stara Synagoga, Kraków",
        desc: "Die älteste erhaltene Synagoge Polens (15. Jahrhundert), heute Museum zur jüdischen Geschichte und Kultur Krakaus. Gut erklärt, überschaubar groß – ideal, wenn das Wetter nicht mitspielt.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Krakow_-_Bazylika_Bozego_Ciala_from_balloon.jpg/1280px-Krakow_-_Bazylika_Bozego_Ciala_from_balloon.jpg",
        lat: 50.0510, lng: 19.9477,
        stroller: "careful",
        badges: ["Museum", "Bei Regen gut", "Montags oft frei"],
        ticketUrl: "https://muzeumkrakowa.pl/en/branches/old-synagogue",
      },
      {
        name: "Fronleichnamsbasilika",
        mapsName: "Bazylika Bożego Ciała, Kraków",
        desc: "Mächtige gotische Backsteinkirche am Plac Wolnica, gegründet 1340 – mit überbordend barocker Ausstattung im Inneren. Eintritt frei, ebenerdig, und fast immer menschenleer.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Krakow_-_Bazylika_Bozego_Ciala_from_balloon.jpg/1280px-Krakow_-_Bazylika_Bozego_Ciala_from_balloon.jpg",
        lat: 50.0493, lng: 19.9450,
        stroller: "yes",
        badges: ["Eintritt frei", "Ebenerdig", "Meist leer"],
      },
    ],
    restaurants: [
      {
        name: "Hamsa Hummus & Happiness",
        mapsName: "Hamsa Hummus and Happiness, Szeroka, Kraków",
        desc: "Israelisch-levantinische Küche an der Szeroka: Hummus, Mezze, Salate, viel Gemüse. Leicht und gesund, vieles davon von Natur aus glutenfrei. Hell, modern und entspannt mit Kind.",
        lat: 50.0516, lng: 19.9478,
        price: "35–65 PLN / Gericht",
        badges: ["Gesund", "Mezze zum Teilen", "Glutenfrei möglich"],
      },
      {
        name: "Bezglutenowa BEZ Piekarnia",
        mapsName: "Bezglutenowa BEZ Piekarnia, Dietla, Kraków",
        desc: "Die erste und einzige zu 100 % glutenfreie Bäckerei Krakaus, zertifiziert von der polnischen Zöliakie-Gesellschaft. Brot, Kuchen und Snacks – auf dem Weg zwischen Altstadt und Kazimierz.",
        lat: 50.0533, lng: 19.9437,
        price: "10–30 PLN / Stück",
        badges: ["Glutenfrei", "100 % GF-Betrieb", "Zöliakie-zertifiziert"],
      },
      {
        name: "Zapiekanki vom Okrąglak",
        mapsName: "Okrąglak Plac Nowy, Kraków",
        desc: "Die Krakauer Institution: überbackene Baguettehälften aus den Luken der Rundhalle, für wenige Złoty. Schnell und günstig – enthält allerdings Gluten, für euch also eher als Erlebnis.",
        lat: 50.0516, lng: 19.9448,
        price: "15–25 PLN / Portion",
        badges: ["Street Food", "Kult", "Enthält Gluten"],
      },
    ],
  },

  {
    id: "podgorze",
    tag: "Mi 28.10. · Tag 4",
    title: "Podgórze & Schindlers Fabrik",
    summary: "Die andere Weichselseite: das Gelände des ehemaligen Ghettos, der Platz mit den leeren Stühlen, Schindlers Emaillefabrik – und ein Hügel aus vorchristlicher Zeit.",
    walkFromHotel: "Tram ~15 Min., vor Ort zu Fuß",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Krak%C3%B3w_-_Fabryka_Emalia_Oskara_Schindlera_Oddzia%C5%82_Muzeum_Historycznego_Miasta_Krakowa.jpg/1280px-Krak%C3%B3w_-_Fabryka_Emalia_Oskara_Schindlera_Oddzia%C5%82_Muzeum_Historycznego_Miasta_Krakowa.jpg",
    transportNote: "Mit <strong>Tram 3 oder 24</strong> bis <em>Plac Bohaterów Getta</em> – die Haltestelle liegt direkt am Platz. Von dort sind es 10 Minuten zu Fuß zur Schindler-Fabrik (MOCAK liegt gleich nebenan). Zum Krakus-Hügel danach nochmal 15 Minuten zu Fuß oder <strong>Tram 3/19/24</strong> bis <em>Korona</em>. <strong>Wichtig:</strong> Für die Schindler-Fabrik unbedingt vorab online ein Zeitfenster buchen, sie ist fast immer ausverkauft – und montags gibt es verkürzte Öffnungszeiten.",
    route: { fromBase: false, mode: "walking" },
    sights: [
      {
        name: "Platz der Ghettohelden",
        mapsName: "Plac Bohaterów Getta, Kraków",
        desc: "Von hier wurden die Bewohner des Krakauer Ghettos deportiert. Heute stehen 70 überdimensionale leere Stühle auf dem Platz – ein Mahnmal für das zurückgelassene Mobiliar. Still und eindringlich.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Krak%C3%B3w_-_Plac_Bohater%C3%B3w_Getta.jpg/1280px-Krak%C3%B3w_-_Plac_Bohater%C3%B3w_Getta.jpg",
        lat: 50.0466, lng: 19.9557,
        stroller: "yes",
        transit: "Tram 3/24 bis Plac Bohaterów Getta",
        badges: ["Kostenlos", "Frei zugänglich", "Eben"],
      },
      {
        name: "Schindlers Emaillefabrik",
        mapsName: "Fabryka Emalia Oskara Schindlera, Kraków",
        desc: "In der echten Fabrik von Oskar Schindler erzählt ein hervorragendes Museum vom besetzten Krakau 1939–1945 – als begehbare Kulisse mit Straßenzügen und Originalräumen. Modern und barrierefrei.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Krak%C3%B3w_-_Fabryka_Emalia_Oskara_Schindlera_Oddzia%C5%82_Muzeum_Historycznego_Miasta_Krakowa.jpg/1280px-Krak%C3%B3w_-_Fabryka_Emalia_Oskara_Schindlera_Oddzia%C5%82_Muzeum_Historycznego_Miasta_Krakowa.jpg",
        lat: 50.0476, lng: 19.9617,
        stroller: "yes",
        badges: ["Zeitfenster PFLICHT", "Oft ausverkauft", "Aufzüge", "ca. 2 Std."],
        ticketUrl: "https://muzeumkrakowa.pl/en/branches/oskar-schindlers-enamel-factory",
      },
      {
        name: "MOCAK – Museum für Gegenwartskunst",
        mapsName: "MOCAK Muzeum Sztuki Współczesnej, Kraków",
        desc: "Direkt neben der Schindler-Fabrik, in den ehemaligen Fabrikhallen. Helle Sheddach-Architektur, wechselnde Ausstellungen – ein luftiger Kontrast nach der schweren Kost nebenan.",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Krak%C3%B3w%2C_Muzeum_Sztuki_Wsp%C3%B3%C5%82czesnej_MOCAK_-_fotopolska.eu_%28132498%29.jpg",
        lat: 50.0471, lng: 19.9621,
        stroller: "yes",
        badges: ["Barrierefrei", "Dienstags frei", "Bei Regen gut"],
        ticketUrl: "https://mocak.pl/en",
      },
      {
        name: "Krakus-Hügel",
        mapsName: "Kopiec Krakusa, Kraków",
        desc: "Künstlicher Erdhügel aus dem 7. Jahrhundert, angeblich das Grab des Stadtgründers Krak. Oben einer der schönsten Rundblicke über Krakau – und fast nur Einheimische. Der Aufstieg ist ein Wiesenweg.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Wsch%C3%B3d_s%C5%82o%C5%84ca_nad_Kopcem_Krakusa_02.jpg/1280px-Wsch%C3%B3d_s%C5%82o%C5%84ca_nad_Kopcem_Krakusa_02.jpg",
        lat: 50.0411, lng: 19.9607,
        stroller: "careful",
        transit: "Tram 3/19/24 bis Korona",
        badges: ["Kostenlos", "Steiler Wiesenweg", "Bester Blick ohne Touristen"],
      },
    ],
    restaurants: [
      {
        name: "SALMA Cukiernia Bezglutenowa",
        mapsName: "SALMA Cukiernia Bezglutenowa, Limanowskiego, Kraków",
        desc: "Reine glutenfreie Konditorei in Podgórze: Torten, Kuchen und Kaffee, alles ohne Gluten. Die passende süße Pause an einem Tag, an dem es sonst wenig GF-Angebot gibt.",
        lat: 50.0446, lng: 19.9565,
        price: "12–30 PLN / Stück",
        badges: ["Glutenfrei", "100 % GF-Betrieb", "Konditorei"],
      },
      {
        name: "Zakładka Food & Wine",
        mapsName: "Zakładka Food and Wine, Józefińska, Kraków",
        desc: "Kleines französisch inspiriertes Bistro in Podgórze, sehr gut bewertet und bei Einheimischen beliebt. Überschaubare Karte, faire Preise – ruhiger als die Lokale in der Altstadt.",
        lat: 50.0479, lng: 19.9497,
        price: "45–80 PLN / Hauptgericht",
        badges: ["Bistro", "Reservieren", "Ruhig"],
      },
      {
        name: "Forum Przestrzenie",
        mapsName: "Forum Przestrzenie, Kraków",
        desc: "Café und Bar im denkmalgeschützten Betonskelett des alten Hotel Forum, direkt an der Weichsel mit Blick auf den Wawel. Sofas, Retro-Charme und viel Platz für den Kinderwagen.",
        lat: 50.0493, lng: 19.9414,
        price: "20–45 PLN / Gericht",
        badges: ["Blick auf den Wawel", "Viel Platz", "Retro"],
      },
    ],
  },

  {
    id: "wieliczka",
    tag: "Do 29.10. · Tag 5",
    title: "Salzbergwerk Wieliczka",
    summary: "Ein unterirdisches Labyrinth aus Salz: Kammern, Seen und eine komplette Kathedrale, 100 Meter unter der Erde – alles aus Steinsalz geschlagen. Der Tagesausflug schlechthin.",
    walkFromHotel: "Regionalzug SKA1 ~25 Min. ab Hauptbahnhof",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Poland-01583_-_St._Kinga%27s_Chapel_%2831547044100%29.jpg/1280px-Poland-01583_-_St._Kinga%27s_Chapel_%2831547044100%29.jpg",
    transportNote: "Der Zug <strong>SKA1</strong> fährt ab Kraków Główny in ca. 25 Minuten bis <em>Wieliczka Rynek-Kopalnia</em> (ca. 7 PLN) – von dort sind es 5 Minuten zu Fuß zum Daniłowicz-Schacht. Alternativ <strong>Bus 304</strong> ab Dworzec Główny Zachód (ca. 40 Min.). <strong>Ganz wichtig mit Baby:</strong> Die Touristenroute beginnt mit etwa 380 Stufen abwärts, insgesamt sind es rund 800 Stufen. Kinderwagen sind nicht möglich und es gibt keine Aufbewahrung – <strong>lasst ihn im Hotel und nehmt die Trage</strong>. Nach oben fahrt ihr bequem mit dem Aufzug. Unten sind konstant 14–17 °C, also eine Jacke einpacken. Tickets vorab online buchen.",
    route: { fromBase: true, mode: "transit" },
    sights: [
      {
        name: "Salzbergwerk Wieliczka",
        mapsName: "Kopalnia Soli Wieliczka, Wieliczka",
        desc: "Seit dem 13. Jahrhundert ununterbrochen in Betrieb und eines der ersten UNESCO-Welterbe überhaupt. Die Touristenroute führt rund zwei Stunden durch Kammern, an unterirdischen Salzseen vorbei.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/%CE%91%CE%BB%CE%B1%CF%84%CF%89%CF%81%CF%85%CF%87%CE%B5%CE%AF%CE%B1_%CE%92%CE%B9%CE%B5%CE%BB%CE%AF%CF%84%CF%83%CE%BA%CE%B1_4950.jpg/1280px-%CE%91%CE%BB%CE%B1%CF%84%CF%89%CF%81%CF%85%CF%87%CE%B5%CE%AF%CE%B1_%CE%92%CE%B9%CE%B5%CE%BB%CE%AF%CF%84%CF%83%CE%BA%CE%B1_4950.jpg",
        lat: 49.9831, lng: 20.0547,
        stroller: "no",
        transit: "Zug SKA1 bis Wieliczka Rynek-Kopalnia",
        badges: ["ca. 800 Stufen → Trage", "Tickets vorab", "Konstant 14–17 °C", "Unter 4 Jahren frei"],
        ticketUrl: "https://www.wieliczka-saltmine.com/",
      },
      {
        name: "Kapelle der heiligen Kinga",
        mapsName: "Kaplica św. Kingi Wieliczka",
        desc: "Der Höhepunkt der Route, 101 Meter unter der Erde: eine komplette Kirche, von Bergleuten aus Steinsalz gehauen – samt Kronleuchtern aus Salzkristallen und Reliefs an den Wänden. Überwältigend.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Poland-01583_-_St._Kinga%27s_Chapel_%2831547044100%29.jpg/1280px-Poland-01583_-_St._Kinga%27s_Chapel_%2831547044100%29.jpg",
        lat: 49.9831, lng: 20.0547,
        stroller: "no",
        badges: ["Teil der Touristenroute", "101 m unter Tage", "Wickeltisch vorhanden"],
        inRoute: false,
      },
    ],
    restaurants: [
      {
        name: "Karczma Górnicza (unter Tage)",
        mapsName: "Karczma Górnicza Wieliczka",
        desc: "Restaurant 125 Meter unter der Erde, am Ende der Touristenroute. Warme polnische Küche, und – praktisch mit Baby – hier gibt es einen Wickeltisch und Still-Sitzgelegenheiten.",
        lat: 49.9831, lng: 20.0547,
        price: "35–70 PLN / Gericht",
        badges: ["Unter Tage", "Wickeltisch", "Stillmöglichkeit"],
      },
      {
        name: "Cafés am Rynek Wieliczka",
        mapsName: "restauracja Rynek Wieliczka",
        desc: "Der kleine Marktplatz von Wieliczka liegt zwischen Bahnhof und Bergwerk und hat mehrere Cafés und Pizzerien. Entspannter und günstiger als die Lokale direkt am Besuchereingang.",
        lat: 49.9873, lng: 20.0640,
        price: "25–55 PLN / Gericht",
        badges: ["Günstiger als am Bergwerk", "Kurzer Fußweg"],
      },
    ],
  },

  {
    id: "nowahuta",
    tag: "Fr 30.10. · Tag 6",
    title: "Nowa Huta & der Untergrund",
    summary: "Mit der Tram in die sozialistische Planstadt mit ihren weiten Boulevards – und zurück in der Altstadt hinab unter den Marktplatz ins mittelalterliche Krakau.",
    walkFromHotel: "Tram ~25 Min. nach Nowa Huta, dann zurück ins Zentrum",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/DJI_0242_Plac_Centralny%2C_Nowa_Huta.jpg/1280px-DJI_0242_Plac_Centralny%2C_Nowa_Huta.jpg",
    transportNote: "<strong>Tram 4 oder 10</strong> ab Hauptbahnhof direkt bis <em>Plac Centralny</em> (ca. 25 Min.) – allein die Fahrt durch die Stadt ist schon ein Erlebnis. Nowa Huta ist mit Abstand das kinderwagenfreundlichste Viertel Krakaus: breite Gehwege, flach, viel Platz. Zurück mit derselben Tram ins Zentrum. Für die Podziemia Rynku braucht ihr ein Zeitfenster-Ticket; der Eingang liegt unscheinbar an der Nordseite der Tuchhallen. Der Kościuszko-Hügel ist optional – <strong>Bus 100</strong> ab Salwator fährt direkt hoch.",
    route: { fromBase: true, mode: "transit" },
    sights: [
      {
        name: "Nowa Huta – Plac Centralny",
        mapsName: "Plac Centralny, Nowa Huta, Kraków",
        desc: "Ab 1949 als sozialistische Idealstadt für das Stahlwerk gebaut: monumentale Arkadenbauten um einen sternförmigen Platz, von dem fünf Achsen abgehen. Ein komplett anderes Krakau – und erstaunlich grün.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/DJI_0242_Plac_Centralny%2C_Nowa_Huta.jpg/1280px-DJI_0242_Plac_Centralny%2C_Nowa_Huta.jpg",
        lat: 50.0719, lng: 20.0372,
        stroller: "yes",
        transit: "Tram 4/10 bis Plac Centralny",
        badges: ["Kostenlos", "Sehr kinderwagenfreundlich", "Ganz anderes Krakau"],
      },
      {
        name: "Podziemia Rynku (Untergrund-Museum)",
        mapsName: "Podziemia Rynku, Kraków",
        desc: "Vier Meter unter dem Hauptmarkt liegt die mittelalterliche Stadt: Originalpflaster, Marktstände und Fundamente, inszeniert mit Hologrammen und Nebel. Spannend, trocken und warm – perfekt bei Regen.",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/35/Rynek_Underground%2C_2010.jpg",
        lat: 50.0619, lng: 19.9370,
        stroller: "yes",
        badges: ["Zeitfenster-Ticket", "Aufzug vorhanden", "Bei Regen ideal", "Dienstags oft frei"],
        ticketUrl: "https://muzeumkrakowa.pl/en/branches/rynek-underground",
      },
      {
        name: "Collegium Maius",
        mapsName: "Collegium Maius, Kraków",
        desc: "Ältestes Gebäude der Jagiellonen-Universität von 1400 – hier studierte Kopernikus. Der gotische Arkadenhof mit der Spieluhr ist frei zugänglich und einer der stillsten Orte der Altstadt.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Courtyard_of_the_Collegium_Maius_%28Krak%C3%B3w%29%2C_2019.jpg/1280px-Courtyard_of_the_Collegium_Maius_%28Krak%C3%B3w%29%2C_2019.jpg",
        lat: 50.0614, lng: 19.9325,
        stroller: "careful",
        badges: ["Hof kostenlos", "Museum mit Ticket", "Spieluhr zur vollen Stunde"],
        ticketUrl: "https://maius.uj.edu.pl/en_GB/start",
      },
      {
        name: "Kościuszko-Hügel (optional)",
        mapsName: "Kopiec Kościuszki, Kraków",
        desc: "34 Meter hoher Gedenkhügel westlich der Stadt, umgeben von einer Festung aus österreichischer Zeit. Von oben reicht der Blick an klaren Tagen bis zur Tatra. Nur wenn Zeit und Wetter mitspielen.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/DJI_0141_Kopiec_Ko%C5%9Bciuszki.jpg/1280px-DJI_0141_Kopiec_Ko%C5%9Bciuszki.jpg",
        lat: 50.0548, lng: 19.8958,
        stroller: "careful",
        transit: "Bus 100 ab Salwator",
        badges: ["Optional", "Spiralweg nach oben", "Weiter Blick"],
        ticketUrl: "https://kopieckosciuszki.pl/en/",
        inRoute: false,
      },
    ],
    restaurants: [
      {
        name: "Stylowa",
        mapsName: "Restauracja Stylowa, Nowa Huta, Kraków",
        desc: "Seit 1956 am Plac Centralny und innen fast unverändert: Kronleuchter, Samtvorhänge, polnische Klassiker. Ein echtes Zeitdokument – und immer noch das Lokal des Viertels.",
        lat: 50.0718, lng: 20.0377,
        price: "35–70 PLN / Hauptgericht",
        badges: ["Seit 1956", "Zeitreise", "Günstig"],
      },
      {
        name: "Bar Mleczny (Milchbar)",
        mapsName: "bar mleczny Nowa Huta Kraków",
        desc: "Milchbars sind subventionierte Kantinen aus sozialistischer Zeit – Pierogi, Suppen und Kompott für sehr wenig Geld. In Nowa Huta gibt es noch mehrere, authentischer geht es nicht.",
        lat: 50.0714, lng: 20.0360,
        price: "15–30 PLN / Gericht",
        badges: ["Sehr günstig", "Authentisch", "Nur Bargeld möglich"],
      },
      {
        name: "Café Camelot",
        mapsName: "Café Camelot, Świętego Tomasza, Kraków",
        desc: "Verwinkeltes Altstadt-Café mit Volkskunst an den Wänden und berühmtem Apfelkuchen. Warm, gemütlich und ruhig – der perfekte Abschluss nach dem Untergrund-Museum.",
        lat: 50.0637, lng: 19.9388,
        price: "20–50 PLN / Gericht",
        badges: ["Gemütlich", "Apfelkuchen", "Ruhig"],
      },
    ],
  },

  {
    id: "abreise",
    tag: "Sa 31.10. · Abreise",
    title: "Letzter Vormittag & Heimflug",
    summary: "Barbakan und Florianstor liegen direkt zwischen Altstadt und Hauptbahnhof – der ideale letzte Spaziergang, bevor der Flughafenzug fährt.",
    walkFromHotel: "alles zu Fuß, dann SKA1 zum Flughafen",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/2015_Krak%C3%B3w%2C_Barbakan_02.jpg/1280px-2015_Krak%C3%B3w%2C_Barbakan_02.jpg",
    transportNote: "Barbakan und Florianstor liegen genau auf dem Weg vom Zentrum zum Hauptbahnhof – ihr könnt sie mit Gepäck im Vorbeigehen mitnehmen. Vom Hauptbahnhof fährt der <strong>SKA1</strong> alle 30 Minuten zum Flughafen (ca. 20 Min.). Plant 2,5 Stunden vor Abflug am Flughafen ein. <strong>Beachtet:</strong> Am 31.10. ist bereits viel Verkehr wegen Allerheiligen am Folgetag – der Zug ist deshalb klar die bessere Wahl als ein Taxi.",
    route: { fromBase: true, mode: "walking" },
    sights: [
      {
        name: "Barbakan",
        mapsName: "Barbakan, Kraków",
        desc: "Runde gotische Bastei von 1498, eine der wenigen erhaltenen in Europa – sieben Meter dicke Mauern, Wassergraben und Schießscharten. Von außen jederzeit zu sehen und ein toller letzter Fotostopp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/2015_Krak%C3%B3w%2C_Barbakan_02.jpg/1280px-2015_Krak%C3%B3w%2C_Barbakan_02.jpg",
        lat: 50.0654, lng: 19.9414,
        stroller: "yes",
        transit: "5 Min. zu Fuß vom Hauptbahnhof",
        badges: ["Außen kostenlos", "Direkt am Weg zum Bahnhof"],
      },
      {
        name: "Florianstor (Brama Floriańska)",
        mapsName: "Brama Floriańska, Kraków",
        desc: "Das einzige erhaltene Stadttor Krakaus von 1307 und Beginn des Königswegs. An der Stadtmauer daneben hängt die inoffizielle Freiluftgalerie lokaler Maler.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/20200516_Brama_Floria%C5%84ska_w_Krakowie_0911_9966.jpg/1280px-20200516_Brama_Floria%C5%84ska_w_Krakowie_0911_9966.jpg",
        lat: 50.0649, lng: 19.9412,
        stroller: "careful",
        badges: ["Kostenlos", "Beginn des Königswegs", "Freiluftgalerie"],
      },
    ],
    restaurants: [
      {
        name: "Charlotte (Frühstück)",
        mapsName: "Charlotte Chleb i Wino, Plac Szczepański, Kraków",
        desc: "Öffnet schon früh und backt im eigenen Keller – Croissants, Baguettes, Eier. Das beste letzte Frühstück, bevor es zum Bahnhof geht. Auch zum Mitnehmen für den Zug.",
        lat: 50.0631, lng: 19.9336,
        price: "20–45 PLN / Frühstück",
        badges: ["Öffnet früh", "Proviant für den Flug"],
      },
      {
        name: "Bar Mleczny Pod Temidą",
        mapsName: "Bar Mleczny Pod Temidą, Grodzka, Kraków",
        desc: "Klassische Milchbar an der Grodzka: Pierogi, Rote-Bete-Suppe und Kompott für kleines Geld. Schnell, einfach und ein letzter authentischer Geschmack von Krakau.",
        lat: 50.0596, lng: 19.9375,
        price: "15–35 PLN / Gericht",
        badges: ["Sehr günstig", "Schnell", "Authentisch"],
      },
    ],
  },
];

/* ============================================================
   Google-Maps-Helfer
   ============================================================ */

function mapsPlaceUrl(item) {
  const q = encodeURIComponent(item.mapsName || `${item.name}, Kraków`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

function mapsBaseUrl() {
  const q = encodeURIComponent(BASIS.mapsName);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/* Route über alle Stationen eines Tages.
   - fromBase: Route startet am Hauptbahnhof Kraków Główny
   - mode:     "walking" (zu Fuß) oder "transit" (Tram/Bus/Bahn) */
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
    type === "restaurant" ? "Essen" : "Sehenswürdigkeit";
  node.querySelector(".card-desc").textContent = item.desc;

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

  // Linien-Hinweis (blaues Badge) – nur bei Sehenswürdigkeiten
  if (type === "sight" && item.transit) {
    const t = document.createElement("span");
    t.className = "badge transit";
    t.textContent = `🚊 ${item.transit}`;
    badgesEl.appendChild(t);
  }

  (item.badges || []).forEach((b) => {
    const tag = document.createElement("span");
    // Glutenfrei-Hinweise grün hervorheben
    tag.className = /glutenfrei|GF-Betrieb|Zöliakie/i.test(b) ? "badge gf" : "badge tip";
    tag.textContent = b;
    badgesEl.appendChild(tag);
  });

  const link = node.querySelector(".card-link");
  link.href = mapsPlaceUrl(item);

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
    <span>${zone.restaurants.length}</span>&nbsp;Essen
    <br><span style="color:#55635d; font-weight:400;">${zone.walkFromHotel}</span>
  `;

  const sightsEl = node.querySelector(".cards.sights");
  zone.sights.forEach((s) => sightsEl.appendChild(renderCard(s, "sight")));

  const restEl = node.querySelector(".cards.restaurants");
  zone.restaurants.forEach((r) => restEl.appendChild(renderCard(r, "restaurant")));

  // Essen standardmäßig eingeklappt
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
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleRest();
    }
  });

  if (zone.transportNote) {
    const note = document.createElement("p");
    note.style.cssText = "background:#eef5f0;border:1px solid #c4d8cb;border-radius:12px;padding:0.8rem 1rem;font-size:0.9rem;color:#24564a;margin:0 0 1.4rem;";
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
    label.innerHTML = "Route mit Tram&nbsp;&amp; Bahn in Google&nbsp;Maps";
  } else {
    icon.textContent = "🚶";
    label.innerHTML = "Als Spaziergang in Google&nbsp;Maps";
  }
  const hint = node.querySelector(".route-hint");
  if (transit && fromBase) {
    hint.textContent = "Startet am Hauptbahnhof und verbindet die Stationen mit Tram, Bus & Regionalzug.";
  } else if (transit) {
    hint.textContent = "Verbindet die Stationen der Reihe nach mit Tram, Bus & Bahn.";
  } else if (fromBase) {
    hint.textContent = "Startet am Hauptbahnhof und läuft die Stationen der Reihe nach ab, alles zu Fuß.";
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
