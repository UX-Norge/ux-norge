import { Article, Author } from "@Types";
import { pushSponsoredContentDownOnFrontPage } from "./helpers";

describe("pushSponsoredContentDownOnFrontPage", () => {
  it('Ingen artikler er sponset', () => {
    const articles = [
      { _id: '1', isSponsoredContent: false },
      { _id: '2', isSponsoredContent: false },
      { _id: '3', isSponsoredContent: false },
      { _id: '4', isSponsoredContent: false },
    ] as Article[];
    const result = pushSponsoredContentDownOnFrontPage(articles);
    expect(result).toEqual(articles);
  })

  it('Første artikkel er sponset', () => {
    const articles = [
      { _id: '1', isSponsoredContent: true },
      { _id: '2', isSponsoredContent: false },
      { _id: '3', isSponsoredContent: false },
      { _id: '4', isSponsoredContent: false },
    ] as Article[];
    const expected = [
      { _id: '2', isSponsoredContent: false },
      { _id: '3', isSponsoredContent: false },
      { _id: '1', isSponsoredContent: true },
      { _id: '4', isSponsoredContent: false },
    ] as Article[];
    const result = pushSponsoredContentDownOnFrontPage(articles);
    expect(result).toEqual(expected);
  })

  it('Andre artikkel er sponset', () => {
    const articles = [
      { _id: '1', isSponsoredContent: false },
      { _id: '2', isSponsoredContent: true },
      { _id: '3', isSponsoredContent: false },
      { _id: '4', isSponsoredContent: false },
    ] as Article[];
    const expected = [
      { _id: '1', isSponsoredContent: false },
      { _id: '3', isSponsoredContent: false },
      { _id: '2', isSponsoredContent: true },
      { _id: '4', isSponsoredContent: false },
    ] as Article[];
    const result = pushSponsoredContentDownOnFrontPage(articles);
    expect(result).toEqual(expected);
  })
  it('To første artikler er sponset', () => {
    const articles = [
      { _id: '1', isSponsoredContent: true },
      { _id: '2', isSponsoredContent: true },
      { _id: '3', isSponsoredContent: false },
      { _id: '4', isSponsoredContent: false },
    ] as Article[];
    const expected = [
      { _id: '3', isSponsoredContent: false },
      { _id: '4', isSponsoredContent: false },
      { _id: '1', isSponsoredContent: true },
      { _id: '2', isSponsoredContent: true },
    ] as Article[];
    const result = pushSponsoredContentDownOnFrontPage(articles);
    expect(result).toEqual(expected);
  })
})

// describe.skip("formatArticleAuthors", () => {
//   const princessPeach = {
//     name: "Princess Peach Toadstool",
//     company: {
//       name: "UX Norge",
//     },
//   } as Author;

//   const toad = {
//     name: "Toad",
//     company: {
//       name: "UX Norge",
//     },
//   } as Author;

//   const mario = {
//     name: "Mario Mario",
//     company: {
//       name: "Super Mario Bros",
//     },
//   } as Author;

//   const luigi = {
//     name: "Luigi Mario",
//     company: {
//       name: "Super Mario Bros",
//     },
//   } as Author;

//   const bowser = {
//     name: "King Bowser Koopa",
//   } as Author;

//   it("should return only name when single author from UX Norge", () => {
//     const articleAuthors = formatArticleAuthors([princessPeach]);
//     expect(articleAuthors).toBe(princessPeach.name);
//   });

//   it("should return names when multiple authors from UX Norge", () => {
//     const authors = [princessPeach, toad];
//     const articleAuthors = formatArticleAuthors(authors);
//     expect(articleAuthors).toBe(`${princessPeach.name}, ${toad.name}`);
//   });

//   it("should return name and company when single external author", () => {
//     const articleAuthors = formatArticleAuthors([mario]);
//     expect(articleAuthors).toBe(`${mario.name} • ${mario.company?.name}`);
//   });

//   it("should return names followed by single company name when multiple external authors from same company", () => {
//     const authors = [mario, luigi];
//     const articleAuthors = formatArticleAuthors(authors);
//     expect(articleAuthors).toBe(
//       `${mario.name}, ${luigi.name} • ${mario.company?.name}`
//     );
//   });

//   it("should return names and companies when multiple authors from different companies(includes UX Norge)", () => {
//     const authors = [mario, princessPeach];
//     const articleAuthors = formatArticleAuthors(authors);
//     expect(articleAuthors).toBe(
//       `${mario.name} • ${mario.company?.name}, ${princessPeach.name} • ${princessPeach.company?.name}`
//     );
//   });

//   it("should return name if single author without company", () => {
//     const articleAuthors = formatArticleAuthors([bowser]);
//     expect(articleAuthors).toBe(bowser.name);
//   });
// });
