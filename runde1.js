// Runde 1 — Klassisk Quiz (40 spørgsmål)
const runde1 = [
  {
    question: "Hvad vil Jens Meilvang typisk fremhæve som vigtigst for at få projekter hurtigere i mål?",
    answers: ["Færre regler og hurtigere sagsbehandling", "Flere kommunale udvalg og flere høringer", "Flere nationale puljer med øremærket drift", "Flere statslige tilsyn og flere rapporter"],
    correct: 0,
    category: "Infrastruktur",
    icon: "assets/images/icons/infrastruktur.png",
    explanation: "Jens Meilvang (V) prioriterer typisk afbureaukratisering og hurtigere sagsbehandling for at fremme projekter."
  },
  {
    question: "Hvilket fokus vil Leif Lahn Jensen typisk sætte øverst i en debat om ældrepleje?",
    answers: ["Mere nærhed og stærkere offentlig omsorg", "Flere private aktører og mere udlicitering", "Lavere skat og færre offentlige ydelser", "Flere brugerbetalinger og mere selvfinansiering"],
    correct: 0,
    category: "Velfærd",
    icon: "assets/images/icons/velfaerd.png",
    explanation: "Leif Lahn Jensen (S) sætter typisk nærhed og stærk offentlig omsorg øverst i ældreplejedebatten."
  },
  {
    question: "Hvilket skattebudskab passer bedst til Jens Meilvang?",
    answers: ["Lavere skat for at øge arbejde og investering", "Højere skat for at udvide velfærd og service", "Uændret skat for at skabe ro om budgetter", "Mere afgift for at styre forbrug og transport"],
    correct: 0,
    category: "Skat",
    icon: "assets/images/icons/skat.png",
    explanation: "Jens Meilvang (V) går typisk ind for lavere skat for at stimulere arbejde og investeringer."
  },
  {
    question: "Hvilket argument vil Leif Lahn Jensen oftest bruge om sundhed på Djursland?",
    answers: ["Nærhed til behandling og tryghed i hverdagen", "Flere abonnementer og mere brugerbetaling", "Færre offentlige tilbud og mere selvansvar", "Mere centralisering og længere afstande"],
    correct: 0,
    category: "Sundhed",
    icon: "assets/images/icons/sundhed.png",
    explanation: "Leif Lahn Jensen (S) fremhæver typisk nærhed til behandling og tryghed i hverdagen som centrale sundhedspolitiske mål."
  },
  {
    question: "Hvilket standpunkt om togdrift passer typisk bedst til Jens Meilvang?",
    answers: ["Mere konkurrence og flere driftsmuligheder", "Kun statslig drift og ingen udbud overhovedet", "Færre afgange og lavere ambitioner på skinner", "Kun kommunal drift og lokale særregler"],
    correct: 0,
    category: "Transport",
    icon: "assets/images/icons/transport.png",
    explanation: "Jens Meilvang (V) foretrækker typisk konkurrence og markedsbaserede løsninger i togdriften."
  },
  {
    question: "Hvad vil Jens Meilvang typisk sige giver virksomheder bedre vilkår?",
    answers: ["Mindre bureaukrati og mere enkelt regelsæt", "Flere indberetninger og flere kontrolbesøg", "Flere særskatter og flere afgifter på drift", "Flere tilladelser og flere dokumentationskrav"],
    correct: 0,
    category: "Erhverv",
    icon: "assets/images/icons/erhverv.png",
    explanation: "Jens Meilvang (V) mener typisk, at mindre bureaukrati og et enklere regelsæt giver virksomheder bedre vilkår."
  },
  {
    question: "Hvilken type grøn løsning vil begge kandidater typisk kunne støtte lokalt?",
    answers: ["Flere lokale energiprojekter og grønne initiativer", "Flere kulværker og mere importeret fossil energi", "Mere spild og færre krav til effektiv udnyttelse", "Mindre energi og færre muligheder for omstilling"],
    correct: 0,
    category: "Klima",
    icon: "assets/images/icons/klima.png",
    explanation: "Begge kandidater kan typisk støtte lokale energiprojekter og grønne initiativer, selv om de har forskellige tilgange."
  },
  {
    question: "Hvilket budskab ligger tættest på Leif Lahn Jensens tilgang til uddannelse?",
    answers: ["Styrk lokale tilbud og sikre lige muligheder", "Skær i uddannelser og luk flere lokale steder", "Gør uddannelse dyrere og øg brugerbetaling", "Saml alt i de største byer uden undtagelser"],
    correct: 0,
    category: "Uddannelse",
    icon: "assets/images/icons/uddannelse.png",
    explanation: "Leif Lahn Jensen (S) prioriterer typisk at styrke lokale uddannelsestilbud og sikre lige muligheder for alle."
  },
  {
    question: "Hvilken vinkel er mest sandsynlig, at begge kan mødes om ved kystfiskeri?",
    answers: ["Bedre rammer for lokalt kystfiskeri og havne", "Mere forbud og færre muligheder for lokalt fiskeri", "Højere bøder og strengere stop uden dialog", "Færre landninger og mere import af fisk"],
    correct: 0,
    category: "Fiskeri",
    icon: "assets/images/icons/fiskeri.png",
    explanation: "Begge kandidater kan typisk mødes om at støtte bedre rammer for lokalt kystfiskeri og havne på Djursland."
  },
  {
    question: "Hvad vil Leif Lahn Jensen typisk fremhæve som vigtigt for lokalsamfund?",
    answers: ["Stærke fællesskaber og velfærd tæt på borgerne", "Mere centralisering og færre lokale institutioner", "Mindre offentlig service og flere nedskæringer", "Færre lokale tilbud og mere afstand i hverdagen"],
    correct: 0,
    category: "Lokalt",
    icon: "assets/images/icons/lokalt.png",
    explanation: "Leif Lahn Jensen (S) fremhæver typisk stærke fællesskaber og velfærd tæt på borgerne som afgørende for lokalsamfund."
  },
  {
    question: "Hvilket argument passer bedst til Jens Meilvang, når der tales om store forbindelser?",
    answers: ["Bedre infrastruktur kan løfte vækst og mobilitet", "Flere udredninger uden beslutning i mange år", "Lavere tempo og færre investeringer i veje", "Flere stopklodser og flere krav til godkendelse"],
    correct: 0,
    category: "Infrastruktur",
    icon: "assets/images/icons/infrastruktur.png",
    explanation: "Jens Meilvang (V) argumenterer typisk for, at bedre infrastruktur løfter vækst og mobilitet i området."
  },
  {
    question: "Hvilket udsagn ligger tættest på Leif Lahn Jensens syn på finansiering af velfærd?",
    answers: ["Skatten skal sikre velfærd og tryghed for alle", "Skatten skal kun bruges til helt få opgaver", "Skatten bør fjernes mest muligt og hurtigt", "Skatten skal skiftes ud med faste gebyrer"],
    correct: 0,
    category: "Skat",
    icon: "assets/images/icons/skat.png",
    explanation: "Leif Lahn Jensen (S) mener typisk, at skatten skal sikre velfærd og tryghed for alle borgere."
  },
  {
    question: "Hvad vil Jens Meilvang typisk foreslå for at gøre transport billigere eller bedre?",
    answers: ["Mere effektiv drift og bedre konkurrencevilkår", "Flere faste monopoler og mindre valgfrihed", "Mindre fleksibilitet og færre driftsmuligheder", "Flere lag styring og flere særregler"],
    correct: 0,
    category: "Transport",
    icon: "assets/images/icons/transport.png",
    explanation: "Jens Meilvang (V) peger typisk på mere effektiv drift og bedre konkurrencevilkår som vejen til billigere og bedre transport."
  },
  {
    question: "Hvilken konkret prioritet matcher bedst Leif Lahn Jensen i sundhedspolitik lokalt?",
    answers: ["Kortere vej til hjælp og mere nær behandling", "Mere brugerbetaling og flere private abonnementer", "Færre lokale tilbud og mere central drift", "Større afstande og mindre bemanding"],
    correct: 0,
    category: "Sundhed",
    icon: "assets/images/icons/sundhed.png",
    explanation: "Leif Lahn Jensen (S) prioriterer typisk kortere vej til hjælp og mere nær behandling i sundhedspolitikken."
  },
  {
    question: "Hvilket greb vil Jens Meilvang typisk mene styrker iværksætteri og små virksomheder?",
    answers: ["Lavere skatter og færre administrative byrder", "Flere krav og mere dokumentation for alle", "Flere afgifter og højere omkostninger", "Flere tilladelser og længere ventetider"],
    correct: 0,
    category: "Erhverv",
    icon: "assets/images/icons/erhverv.png",
    explanation: "Jens Meilvang (V) mener typisk, at lavere skatter og færre administrative byrder styrker iværksætteri og små virksomheder."
  },
  {
    question: "Hvilket budskab er mest typisk for Leif Lahn Jensen om velfærdsydelser?",
    answers: ["Velfærd skal være stærk og tilgængelig for alle", "Velfærd skal begrænses til et absolut minimum", "Velfærd skal drives som et marked uden regler", "Velfærd skal finansieres af brugerbetaling alene"],
    correct: 0,
    category: "Velfærd",
    icon: "assets/images/icons/velfaerd.png",
    explanation: "Leif Lahn Jensen (S) mener typisk, at velfærd skal være stærk og tilgængelig for alle borgere."
  },
  {
    question: "Hvilken type grøn beslutning vil Jens Meilvang ofte koble til vækst?",
    answers: ["Grøn omstilling der også giver nye jobs lokalt", "Grøn omstilling kun med flere forbud og stop", "Grøn omstilling uden teknologi og uden investering", "Grøn omstilling kun ved at lukke al produktion"],
    correct: 0,
    category: "Klima",
    icon: "assets/images/icons/klima.png",
    explanation: "Jens Meilvang (V) kobler typisk grøn omstilling til vækst og nye lokale jobs frem for forbud og stop."
  },
  {
    question: "Hvilket synspunkt passer bedst til Jens Meilvang om uddannelsessystemet?",
    answers: ["Mere frihed og færre regler i uddannelsesvalg", "Mere detailstyring og flere centrale krav", "Luk flere muligheder og fjern valgmuligheder", "Gør adgang sværere og mere begrænset"],
    correct: 0,
    category: "Uddannelse",
    icon: "assets/images/icons/uddannelse.png",
    explanation: "Jens Meilvang (V) foretrækker typisk mere frihed og færre regler i uddannelsessystemet."
  },
  {
    question: "Når der tales om Grenaa og Ebeltoft, hvad vil begge typisk være enige om?",
    answers: ["Lokale byer skal have udvikling og muligheder", "Lokale byer skal nedprioriteres overalt", "Lokale byer skal have færre investeringer", "Lokale byer skal miste offentlig service"],
    correct: 0,
    category: "Lokalt",
    icon: "assets/images/icons/lokalt.png",
    explanation: "Begge kandidater er typisk enige om, at lokale byer som Grenaa og Ebeltoft skal have udvikling og muligheder."
  },
  {
    question: "Hvilket argument om havne og fiskeri kan Leif Lahn Jensen typisk støtte?",
    answers: ["Stabile rammer og støtte til lokalt erhvervsliv", "Færre fælles løsninger og mere usikkerhed", "Mere central lukning og mindre lokal drift", "Flere stop og færre muligheder for kystfiskeri"],
    correct: 0,
    category: "Fiskeri",
    icon: "assets/images/icons/fiskeri.png",
    explanation: "Leif Lahn Jensen (S) støtter typisk stabile rammer og støtte til lokalt erhvervsliv i havne- og fiskerisektoren."
  },
  {
    question: "Hvilket udgangspunkt passer bedst til Leif Lahn Jensen om kollektiv transport?",
    answers: ["Transport skal fungere for alle og i hele området", "Transport skal kun være for dem tæt på storbyer", "Transport skal kun køre hvis det giver overskud", "Transport skal være et privat tilbud uden ansvar"],
    correct: 0,
    category: "Transport",
    icon: "assets/images/icons/transport.png",
    explanation: "Leif Lahn Jensen (S) mener typisk, at kollektiv transport skal fungere for alle borgere i hele området."
  },
  {
    question: "Hvilket budskab er mest sandsynligt fra Jens Meilvang i en topskatdebat?",
    answers: ["Topskat bør lettes for at belønne ekstra arbejde", "Topskat bør hæves for at finansiere flere ordninger", "Topskat bør gøres ens for alle uden undtagelser", "Topskat bør erstatte alle andre skatter fuldstændigt"],
    correct: 0,
    category: "Skat",
    icon: "assets/images/icons/skat.png",
    explanation: "Jens Meilvang (V) argumenterer typisk for at lette topskatten for at belønne ekstra arbejdsindsats."
  },
  {
    question: "Hvilken prioritet om veje som Rute 15 vil begge typisk kunne støtte?",
    answers: ["Sikkerhed og fremkommelighed for borgere og erhverv", "Flere omveje og lavere standard for trafikken", "Færre tiltag og mindre vedligehold i området", "Mindre fokus og flere huller i belægningen"],
    correct: 0,
    category: "Infrastruktur",
    icon: "assets/images/icons/infrastruktur.png",
    explanation: "Begge kandidater kan typisk støtte sikkerhed og fremkommelighed på veje som Rute 15 for borgere og erhverv."
  },
  {
    question: "Hvilken løsning vil Jens Meilvang typisk pege på for at forbedre sundhedstilbud?",
    answers: ["Mere valgfrihed og smartere organisering af tilbud", "Kun én model og ingen alternative løsninger", "Færre muligheder og mindre adgang til behandling", "Mere ventetid og mere central begrænsning"],
    correct: 0,
    category: "Sundhed",
    icon: "assets/images/icons/sundhed.png",
    explanation: "Jens Meilvang (V) peger typisk på mere valgfrihed og smartere organisering som vejen til bedre sundhedstilbud."
  },
  {
    question: "Hvilket udsagn passer bedst til Leif Lahn Jensen om arbejdsmarkedet?",
    answers: ["Gode vilkår og tryghed for lønmodtagere lokalt", "Færre rettigheder og svagere sikkerhedsnet", "Mere usikkerhed og mindre beskyttelse i job", "Færre aftaler og mindre stabilitet i hverdagen"],
    correct: 0,
    category: "Erhverv",
    icon: "assets/images/icons/erhverv.png",
    explanation: "Leif Lahn Jensen (S) prioriterer typisk gode vilkår og tryghed for lønmodtagere på det lokale arbejdsmarked."
  },
  {
    question: "Hvilken beskrivelse passer bedst til Jens Meilvangs velfærdsvinkel?",
    answers: ["Velfærd skal være effektiv med fokus på kerneopgaver", "Velfærd skal udvides uden hensyn til økonomi", "Velfærd skal styres af flere lag og flere regler", "Velfærd skal være uigennemskuelig og tungt styret"],
    correct: 0,
    category: "Velfærd",
    icon: "assets/images/icons/velfaerd.png",
    explanation: "Jens Meilvang (V) mener typisk, at velfærd skal være effektiv med fokus på kerneopgaverne."
  },
  {
    question: "Hvilken tilgang er mest sandsynlig for Leif Lahn Jensen i klimadebatten?",
    answers: ["Grøn omstilling med hensyn til fællesskab og job", "Grøn omstilling kun med marked uden fælles plan", "Grøn omstilling uden investering og uden retning", "Grøn omstilling uden ansvar og uden mål"],
    correct: 0,
    category: "Klima",
    icon: "assets/images/icons/klima.png",
    explanation: "Leif Lahn Jensen (S) foretrækker typisk en grøn omstilling, der tager hensyn til fællesskab og beskæftigelse."
  },
  {
    question: "Hvad vil begge kandidater typisk være enige om i forhold til unge på Djursland?",
    answers: ["Unge skal have muligheder for uddannelse og job lokalt", "Unge skal flytte væk uden hensyn til lokal udvikling", "Unge skal have færre valg og mindre støtte", "Unge skal have længere vej og færre tilbud"],
    correct: 0,
    category: "Uddannelse",
    icon: "assets/images/icons/uddannelse.png",
    explanation: "Begge kandidater er typisk enige om, at unge på Djursland skal have muligheder for uddannelse og job lokalt."
  },
  {
    question: "Hvilket udsagn passer bedst til Jens Meilvang om kommunal udvikling?",
    answers: ["Gør det lettere at drive virksomhed og skabe vækst", "Gør det sværere at starte nyt og udvikle lokalt", "Gør det dyrere at investere og udvide i området", "Gør det mere besværligt at etablere sig på Djursland"],
    correct: 0,
    category: "Lokalt",
    icon: "assets/images/icons/lokalt.png",
    explanation: "Jens Meilvang (V) ønsker typisk at gøre det lettere at drive virksomhed og skabe vækst i kommunen."
  },
  {
    question: "Hvilket budskab passer bedst til Jens Meilvang om erhverv som fiskeri?",
    answers: ["Færre unødige regler og mere plads til lokal drift", "Flere afgifter og flere administrative begrænsninger", "Mere papirarbejde og flere kontroller på alle", "Færre muligheder og flere stop for lokale erhverv"],
    correct: 0,
    category: "Fiskeri",
    icon: "assets/images/icons/fiskeri.png",
    explanation: "Jens Meilvang (V) ønsker typisk færre unødige regler og mere plads til lokal drift i fiskeriet."
  },
  {
    question: "Hvilken tilgang passer bedst til Leif Lahn Jensen, når man taler om offentlige investeringer?",
    answers: ["Investér for at sikre sammenhæng og lokale løsninger", "Udskyd alt og lad problemerne vokse sig større", "Skær ned og undgå vedligehold i mange år", "Stop investeringer og sænk serviceniveauet"],
    correct: 0,
    category: "Infrastruktur",
    icon: "assets/images/icons/infrastruktur.png",
    explanation: "Leif Lahn Jensen (S) mener typisk, at offentlige investeringer skal sikre sammenhæng og lokale løsninger."
  },
  {
    question: "Hvilket udsagn passer bedst til Jens Meilvang i en debat om ventetider?",
    answers: ["Fjern flaskehalse og brug ressourcerne smartere", "Accepter længere ventetid og lavere ambitioner", "Gør systemet tungere og øg papirarbejdet", "Begræns adgangen og gør det sværere at få hjælp"],
    correct: 0,
    category: "Sundhed",
    icon: "assets/images/icons/sundhed.png",
    explanation: "Jens Meilvang (V) vil typisk fjerne flaskehalse og bruge ressourcerne smartere for at reducere ventetider."
  },
  {
    question: "Hvilket udsagn passer bedst til Leif Lahn Jensen om fordeling og tryghed?",
    answers: ["Skat kan bruges til at sikre tryghed og velfærd", "Skat er altid skadelig og bør fjernes hurtigt", "Skat skal skiftes ud med tilfældige gebyrer", "Skat skal kun betales af helt få grupper"],
    correct: 0,
    category: "Skat",
    icon: "assets/images/icons/skat.png",
    explanation: "Leif Lahn Jensen (S) mener typisk, at skatten kan og skal bruges til at sikre tryghed og velfærd for alle."
  },
  {
    question: "Hvilket udsagn passer bedst til Jens Meilvang om klima og erhverv?",
    answers: ["Grønne løsninger skal også være realistiske og skalerbare", "Grønne løsninger må aldrig handle om teknologi", "Grønne løsninger skal stoppe alt lokalt erhverv", "Grønne løsninger skal undgå investering helt"],
    correct: 0,
    category: "Klima",
    icon: "assets/images/icons/klima.png",
    explanation: "Jens Meilvang (V) mener typisk, at grønne løsninger skal være realistiske og skalerbare, ikke blot symbolske."
  },
  {
    question: "Hvilken prioritet passer bedst til Leif Lahn Jensen i forhold til lokalt erhverv?",
    answers: ["Ordentlige vilkår og stabile rammer for arbejdspladser", "Færre aftaler og mere usikkerhed i ansættelser", "Mindre sikkerhed og færre muligheder for støtte", "Lavere standard og mindre fokus på tryghed"],
    correct: 0,
    category: "Erhverv",
    icon: "assets/images/icons/erhverv.png",
    explanation: "Leif Lahn Jensen (S) prioriterer typisk ordentlige vilkår og stabile rammer for lokale arbejdspladser."
  },
  {
    question: "Hvilket udsagn passer bedst til Jens Meilvang om folkeskolen og læring?",
    answers: ["Giv mere frihed lokalt og mindre detailstyring", "Giv flere regler centralt og flere skema-krav", "Gør skolen mere tung og mindre fleksibel", "Begræns valgfag og fjern lokale muligheder"],
    correct: 0,
    category: "Uddannelse",
    icon: "assets/images/icons/uddannelse.png",
    explanation: "Jens Meilvang (V) ønsker typisk mere lokal frihed og mindre central detailstyring i folkeskolen."
  },
  {
    question: "Hvilket udsagn passer bedst til Leif Lahn Jensen om socialt ansvar?",
    answers: ["Et stærkt fællesskab skal løfte dem der har brug for det", "Alle må klare sig selv uden fælles løsninger", "Støtte skal fjernes og ansvar ligge alene hos borgeren", "Sikkerhedsnet skal være minimalt og svært at få"],
    correct: 0,
    category: "Velfærd",
    icon: "assets/images/icons/velfaerd.png",
    explanation: "Leif Lahn Jensen (S) mener typisk, at et stærkt fællesskab skal løfte dem, der har brug for hjælp."
  },
  {
    question: "Hvilket udsagn passer bedst til Leif Lahn Jensen om kystområder og havne?",
    answers: ["Bevar liv og arbejdspladser i de lokale havnebyer", "Luk havnene og flyt alt til de største byer", "Skær ned og nedprioritér kystsamfund i planlægning", "Stop investeringer og lad havne forfalde over tid"],
    correct: 0,
    category: "Fiskeri",
    icon: "assets/images/icons/fiskeri.png",
    explanation: "Leif Lahn Jensen (S) ønsker typisk at bevare liv og arbejdspladser i de lokale havnebyer på Djursland."
  },
  {
    question: "Hvilket udsagn passer bedst til begge, når de taler om Djursland som helhed?",
    answers: ["Djursland skal udvikles med job, service og fremtidstro", "Djursland skal nedprioriteres og stå bagerst i køen", "Djursland skal have færre muligheder og mere afstand", "Djursland skal miste tilbud og få lavere ambition"],
    correct: 0,
    category: "Lokalt",
    icon: "assets/images/icons/lokalt.png",
    explanation: "Begge kandidater er typisk enige om, at Djursland skal udvikles med job, service og fremtidstro."
  },
  {
    question: "Hvilket fokus er mest sandsynligt for Jens Meilvang i en debat om offentlig drift?",
    answers: ["Konkurrence kan give bedre service og lavere omkostning", "Monopol giver altid bedst kvalitet uden sammenligning", "Flere regler giver automatisk bedre drift i praksis", "Mindre valgfrihed giver større tilfredshed hos alle"],
    correct: 0,
    category: "Transport",
    icon: "assets/images/icons/transport.png",
    explanation: "Jens Meilvang (V) mener typisk, at konkurrence i offentlig drift giver bedre service og lavere omkostninger."
  }
];
