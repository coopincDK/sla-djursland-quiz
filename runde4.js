// Runde 4 — Djursland Ekspert (30 spørgsmål, v2)
const runde4 = [
  {
    question: "Hvad er den officielle betegnelse for vejen der forbinder Randers med Grenaa?",
    answers: ["Rute 16", "Rute 15", "Rute 21", "Rute 11"],
    correct: 1,
    explanation: "Rute 15 forbinder Randers med Grenaa tværs over Djursland."
  },
  {
    question: "Hvilken by er den største på Djursland?",
    answers: ["Ebeltoft", "Rønde", "Grenaa", "Auning"],
    correct: 2,
    explanation: "Grenaa er den største by på Djursland og fungerer som regionalt centrum."
  },
  {
    question: "Hvad hedder nationalparken på Djursland?",
    answers: ["Djursland Naturpark", "Mols Bjerge Nationalpark", "Kattegat Nationalpark", "Norddjurs Naturpark"],
    correct: 1,
    explanation: "Mols Bjerge Nationalpark er Danmarks mindste nationalpark og ligger på Djursland."
  },
  {
    question: "Hvilke to kommuner udgør Djursland?",
    answers: ["Randers og Syddjurs", "Norddjurs og Syddjurs", "Grenaa og Ebeltoft", "Norddjurs og Randers"],
    correct: 1,
    explanation: "Djursland består af Norddjurs Kommune og Syddjurs Kommune."
  },
  {
    question: "Hvad er Grenaa Havn primært i dag?",
    answers: ["Lystbådehavn", "Militærhavn", "Erhvervs- og færgehavn", "Ren fiskerihavn"],
    correct: 2,
    explanation: "Grenaa Havn er en aktiv erhvervs- og færgehavn med bl.a. færgeforbindelse til Sverige."
  },
  {
    question: "Hvilken færgerute går fra Grenaa?",
    answers: ["Grenaa–Frederikshavn", "Grenaa–Göteborg", "Grenaa–Varberg", "Grenaa–Oslo"],
    correct: 2,
    explanation: "Stena Line driver ruten Grenaa–Varberg i Sverige."
  },
  {
    question: "Hvor ligger Djurs Sommerland?",
    answers: ["Ved Ebeltoft", "Ved Grenaa Strand", "Ved Nimtofte", "Ved Auning"],
    correct: 2,
    explanation: "Djurs Sommerland ligger ved Nimtofte og er en af Danmarks største forlystelsesparker."
  },
  {
    question: "Hvornår fik Norddjurs Kommune sin nuværende form?",
    answers: ["1970", "1998", "2007", "2013"],
    correct: 2,
    explanation: "Norddjurs Kommune fik sin nuværende form ved kommunalreformen i 2007."
  },
  {
    question: "Hvad er Bønnerup primært kendt for?",
    answers: ["Sommerhusområde", "Kystfiskerihavn", "Vindmøllepark", "Handelsby"],
    correct: 1,
    explanation: "Bønnerup er en lille kystfiskerihavn på Djurslands nordkyst."
  },
  {
    question: "Hvilken å løber ud i Kattegat ved Grenaa?",
    answers: ["Randers Fjord", "Alling Å", "Grenaa Å", "Djurs Å"],
    correct: 2,
    explanation: "Grenaa Å løber gennem byen og ud i Kattegat ved Grenaa."
  },
  {
    question: "Hvad er Ebeltoft særligt berømt for?",
    answers: ["Stort industriområde", "Moderne arkitektur", "Middelalderlig gågade og Fregatten Jylland", "Stort universitet"],
    correct: 2,
    explanation: "Ebeltoft er kendt for sin charmerende middelalderlige gågade og det historiske skib Fregatten Jylland."
  },
  {
    question: "Hvad er Fregatten Jylland?",
    answers: ["En aktiv krigsfregat", "Verdens længste bevarede træskib", "En turistbåd til Sverige", "Et vikingeskibsmuseum"],
    correct: 1,
    explanation: "Fregatten Jylland er verdens længste bevarede træskib og ligger i Ebeltoft."
  },
  {
    question: "Hvad er den omtrentlige befolkning i Norddjurs Kommune?",
    answers: ["Ca. 15.000", "Ca. 25.000", "Ca. 38.000", "Ca. 55.000"],
    correct: 2,
    explanation: "Norddjurs Kommune har cirka 38.000 indbyggere."
  },
  {
    question: "Hvad hedder den ældste idrætsforening i Grenaa?",
    answers: ["FC Djursland", "FC Grenaa", "Grenaa IF", "Norddjurs BK"],
    correct: 2,
    explanation: "Grenaa IF (Idrætsforening) er den ældste idrætsforening i Grenaa."
  },
  {
    question: "Hvad er Kolindsund?",
    answers: ["En sø i Mols Bjerge", "En bugt ved Grenaa", "Et tidligere inddæmmet fjordområde", "Et naturreservat ved Ebeltoft"],
    correct: 2,
    explanation: "Kolindsund er et tidligere fjordområde der blev inddæmmet og omdannet til landbrugsjord i 1800-tallet."
  },
  {
    question: "Hvad er Fornæs?",
    answers: ["En ø ud for Grenaa", "Danmarks østligste punkt", "En fiskerihavn syd for Ebeltoft", "Et naturcenter i Mols Bjerge"],
    correct: 1,
    explanation: "Fornæs er Danmarks østligste punkt og ligger på Djurslands nordøstkyst."
  },
  {
    question: "Hvad er Gl. Estrup ved Auning?",
    answers: ["En gammel fabrik", "En naturpark", "Et renæssanceslot med landbrugsmuseum", "En middelalderby"],
    correct: 2,
    explanation: "Gl. Estrup er et renæssanceslot fra 1500-tallet der i dag huser Danmarks Landbrugsmuseum."
  },
  {
    question: "Hvad er den primære erhvervsgren på Djursland udover turisme?",
    answers: ["Fiskeri alene", "IT og teknologi", "Landbrug og fødevarer", "Shipping og logistik"],
    correct: 2,
    explanation: "Landbrug og fødevareproduktion er en af de vigtigste erhvervsgrene på Djursland ved siden af turismen."
  },
  {
    question: "Hvad hedder havvindmølleparken planlagt i Kattegat ud for Djursland?",
    answers: ["Djursland Havvind", "Kattegat Nord", "Kattegatvind", "Grenaa Offshore"],
    correct: 2,
    explanation: "Kattegatvind er et stort planlagt havvindmølleprojekt i Kattegat ud for Djursland."
  },
  {
    question: "Hvad er den største udfordring Djursland deler med mange landdistrikter?",
    answers: ["For mange turister", "For høje huspriser", "Affolkning og faldende befolkningstal", "For lidt landbrugsjord"],
    correct: 2,
    explanation: "Som mange andre landdistrikter kæmper Djursland med affolkning og faldende befolkningstal."
  },
  {
    question: "Hvad er Rute 21's funktion for Djursland?",
    answers: ["Forbinder Grenaa med Randers", "Forbinder Djursland med Aarhus", "Kystvejen langs Kattegat", "Forbinder Ebeltoft med Grenaa"],
    correct: 1,
    explanation: "Rute 21 er den primære vej der forbinder Djursland med Aarhus via Mols."
  },
  {
    question: "Hvornår blev Grenaa IF stiftet?",
    answers: ["1888", "1895", "1905", "1923"],
    correct: 2,
    explanation: "Grenaa IF blev stiftet i 1905 og er en af de ældste idrætsforeninger i området."
  },
  {
    question: "Hvad er Djurslands geografiske placering i Danmark?",
    answers: ["En halvø i Lillebælt", "En ø i Kattegat", "En halvø i Kattegat øst for Aarhus", "En halvø i Randers Fjord"],
    correct: 2,
    explanation: "Djursland er en halvø der stikker ud i Kattegat øst for Aarhus i det østlige Jylland."
  },
  {
    question: "Hvad er Ebeltoft Glasmuseum?",
    answers: ["Et lokalt kunsthåndværksmuseum", "Et internationalt anerkendt glaskunstmuseum", "Et museum for middelalderlig glasproduktion", "Et naturvidenskabeligt museum"],
    correct: 1,
    explanation: "Ebeltoft Glasmuseum er internationalt anerkendt og viser moderne glaskunst fra hele verden."
  },
  {
    question: "Hvad produceres der på vindmøllefabrikkerne nær Djursland?",
    answers: ["Solpaneler", "Havvindmøller", "Vindmøllevinger", "Batterier til elbiler"],
    correct: 2,
    explanation: "Der produceres vindmøllevinger på fabrikker i området nær Djursland."
  },
  {
    question: "Hvad er Clausholm?",
    answers: ["Et slot i Ebeltoft", "Et barokslot fra 1600-tallet nær Randers", "Ruiner af en middelalderborg", "Et Djursland-historiemuseum"],
    correct: 1,
    explanation: "Clausholm er et velbevaret barokslot fra slutningen af 1600-tallet beliggende nær Randers."
  },
  {
    question: "Hvad er særligt ved Djurslands kystlinje?",
    answers: ["Den er næsten uden strande", "Den er kun tilgængelig med båd", "Den har både Kattegat-kyst og fjorde", "Den er beskyttet militærzone"],
    correct: 2,
    explanation: "Djurslands kystlinje er varieret med både åbne Kattegat-strande og rolige fjorde."
  },
  {
    question: "Hvad er Grenaa Gymnasium lokalt?",
    answers: ["Lukket og erstattet", "Et af Danmarks mindste", "Det eneste gymnasium i Norddjurs", "Specialiseret i maritime fag"],
    correct: 2,
    explanation: "Grenaa Gymnasium er det eneste gymnasium i Norddjurs Kommune."
  },
  {
    question: "Hvad er FC Djursland?",
    answers: ["Grenaa IFs nuværende navn", "En fodboldoverbygning der eksisterede 2009–2023", "En aktiv fodboldklub i 1. division", "En ungdomsklub i Ebeltoft"],
    correct: 1,
    explanation: "FC Djursland var en fodboldoverbygningsklub der samlede klubber fra Djursland og eksisterede fra 2009 til 2023."
  },
  {
    question: "Hvad er Djurslands uofficielle kælenavn blandt lokale?",
    answers: ["Kattegat-landet", "Den grønne halvø", "Danmarks smukkeste halvø", "Østjyllands perle"],
    correct: 2,
    explanation: "Djursland kaldes uofficielt for Danmarks smukkeste halvø af de lokale."
  }
];
