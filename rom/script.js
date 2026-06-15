/* ============================================================
   Reiseführer Rom · Daten & Rendering
   ============================================================ */

const HOTEL = {
  name: "Merulana Inn",
  address: "Via Merulana 19, Roma",
  mapsName: "Merulana Inn, Via Merulana 19, Roma",
  lat: 41.8941,
  lng: 12.4979,
};

/* Stroller-/Treppenhinweise:
   - "yes"      = problemlos mit Kinderwagen
   - "careful"  = Kopfsteinpflaster / einzelne Stufen, geht aber
   - "no"       = viele Treppen → lieber Trage                 */
const STROLLER = {
  yes:     { label: "Kinderwagen ok",     emoji: "🛒", cls: "stroller-yes" },
  careful: { label: "Kopfsteinpflaster",  emoji: "⚠",  cls: "stroller-careful" },
  no:      { label: "Lieber Trage",       emoji: "🤱", cls: "stroller-no" },
};

/* Generisches SVG-Bild für Restaurants (keine Wiki-Quelle) */
const FOOD_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#f4ead9"/>
        <stop offset="1" stop-color="#e6c994"/>
      </linearGradient>
    </defs>
    <rect width="320" height="200" fill="url(#g)"/>
    <g transform="translate(160 100)" fill="none" stroke="#8b2e1f" stroke-width="3" stroke-linecap="round">
      <circle r="42" fill="#fff8ec"/>
      <circle r="30" stroke-width="2"/>
      <path d="M -55 0 L -42 0 M -50 -10 L -50 10 M -47 -10 L -47 10 M -44 -10 L -44 10"/>
      <path d="M 55 0 L 42 0 M 49 -10 Q 60 -5 60 10"/>
    </g>
    <text x="160" y="170" text-anchor="middle" font-family="Cormorant Garamond, serif" font-style="italic" font-size="20" fill="#8b2e1f">Trattoria</text>
  </svg>`);

/* ============================================================
   ZONEN

   Felder pro Location:
   - name          Anzeigename (deutsch)
   - mapsName      Suchname für Google Maps (italienischer Originalname)
   - desc          Beschreibungstext
   - image         Bild-URL (nur Sehenswürdigkeiten)
   - lat, lng      Koordinaten (für Walking-Route)
   - stroller      "yes" | "careful" | "no"
   - badges        Optional: Array von Hinweis-Tags
   - ticketUrl     Optional: Direktlink zur offiziellen Ticket-Seite
   - price         Nur bei Restaurants
   ============================================================ */
const ZONES = [
  {
    id: "kolosseum",
    tag: "Tag-Idee · Antike",
    title: "Kolosseum & Monti",
    summary: "Antikes Rom direkt vor der Haustür: Kolosseum, Konstantinsbogen, Forum-Blick und das verspielte Künstlerviertel Monti.",
    walkFromHotel: "10–20 Min. zu Fuß",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1280px-Colosseo_2020.jpg",
    sights: [
      {
        name: "Kolosseum",
        mapsName: "Colosseo, Roma",
        desc: "Das gewaltigste Bauwerk der Antike. Außenansicht reicht oft – innen mit Baby auf 1,5 h begrenzen. Tickets unbedingt vorab online.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1280px-Colosseo_2020.jpg",
        lat: 41.8902, lng: 12.4922,
        stroller: "careful",
        badges: ["Tickets vorab", "Innen viele Stufen"],
        ticketUrl: "https://ticketing.colosseo.it/en/",
      },
      {
        name: "Konstantinsbogen",
        mapsName: "Arco di Costantino, Roma",
        desc: "Direkt neben dem Kolosseum, kostenlos und immer zugänglich. Schöner Foto-Spot mit Forum-Blick.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Arch_of_Constantine_%28Rome%29_-_South_side%2C_from_Via_triumphalis.jpg/1280px-Arch_of_Constantine_%28Rome%29_-_South_side%2C_from_Via_triumphalis.jpg",
        lat: 41.8898, lng: 12.4906,
        stroller: "yes",
      },
      {
        name: "Forum Romanum (Blick von oben)",
        mapsName: "Foro Romano, Roma",
        desc: "Vom Fußweg an der Via dei Fori Imperiali habt ihr eine grandiose Aussicht auf das ganze Forum – ohne Eintritt, ohne Treppen.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Foro_Romano_Musei_Capitolini_Roma.jpg/1280px-Foro_Romano_Musei_Capitolini_Roma.jpg",
        lat: 41.8925, lng: 12.4853,
        stroller: "yes",
        ticketUrl: "https://ticketing.colosseo.it/en/",
        badges: ["Innenbesuch nur mit Kombi-Ticket Kolosseum"],
      },
      {
        name: "Piazza della Madonna dei Monti",
        mapsName: "Piazza della Madonna dei Monti, Roma",
        desc: "Herz des Viertels Monti: kleiner Brunnen, Cafés, Eisdielen, ruhige Pause zwischendurch. Boho-Flair, kinderwagenfreundlich.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Rome_via_dei_fori_imperiali_20050922.jpg/1280px-Rome_via_dei_fori_imperiali_20050922.jpg",
        lat: 41.8946, lng: 12.4914,
        stroller: "careful",
        badges: ["Kopfsteinpflaster"],
      },
    ],
    restaurants: [
      {
        name: "Trattoria Luzzi",
        mapsName: "Trattoria Luzzi, Roma",
        desc: "Klassiker direkt am Kolosseum: einfache römische Küche, große Portionen, fairer Preis. Familien willkommen.",
        lat: 41.8896, lng: 12.4949,
        price: "10–15 € / Hauptgericht",
        badges: ["Familienfreundlich", "Voll mittags – früh kommen"],
      },
      {
        name: "La Taverna dei Fori Imperiali",
        mapsName: "La Taverna dei Fori Imperiali, Roma",
        desc: "Etwas gehobener, sehr gutes Essen, familiäre Atmosphäre. Reservierung empfehlenswert.",
        lat: 41.8943, lng: 12.4895,
        price: "14–22 € / Hauptgericht",
        badges: ["Reservieren!"],
      },
      {
        name: "Pizzeria Alle Carrette",
        mapsName: "Pizzeria Alle Carrette, Roma",
        desc: "Unkomplizierte Pizza im Holzofen, mitten in Monti. Schnell, günstig, ehrlich.",
        lat: 41.8943, lng: 12.4912,
        price: "7–12 € / Pizza",
        badges: ["Auch zum Mitnehmen"],
      },
    ],
  },

  {
    id: "centro",
    tag: "Tag-Idee · Klassiker",
    title: "Centro Storico – Pantheon, Trevi & Navona",
    summary: "Die drei großen Klassiker auf engstem Raum: Trevi-Brunnen, Pantheon, Piazza Navona. Alles zu Fuß miteinander verbunden.",
    walkFromHotel: "ab Piazza Venezia ~15 Min. (Hotel→Venezia 25 Min.)",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Trevi_Fountain_-_Roma.jpg/1280px-Trevi_Fountain_-_Roma.jpg",
    sights: [
      {
        name: "Trevi-Brunnen",
        mapsName: "Fontana di Trevi, Roma",
        desc: "Barocker Wahnsinn aus Marmor und Wasser. Tipp: morgens vor 9 Uhr oder spätabends besuchen, dann ist es deutlich leerer.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Trevi_Fountain_-_Roma.jpg/1280px-Trevi_Fountain_-_Roma.jpg",
        lat: 41.9009, lng: 12.4833,
        stroller: "careful",
        badges: ["Sehr voll", "Auf Taschendiebe achten"],
      },
      {
        name: "Pantheon",
        mapsName: "Pantheon, Roma",
        desc: "Das besterhaltene Bauwerk der Antike – die Kuppel ist ein Wunder der Ingenieurskunst. Innen weniger Stufen als gedacht.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Pantheon_%28Rome%29_-_Right_side_and_front.jpg/1280px-Pantheon_%28Rome%29_-_Right_side_and_front.jpg",
        lat: 41.8986, lng: 12.4769,
        stroller: "yes",
        badges: ["Eintritt mit Ticket", "Zeitfenster wählen"],
        ticketUrl: "https://www.pantheonroma.com/en/visit-the-pantheon/",
      },
      {
        name: "Piazza Navona",
        mapsName: "Piazza Navona, Roma",
        desc: "Eleganter Platz mit drei Brunnen, Straßenkünstlern und viel Platz für den Kinderwagen. Perfekt für eine längere Pause.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Piazza_Navona_%28Rome%29_at_night.jpg/1280px-Piazza_Navona_%28Rome%29_at_night.jpg",
        lat: 41.8992, lng: 12.4731,
        stroller: "yes",
      },
      {
        name: "Campo de' Fiori",
        mapsName: "Campo de' Fiori, Roma",
        desc: "Lebendiger Markt am Vormittag (Obst, Blumen, Gewürze), abends Bar-Szene. Schöner Abstecher von Piazza Navona.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Campo_dei_Fiori.jpg/1280px-Campo_dei_Fiori.jpg",
        lat: 41.8954, lng: 12.4720,
        stroller: "careful",
        badges: ["Kopfsteinpflaster"],
      },
    ],
    restaurants: [
      {
        name: "Osteria dell'Ingegno",
        mapsName: "Osteria dell'Ingegno, Roma",
        desc: "Moderne römische Küche, nahe Pantheon, schöner Außenbereich an einer ruhigen Piazza. Mittlere Preise.",
        lat: 41.8979, lng: 12.4805,
        price: "14–20 € / Hauptgericht",
        badges: ["Außenplätze"],
      },
      {
        name: "Pizzeria da Baffetto",
        mapsName: "Pizzeria da Baffetto, Roma",
        desc: "Legendäre römische Pizza, dünner Boden. Eng, voll, schnell – aber ein Stück Rom-Geschichte.",
        lat: 41.8989, lng: 12.4708,
        price: "8–13 € / Pizza",
        badges: ["Schlange ab 19 Uhr", "Eng – Trage besser"],
      },
      {
        name: "Gelateria del Teatro",
        mapsName: "Gelateria del Teatro, Roma",
        desc: "Eis aus Bio-Zutaten, viele unerwartete Sorten (Lavendel, Salbei-Himbeere). Eine der besten Gelaterien Roms.",
        lat: 41.8989, lng: 12.4715,
        price: "3–5 € / Becher",
        badges: ["Sehr empfehlenswert"],
      },
    ],
  },

  {
    id: "esquilino",
    tag: "Tag-Idee · Eure Nachbarschaft",
    title: "San Giovanni & Esquilino",
    summary: "Direkt vor eurer Haustür: zwei Papstbasiliken, der Lateran-Obelisk und kleine Gassen, die Touristen oft links liegen lassen.",
    walkFromHotel: "5–15 Min. zu Fuß",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/San_Giovanni_in_Laterano_2021.jpg/1280px-San_Giovanni_in_Laterano_2021.jpg",
    sights: [
      {
        name: "San Giovanni in Laterano",
        mapsName: "Arcibasilica di San Giovanni in Laterano, Roma",
        desc: "Eigentliche Bischofskirche des Papstes – größer und ruhiger als der Petersdom. Innenraum monumental, kaum Stufen.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/San_Giovanni_in_Laterano_2021.jpg/1280px-San_Giovanni_in_Laterano_2021.jpg",
        lat: 41.8859, lng: 12.5057,
        stroller: "yes",
        badges: ["Kein Eintritt"],
      },
      {
        name: "Piazza San Giovanni & Lateran-Obelisk",
        mapsName: "Piazza di San Giovanni in Laterano, Roma",
        desc: "Der älteste und größte Obelisk Roms (1500 v. Chr., 32 m hoch). Riesiger Platz, perfekt zum Durchatmen mit Kinderwagen.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/San_Giovanni_in_Laterano_2021.jpg/1280px-San_Giovanni_in_Laterano_2021.jpg",
        lat: 41.8866, lng: 12.5053,
        stroller: "yes",
      },
      {
        name: "Santa Maria Maggiore",
        mapsName: "Basilica di Santa Maria Maggiore, Roma",
        desc: "Eine der vier Papstbasiliken, atemberaubende Mosaike aus dem 5. Jahrhundert. Auf eurem Weg zwischen Hotel und Centro.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Basilica_di_Santa_Maria_Maggiore_-_Roma.jpg/1280px-Basilica_di_Santa_Maria_Maggiore_-_Roma.jpg",
        lat: 41.8975, lng: 12.4986,
        stroller: "careful",
        badges: ["Wenige Stufen, seitliche Rampe"],
      },
      {
        name: "Scala Santa (Heilige Stufen)",
        mapsName: "Scala Santa, Roma",
        desc: "Pilgerstätte gegenüber San Giovanni: 28 Marmorstufen, die Pilger nur auf Knien hinauf bewältigen. Außenbesichtigung lohnt sich.",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Rom%2C_die_Heilige_Treppe.JPG",
        lat: 41.8865, lng: 12.5066,
        stroller: "no",
        badges: ["Innen nur Treppen", "Trage nehmen"],
      },
      {
        name: "Palazzo Merulana",
        mapsName: "Palazzo Merulana, Roma",
        desc: "Direkt an eurer Via Merulana: schöne Fassade, kleine Kunstsammlung im Inneren. Schöner Spaziergangs-Stop.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Basilica_di_Santa_Maria_Maggiore_-_Roma.jpg/1280px-Basilica_di_Santa_Maria_Maggiore_-_Roma.jpg",
        lat: 41.8943, lng: 12.5005,
        stroller: "yes",
      },
    ],
    restaurants: [
      {
        name: "Trattoria Monti",
        mapsName: "Trattoria Monti, Roma",
        desc: "Familienbetrieb, regionale Küche aus den Marken (Le Marche), berühmt für Tortelli. Reservieren!",
        lat: 41.8970, lng: 12.4988,
        price: "14–22 € / Hauptgericht",
        badges: ["Reservieren!", "Sehr hoch bewertet"],
      },
      {
        name: "Pasta Chef Monti",
        mapsName: "Pasta Chef Monti, Roma",
        desc: "Frische Pasta zum kleinen Preis, schnell und super zentral. Auch zum Mitnehmen ins Hotel.",
        lat: 41.8956, lng: 12.4960,
        price: "7–11 € / Portion",
        badges: ["To go möglich"],
      },
      {
        name: "Li Rioni Pizzeria",
        mapsName: "Li Rioni, Roma",
        desc: "Klassische römisch-dünne Pizza in entspannter Atmosphäre. Ab 19:30 geöffnet, gut für einen späten Abend.",
        lat: 41.8867, lng: 12.5023,
        price: "8–13 € / Pizza",
        badges: ["Nur abends"],
      },
    ],
  },

  {
    id: "vatikan",
    tag: "Tag-Idee · Vatikan",
    title: "Vatikan, Sixtinische Kapelle & Engelsburg",
    summary: "Vatikanische Museen mit Sixtinischer Kapelle, Petersplatz, Petersdom, Engelsburg und Borgo Pio – ein voller Tag, der sich aber lohnt.",
    walkFromHotel: "Mit Taxi/Metro (~15 Min.) zu den Vatikan-Museen, vor Ort alles fußläufig",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/St_Peter%27s_Square%2C_Vatican_City_-_April_2007.jpg/1280px-St_Peter%27s_Square%2C_Vatican_City_-_April_2007.jpg",
    transportNote: "Anreise zur Sixtinischen Kapelle: Taxi (~12 €) direkt zum Eingang Viale Vaticano oder Metro A bis Ottaviano (5 Min. Fußweg). Tickets unbedingt vorab buchen, sonst 1–2 h Schlange! Tipp: frühestmöglichen Slot (8:00 oder 8:30) nehmen, dann ist die Kapelle deutlich leerer.",
    sights: [
      {
        name: "Vatikanische Museen & Sixtinische Kapelle",
        mapsName: "Musei Vaticani, Vaticano",
        desc: "Michelangelos Decke, Raffaels Stanzen, kilometerlange Galerien. Die Route führt automatisch durch alle Säle bis zur Sixtinischen Kapelle am Ende. Kalkuliert 2–3 h ein.",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/82/Sistina-interno.jpg",
        lat: 41.9065, lng: 12.4536,
        stroller: "careful",
        badges: ["Tickets zwingend vorab", "Sehr voll – Trage besser", "In Kapelle: kein Foto, Stille", "Schultern + Knie bedeckt"],
        ticketUrl: "https://tickets.museivaticani.va/home",
      },
      {
        name: "Petersplatz",
        mapsName: "Piazza San Pietro, Vaticano",
        desc: "Berninis monumentaler Platz mit den 284 Säulen. Komplett eben, ideal mit Kinderwagen. Sicherheitskontrolle vor Eintritt.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/St_Peter%27s_Square%2C_Vatican_City_-_April_2007.jpg/1280px-St_Peter%27s_Square%2C_Vatican_City_-_April_2007.jpg",
        lat: 41.9022, lng: 12.4567,
        stroller: "yes",
        badges: ["Sicherheitscheck am Eingang"],
      },
      {
        name: "Petersdom",
        mapsName: "Basilica di San Pietro, Vaticano",
        desc: "Größte Kirche der Welt: Pietà, Bernini-Baldachin, Marmorpracht ohne Ende. Eintritt frei – Reservierung erspart Wartezeit.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Basilica_di_San_Pietro_in_Vaticano_September_2015-1a.jpg/1280px-Basilica_di_San_Pietro_in_Vaticano_September_2015-1a.jpg",
        lat: 41.9022, lng: 12.4533,
        stroller: "careful",
        badges: ["Kostenlos", "Reservierung empfohlen", "Schultern bedeckt!"],
        ticketUrl: "https://www.basilicasanpietro.va/en/products",
      },
      {
        name: "Petersdom – Kuppelaufstieg",
        mapsName: "Cupola di San Pietro, Vaticano",
        desc: "551 Stufen bis ganz oben (oder 320 + Aufzug). Atemberaubender Blick. Mit Baby nur in Trage und nur, wenn beide fit sind.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Basilica_di_San_Pietro_in_Vaticano_September_2015-1a.jpg/1280px-Basilica_di_San_Pietro_in_Vaticano_September_2015-1a.jpg",
        lat: 41.9022, lng: 12.4534,
        stroller: "no",
        badges: ["Trage zwingend", "Eng & steil"],
        ticketUrl: "https://www.basilicasanpietro.va/en/products/the-dome",
      },
      {
        name: "Borgo Pio",
        mapsName: "Borgo Pio, Roma",
        desc: "Charmante Fußgängerzone zwischen Vatikan und Engelsburg: Restaurants, kleine Geschäfte, Touri-Klassiker mit Atmosphäre.",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Passetto_di_Borgo_from_Castel_Sant%27Angelo_01.jpg",
        lat: 41.9028, lng: 12.4612,
        stroller: "yes",
      },
      {
        name: "Engelsburg",
        mapsName: "Castel Sant'Angelo, Roma",
        desc: "Die Engelsbrücke mit den zehn Bernini-Engeln führt direkt zur Burg. Fotostopp pflicht. Innenbesuch mit Kinderwagen schwierig.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Castel_Sant%27_Angelo_Between_Leaves.jpg/1280px-Castel_Sant%27_Angelo_Between_Leaves.jpg",
        lat: 41.9031, lng: 12.4663,
        stroller: "careful",
        badges: ["Innen viele Treppen → Trage"],
        ticketUrl: "https://www.coopculture.it/en/poi/castel-santangelo/",
      },
    ],
    restaurants: [
      {
        name: "Il Sorpasso",
        mapsName: "Il Sorpasso, Roma",
        desc: "Modernes Bistro im Viertel Prati, hervorragende Aufschnitt-Platten und Pasta. Gut für einen späten Lunch.",
        lat: 41.9078, lng: 12.4609,
        price: "13–20 € / Hauptgericht",
        badges: ["Trendy", "Reservieren"],
      },
      {
        name: "Pizzarium Bonci",
        mapsName: "Pizzarium Bonci, Roma",
        desc: "Beste Pizza al taglio Roms (Bonci). Zum Mitnehmen, im Stehen essen. Nahe Vatikanmuseen.",
        lat: 41.9075, lng: 12.4475,
        price: "4–8 € / Stück",
        badges: ["Nur Stehplätze", "Kult"],
      },
      {
        name: "Trattoria Tony",
        mapsName: "Trattoria Tony Borgo Pio, Roma",
        desc: "Solide Trattoria in der Fußgängerzone Borgo Pio: einfache Pasta, höflicher Service, schöne Außenplätze.",
        lat: 41.9027, lng: 12.4625,
        price: "11–17 € / Hauptgericht",
        badges: ["Kinderwagen ok"],
      },
    ],
  },

  {
    id: "borghese",
    tag: "Tag-Idee · Park",
    title: "Villa Borghese & Piazza del Popolo",
    summary: "Roms grüne Lunge: Park, Spielplätze, Bootsverleih, dazu Pincio-Aussicht und der weite Piazza del Popolo. Perfekt mit Baby.",
    walkFromHotel: "Mit Taxi/Bus zur Piazza del Popolo (~15 Min.), dann alles zu Fuß",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Ingresso_monumentale_di_Villa_Borghese_a_Roma_su_piazzale_Flaminio_2018-02.jpg/1280px-Ingresso_monumentale_di_Villa_Borghese_a_Roma_su_piazzale_Flaminio_2018-02.jpg",
    sights: [
      {
        name: "Piazza del Popolo",
        mapsName: "Piazza del Popolo, Roma",
        desc: "Riesiger ovaler Platz mit ägyptischem Obelisk, drei Kirchen, Brunnen. Komplett eben, ideal als Treffpunkt.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/PIAZZA_DEL_POPOLO_VISTA_AEREA.jpg/1280px-PIAZZA_DEL_POPOLO_VISTA_AEREA.jpg",
        lat: 41.9108, lng: 12.4768,
        stroller: "yes",
      },
      {
        name: "Pincio-Terrasse",
        mapsName: "Terrazza del Pincio, Roma",
        desc: "Aussichtsterrasse über Piazza del Popolo bis zum Petersdom – einer der schönsten Sonnenuntergänge Roms.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Terrazza_del_Pincio_%2846397854832%29.jpg/1280px-Terrazza_del_Pincio_%2846397854832%29.jpg",
        lat: 41.9116, lng: 12.4794,
        stroller: "careful",
        badges: ["Rampen vorhanden", "Ein Treppen-Stück → Trage parat"],
      },
      {
        name: "Villa Borghese (Park)",
        mapsName: "Villa Borghese, Roma",
        desc: "Großer englischer Landschaftspark: Spielplätze, Tretboote auf dem Laghetto, schattige Wege. Perfekt mit Kinderwagen.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Ingresso_monumentale_di_Villa_Borghese_a_Roma_su_piazzale_Flaminio_2018-02.jpg/1280px-Ingresso_monumentale_di_Villa_Borghese_a_Roma_su_piazzale_Flaminio_2018-02.jpg",
        lat: 41.9135, lng: 12.4849,
        stroller: "yes",
        badges: ["Spielplätze", "Tretboote"],
      },
      {
        name: "Galleria Borghese",
        mapsName: "Galleria Borghese, Roma",
        desc: "Berninis Apoll & Daphne, Caravaggio-Meisterwerke. NUR mit Online-Ticket und Zeitfenster (2-Stunden-Slot).",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Ingresso_monumentale_di_Villa_Borghese_a_Roma_su_piazzale_Flaminio_2018-02.jpg/1280px-Ingresso_monumentale_di_Villa_Borghese_a_Roma_su_piazzale_Flaminio_2018-02.jpg",
        lat: 41.9142, lng: 12.4922,
        stroller: "careful",
        badges: ["Ticket Pflicht!", "Buggy-Abgabe vor Eintritt"],
        ticketUrl: "https://galleriaborghese.beniculturali.it/en/visita/info-biglietti/",
      },
    ],
    restaurants: [
      {
        name: "Casina Valadier",
        mapsName: "Casina Valadier, Roma",
        desc: "Restaurant mit Aussichts-Terrasse oberhalb von Piazza del Popolo. Schöner als günstig – einen Caffè wert.",
        lat: 41.9120, lng: 12.4783,
        price: "18–28 € / Hauptgericht",
        badges: ["Aussicht"],
      },
      {
        name: "Ginger Sapori e Salute",
        mapsName: "Ginger Sapori e Salute Via del Corso, Roma",
        desc: "Frische, leichte Küche an der Via del Corso – Salate, Bowls, gepresste Säfte. Angenehme Pause vom Pasta-Marathon.",
        lat: 41.9067, lng: 12.4791,
        price: "12–18 € / Gericht",
        badges: ["Vegetarisch ok", "Hochstühle vorhanden"],
      },
      {
        name: "Caffè Canova-Tadolini",
        mapsName: "Canova Tadolini, Roma",
        desc: "Außergewöhnliches Café im ehemaligen Atelier des Bildhauers Canova – zwischen Skulpturen Pasta essen.",
        lat: 41.9078, lng: 12.4823,
        price: "12–22 € / Gericht",
        badges: ["Atmosphäre!"],
      },
    ],
  },
];

/* ============================================================
   Google-Maps-Helfer (iPhone-kompatibel)
   ============================================================ */

/* Direkt zur Place-Card eines Ortes – iPhone öffnet Google-Maps-App */
function mapsPlaceUrl(item) {
  const q = encodeURIComponent(item.mapsName || `${item.name}, Roma`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/* Hotel-Pin (Adresse) */
function mapsHotelUrl() {
  const q = encodeURIComponent(HOTEL.mapsName);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/* Spaziergang ab Hotel über alle Sehenswürdigkeiten der Zone (zu Fuß).
   Nutzt Koordinaten – die iOS-Google-Maps-App geocodiert Place-Namen
   in Multi-Stop-Routen unzuverlässig (Vorschau ja, Berechnung nein).
   Mit "lat,lng"-Waypoints klappt die Routenberechnung verlässlich. */
function walkingRouteUrl(sights) {
  if (!sights.length) return "#";
  const origin = `${HOTEL.lat},${HOTEL.lng}`;
  const last = sights[sights.length - 1];
  const destination = `${last.lat},${last.lng}`;
  const waypoints = sights
    .slice(0, -1)
    .map((s) => `${s.lat},${s.lng}`)
    .join("|");
  let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`;
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
    type === "restaurant" ? "Restaurant" : "Sehenswürdigkeit";
  node.querySelector(".card-desc").textContent = item.desc;

  const badgesEl = node.querySelector(".card-badges");
  if (type === "restaurant") {
    if (item.price) {
      const p = document.createElement("span");
      p.className = "badge price";
      p.textContent = "€ " + item.price.replace(/^€\s*/, "");
      badgesEl.appendChild(p);
    }
  } else if (item.stroller) {
    const s = STROLLER[item.stroller];
    const sb = document.createElement("span");
    sb.className = "badge " + s.cls;
    sb.textContent = `${s.emoji} ${s.label}`;
    badgesEl.appendChild(sb);
  }
  (item.badges || []).forEach((b) => {
    const tag = document.createElement("span");
    tag.className = "badge tip";
    tag.textContent = b;
    badgesEl.appendChild(tag);
  });

  // Maps-Link (immer sichtbar)
  const link = node.querySelector(".card-link");
  link.href = mapsPlaceUrl(item);

  // Ticket-Link (nur bei Sehenswürdigkeiten mit ticketUrl)
  if (type === "sight" && item.ticketUrl) {
    const ticketBtn = document.createElement("a");
    ticketBtn.className = "card-ticket";
    ticketBtn.href = item.ticketUrl;
    ticketBtn.target = "_blank";
    ticketBtn.rel = "noopener";
    ticketBtn.innerHTML = `<span>🎟️</span><span>Tickets buchen (offiziell)</span>`;
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
    <span>${zone.restaurants.length}</span>&nbsp;Restaurants
    <br><span style="color:#5a4a44; font-weight:400;">${zone.walkFromHotel}</span>
  `;

  const sightsEl = node.querySelector(".cards.sights");
  zone.sights.forEach((s) => sightsEl.appendChild(renderCard(s, "sight")));

  const restEl = node.querySelector(".cards.restaurants");
  zone.restaurants.forEach((r) => restEl.appendChild(renderCard(r, "restaurant")));

  // Restaurants standardmäßig eingeklappt – eigener Toggle
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
    note.style.cssText = "background:#fff8ec;border:1px solid #f0d294;border-radius:12px;padding:0.8rem 1rem;font-size:0.9rem;color:#7a4a10;margin:0 0 1.4rem;";
    note.innerHTML = `<strong>🚖 Anreise:</strong> ${zone.transportNote}`;
    node.querySelector(".zone-body").prepend(note);
  }

  // Spaziergang ab Hotel über alle Sehenswürdigkeiten – KEINE Restaurants
  const routeBtn = node.querySelector(".route-btn");
  routeBtn.href = walkingRouteUrl(zone.sights);

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

  document.getElementById("hotel-link").href = mapsHotelUrl();
}

document.addEventListener("DOMContentLoaded", init);
