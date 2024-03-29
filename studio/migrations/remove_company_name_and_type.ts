
import { getCliClient } from 'sanity/cli'

const client = getCliClient()
const fetchDocuments = () =>
  client.fetch(`*[_type == 'article' && (defined(companyType) || defined(companyName))][0...100]{title, _id, companyName, companyType}`)



const buildPatches = docs =>
  docs.map(doc => ({
    id: doc._id,
    patch: {
      unset: ['companyName', 'companyType'],
      // this will cause the transaction to fail if the documents has been
      // modified since it was fetched.
      ifRevisionID: doc._rev
    }
  }))

const createTransaction = patches =>
  patches.reduce((tx, patch) => tx.patch(patch.id, patch.patch), client.transaction())

const commitTransaction = tx => tx.commit()

const migrateNextBatch = async () => {
  const documents = await fetchDocuments()
  const patches = buildPatches(documents)
  if (patches.length === 0) {
    console.log('No more documents to migrate!')
    return null
  }
  console.log(
    `Migrating batch:\n %s`,
    patches.map(patch => `${patch.id} => ${JSON.stringify(patch.patch)}`).join('\n')
  )
  const transaction = createTransaction(patches)
  await commitTransaction(transaction)
  return migrateNextBatch()
}

migrateNextBatch().catch(err => {
  console.error(err)
  process.exit(1)
})