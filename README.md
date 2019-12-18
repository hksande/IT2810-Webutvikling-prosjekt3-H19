# Dokumentasjon

> Gruppe 24 | Prosjekt 3 | IT2810 Webutvikling 2019

<img src="./Skjermbilde 2019-11-05 kl. 17.56.57.png" height="300">
<img src="./Skjermbilde 2019-11-05 kl. 17.58.17.png" height="300">
<img src="./Skjermbilde 2019-11-05 kl. 17.58.38.png" height="300">
                                                               
## Introduksjon

_Av Johanne Lie, Mathilde Tillman Hegdal og Hans Kristian Sande_

_Chateau de Vin_ er en søkbar katalog som lar deg finne frem til ulike drikkevarer du kan kjøpe. Du kan filtrere på hvilket type produkt du er ute etter og sortere resultater på alfabetisk rekkefølge eller stigende/synkende pris.

Bon commerce!

## Backend

**GraphQL**\
Vi har brukt en rekke teknologier i oppsettet for å linke backend til frontend, der GraphQL hovedsakelig er mekanismen som knytter dem sammen. Uten erfaring med verken REST API eller GraphQL konkluderte vi med å prøve ut den nyere teknologien da den er mer moderne. I utgangspunktet har nemlig GraphQL et smart endpoint som gjør at fetching av data krever færre spørringer (schema modellerer en graf), likevel utnyttet vi ikke dette til det fulle da vi kun har én tabell vi henter informasjon fra i databasen. Kombinert med andre teknologier som Apollo fikk vi likevel utrettet en høyere ytelse ved eksempelvis caching _(fetchPolicy)_.

**Apollo**\
Apollo fungerer som linken mellom server til (client) frontend i prosjektet vårt. Apollo Client gjorde det enkelt å bruke GraphQL i frontend da vi kunne binde (wrappe) komponenter for blant annet queries, samtidig som vi benyttet en apollo-react pakke som ga oss enkle verktøy (useQuery-hook og fetchMore til pagination).

**Server**\
Apollo _Apollo Server_ ble også brukt i oppsettet av server sammen med Express. Dette var en vanskelig del, men med mye dokumentasjon og eksempler på nettet med Apollo Server ft. Express ble vi overbevist om å bruke Express som middleware istedenfor Connect. De fungerer sikkert like bra på sine måter, men her valgte vi å kjøre safe. Apollo Server lot oss debugge queries og mutations i sin graphql-playground (ved _debug: true_) uten å måtte teste gjennom frontend.

Logikken bak kommunikasjonen for håndtering av spørringer følger en struktur gitt av schema. Her strukturerte vi data settet på SDL _Schema Definition Language_ form kalt `typeDefs`, hvorpå våre egendefinerte `resolvers` håndterte de ulike spørringene med databasen gjennom server.

Et problem vi slet lenge med var å aksessere applikasjonen fra server.js. Etter mye søk på github fant vi en måte hvor start.js med babel-plugin fungerte som en inngangskanal til server.

Kort fortalt lar Apollo Server oss utføre queries mot eget schema. TypeDefs definerer vårt API, mens resolvers forteller server hvordan den skal håndtere en spørring til API-et.

**Database**\
Her benyttet vi oss av en relativt ny teknologi _Prisma_. Det var litt vanskelig å få det til å fungere som det skulle, men strevet var definitivt verdt det. Prisma er genialt.

Prisma fungerer som en ORM _Object Relation Model_ – det er et database abstraksjonslag, som gjør om databasen til et GraphQL API med grunnleggende CRUD-operasjoner. Den knytter databasen sammen med serveren for oss ved et par steg. Prisma lot oss velge hvilken type database vi ville bruke samtidig som vi kunne velge hvilket programmeringsspråk vi ville benytte (JS) for implementasjon. For å nevne et eksempel genererte Prisma ulike input-typer for sortering på MySQL form, eksempelvis orderBy: price_DESC. Dermed ble sortering en veldig enkel implementasjon.

Vi brukte et eget script for å seede databasen med all data.
`cd database && node populateDB.js`

Kort fortalt er Prisma limet mellom databasen og server.

## Frontend

