import slugify from 'slugify'

/* Lager en unik slug med en counter etter */
/* hvis "stilling-ledig" finnes fra før, blir ny slug "stilling-ledig-2" osv*/ 

export async function slugify_ad(input: string, schemaType: any, context: any) {
  const myslug = slugify(input, { lower: true, strict: true})
  const {getClient} = context
  const client = getClient({apiVersion: '2024-01-15'})
  const query = '*[_type=="ad" && slug.current match $slug]{slug}'
  const params = {slug: myslug}
  return client.fetch(query, params).then((res: any) => {
    // Sanity støtter ikke pt regulære uttrykk, så vi må filtrere i klienten
    const regex = new RegExp('^' + myslug + '(\\-\\d+)?$');

    let highestNumber = 0;
    res.forEach((row: any) => {
      const slug = row.slug.current;
      const match = slug.match(regex);
      if(match) {
        if (match[1]) {
          // Slug fra datasettet som allerede har en counter, må lage en ny slug med høyere counter
          const number = parseInt(match[1].substr(1));
          if (number > highestNumber) {
            highestNumber = number;
          }
        } else {
          // Matcher eksakt slug uten count
          if (highestNumber === 0) {
            highestNumber = 1;
          }
        }
      }
    });
    if (highestNumber === 0) {
      return myslug;
    } else {
      return `${myslug}-${highestNumber + 1}`
    }
  })
}
