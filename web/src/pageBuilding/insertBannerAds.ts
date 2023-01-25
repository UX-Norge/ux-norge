export const insertBannerAds = (blocks: any[], bannerAds: Ad[]) => {
  const bannerAdLength = bannerAds.length;
  const titleIndexes = blocks
    .reduce(
      (out, item, index) =>
        item.style?.includes("h2") ? out.concat(index) : out,
      []
    )
    .splice(1) // Removes the first headline
    .filter((_, index: number) => index % 2 === 0); // Every other title

  for (let i = 0; i < bannerAdLength && i < titleIndexes.length; i++) {
    const ad = {
      _key: `ad-${i}`,
      _type: "bannerAd",
      ...bannerAds[i],
    };
    const newIndex = titleIndexes[i];
    const shift = i; // Shift the index by the number of banner ads previously inserted
    newIndex && blocks.splice(newIndex + shift, 0, ad);
  }
  return blocks;
};
