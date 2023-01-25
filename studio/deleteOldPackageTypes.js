const { client } = require("./app/lib/helpers");

client
  .delete({
    query: '*[_id == "drafts.40172aaa-3266-43ca-82df-5e8297e202a5"][0...999]',
  })
  .then(console.log)
  .catch(console.log);
