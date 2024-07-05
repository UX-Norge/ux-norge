import {defineMigration, at, setIfMissing, unset} from 'sanity/migrate'

const from = 'date';

const newFrom = 'startDate';
const to = 'endDate';

export default defineMigration({
  title: 'Rename date-fields in courses',
  documentTypes: ["course"],

  migrate: {
    document(doc, context) {
      return [
        at(newFrom, setIfMissing(doc[from])),
        at(to, setIfMissing(doc[from])),
        at(from, unset())
      ]
    }
  }
})
