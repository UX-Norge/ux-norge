export const cleanGraphqlArray = (edges: { node: any }[]): any[] | null => {
  if (!edges) return null;
  console.log(edges);

  return edges.map(({ node }) => node);
};
