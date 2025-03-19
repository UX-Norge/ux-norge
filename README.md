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

Prosjekt-id: `dcdo4kbx`, dataset: `staging` (Ja, produksjonsdatasettet heter staging. Det bare skjedde...)

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

## Bidragsytere ✨

Takk til alle som bidrar ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tonenordbo"><img src="https://avatars.githubusercontent.com/u/21240822?v=4?s=100" width="100px;" alt="tonenordbo"/><br /><sub><b>tonenordbo</b></sub></a><br /><a href="#ideas-tonenordbo" title="Ideas, Planning, & Feedback">🤔</a> <a href="#blog-tonenordbo" title="Blogposts">📝</a> <a href="#content-tonenordbo" title="Content">🖋</a> <a href="https://github.com/UX-Norge/ux-norge/issues?q=author%3Atonenordbo" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/TobWul"><img src="https://avatars.githubusercontent.com/u/22070120?v=4?s=100" width="100px;" alt="Tobias Wulvik"/><br /><sub><b>Tobias Wulvik</b></sub></a><br /><a href="https://github.com/UX-Norge/ux-norge/commits?author=TobWul" title="Code">💻</a> <a href="https://github.com/UX-Norge/ux-norge/commits?author=TobWul" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/aswinnalliah"><img src="https://avatars.githubusercontent.com/u/42807783?v=4?s=100" width="100px;" alt="aswinnalliah"/><br /><sub><b>aswinnalliah</b></sub></a><br /><a href="https://github.com/UX-Norge/ux-norge/commits?author=aswinnalliah" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://itbegins.no/blog"><img src="https://avatars.githubusercontent.com/u/6494049?v=4?s=100" width="100px;" alt="Simon Jespersen"/><br /><sub><b>Simon Jespersen</b></sub></a><br /><a href="https://github.com/UX-Norge/ux-norge/commits?author=simjes" title="Code">💻</a> <a href="https://github.com/UX-Norge/ux-norge/commits?author=simjes" title="Tests">⚠️</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

Prosjektet bruker [all-contributors](https://github.com/all-contributors/all-contributors) spesifikasjonen. Tusen takk til alle som bidrar!