**React**\
Vi har valgt å ta i bruk React Hooks, det nyeste tilskuddet til React, ettersom dette skal forenkle syntaks og lover å løse mange av problemene man møter på med tradisjonell React(https://reactjs.org/docs/hooks-intro.html). Hovedkomponenten vår er App.js,og vi har 14 komponenter i tillegg. Disse ligger i mappen “/components”.

**State håndtering**\
Det er brukt Redux for å håndtere state. Dette er et populært og godt dokumentert javascript bibliotek som egner seg godt for mer avanserte applikasjoner. Man har muligheten til å lagre data som man ønsker skal være lett tilgjengelig i en store som er definert av ulike reducere, i denne applikasjonen:
filterReducer (holder styr på filtrering, sortering og søk)
paginationReducer (holder styr på aktiv side)
productsReducer (holder styr på hvilke varer som er lagt til i handlekurv)
rootReducer (kombinerer alle reducerne sammen)
Man kan da modifisere staten ved å dispatche ulike actions med bestemte typer. Disse er definert i actions.js og constants.js. React-komponentene kobles med funksjonen connect (fra react-redux) som tar inn argumentene mapStateToProps og mapDispatchToProps. Noe enkel state håndteres også inne i selve komponentene der det er hensiktsmessig, eksempelvis åpne/lukke dialoger.

**Tredjepartkomponenter**\
Prosjektet tar i bruk komponenter fra Material-UI, et svært poulært, enkelt og godt dokumentert React-rammeverk.

Applikasjonen bruker en React-komponent fra react-vector-maps for å grafisk vise hvilket land de ti mest populære produktene er fra. Komponenten er enkel i bruk og har et stilig resultat.

**Apollo Client**\
Apollo Client som er godt dokumentert for React, brukes for å utføre queries og mutations. En client er definert i apolloClient.js og wrappes rundt hele med tagen <ApolloProvider client={client}>. For å utføre en query defineres den først på denne måten:

og utføres ved å ta i bruk hooken useQuery (fra apollo/react-hooks) slik:

```js
const GET_TOP_PRODUCTS = gql`
  {
    allProducts(searchString: "", orderBy: purchased_DESC, first: 10) {
      name
      purchased
      origin
    }
  }
`;
```

og utføres ved å ta i bruk hooken useQuery (fra apollo/react-hooks) slik:

```js
function TopProductsContainer(props) {
  const { refetch, loading, error, data } = useQuery(GET_TOP_PRODUCTS, {
    variables: {}
  });

  if (loading)
    return (...);
  if (error) return "Det har skjedd en feil :(";

  if (props.refetch) {
    refetch().then(() => {
      props.stopRefetch();
    });
  }

  return<Map data={data.allProducts} />;
}
```

Apollo Client er som sådan enkel i bruk, ved at man kan definere hva som skal skje ved for eksempel loading, error og suksessfull datahenting. Det er og tatt i bruk metoder for å hente mer for å implementere pagination (fetchMore} og hente om igjen etter mutation (refetch), samt definere caching (fetchPolicy).

**Responsivitet**\
Det er tatt i bruk metoder innen responsive webdesign for å bedre brukeropplevelsen av applikasjonen.

Dette gjøres hovedsakelig gjennom media queries for å endre layouten på siden ved ulike skjermstørrelser og orientering. Det er definert tre ulike media queries; 1200px, 992px og 768px. Disse breakpointsene tar utgangspunkt i best practice (https://www.solodev.com/blog/web-design/media-queries-and-mobile-css-best-practices.stml) og svarer henholdsvis til store PC-størrelser, små PC-størrelser og nettbrett. Komponentene vil legge seg under hverandre ved mindre skjermstørrelser og bildene i listeelementene taes bort. Noen av komponentene er ikke helt ferdigslipt, for eksempel vil teksten i listeelementene legge seg utenfor boksen sin eller oppå seg selv ved små skjermstørrelser. Dette er bugs gruppen er klar over og som ligger i backlogen. Det er og tatt i bruk CSS Grid og Flexbox for å oppnå et flytende layout.

## Testing

Vi har valgt å bruke Cypress på begge testmetodene. Det er 2 end to end tester og 3 enhetstester. Søkefunksjonen og sortering er testet med end-to-end. I testen av søkefunksjoen blir det testet at det som blir skrevet inn i søkefeltet blir vist på siden etter søkeknappen er trykket. Det betyr at søket har blitt sendt til backend og funnet i databasen og blitt sendt tilbake og vist på siden. Når sortering blir testet så velges Pris Stigende og vi tester da om den som koster minst er øverst. Minimumen som det testes mot er noe vi har hardkodet inn siden vi vet hva som er den minste prisen. Den er ikke blitt hentet fra databasen. Tabsene, shoppingCart og filtrerings funksjonene blir testet med enhetstesting. Backend blir ikke sjekket, men det blir testet at alle komponentene funker som de skal. Vi valgte Cypress siden det er oversiktlig og veldig greit at det er visuelt så man ser alt som blir testet.
For å kjøre testene må man skrive
`node_modules/.bin/cypress open`
i terminalen og så dukker det opp et vindu. Da må man trykke på
`app_spec`
så kjører testene. Testene må kjøres lokalt.

## Git og samarbeid

Vi har brukt Git og Gitlab til versjonshåndtering. Vi delte opp prosjektet i deloppgaver som ble lagt inn som issues på gitlab, og merket de med arbeidsstørrelse og type (feature/enhancement/bugfix). Vi har merket noen av commitsene med hvilket issue det løser, for å få bedre oversikt. Commitsene som ikke har blitt merket, har en forklarende tekst.
Vi delte opp overordnet i en som jobbet med backend og to på frontend i starten og deretter fordelt oppgaver innad i frontend. Vi har enten sittet sammen eller hatt kommunikasjon via Slack. Kommunikasjonen har vært flytende.
