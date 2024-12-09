import {defineMigration, at, setIfMissing, unset} from 'sanity/migrate'

const from = 'location'
const to = 'venue'

export default defineMigration({
  title: 'Rename field from location to venue',
  documentTypes: ["course"],

  migrate: {
    document(doc, context) {
      return [
        at(to, setIfMissing(doc[from])),
        at(from, unset())
      ]
    }
  }
})
