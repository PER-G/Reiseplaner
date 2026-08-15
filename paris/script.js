/* ============================================================
   Reiseführer Paris · Daten & Rendering
   18.–21. August 2026 · Anreise mit dem Zug ab Tübingen
   ============================================================ */

/* Ankunfts-/Ausgangspunkt: Gare de l'Est.
   (Hotel ist noch nicht gebucht – Vorschläge stehen unten auf der Seite.) */
const BASIS = {
  name: "Gare de l'Est",
  address: "Place du 11 Novembre 1918, 75010 Paris",
  mapsName: "Gare de l'Est, Paris",
  lat: 48.8768,
  lng: 2.3590,
};

/* Stroller-/Treppenhinweise:
   - "yes"      = problemlos mit Kinderwagen (eben, Aufzüge, breite Wege)
   - "careful"  = Kies, Kopfsteinpflaster, einzelne Stufen oder Steigung
   - "no"       = viele Treppen / Wendeltreppe → lieber Trage           */
const STROLLER = {
  yes:     { label: "Kinderwagen ok",   emoji: "🛒", cls: "stroller-yes" },
  careful: { label: "Teils mühsam",     emoji: "⚠",  cls: "stroller-careful" },
  no:      { label: "Lieber Trage",     emoji: "🤱", cls: "stroller-no" },
};

