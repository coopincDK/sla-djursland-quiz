// Runde 2 — Hvem Mener Det? (30 udsagn)
const runde2 = [
  {
    statement: "Topskat bør lettes, så det bedre kan betale sig at arbejde ekstra.",
    answer: "J",
    explanation: "LA's kernemærkesag: lavere skat på arbejde og topskattelettelser for at øge incitamentet til at yde mere."
  },
  {
    statement: "Velfærd og ældrepleje skal styrkes, også selv om det koster flere fælles midler.",
    answer: "L",
    explanation: "Socialdemokratiets grundholdning: stærk offentlig velfærd finansieret af fællesskabet, selv hvis det kræver højere udgifter."
  },
  {
    statement: "Mindre bureaukrati i det offentlige kan frigive tid til kerneopgaver.",
    answer: "B",
    explanation: "Begge partier ønsker at reducere unødigt papirarbejde — LA af principielle årsager, S for at styrke frontpersonalet."
  },
  {
    statement: "Kystfiskeri og lokale havne er en vigtig del af Djurslands identitet.",
    answer: "B",
    explanation: "Begge kandidater repræsenterer Djursland og anerkender kystfiskeriets kulturelle og erhvervsmæssige betydning for området."
  },
  {
    statement: "Togdrift bør åbnes mere for konkurrence, så flere kan byde på opgaven.",
    answer: "J",
    explanation: "LA er tilhænger af markedskonkurrence på offentlige opgaver, herunder jernbane, for at øge effektivitet og valgmuligheder."
  },
  {
    statement: "Sundhed skal være tæt på borgerne, især i områder langt fra de store hospitaler.",
    answer: "L",
    explanation: "S prioriterer nærhed i sundhedsvæsenet og kæmper mod centralisering, der rammer udkantsborgere hårdest."
  },
  {
    statement: "Kommunerne bør have flere penge til folkeskoler og daginstitutioner.",
    answer: "L",
    explanation: "S vil styrke den offentlige sektor med øgede bevillinger til børn og uddannelse via kommunerne."
  },
  {
    statement: "Erhvervslivet trives bedst med færre regler og mindre kontrolbyrde.",
    answer: "J",
    explanation: "LA's liberale erhvervspolitik: afbureaukratisering og deregulering som vejen til vækst og iværksætteri."
  },
  {
    statement: "Rute 15 skal være mere sikker og fremkommelig for både pendlere og erhverv.",
    answer: "B",
    explanation: "Begge kandidater arbejder for bedre infrastruktur på Djursland — Rute 15 er en konkret lokal mærkesag for begge."
  },
  {
    statement: "Offentlige opgaver bør kun løses af det offentlige og aldrig af private.",
    answer: "I",
    explanation: "Ingen af dem mener dette: LA er imod monopoler, og S accepterer private løsninger på visse områder."
  },
  {
    statement: "Vi skal sikre ordentlige forhold for lønmodtagere og stærke aftaler på arbejdsmarkedet.",
    answer: "L",
    explanation: "S er fagbevægelsens parti og kæmper for kollektive overenskomster og stærke lønmodtagerrettigheder."
  },
  {
    statement: "Skattelettelser kan skabe vækst og tiltrække flere arbejdspladser til Djursland.",
    answer: "J",
    explanation: "LA's vækststrategi bygger på lavere skatter som motor for investeringer og jobskabelse i lokalområdet."
  },
  {
    statement: "Grøn omstilling skal gennemføres på en måde, der også skaber lokale jobs.",
    answer: "B",
    explanation: "Begge partier støtter grøn omstilling med fokus på beskæftigelse — S via offentlige investeringer, LA via markedet."
  },
  {
    statement: "Vi bør indføre brugerbetaling på akut hjælp for at spare penge.",
    answer: "I",
    explanation: "Ingen af dem støtter brugerbetaling på akuthjælp — det ville være politisk umuligt for begge partier."
  },
  {
    statement: "Ældre skal have adgang til pleje, uanset postnummer og økonomi.",
    answer: "L",
    explanation: "S's velfærdsmodel sikrer universel adgang til ældrepleje uafhængigt af geografi og privatøkonomi."
  },
  {
    statement: "Regler for små virksomheder bør forenkles, så tiden bruges på kunder og drift.",
    answer: "J",
    explanation: "LA vil fjerne administrative byrder for SMV'er, så iværksættere kan fokusere på forretningen frem for papirarbejde."
  },
  {
    statement: "Det vigtigste er, at Djursland ikke bliver glemt i nationale investeringer.",
    answer: "B",
    explanation: "Begge lokalpolitikere kæmper for, at Djursland får sin andel af nationale midler til infrastruktur og service."
  },
  {
    statement: "Kollektiv transport skal være et tilbud til hele området, ikke kun de største byer.",
    answer: "L",
    explanation: "S prioriterer offentlig transport som et universelt tilbud, der sikrer mobilitet for alle — også i landdistrikterne."
  },
  {
    statement: "Vi skal afskaffe alle afgifter på brændstof med det samme uden undtagelser.",
    answer: "I",
    explanation: "Ingen af dem støtter en øjeblikkelig og total afskaffelse af brændstofafgifter — det er for radikalt for begge."
  },
  {
    statement: "Private aktører kan nogle gange levere service mere effektivt end offentlige monopoler.",
    answer: "J",
    explanation: "LA mener konkurrence og private udbydere kan skabe bedre og billigere service end offentlige enerettigheder."
  },
  {
    statement: "Fællesskabet har et ansvar for at hjælpe dem, der har det sværest.",
    answer: "L",
    explanation: "S's grundværdi: solidaritet og omfordeling — samfundet skal stille op for de svageste borgere."
  },
  {
    statement: "Når vi laver regler, skal vi måle effekten og fjerne det, der ikke virker.",
    answer: "B",
    explanation: "Begge partier støtter evidensbaseret politik og evaluering af lovgivning — om end med forskellig konklusion om hvad der virker."
  },
  {
    statement: "Lokale havne bør udvikles, så de understøtter turisme og erhverv.",
    answer: "B",
    explanation: "Begge kandidater ser havneudvikling som en lokal vækstmotor for Djursland — turisme og erhverv gavner alle."
  },
  {
    statement: "Vi bør nedlægge de fleste lokale institutioner for at spare penge.",
    answer: "I",
    explanation: "Ingen af dem vil nedlægge lokale institutioner — begge kæmper tværtimod for at bevare og styrke dem på Djursland."
  },
  {
    statement: "Uddannelse skal være tilgængelig, også hvis man bor langt fra de store byer.",
    answer: "B",
    explanation: "Begge partier støtter uddannelsesdækning i hele landet — S via offentlige institutioner, LA via fleksible løsninger."
  },
  {
    statement: "Sundhedssystemet skal styres med fokus på tryghed og nærhed for borgerne.",
    answer: "L",
    explanation: "S's sundhedspolitik prioriterer nærhed, tryghed og et stærkt offentligt sundhedsvæsen frem for centralisering."
  },
  {
    statement: "Det skal være lettere at starte virksomhed, også i mindre byer på Djursland.",
    answer: "J",
    explanation: "LA vil sænke barrierer for iværksætteri overalt i landet — færre regler og lavere skat gælder også i udkanten."
  },
  {
    statement: "Vi skal helt stoppe nye vejprojekter i Danmark de næste 20 år.",
    answer: "I",
    explanation: "Ingen af dem støtter et totalt stop for vejprojekter — begge arbejder aktivt for bedre veje på Djursland."
  },
  {
    statement: "Et stærkt lokalsamfund kræver både arbejde, service og gode forbindelser.",
    answer: "B",
    explanation: "Begge kandidater er enige om, at Djursland har brug for jobs, offentlig service og infrastruktur for at blomstre."
  },
  {
    statement: "Djursland er det bedste sted at bo i Danmark.",
    answer: "B",
    explanation: "Det er der ingen tvivl om — begge kandidater elsker Djursland! 🎉"
  }
];
