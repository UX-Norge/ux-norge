import slugify from 'slugify'

export async function slugify_ad(input: string, schemaType: any, context: any) {
  const slug = slugify(input)
  const {getClient} = context
  const client = getClient({apiVersion: '2024-01-15'})
  const query = 'count(*[_type=="ad" && slug.current == $slug]{_id})'
  const params = {slug: slug}
  return client.fetch(query, params).then((count: number) => {
    if (count === 0) {
      return slug;
    } else {
      return `${slug}-${count + 1}`
    }
  })
}
