/* ============================================================
   Reiseführer Berlin · Daten & Rendering
   ============================================================ */

const HOTEL = {
  name: "Hotel Riu Plaza Berlin",
  address: "Martin-Luther-Straße 1, 10777 Berlin (Schöneberg)",
  mapsName: "Hotel Riu Plaza Berlin, Martin-Luther-Straße 1, Berlin",
  lat: 52.5004,
  lng: 13.3469,
};

/* Stroller-/Treppenhinweise:
   - "yes"      = problemlos mit Kinderwagen (eben, breite Wege)
   - "careful"  = einzelne Stufen / Kopfsteinpflaster / enge Stellen
   - "no"       = viele Treppen / Turmaufstieg → lieber Trage          */
const STROLLER = {
  yes:     { label: "Kinderwagen ok",   emoji: "🛒", cls: "stroller-yes" },
  careful: { label: "Teils Stufen",     emoji: "⚠",  cls: "stroller-careful" },
  no:      { label: "Lieber Trage",     emoji: "🤱", cls: "stroller-no" },
};

/* Generisches SVG-Bild für Restaurants (keine Wiki-Quelle) */
const FOOD_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#e5e9f0"/>
        <stop offset="1" stop-color="#aebfd6"/>
      </linearGradient>
    </defs>
    <rect width="320" height="200" fill="url(#g)"/>
    <g transform="translate(160 100)" fill="none" stroke="#1d3557" stroke-width="3" stroke-linecap="round">
      <circle r="42" fill="#f7f9fc"/>
      <circle r="30" stroke-width="2"/>
      <path d="M -55 0 L -42 0 M -50 -10 L -50 10 M -47 -10 L -47 10 M -44 -10 L -44 10"/>
      <path d="M 55 0 L 42 0 M 49 -10 Q 60 -5 60 10"/>
    </g>
    <text x="160" y="170" text-anchor="middle" font-family="Cormorant Garamond, serif" font-style="italic" font-size="20" fill="#1d3557">Berlin · Essen</text>
  </svg>`);

/* ============================================================
   ZONEN (Tages-Ideen, jeweils gebietsweise)

   Felder pro Location:
   - name          Anzeigename
   - mapsName      Suchname für Google Maps
   - desc          Beschreibungstext
   - image         Bild-URL (nur Sehenswürdigkeiten)
   - lat, lng      Koordinaten (für Route)
   - stroller      "yes" | "careful" | "no"
   - badges        Optional: Array von Hinweis-Tags
   - ticketUrl     Optional: Direktlink zur offiziellen Ticket-Seite
   - inRoute       Optional: false = nicht in die Auto-Route aufnehmen
   - price         Nur bei Restaurants

   Pro Zone:
   - route.fromHotel  true = Route startet am Hotel, sonst an 1. Sehensw.
   - route.mode       "walking" | "transit"
   ============================================================ */
const ZONES = [
  {
    id: "mitte-tor",
    tag: "Tag-Idee · Wahrzeichen",
    title: "Brandenburger Tor & Regierungsviertel",
    summary: "Das ikonische Berlin: Brandenburger Tor, Reichstag mit Glaskuppel, Holocaust-Mahnmal und der weite Tiergarten. Alles eben und fußläufig – perfekt mit Kinderwagen.",
    walkFromHotel: "U-Bahn/Bus ~20 Min., vor Ort alles zu Fuß",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Brandenburger_Tor_abends.jpg/1280px-Brandenburger_Tor_abends.jpg",
    transportNote: "Vom Hotel mit der U-Bahn (U1/U2/U3 ab Wittenbergplatz oder Nollendorfplatz) bzw. Bus zum Brandenburger Tor (~20 Min.). Innerhalb der Zone ist alles eben und zu Fuß machbar – der Tiergarten ist ein riesiger Park, ideal zum Schieben des Kinderwagens.",
    route: { fromHotel: false, mode: "walking" },
    sights: [
      {
        name: "Brandenburger Tor",
        mapsName: "Brandenburger Tor, Berlin",
        desc: "Berlins Wahrzeichen und einst Symbol der Teilung. Der Pariser Platz davor ist weitläufig und komplett eben. Frühmorgens am schönsten für Fotos ohne Menschenmassen.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Brandenburger_Tor_abends.jpg/1280px-Brandenburger_Tor_abends.jpg",
        lat: 52.5163, lng: 13.3777,
        stroller: "yes",
      },
      {
        name: "Reichstagsgebäude & Glaskuppel",
        mapsName: "Reichstagsgebäude, Berlin",
        desc: "Sitz des Bundestags mit begehbarer Glaskuppel (Aufzug, kinderwagentauglich!) und grandiosem Rundumblick. Besuch ist kostenlos, aber nur mit vorheriger Online-Anmeldung.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Reichstagsgeb%C3%A4ude_von_Westen.jpg/1280px-Reichstagsgeb%C3%A4ude_von_Westen.jpg",
        lat: 52.5186, lng: 13.3762,
        stroller: "yes",
        badges: ["Kuppel: vorab anmelden (kostenlos)", "Aufzug vorhanden"],
        ticketUrl: "https://www.bundestag.de/besuche/kuppel",
      },
      {
        name: "Denkmal für die ermordeten Juden Europas",
        mapsName: "Denkmal für die ermordeten Juden Europas, Berlin",
        desc: "2.711 Betonstelen auf welligem Boden – ein bewegendes Mahnmal. Frei begehbar; der Ort der Information darunter ist sehr eindrücklich. Wege zwischen den Stelen sind teils uneben.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Memorial_to_the_Murdered_Jews_of_Europeabove.jpg/1280px-Memorial_to_the_Murdered_Jews_of_Europeabove.jpg",
        lat: 52.5139, lng: 13.3789,
        stroller: "careful",
        badges: ["Frei zugänglich", "Boden wellig"],
      },
      {
        name: "Großer Tiergarten",
        mapsName: "Großer Tiergarten, Berlin",
        desc: "Berlins grüne Lunge mitten in der Stadt: breite, ebene Wege, Wiesen, Seen und Spielplätze. Am Neuen See gibt es einen Biergarten mit Ruderbooten – ideal für eine Familienpause.",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Berlin_Tiergarten_Siegess%C3%A4ule_Luftansicht.jpg",
        lat: 52.5132, lng: 13.3600,
        stroller: "yes",
        badges: ["Spielplätze", "Bootsverleih am Neuen See"],
      },
      {
        name: "Siegessäule",
        mapsName: "Siegessäule, Berlin",
        desc: "Goldene „Goldelse\" auf dem Großen Stern, mitten im Tiergarten. Außen ein toller Fotostopp; der Aufstieg auf die Aussichtsplattform geht nur über 285 enge Wendelstufen.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Berlin_-_Siegess%C3%A4ule1.jpg/1280px-Berlin_-_Siegess%C3%A4ule1.jpg",
        lat: 52.5145, lng: 13.3501,
        stroller: "careful",
        badges: ["Aufstieg: 285 Stufen → Trage", "Unterführung zum Sockel"],
      },
    ],
    restaurants: [
      {
        name: "Café am Neuen See",
        mapsName: "Café am Neuen See, Berlin",
        desc: "Biergarten direkt am See im Tiergarten: Pizza, Brezn, Bier, Ruderboote. Sehr familien- und kinderwagenfreundlich, viel Platz unter Bäumen.",
        lat: 52.5108, lng: 13.3490,
        price: "10–18 € / Gericht",
        badges: ["Biergarten", "Top für Familien"],
      },
      {
        name: "Käfer Dachgarten (Reichstag)",
        mapsName: "Käfer Dachgarten Restaurant Reichstag, Berlin",
        desc: "Restaurant auf dem Reichstagsdach – eine Reservierung gilt zugleich als (kostenloser) Zugang zum Dach und zur Kuppel ohne separate Anmeldung. Schöner Trick!",
        lat: 52.5186, lng: 13.3762,
        price: "20–30 € / Hauptgericht",
        badges: ["Reservieren!", "Zugang zur Kuppel inklusive"],
      },
      {
        name: "Berlin Pavillon",
        mapsName: "Berlin Pavillon, Scheidemannstraße, Berlin",
        desc: "Unkompliziertes Selbstbedienungs-Restaurant nahe Reichstag/Brandenburger Tor: Currywurst, Schnitzel, Salate. Schnell und zentral für die Mittagspause.",
        lat: 52.5175, lng: 13.3760,
        price: "9–16 € / Gericht",
        badges: ["Schnell & zentral"],
      },
    ],
  },

  {
    id: "museumsinsel",
    tag: "Tag-Idee · Klassiker & Museen",
    title: "Museumsinsel, Unter den Linden & Alex",
    summary: "Kultur-Herzstück Berlins: die Museumsinsel (UNESCO-Welterbe) mit der Nofretete, Berliner Dom, Humboldt Forum, der elegante Gendarmenmarkt und der Fernsehturm am Alex.",
    walkFromHotel: "S-Bahn ~25 Min. bis Hackescher Markt, dann zu Fuß",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Berlin_Museumsinsel_Fernsehturm.jpg/1280px-Berlin_Museumsinsel_Fernsehturm.jpg",
    transportNote: "S-Bahn (S3/S5/S7/S9) bis Hackescher Markt oder U5 bis Museumsinsel. Dom, Museumsinsel, Humboldt Forum und Fernsehturm liegen dicht beieinander – alles zu Fuß. Wichtig: Das Pergamonmuseum ist wegen Generalsanierung bis voraussichtlich 2027 komplett geschlossen. Geöffnet sind u. a. Neues Museum (Nofretete) und Alte Nationalgalerie.",
    route: { fromHotel: false, mode: "walking" },
    sights: [
      {
        name: "Gendarmenmarkt",
        mapsName: "Gendarmenmarkt, Berlin",
        desc: "Berlins schönster Platz: Konzerthaus zwischen Deutschem und Französischem Dom. Weitläufig und eben. Hinweis: der Platz wird in Etappen saniert – meist trotzdem begehbar.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Gendarmenmarkt_Panorama.jpg/1280px-Gendarmenmarkt_Panorama.jpg",
        lat: 52.5137, lng: 13.3925,
        stroller: "yes",
      },
      {
        name: "Humboldt Forum (Berliner Schloss)",
        mapsName: "Humboldt Forum, Berlin",
        desc: "Wiederaufgebautes Stadtschloss mit Museen, Innenhöfen und einer Dachterrasse mit toller Aussicht. Vieles ist kostenlos, modern und komplett barrierefrei (Aufzüge).",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Berlin-Mitte_Stadtschloss_asv2023-10_%28cropped%29.jpg/1280px-Berlin-Mitte_Stadtschloss_asv2023-10_%28cropped%29.jpg",
        lat: 52.5176, lng: 13.4028,
        stroller: "yes",
        badges: ["Viel kostenlos", "Barrierefrei", "Dachterrasse"],
      },
      {
        name: "Berliner Dom",
        mapsName: "Berliner Dom, Berlin",
        desc: "Prächtige protestantische Kathedrale am Lustgarten mit gewaltiger Kuppel. Innenraum beeindruckend; der Aufstieg zur Kuppelgalerie (270 Stufen) lohnt – aber nur mit Trage.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/2023_Berliner_Dom_-_Westfassade_--_01.jpg/1280px-2023_Berliner_Dom_-_Westfassade_--_01.jpg",
        lat: 52.5191, lng: 13.4009,
        stroller: "careful",
        badges: ["Eintritt mit Ticket", "Kuppel: 270 Stufen"],
        ticketUrl: "https://www.berlinerdom.de/en/",
      },
      {
        name: "Museumsinsel – Neues Museum (Nofretete)",
        mapsName: "Neues Museum, Berlin",
        desc: "Hier wohnt die berühmte Büste der Nofretete. Das Neues Museum und die Alte Nationalgalerie sind geöffnet und barrierefrei. Tickets am besten mit Zeitfenster vorab buchen.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Berlin_Neues_Museum_001.JPG/1280px-Berlin_Neues_Museum_001.JPG",
        lat: 52.5208, lng: 13.3977,
        stroller: "careful",
        badges: ["Zeitfenster-Ticket", "Pergamon bis ~2027 zu"],
        ticketUrl: "https://www.smb.museum/en/visit/buy-tickets/",
      },
      {
        name: "Fernsehturm & Alexanderplatz",
        mapsName: "Berliner Fernsehturm, Berlin",
        desc: "Mit 368 m das höchste Bauwerk Deutschlands – Aussichtsetage und drehendes Café per Aufzug. Davor der weite Alexanderplatz mit Weltzeituhr. Tickets vorab spart die Schlange.",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Fernsehturm_Berlin.jpg",
        lat: 52.5208, lng: 13.4094,
        stroller: "yes",
        badges: ["Tickets vorab", "Aufzug nach oben"],
        ticketUrl: "https://tv-turm.de/en/",
      },
    ],
    restaurants: [
      {
        name: "Augustiner am Gendarmenmarkt",
        mapsName: "Augustiner am Gendarmenmarkt, Berlin",
        desc: "Bayerisches Wirtshaus mit deftiger Küche, Brezn und frisch gezapftem Bier. Große Portionen, Familien willkommen, zentral zwischen Gendarmenmarkt und Unter den Linden.",
        lat: 52.5135, lng: 13.3905,
        price: "13–22 € / Hauptgericht",
        badges: ["Deftig", "Familienfreundlich"],
      },
      {
        name: "Zur letzten Instanz",
        mapsName: "Zur letzten Instanz, Berlin",
        desc: "Berlins ältestes Wirtshaus (seit 1621), urige Berliner Küche wie Eisbein und Boulette. Ein Stück Stadtgeschichte, nahe Alexanderplatz/Nikolaiviertel.",
        lat: 52.5168, lng: 13.4129,
        price: "15–24 € / Hauptgericht",
        badges: ["Traditionsküche", "Reservieren"],
      },
      {
        name: "Brauhaus Georgbräu (Nikolaiviertel)",
        mapsName: "Brauhaus Georgbräu, Berlin",
        desc: "Hausbrauerei im historischen Nikolaiviertel mit Biergarten direkt an der Spree. Hausgebrautes Bier, Berliner Hausmannskost, schöner Platz für Familien.",
        lat: 52.5165, lng: 13.4070,
        price: "11–19 € / Hauptgericht",
        badges: ["Biergarten an der Spree"],
      },
    ],
  },

  {
    id: "mauer",
    tag: "Tag-Idee · Geteilte Stadt",
    title: "Mauer & Kalter Krieg",
    summary: "Berlins Geschichte der Teilung: Checkpoint Charlie, die Topographie des Terrors, der wiederbelebte Potsdamer Platz und die bunte East Side Gallery an der Spree.",
    walkFromHotel: "U-Bahn; zwei je fußläufige Cluster",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Baiser.JPG",
    transportNote: "Cluster 1 (Potsdamer Platz, Topographie des Terrors, Checkpoint Charlie) liegt eng beieinander und ist zu Fuß machbar. Danach mit der U-Bahn (U2/U1/U3) Richtung Osten zur East Side Gallery & Oberbaumbrücke (Cluster 2, ebenfalls fußläufig). Die Route unten schlägt die Bahn-Verbindungen direkt vor.",
    route: { fromHotel: false, mode: "transit" },
    sights: [
      {
        name: "Potsdamer Platz",
        mapsName: "Potsdamer Platz, Berlin",
        desc: "Einst Brachland am Mauerstreifen, heute Hochhaus-Ensemble mit Kinos, Sony Center und ein paar erhaltenen Mauersegmenten. Komplett eben und barrierefrei.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Berlin_-_Potsdamer_Platz_-_2016.jpg/1280px-Berlin_-_Potsdamer_Platz_-_2016.jpg",
        lat: 52.5096, lng: 13.3760,
        stroller: "yes",
        badges: ["Mauersegmente", "Sony Center"],
      },
      {
        name: "Topographie des Terrors",
        mapsName: "Topographie des Terrors, Berlin",
        desc: "Dokumentationszentrum auf dem Gelände der ehemaligen Gestapo-Zentrale, entlang eines original erhaltenen Mauerstücks. Eintritt frei, Außengelände eben und kinderwagentauglich.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Dokumentationszentrum_Topographie_des_Terrors.jpg/1280px-Dokumentationszentrum_Topographie_des_Terrors.jpg",
        lat: 52.5065, lng: 13.3833,
        stroller: "yes",
        badges: ["Eintritt frei"],
      },
      {
        name: "Checkpoint Charlie",
        mapsName: "Checkpoint Charlie, Berlin",
        desc: "Der berühmteste Grenzübergang zwischen Ost und West. Heute Nachbau des Kontrollhäuschens, sehr touristisch. Der Außenbereich ist frei; das Mauermuseum nebenan ist kostenpflichtig.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Checkpoint_Charlie1.jpg/1280px-Checkpoint_Charlie1.jpg",
        lat: 52.5076, lng: 13.3904,
        stroller: "yes",
        badges: ["Außen frei", "Sehr touristisch"],
      },
      {
        name: "East Side Gallery",
        mapsName: "East Side Gallery, Berlin",
        desc: "Längstes erhaltenes Mauerstück (1,3 km), bemalt von Künstlern aus aller Welt – darunter der „Bruderkuss\". Frei zugänglich, ebener Uferweg an der Spree. Toll mit Kinderwagen.",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Baiser.JPG",
        lat: 52.5050, lng: 13.4395,
        stroller: "yes",
        badges: ["Open-Air, frei", "1,3 km Mauer"],
      },
      {
        name: "Oberbaumbrücke",
        mapsName: "Oberbaumbrücke, Berlin",
        desc: "Markante zweigeschossige Backsteinbrücke über die Spree, Verbindung von Friedrichshain und Kreuzberg. Oben fährt die U-Bahn. Schöner Abschluss am Ende der East Side Gallery.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Oberbaumbr%C3%BCcke_mit_U-Bahn.jpg/1280px-Oberbaumbr%C3%BCcke_mit_U-Bahn.jpg",
        lat: 52.5018, lng: 13.4456,
        stroller: "yes",
      },
    ],
    restaurants: [
      {
        name: "Curry 36",
        mapsName: "Curry 36 Mehringdamm, Berlin",
        desc: "Kult-Imbiss am Mehringdamm – eine der berühmtesten Currywürste der Stadt. Im Stehen, schnell, günstig. Quasi Pflichtprogramm für eine echte Berliner Currywurst.",
        lat: 52.4935, lng: 13.3874,
        price: "3–8 € / Portion",
        badges: ["Currywurst-Kult", "Imbiss im Stehen"],
      },
      {
        name: "Burgermeister (Schlesisches Tor)",
        mapsName: "Burgermeister Schlesisches Tor, Berlin",
        desc: "Burgerbude in einem alten Toilettenhäuschen unter dem U-Bahn-Viadukt, nahe Oberbaumbrücke. Saftige Burger, oft Schlange – aber legendär in Kreuzberg.",
        lat: 52.5009, lng: 13.4419,
        price: "6–11 € / Burger",
        badges: ["Kult", "Nähe Oberbaumbrücke"],
      },
      {
        name: "Markthalle Neun",
        mapsName: "Markthalle Neun, Berlin",
        desc: "Historische Markthalle in Kreuzberg mit Street-Food-Ständen, Bäckern und Käse. Donnerstags „Street Food Thursday\". Viel Auswahl, gut mit Kindern.",
        lat: 52.5018, lng: 13.4318,
        price: "6–14 € / Gericht",
        badges: ["Street Food", "Viel Auswahl"],
      },
    ],
  },

  {
    id: "prenzlberg",
    tag: "Tag-Idee · Tram & Familie",
    title: "Prenzlauer Berg, Hackescher Markt & Mauerpark",
    summary: "Das entspannte, familienfreundliche Berlin: hübsche Altbaukieze, die Hackeschen Höfe, Kollwitzplatz, Kulturbrauerei, der Mauerpark und die Gedenkstätte Berliner Mauer – verbunden per Straßenbahn.",
    walkFromHotel: "U-Bahn + Tram M1/M10, sehr kinderwagenfreundlich",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Hackesche_h%C3%B6fe_berlin.jpg/1280px-Hackesche_h%C3%B6fe_berlin.jpg",
    transportNote: "DIE Straßenbahn-Zone! Ab Hackescher Markt fährt die Tram M1 hinauf nach Prenzlauer Berg (Kollwitzplatz, Kulturbrauerei, Eberswalder Str.), die Tram M10 entlang der Bernauer Straße zur Gedenkstätte. Tram M1/M10 verbinden alle Stopps bequem. Breite Gehwege, viele Spielplätze und Cafés – extrem kinderwagenfreundlich.",
    route: { fromHotel: false, mode: "transit" },
    sights: [
      {
        name: "Hackescher Markt & Hackesche Höfe",
        mapsName: "Hackesche Höfe, Berlin",
        desc: "Verschachtelte, liebevoll restaurierte Höfe mit Jugendstil-Fassaden, kleinen Läden und Cafés. Lebendiger Platz am S-Bahnhof, Startpunkt der Tram M1 nach Prenzlauer Berg.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Hackesche_h%C3%B6fe_berlin.jpg/1280px-Hackesche_h%C3%B6fe_berlin.jpg",
        lat: 52.5245, lng: 13.4024,
        stroller: "careful",
        badges: ["Tram M1 ab hier", "In den Höfen teils Kopfstein"],
      },
      {
        name: "Kollwitzplatz",
        mapsName: "Kollwitzplatz, Berlin",
        desc: "Herz des Prenzlauer Bergs: grüner Platz mit Spielplatz, umgeben von schönen Altbauten und Cafés. Samstags Bio-Wochenmarkt. Eines der familienfreundlichsten Viertel Berlins.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Kollwitzplatz_Januar_2025.jpg/1280px-Kollwitzplatz_Januar_2025.jpg",
        lat: 52.5360, lng: 13.4188,
        stroller: "yes",
        badges: ["Spielplatz", "Sa Wochenmarkt"],
      },
      {
        name: "Kulturbrauerei",
        mapsName: "Kulturbrauerei, Berlin",
        desc: "Ehemalige Brauerei aus rotem Backstein, heute Kulturzentrum mit Höfen, Kino, Konzerten und Restaurants. Ebenerdig und überdacht – auch bei Regen angenehm.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Berlin-Kulturbrauerei.jpg/1280px-Berlin-Kulturbrauerei.jpg",
        lat: 52.5392, lng: 13.4179,
        stroller: "careful",
        badges: ["Teils Kopfsteinpflaster im Hof"],
      },
      {
        name: "Mauerpark",
        mapsName: "Mauerpark, Berlin",
        desc: "Lebendiger Park auf dem alten Mauerstreifen: sonntags riesiger Flohmarkt und legendäres Karaoke im Amphitheater. Große Wiesen, Schaukeln – top für eine Familienpause.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Berlin_Mauerpark_2022.jpg/1280px-Berlin_Mauerpark_2022.jpg",
        lat: 52.5416, lng: 13.4022,
        stroller: "yes",
        badges: ["So Flohmarkt & Karaoke", "Spielplatz"],
      },
      {
        name: "Gedenkstätte Berliner Mauer (Bernauer Straße)",
        mapsName: "Gedenkstätte Berliner Mauer Bernauer Straße, Berlin",
        desc: "Eindrücklichster Mauer-Erinnerungsort: original erhaltener Grenzstreifen mit Wachturm, Open-Air-Ausstellung und Aussichtsplattform. Eintritt frei, ebener Weg entlang der Straße.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Berlin%2C_Bernauer_Stra%C3%9Fe%2C_%C3%9Cberblick_2014-07.jpg/1280px-Berlin%2C_Bernauer_Stra%C3%9Fe%2C_%C3%9Cberblick_2014-07.jpg",
        lat: 52.5351, lng: 13.3895,
        stroller: "yes",
        badges: ["Eintritt frei", "Tram M10"],
      },
    ],
    restaurants: [
      {
        name: "Konnopke's Imbiss",
        mapsName: "Konnopke's Imbiss, Berlin",
        desc: "Legendärer Currywurst-Imbiss seit 1930 unter dem U-Bahn-Viadukt an der Eberswalder Straße, direkt bei der Kulturbrauerei. Institution des Prenzlauer Bergs.",
        lat: 52.5407, lng: 13.4124,
        price: "3–7 € / Portion",
        badges: ["Currywurst-Legende"],
      },
      {
        name: "Prater Garten",
        mapsName: "Prater Garten, Berlin",
        desc: "Berlins ältester Biergarten (seit 1837) an der Kastanienallee: Kastanienbäume, lange Bänke, Bier und Bratwurst. Sehr entspannt und ideal mit Kindern und Kinderwagen.",
        lat: 52.5390, lng: 13.4118,
        price: "8–16 € / Gericht",
        badges: ["Ältester Biergarten", "Top für Familien"],
      },
      {
        name: "Café Anna Blume",
        mapsName: "Café Anna Blume, Berlin",
        desc: "Charmantes Eck-Café im Kollwitzkiez, berühmt für die etagenweise servierte Frühstücks-Etagère und Blumen vom eigenen Laden. Gemütlich für ein langes Frühstück.",
        lat: 52.5375, lng: 13.4218,
        price: "9–18 € / Frühstück",
        badges: ["Frühstücks-Etagère"],
      },
    ],
  },

  {
    id: "city-west",
    tag: "Tag-Idee · Nähe Hotel",
    title: "City West – Zoo, KaDeWe & Charlottenburg",
    summary: "Euer Viertel: Kaiser-Wilhelm-Gedächtniskirche, der Ku'damm zum Bummeln, das legendäre KaDeWe, der wunderbare Zoo und das prächtige Schloss Charlottenburg. Vieles direkt ab Hotel zu Fuß.",
    walkFromHotel: "Teils zu Fuß ab Hotel (KaDeWe ~10 Min.)",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Ged%C3%A4chtniskirche1.JPG/1280px-Ged%C3%A4chtniskirche1.JPG",
    transportNote: "Diese Zone liegt direkt vor eurer Haustür: KaDeWe (~10 Min.) sowie Gedächtniskirche und Ku'damm (~15 Min.) sind bequem zu Fuß erreichbar. Zum Zoo eine U-Bahn-Station (U2/U3 ab Wittenbergplatz) oder ~25 Min. Spaziergang. Schloss Charlottenburg liegt etwas weiter draußen – am besten mit U2 (bis Sophie-Charlotte-Platz) oder Bus M45.",
    route: { fromHotel: true, mode: "walking" },
    sights: [
      {
        name: "KaDeWe",
        mapsName: "KaDeWe, Tauentzienstraße, Berlin",
        desc: "Größtes Kaufhaus Kontinentaleuropas. Highlight: die Feinschmecker-Etage (6. OG) mit Schlemmer-Ständen. Komplett barrierefrei mit Aufzügen und Wickelräumen – nur ~10 Min. vom Hotel.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Berlin%2C_Schoeneberg%2C_Tauentzienstrasse_21-24%2C_KaDeWe.jpg/1280px-Berlin%2C_Schoeneberg%2C_Tauentzienstrasse_21-24%2C_KaDeWe.jpg",
        lat: 52.5017, lng: 13.3406,
        stroller: "yes",
        badges: ["Barrierefrei", "Wickelraum", "Feinschmecker-Etage"],
      },
      {
        name: "Kaiser-Wilhelm-Gedächtniskirche",
        mapsName: "Kaiser-Wilhelm-Gedächtniskirche, Berlin",
        desc: "Die im Krieg zerstörte Turmruine („Hohler Zahn\") als Mahnmal, daneben der moderne Neubau mit tiefblauen Glaswänden. Eintritt frei, ebenerdig zugänglich. Wahrzeichen der City West.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Ged%C3%A4chtniskirche1.JPG/1280px-Ged%C3%A4chtniskirche1.JPG",
        lat: 52.5048, lng: 13.3350,
        stroller: "yes",
        badges: ["Eintritt frei"],
      },
      {
        name: "Kurfürstendamm",
        mapsName: "Kurfürstendamm, Berlin",
        desc: "Berlins berühmteste Flaniermeile: 3,5 km Shopping, Cafés und Geschäfte vom Breitscheidplatz westwärts. Breite Gehwege, ideal zum entspannten Bummeln mit Kinderwagen.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Berlin_-_Kurf%C3%BCrstendamm_188-189.jpg/1280px-Berlin_-_Kurf%C3%BCrstendamm_188-189.jpg",
        lat: 52.5037, lng: 13.3270,
        stroller: "yes",
        badges: ["Shopping", "Breite Gehwege"],
      },
      {
        name: "Zoo Berlin",
        mapsName: "Zoo Berlin, Hardenbergplatz, Berlin",
        desc: "Artenreichster Zoo der Welt mit Pandas, mitten in der Stadt. Ebene, breite Wege, überall Spielplätze und Imbisse – einer der schönsten Familientage Berlins. Tickets vorab buchen.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Lentr%C3%A9e_du_Zoo_de_Berlin_%286081063158%29.jpg/1280px-Lentr%C3%A9e_du_Zoo_de_Berlin_%286081063158%29.jpg",
        lat: 52.5079, lng: 13.3375,
        stroller: "yes",
        badges: ["Top mit Kindern", "Pandas", "Tickets vorab"],
        ticketUrl: "https://www.zoo-berlin.de/en",
      },
      {
        name: "Schloss Charlottenburg",
        mapsName: "Schloss Charlottenburg, Berlin",
        desc: "Größtes Schloss Berlins mit prunkvollen Barockräumen und weitläufigem, kostenlosem Schlosspark – herrlich zum Spazieren mit Kinderwagen. Liegt etwas außerhalb: am besten mit U-Bahn/Bus.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Berlin_Charlottenburger_Schloss_Strassenseite.jpg/1280px-Berlin_Charlottenburger_Schloss_Strassenseite.jpg",
        lat: 52.5208, lng: 13.2956,
        stroller: "careful",
        badges: ["Park frei & top", "Innen Ticket", "U2 / Bus M45"],
        ticketUrl: "https://www.spsg.de/en/palaces-gardens/object/charlottenburg-palace-old-palace/",
        inRoute: false,
      },
    ],
    restaurants: [
      {
        name: "Schleusenkrug",
        mapsName: "Schleusenkrug, Berlin",
        desc: "Beliebter Biergarten an der Schleuse zwischen Zoo und Tiergarten. Entspannt, grün, mit Blick aufs Wasser – perfekte Pause nach dem Zoobesuch. Sehr familienfreundlich.",
        lat: 52.5095, lng: 13.3325,
        price: "9–17 € / Gericht",
        badges: ["Biergarten", "Nähe Zoo"],
      },
      {
        name: "KaDeWe – Feinschmecker-Etage",
        mapsName: "KaDeWe Feinschmeckeretage, Berlin",
        desc: "Die 6. Etage des KaDeWe: unzählige Stände von Sushi über Pasta bis Austern, dazu der gläserne Wintergarten. Riesige Auswahl, ideal wenn alle etwas anderes wollen.",
        lat: 52.5017, lng: 13.3406,
        price: "10–25 € / Gericht",
        badges: ["Riesige Auswahl", "Barrierefrei"],
      },
      {
        name: "Café im Literaturhaus (Wintergarten)",
        mapsName: "Café-Restaurant Wintergarten im Literaturhaus, Berlin",
        desc: "Elegantes Café in einer Gründerzeitvilla mit Gartenterrasse, eine ruhige Oase direkt neben dem Ku'damm. Schön für Kuchen und Kaffee abseits des Trubels.",
        lat: 52.5028, lng: 13.3270,
        price: "9–20 € / Gericht",
        badges: ["Ruhige Oase", "Gartenterrasse"],
      },
    ],
  },
];

/* ============================================================
   Google-Maps-Helfer (Handy-kompatibel)
   ============================================================ */

/* Direkt zur Place-Card eines Ortes – öffnet die Google-Maps-App */
function mapsPlaceUrl(item) {
  const q = encodeURIComponent(item.mapsName || `${item.name}, Berlin`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/* Hotel-Pin (Adresse) */
function mapsHotelUrl() {
  const q = encodeURIComponent(HOTEL.mapsName);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/* Route über alle Sehenswürdigkeiten einer Zone.
   - fromHotel: Route startet am Hotel, sonst an der 1. Sehenswürdigkeit
   - mode:      "walking" (zu Fuß) oder "transit" (Bahn/Tram)
   Nutzt Koordinaten als Wegpunkte – die Google-Maps-App berechnet
   Multi-Stop-Routen mit "lat,lng" zuverlässiger als mit Ortsnamen. */
function routeUrl(zone) {
  const cfg = zone.route || { fromHotel: false, mode: "walking" };
  const stops = zone.sights.filter((s) => s.inRoute !== false);
  if (!stops.length) return "#";

  const points = cfg.fromHotel
    ? [{ lat: HOTEL.lat, lng: HOTEL.lng }, ...stops]
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
    <span>${zone.restaurants.length}</span>&nbsp;Restaurants
    <br><span style="color:#51606f; font-weight:400;">${zone.walkFromHotel}</span>
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
    note.style.cssText = "background:#eef3fa;border:1px solid #c6d3e6;border-radius:12px;padding:0.8rem 1rem;font-size:0.9rem;color:#2f5277;margin:0 0 1.4rem;";
    note.innerHTML = `<strong>🚇 Anreise &amp; Verkehr:</strong> ${zone.transportNote}`;
    node.querySelector(".zone-body").prepend(note);
  }

  // Route über alle Sehenswürdigkeiten – KEINE Restaurants
  const routeBtn = node.querySelector(".route-btn");
  routeBtn.href = routeUrl(zone);

  // Button-Text & Hinweis je nach Verkehrsmittel
  const transit = (zone.route && zone.route.mode) === "transit";
  const fromHotel = zone.route && zone.route.fromHotel;
  const icon = routeBtn.querySelector("span:first-child");
  const label = routeBtn.querySelector("span:last-child");
  if (transit) {
    icon.textContent = "🚇";
    label.innerHTML = "Route mit Bahn&nbsp;&amp; Tram in Google&nbsp;Maps";
  } else {
    icon.textContent = "🚶";
    label.innerHTML = "Als Spaziergang in Google&nbsp;Maps";
  }
  const hint = node.querySelector(".route-hint");
  if (transit) {
    hint.textContent = "Verbindet die Stopps der Reihe nach mit U-/S-Bahn & Tram – Google schlägt die schnellste Verbindung vor.";
  } else if (fromHotel) {
    hint.textContent = "Startet am Hotel und läuft die Sehenswürdigkeiten der Reihe nach ab, alles zu Fuß.";
  } else {
    hint.textContent = "Läuft die Sehenswürdigkeiten der Reihe nach ab, alles zu Fuß.";
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

  document.getElementById("hotel-link").href = mapsHotelUrl();
}

document.addEventListener("DOMContentLoaded", init);
