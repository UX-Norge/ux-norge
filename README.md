# Hvordan bidra :
Tusen takk for at du vil bidra på koden til [uxnorge.no](https://uxnorge.no)! Her er stegene for å gjøre det:

*Alt av diskusjoner rundt dette temaet blir gjort i `#nettside-utvikling`-kanalen på Slack.*
### Hvordan gjør vi det med oppgaver?
Mesteparten av oppgavene kommer fra UX Norge-crewet. Disse blir lagt inn og prioritert i [dette boardet](https://github.com/orgs/UX-Norge/projects/1) her inne i Github. Så snart noe av det blir prioritert, blir det gjort om til et issue og plassert i Todo-kolonnen. **Det er disse vi trenger hjelp til å få utviklet!**

Hvis du har egne forslag må du gjerne jobbe med dem også, men kan være verdt å ha i bakhodet at noen i UX Norge-crewet må gi 👍 før det går live på uxnorge.no. Enten kast deg rundt å kod opp idéen, eller luft den i `#nettside-utvikling`-kanalen.

# Teknisk

Teknologi i prosjektet:
-   Gatsby
-   Tailwind CSS
-   Typescript
-   Sanity

### Få prosjektet til å kjøre lokalt:
1. Klon dette repoet ned på maskinen din.
2. Opprett en `.env.development` og ev. `.env.production` i `/web`-mappen og fyll den med:
```
SANITY_PROJECT_ID = dcdo4kbx
SANITY_DATASET = staging
SANITY_TOKEN = <Sendes på Slack>
```
3. Gjør det samme i `/studio`-mappen
```
SANITY_STUDIO_PROJECT_ID = dcdo4kbx
SANITY_STUDIO_DATASET = staging
SANITY_TOKEN = <Samme som over>
```

For å jobbe med en kopi av datasettet, finnes datasettet production-copy i sanity.

## Prosjektstruktur:
Prosjektet er delt inn i hovedmmappene:

### Studio
Sanity-prosjektet bor her. Start opp med `yarn run dev` (første gang `yarn install`)

Prosjekt-id: `dcdo4kbx`, dataset: `staging` (Ja, produksjonsdatasettet heter staging. Det bare skjedde...).

### Web
Hele frontenden Start opp med `yarn start` (første gang `yarn install`)

### Live preview (web katalogen)
Start opp med `netlify dev`

### Types
Alt av typer går hit. Henter håndskrevne typer fra filen schemaTypes inne i studio også. Skulle gjerne hatt det automatisert med [Sanity Codegen](https://www.sanity.io/plugins/sanity-codegen), men det fungerte svært dårlig.

### Backend
Foreløpig bare utforsking, ingen live kode.

---
## Slack Stillingsannonseappen
Hvis du vil jobbe med stillingsannonse-appen som ruller og går i #ledigstilling , trenger du noen flere variabler i .env-filen i `/web`:
```
SLACK_WEBHOOK = <Sendes på Slack>
WEBHOOK_SECRET = <Sendes på Slack>
SLACK_TOKEN = <Sendes på Slack>
SLACK_ADS_CHANNEL_ID = C03GL204KC3
```