/* Generisches SVG-Bild für Restaurants (keine Wiki-Quelle) */
const FOOD_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#efe3e9"/>
        <stop offset="1" stop-color="#cbb0c1"/>
      </linearGradient>
    </defs>
    <rect width="320" height="200" fill="url(#g)"/>
    <g transform="translate(160 100)" fill="none" stroke="#5b2a4d" stroke-width="3" stroke-linecap="round">
      <circle r="42" fill="#fdf8fb"/>
      <circle r="30" stroke-width="2"/>
      <path d="M -55 0 L -42 0 M -50 -10 L -50 10 M -47 -10 L -47 10 M -44 -10 L -44 10"/>
      <path d="M 55 0 L 42 0 M 49 -10 Q 60 -5 60 10"/>
    </g>
    <text x="160" y="170" text-anchor="middle" font-family="Cormorant Garamond, serif" font-style="italic" font-size="20" fill="#5b2a4d">Paris · à table</text>
  </svg>`);

/* ============================================================
   TAGE / GEBIETE

   Felder pro Location:
   - name, mapsName, desc, image, lat, lng
   - stroller   "yes" | "careful" | "no"
   - badges     Array von Hinweis-Tags (enthält "Glutenfrei" → grün)
   - ticketUrl  Direktlink zur offiziellen Ticket-Seite
   - inRoute    false = nicht in die Auto-Route aufnehmen
   - price      Nur bei Restaurants

   Pro Zone:
   - route.fromBase  true = Route startet an der Gare de l'Est
   - route.mode      "walking" | "transit"
   ============================================================ */
const ZONES = [
  {
    id: "ankunft",
    tag: "Di 18.08. · Ankunft",
    title: "Erster Abend rund um die Gare de l'Est",
    summary: "Ankunft 17:16 Uhr. Koffer ins Hotel, dann ein ruhiger erster Abend: Canal Saint-Martin um die Ecke, Panoramablick von den Galeries Lafayette, Opéra Garnier.",
    walkFromHotel: "alles zu Fuß bzw. 2 Metro-Stationen",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Paris_Canal_St-Martin_%C3%A9cluses_R%C3%A9collets_2013.jpg/1280px-Paris_Canal_St-Martin_%C3%A9cluses_R%C3%A9collets_2013.jpg",
    transportNote: "Nach 4,5 Std. Zugfahrt bewusst klein halten. Der Canal Saint-Martin liegt nur ~10 Min. zu Fuß südlich der Gare de l'Est – ebener Uferweg, ideal zum Ankommen. Wer noch Energie hat: Metro 7 (Richtung Opéra) zu den Galeries Lafayette, deren Dachterrasse kostenlos ist und bis ca. 20 Uhr offen hat.",
    route: { fromBase: true, mode: "walking" },
    sights: [
      {
        name: "Canal Saint-Martin",
        mapsName: "Canal Saint-Martin, Paris",
        desc: "Romantischer Kanal mit gusseisernen Fußgängerbrücken, Schleusen und Platanen – Pariser Feierabend-Stimmung. Ebener Uferweg, nur 10 Min. von der Gare de l'Est. Perfekt zum Ankommen.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Paris_Canal_St-Martin_%C3%A9cluses_R%C3%A9collets_2013.jpg/1280px-Paris_Canal_St-Martin_%C3%A9cluses_R%C3%A9collets_2013.jpg",
        lat: 48.8709, lng: 2.3661,
        stroller: "yes",
        badges: ["10 Min. vom Bahnhof", "Kostenlos"],
      },
      {
        name: "Galeries Lafayette – Kuppel & Dachterrasse",
        mapsName: "Galeries Lafayette Haussmann, Paris",
        desc: "Die Jugendstil-Glaskuppel von 1912 ist ein Erlebnis für sich, und die Dachterrasse bietet einen kostenlosen Rundblick über Opéra, Eiffelturm und Sacré-Cœur. Aufzüge überall.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Cupola_of_Galeries_Lafayette_Haussmann_Paris_003.jpg/1280px-Cupola_of_Galeries_Lafayette_Haussmann_Paris_003.jpg",
        lat: 48.8738, lng: 2.3320,
        stroller: "yes",
        badges: ["Dachterrasse kostenlos", "Aufzüge", "Wickelraum"],
      },
      {
        name: "Palais Garnier (Opéra)",
        mapsName: "Palais Garnier, Paris",
        desc: "Prunkvollstes Opernhaus der Welt, direkt gegenüber den Galeries Lafayette. Die Fassade abends angestrahlt ist ein Foto wert – Innenbesichtigung braucht ein eigenes Ticket.",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Paris_Opera_full_frontal_architecture%2C_May_2009.jpg",
        lat: 48.8720, lng: 2.3316,
        stroller: "yes",
        badges: ["Außen jederzeit", "Innen mit Ticket"],
        ticketUrl: "https://www.operadeparis.fr/en/visits/palais-garnier",
      },
    ],
    restaurants: [
      {
        name: "Chambelland",
        mapsName: "Boulangerie Chambelland, rue Ternaux, Paris",
        desc: "100 % glutenfreie Bäckerei (eigene Reismühle!) – Sauerteigbrote, Kuchen und kleine Mittagsgerichte. Da nichts mit Gluten im Haus ist, besteht kein Kontaminationsrisiko.",
        lat: 48.8645, lng: 2.3782,
        price: "5–14 € / Snack",
        badges: ["Glutenfrei", "100 % GF-Betrieb", "Nur tagsüber"],
      },
      {
        name: "Holybelly 5",
        mapsName: "Holybelly 5, rue Lucien Sampaix, Paris",
        desc: "Beliebtes Frühstücks- und Brunch-Lokal am Canal Saint-Martin: Pancakes, Eier, Bowls, sehr guter Kaffee. Entspannt und familientauglich – auch morgens vor der Abfahrt gut.",
        lat: 48.8715, lng: 2.3616,
        price: "10–18 € / Gericht",
        badges: ["Gesund", "Frühstück & Brunch"],
      },
      {
        name: "Chez Prune",
        mapsName: "Chez Prune, Paris",
        desc: "Klassisches Bistro-Café direkt am Canal Saint-Martin mit Terrasse zum Wasser. Unkompliziert, typisch Pariser Nachbarschaft – ideal für den ersten Abend.",
        lat: 48.8703, lng: 2.3663,
        price: "12–20 € / Gericht",
        badges: ["Terrasse am Kanal"],
      },
    ],
  },

  {
    id: "louvre",
    tag: "Mi 19.08. · Tag 1",
    title: "Louvre & die Prachtachse",
    summary: "Der große Tag: morgens in den Louvre, dann immer geradeaus durch die Tuilerien über die Place de la Concorde und die Champs-Élysées bis zum Arc de Triomphe.",
    walkFromHotel: "Metro zum Louvre, danach ~4 km schnurgerade zu Fuß",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Louvre_Museum_Wikimedia_Commons.jpg/1280px-Louvre_Museum_Wikimedia_Commons.jpg",
    transportNote: "Metro 7 ab Gare de l'Est direkt bis Palais Royal–Musée du Louvre (~15 Min., leider mit Treppen – notfalls Bus 38/39 oder Taxi). Ab dem Louvre ist alles eine einzige gerade Achse („Voie Triomphale“) und komplett zu Fuß machbar: Louvre → Tuilerien → Concorde → Champs-Élysées → Arc de Triomphe, rund 4 km eben. Wer abkürzen will: Bus 73 fährt die Champs-Élysées hoch (mit Rampe, kinderwagenfreundlich).",
    route: { fromBase: false, mode: "walking" },
    sights: [
      {
        name: "Louvre",
        mapsName: "Musée du Louvre, Paris",
        desc: "Das größte Museum der Welt: Mona Lisa, Venus von Milo, Nike von Samothrake. Im August ist eine Zeitfenster-Reservierung Pflicht. Mit Baby: Kinderwagen sind erlaubt, es gibt Aufzüge – aber plant lieber 2–3 Stunden statt einen ganzen Tag.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Louvre_Museum_Wikimedia_Commons.jpg/1280px-Louvre_Museum_Wikimedia_Commons.jpg",
        lat: 48.8606, lng: 2.3376,
        stroller: "yes",
        badges: ["Reservierung PFLICHT (August)", "Dienstags geschlossen", "Mi bis 21 Uhr", "Aufzüge vorhanden"],
        ticketUrl: "https://ticket.louvre.fr/en",
      },
      {
        name: "Jardin des Tuileries",
        mapsName: "Jardin des Tuileries, Paris",
        desc: "Barocker Garten direkt am Louvre mit Wasserbecken, Liegestühlen, Karussell und einem Spielplatz. Im August steht hier oft ein Rummel. Ideale Pause nach dem Museum – aber Kiesboden.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Crowd_in_the_Jardin_des_Tuileries%2C_Paris_July_2014.jpg/1280px-Crowd_in_the_Jardin_des_Tuileries%2C_Paris_July_2014.jpg",
        lat: 48.8635, lng: 2.3265,
        stroller: "careful",
        badges: ["Kies – schiebt schwer", "Spielplatz & Karussell", "Kostenlos"],
      },
      {
        name: "Place de la Concorde",
        mapsName: "Place de la Concorde, Paris",
        desc: "Größter Platz von Paris mit dem 3.000 Jahre alten Obelisken von Luxor und zwei Prunkbrunnen. Hier stand einst die Guillotine. Weit, eben – aber viel Verkehr ringsum.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Place_de_la_Concorde_from_the_Eiffel_Tower%2C_Paris_April_2011.jpg/1280px-Place_de_la_Concorde_from_the_Eiffel_Tower%2C_Paris_April_2011.jpg",
        lat: 48.8656, lng: 2.3212,
        stroller: "yes",
        badges: ["Kostenlos", "Viel Verkehr – Kind festhalten"],
      },
      {
        name: "Champs-Élysées",
        mapsName: "Avenue des Champs-Élysées, Paris",
        desc: "Die berühmteste Prachtstraße der Welt, 1,9 km bergauf zum Arc de Triomphe. Breite, ebene Gehwege, Cafés und Läden. Wer nicht laufen mag: Bus 73 fährt parallel.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Avenue_des_Champs-%C3%89lys%C3%A9es_July_24%2C_2009_N1.jpg/1280px-Avenue_des_Champs-%C3%89lys%C3%A9es_July_24%2C_2009_N1.jpg",
        lat: 48.8698, lng: 2.3078,
        stroller: "yes",
        badges: ["Breite Gehwege", "Bus 73 als Abkürzung"],
      },
      {
        name: "Arc de Triomphe",
        mapsName: "Arc de Triomphe, Paris",
        desc: "Napoleons Triumphbogen über dem Grab des unbekannten Soldaten. Zugang nur durch die Unterführung (nie über den Kreisverkehr!). Nach oben führen 284 Stufen – ein Aufzug existiert, ist aber nur für Menschen mit Behinderung.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/1280px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg",
        lat: 48.8738, lng: 2.2950,
        stroller: "no",
        badges: ["Oben: 284 Stufen → Trage", "Unterführung nutzen!", "Unter 18 frei"],
        ticketUrl: "https://www.paris-arc-de-triomphe.fr/en/",
      },
    ],
    restaurants: [
      {
        name: "Café Marly",
        mapsName: "Café Marly, Paris",
        desc: "Unter den Arkaden des Louvre mit direktem Blick auf die Glaspyramide. Preislich gehoben, aber die Lage ist unschlagbar – auch nur für einen Kaffee nach dem Museum.",
        lat: 48.8617, lng: 2.3355,
        price: "18–30 € / Gericht",
        badges: ["Blick auf die Pyramide", "Reservieren"],
      },
      {
        name: "Cojean (Madeleine)",
        mapsName: "Cojean Madeleine, Paris",
        desc: "Pariser Kette für frische, leichte Küche: Suppen, Salate, Bowls, gepresste Säfte. Allergene sind ausgezeichnet, es gibt glutenfreie Gerichte. Schnell und gesund zwischendurch.",
        lat: 48.8703, lng: 2.3266,
        price: "9–15 € / Gericht",
        badges: ["Gesund", "Bowls & Säfte", "Glutenfrei möglich"],
      },
      {
        name: "Angelina",
        mapsName: "Angelina Rivoli, Paris",
        desc: "Traditionshaus von 1903 an der Rue de Rivoli, berühmt für den dickflüssigen „Chocolat l'Africain“ und den Mont-Blanc-Kuchen. Perfekt zwischen Louvre und Tuilerien.",
        lat: 48.8655, lng: 2.3283,
        price: "9–20 € / Gedeck",
        badges: ["Institution seit 1903", "Oft Schlange"],
      },
    ],
  },

  {
    id: "seine",
    tag: "Do 20.08. · Tag 2",
    title: "Notre-Dame, Quartier Latin & Eiffelturm",
    summary: "Von der Île de la Cité mit Notre-Dame und Sainte-Chapelle über den Jardin du Luxembourg bis zum Eiffelturm – und zum Sonnenuntergang auf den Trocadéro.",
    walkFromHotel: "Metro/RER, dann zwei fußläufige Cluster",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/1280px-Tour_Eiffel_Wikimedia_Commons.jpg",
    transportNote: "Früh starten! Notre-Dame und Sainte-Chapelle liegen auf der Île de la Cité nebeneinander, der Jardin du Luxembourg ist 20 Min. zu Fuß südlich. Zum Eiffelturm dann mit Bus 82 oder RER C (RER-Stationen haben – anders als die Metro – überall Aufzüge). Trocadéro liegt gegenüber dem Eiffelturm über die Seine: der beste Blick auf den Turm. Sonnenuntergang am 20.08. ca. 20:55 Uhr; der Turm funkelt zu jeder vollen Stunde 5 Minuten lang, das erste Mal aber erst gegen 22 Uhr – mit Baby wohl zu spät.",
    route: { fromBase: false, mode: "transit" },
    sights: [
      {
        name: "Notre-Dame de Paris",
        mapsName: "Cathédrale Notre-Dame de Paris",
        desc: "Seit Dezember 2024 wieder geöffnet und innen strahlend hell restauriert. Der Eintritt ist kostenlos; ein Gratis-Zeitfenster lässt sich 2–3 Tage vorher online reservieren und spart die Schlange. Ebenerdig zugänglich.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Notre-Dame_de_Paris%2C_4_October_2017.jpg/1280px-Notre-Dame_de_Paris%2C_4_October_2017.jpg",
        lat: 48.8530, lng: 2.3499,
        stroller: "yes",
        badges: ["Eintritt frei", "Zeitfenster 2–3 Tage vorher", "Früh = leer"],
        ticketUrl: "https://www.notredamedeparis.fr/en/",
      },
      {
        name: "Sainte-Chapelle",
        mapsName: "Sainte-Chapelle, Paris",
        desc: "Gotische Palastkapelle mit 15 Meter hohen Glasfenstern – bei Sonne der schönste Raum von Paris. Wichtig: In die Oberkapelle führt nur eine enge Wendeltreppe, dort ist die Trage Pflicht.",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/70/Sainte_Chapelle_-_Upper_level_1.jpg",
        lat: 48.8554, lng: 2.3450,
        stroller: "no",
        badges: ["Enge Wendeltreppe → Trage", "Sicherheitskontrolle", "Unter 18 frei"],
        ticketUrl: "https://www.sainte-chapelle.fr/en/",
      },
      {
        name: "Jardin du Luxembourg",
        mapsName: "Jardin du Luxembourg, Paris",
        desc: "Schönster Park der Stadt: Segelboote auf dem großen Becken, Ponys, ein Marionettentheater und einer der besten Spielplätze von Paris. Ideale lange Mittagspause mit Kind.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/LuxembourgMontparnasse.JPG/1280px-LuxembourgMontparnasse.JPG",
        lat: 48.8462, lng: 2.3372,
        stroller: "careful",
        badges: ["Top-Spielplatz", "Segelboote", "Teils Kies"],
      },
      {
        name: "Eiffelturm",
        mapsName: "Tour Eiffel, Paris",
        desc: "Das Wahrzeichen schlechthin. Aufzüge fahren bis zur 2. Etage – dorthin dürft ihr den Kinderwagen mitnehmen. Zur Spitze geht es nur ohne Wagen weiter. Tickets unbedingt vorab buchen.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/1280px-Tour_Eiffel_Wikimedia_Commons.jpg",
        lat: 48.8584, lng: 2.2945,
        stroller: "careful",
        badges: ["Tickets vorab!", "Aufzug bis 2. Etage", "Spitze ohne Wagen", "Unter 4 frei"],
        ticketUrl: "https://www.toureiffel.paris/en/rates-opening-times",
      },
      {
        name: "Champ de Mars",
        mapsName: "Champ de Mars, Paris",
        desc: "Die große Rasenfläche zu Füßen des Eiffelturms – hier picknicken die Pariser. Ebene Wege, viel Platz für eine Decke und Spielplätze am Rand. Der entspannteste Turm-Blick.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/MG-Paris-Champ_de_Mars.jpg/1280px-MG-Paris-Champ_de_Mars.jpg",
        lat: 48.8556, lng: 2.2986,
        stroller: "yes",
        badges: ["Picknick", "Spielplätze", "Kostenlos"],
      },
      {
        name: "Trocadéro (Place du Trocadéro)",
        mapsName: "Place du Trocadéro, Paris",
        desc: "Die Terrasse des Palais de Chaillot bietet den berühmtesten Blick auf den Eiffelturm – besonders im Abendlicht. Eben und barrierefrei erreichbar, kostenlos.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Trocadero_Paris.jpg/1280px-Trocadero_Paris.jpg",
        lat: 48.8619, lng: 2.2886,
        stroller: "yes",
        badges: ["Bester Turm-Blick", "Kostenlos", "Auf Taschendiebe achten"],
      },
    ],
    restaurants: [
      {
        name: "NoGlu",
        mapsName: "Noglu, rue de Grenelle, Paris",
        desc: "Komplett glutenfreies Restaurant und Bäckerei in der Rue de Grenelle (7. Arrondissement) – Brot, Tartes, warme Gerichte, Kuchen. Ein 100-%-GF-Betrieb, also ohne Kontaminationsrisiko. Auf dem Weg zum Eiffelturm.",
        lat: 48.8558, lng: 2.3255,
        price: "10–20 € / Gericht",
        badges: ["Glutenfrei", "100 % GF-Betrieb", "Mo–Sa tagsüber"],
      },
      {
        name: "Marché Saxe-Breteuil",
        mapsName: "Marché Saxe-Breteuil, Paris",
        desc: "Einer der schönsten Wochenmärkte der Stadt, auf der Mittelallee mit Blick auf den Eiffelturm: Obst, Käse, Oliven, Rotisserie-Hähnchen. Donnerstagvormittag ist Markttag – perfekt für ein Picknick.",
        lat: 48.8489, lng: 2.3105,
        price: "5–15 € / Picknick",
        badges: ["Gesund & frisch", "Do vormittags", "Zeiten vorher prüfen"],
      },
      {
        name: "Les Deux Magots",
        mapsName: "Les Deux Magots, Paris",
        desc: "Legendäres Literatencafé in Saint-Germain, einst Stammlokal von Sartre und de Beauvoir. Teuer, aber ein Stück Pariser Geschichte – gut auf dem Weg vom Luxembourg zur Seine.",
        lat: 48.8540, lng: 2.3332,
        price: "8–25 € / Gedeck",
        badges: ["Institution", "Terrasse"],
      },
    ],
  },

  {
    id: "montmartre",
    tag: "Fr 21.08. · Vormittag",
    title: "Montmartre & Rückfahrt",
    summary: "Letzter Vormittag auf dem Künstlerhügel: Sacré-Cœur mit dem großen Blick über Paris, Place du Tertre – und pünktlich zurück zur Gare de l'Est.",
    walkFromHotel: "Metro ~15 Min. ab Gare de l'Est",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Sacre-coeur-paris.jpg",
    transportNote: "Wichtig: Zug ab 12:52 Uhr – also spätestens 11:45 Uhr zurück Richtung Bahnhof. Montmartre liegt günstig: Metro 4 ab Gare de l'Est bis Barbès, oder Metro 2 bis Anvers (~15 Min.). Von Anvers fährt die Standseilbahn (Funiculaire) mit einem normalen Metro-Ticket hoch – das erspart euch 222 Stufen. Achtung: Der Kinderwagen muss in der Funiculaire zusammengeklappt werden, und Montmartre ist insgesamt steil und kopfsteingepflastert.",
    route: { fromBase: true, mode: "transit" },
    sights: [
      {
        name: "Sacré-Cœur",
        mapsName: "Basilique du Sacré-Cœur, Paris",
        desc: "Weiße Basilika auf dem höchsten Hügel der Stadt. Der Eintritt ist frei, und die Treppe davor ist einer der schönsten Aussichtspunkte über ganz Paris. Innen ebenerdig zugänglich.",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Sacre-coeur-paris.jpg",
        lat: 48.8867, lng: 2.3431,
        stroller: "careful",
        badges: ["Eintritt frei", "Funiculaire statt 222 Stufen", "Kuppel: nur Treppe"],
        ticketUrl: "https://www.sacre-coeur-montmartre.com/english/",
      },
      {
        name: "Place du Tertre",
        mapsName: "Place du Tertre, Paris",
        desc: "Der alte Dorfplatz von Montmartre, heute voller Porträtmaler und Cafés – hier arbeiteten einst Picasso und Utrillo. Sehr touristisch, aber charmant. Kopfsteinpflaster.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Place_du_Tertre%2C_Paris_2010.jpg/1280px-Place_du_Tertre%2C_Paris_2010.jpg",
        lat: 48.8865, lng: 2.3407,
        stroller: "careful",
        badges: ["Kopfsteinpflaster", "Preise vorher fragen"],
      },
    ],
    restaurants: [
      {
        name: "Crêperie / Galettes de sarrasin",
        mapsName: "crêperie Montmartre Paris",
        desc: "Bretonische Galettes werden aus Buchweizenmehl gebacken und sind damit von Natur aus glutenfrei – die herzhafte, französische GF-Option schlechthin. In Montmartre gibt es mehrere Crêperien; im Lokal kurz nach Kontamination fragen.",
        lat: 48.8860, lng: 2.3390,
        price: "9–15 € / Galette",
        badges: ["Glutenfrei möglich", "Buchweizen", "Nach Kontamination fragen"],
      },
      {
        name: "Le Grenier à Pain (Montmartre)",
        mapsName: "Le Grenier à Pain Abbesses, Paris",
        desc: "Preisgekrönte Bäckerei am Fuß von Montmartre – mehrfach für die beste Baguette von Paris ausgezeichnet. Ideal, um Proviant für die Zugfahrt einzupacken.",
        lat: 48.8845, lng: 2.3380,
        price: "2–8 € / Stück",
        badges: ["Proviant für den Zug", "Preisgekrönt"],
      },
      {
        name: "Café des Deux Moulins",
        mapsName: "Café des Deux Moulins, Paris",
        desc: "Das Café aus dem Film „Die fabelhafte Welt der Amélie“, unverändert an der Rue Lepic. Einfache Bistroküche, nette Kulisse für ein letztes Frühstück.",
        lat: 48.8845, lng: 2.3350,
        price: "10–18 € / Gericht",
        badges: ["Amélie-Kulisse"],
      },
    ],
  },

  {
    id: "flexibel",
    tag: "Flexibel · Reserve",
    title: "Marais, Orsay & Schlechtwetter-Plan",
    summary: "Für den Fall, dass etwas ausfällt, es regnet oder der Louvre nicht klappt: der schönste Platz von Paris, die Impressionisten im Orsay und die älteste Brücke der Stadt.",
    walkFromHotel: "Metro, dann jeweils fußläufig",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Place_des_Vosges_Paris.jpg/1280px-Place_des_Vosges_Paris.jpg",
    transportNote: "Diese Orte sind bewusst als Reserve gedacht – ihr könnt sie beliebig in Tag 1 oder 2 einbauen. Das Musée d'Orsay ist die beste Alternative, falls es im Louvre keine Tickets mehr gibt: kleiner, übersichtlicher, mit Baby deutlich entspannter – und montags geschlossen statt dienstags.",
    route: { fromBase: false, mode: "walking" },
    sights: [
      {
        name: "Musée d'Orsay",
        mapsName: "Musée d'Orsay, Paris",
        desc: "Impressionisten-Sammlung der Superlative (Monet, Renoir, Van Gogh) in einem prachtvollen alten Bahnhof. Deutlich kleiner als der Louvre und dadurch mit Baby entspannter. Dienstag bis Sonntag geöffnet, montags zu.",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Orsay_1994.jpg",
        lat: 48.8600, lng: 2.3266,
        stroller: "yes",
        badges: ["Louvre-Alternative", "Montags geschlossen", "Unter 18 frei", "Aufzüge"],
        ticketUrl: "https://www.musee-orsay.fr/en/visit/admission-and-opening-times",
      },
      {
        name: "Pont Neuf",
        mapsName: "Pont Neuf, Paris",
        desc: "Trotz des Namens („Neue Brücke“) die älteste erhaltene Brücke von Paris, von 1607. Von hier gibt es einen schönen Seine-Blick, und der kleine Park an der Inselspitze lädt zur Pause.",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Pont_Neuf_Paris.jpg",
        lat: 48.8566, lng: 2.3412,
        stroller: "yes",
        badges: ["Kostenlos", "Seine-Blick"],
      },
      {
        name: "Place des Vosges",
        mapsName: "Place des Vosges, Paris",
        desc: "Ältester geplanter Platz der Stadt (1612) im Marais: rote Backsteinarkaden, Rasenflächen, Sandkasten und Schatten. Ein ruhiger, sehr familienfreundlicher Ort mitten in der Stadt.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Place_des_Vosges_Paris.jpg/1280px-Place_des_Vosges_Paris.jpg",
        lat: 48.8556, lng: 2.3655,
        stroller: "yes",
        badges: ["Kostenlos", "Schatten & Sandkasten"],
      },
    ],
    restaurants: [
      {
        name: "Wild & The Moon (Marais)",
        mapsName: "Wild and the Moon Marais, Paris",
        desc: "Pflanzliche Küche aus Bio-Zutaten: Bowls, Suppen, Kaltpress-Säfte. Die Karte ist überwiegend glutenfrei und klar gekennzeichnet – frisch und leicht mitten im Marais.",
        lat: 48.8630, lng: 2.3640,
        price: "10–17 € / Gericht",
        badges: ["Gesund", "Vegan", "Glutenfrei möglich"],
      },
      {
        name: "Marché des Enfants Rouges",
        mapsName: "Marché des Enfants Rouges, Paris",
        desc: "Ältester überdachter Markt von Paris (1615) mit Ständen aus aller Welt – marokkanisch, japanisch, italienisch, libanesisch. Überdacht und damit ideal bei Regen.",
        lat: 48.8632, lng: 2.3627,
        price: "9–18 € / Gericht",
        badges: ["Überdacht", "Street Food", "Viel Auswahl"],
      },
      {
        name: "L'As du Fallafel",
        mapsName: "L'As du Fallafel, Paris",
        desc: "Kult-Falafel in der Rue des Rosiers, oft mit Schlange – aber schnell und günstig. Gutes vegetarisches Street Food für zwischendurch (Fladenbrot enthält allerdings Gluten).",
        lat: 48.8573, lng: 2.3593,
        price: "8–12 € / Portion",
        badges: ["Vegetarisch", "Freitags früh schließen"],
      },
    ],
  },
];

/* ============================================================
   Hotel-Vorschläge (noch nicht gebucht)
   ============================================================ */
const HOTELS = [
  {
    name: "NH Paris Gare de l'Est",
    area: "5 Min. zu Fuß zum Bahnhof",
    desc: "Solides 4-Sterne-Haus direkt am Ankunftsbahnhof. Klimatisiert; Babybetten werden laut Hotel kostenlos gestellt. Kürzeste Wege mit Gepäck und Kinderwagen.",
    mapsName: "NH Paris Gare de l'Est",
    badges: ["Klimaanlage", "Babybett gratis", "Bahnhofsnähe"],
  },
  {
    name: "ibis Styles Paris Gare de l'Est TGV",
    area: "3 Min. zu Fuß zum Bahnhof",
    desc: "Preiswerter und unkompliziert, mit Frühstücksbuffet und familienfreundlichen Zimmern. Klimatisiert – Babybett bei der Buchung mit angeben.",
    mapsName: "ibis Styles Paris Gare de l'Est TGV",
    badges: ["Klimaanlage", "Familienzimmer", "Günstig"],
  },
  {
    name: "Timhotel Paris Gare de l'Est",
    area: "4 Min. zu Fuß zum Bahnhof",
    desc: "Kleines Haus mit Klimatisierung in allen Zimmern und einigen Verbindungszimmern für Familien. Gute Basis, wenn ihr zentral und günstig schlafen wollt.",
    mapsName: "Timhotel Paris Gare de l'Est",
    badges: ["Klimaanlage", "Verbindungszimmer"],
  },
];

/* ============================================================
   Google-Maps-Helfer (Handy-kompatibel)
   ============================================================ */

/* Direkt zur Place-Card eines Ortes – öffnet die Google-Maps-App */
function mapsPlaceUrl(item) {
  const q = encodeURIComponent(item.mapsName || `${item.name}, Paris`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/* Pin für die Gare de l'Est */
function mapsBaseUrl() {
  const q = encodeURIComponent(BASIS.mapsName);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/* Route über alle Sehenswürdigkeiten eines Tages.
   - fromBase: Route startet an der Gare de l'Est
   - mode:     "walking" (zu Fuß) oder "transit" (Metro/Bus/RER)
   Koordinaten als Wegpunkte – die Google-Maps-App berechnet
   Multi-Stop-Routen mit "lat,lng" zuverlässiger als mit Ortsnamen. */
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
    // Glutenfrei-Hinweise grün hervorheben
    tag.className = /glutenfrei|100 % GF/i.test(b) ? "badge gf" : "badge tip";
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
    <span>${zone.restaurants.length}</span>&nbsp;Essen
    <br><span style="color:#63505b; font-weight:400;">${zone.walkFromHotel}</span>
  `;

  const sightsEl = node.querySelector(".cards.sights");
  zone.sights.forEach((s) => sightsEl.appendChild(renderCard(s, "sight")));

  const restEl = node.querySelector(".cards.restaurants");
  zone.restaurants.forEach((r) => restEl.appendChild(renderCard(r, "restaurant")));

  // Essen standardmäßig eingeklappt – eigener Toggle
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
    note.style.cssText = "background:#f7eef4;border:1px solid #dfc7d7;border-radius:12px;padding:0.8rem 1rem;font-size:0.9rem;color:#5b2a4d;margin:0 0 1.4rem;";
    note.innerHTML = `<strong>🚇 Anreise &amp; Verkehr:</strong> ${zone.transportNote}`;
    node.querySelector(".zone-body").prepend(note);
  }

  // Route über alle Sehenswürdigkeiten – KEINE Restaurants
  const routeBtn = node.querySelector(".route-btn");
  routeBtn.href = routeUrl(zone);

  const transit = (zone.route && zone.route.mode) === "transit";
  const fromBase = zone.route && zone.route.fromBase;
  const icon = routeBtn.querySelector("span:first-child");
  const label = routeBtn.querySelector("span:last-child");
  if (transit) {
    icon.textContent = "🚇";
    label.innerHTML = "Route mit Metro&nbsp;&amp; Bus in Google&nbsp;Maps";
  } else {
    icon.textContent = "🚶";
    label.innerHTML = "Als Spaziergang in Google&nbsp;Maps";
  }
  const hint = node.querySelector(".route-hint");
  if (transit && fromBase) {
    hint.textContent = "Startet an der Gare de l'Est und verbindet die Stopps mit Metro, Bus & RER.";
  } else if (transit) {
    hint.textContent = "Verbindet die Stopps der Reihe nach mit Metro, Bus & RER – Google schlägt die schnellste Verbindung vor.";
  } else if (fromBase) {
    hint.textContent = "Startet an der Gare de l'Est und läuft die Stationen der Reihe nach ab, alles zu Fuß.";
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

function renderHotels() {
  const root = document.getElementById("hotel-grid");
  if (!root) return;
  HOTELS.forEach((h) => {
    const el = document.createElement("article");
    el.className = "hotel-item";
    const badges = (h.badges || [])
      .map((b) => `<span class="badge tip">${b}</span>`)
      .join("");
    el.innerHTML = `
      <h3>${h.name}</h3>
      <div class="h-area">${h.area}</div>
      <p>${h.desc}</p>
      <div class="card-badges">${badges}</div>
      <a class="card-link" target="_blank" rel="noopener"
         href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.mapsName)}">
        <span>📍</span><span>In Google&nbsp;Maps ansehen</span>
      </a>
    `;
    root.appendChild(el);
  });
}

function init() {
  const root = document.getElementById("zones");
  ZONES.forEach((z) => root.appendChild(renderZone(z)));
  renderHotels();
  document.getElementById("hotel-link").href = mapsBaseUrl();
}

document.addEventListener("DOMContentLoaded", init);
