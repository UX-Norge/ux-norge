import { ArticleGrid } from "@Components/ArticleGrid";
import { Article, GraphqlEdges } from "@Types";
import { Search } from "@Ui/Input/Search";
import { PageWrapper } from "@Ui/Layout";
import { GetServerData, navigate } from "gatsby";
import * as React from "react";
import { sanityClient } from "../api-lib/sanity.client";

interface DataProps {
  allSanityAd: GraphqlEdges;
}

export const JobPage = ({
  serverData: { searchHits },
  location: { search },
  ...props
}: {
  serverData: { searchHits: Article[] };
}) => {
  const searchTerm = decodeURI(search.split("=")[1]);

  const onSearch = (searchTerm: string) => {
    navigate(`/sok?searchTerm=${searchTerm}`);
  };

  return (
    <PageWrapper hideSearch={true}>
      <div className="mx-auto min-h-screen max-w-page p-24">
        <div className="mx-auto mb-32 max-w-sm">
          <Search
            initialValue={searchTerm}
            placeholder="Finn en artikkel"
            onSubmit={onSearch}
          />
        </div>
        {searchHits.length > 0 ? (
          <>
            <p className="mb-24">Viser {searchHits.length} treff</p>
            <ArticleGrid articles={searchHits} />
          </>
        ) : (
          <div>Ingen treff på "{searchTerm}"</div>
        )}
      </div>
    </PageWrapper>
  );
};

export const getServerData: GetServerData<{ searchHits: Article[] }> = async ({
  query,
}) => {
  const searchHits = await sanityClient.fetch(
    `*[_type == "article" && !(_id in path("drafts.**")) && 
        (
          _score > 0  || 
          author->name match "*" + $searchTerm + "*" ||
          category->name match "*" + $searchTerm + "*"
        )
      ]
    | score(
      boost(title match $searchTerm, 100),
      boost(title match "*" + $searchTerm + "*", 10),
      boost(description match $searchTerm, 1),
    )
    | order(_score desc) 
    {
      title,
      description,
      mainImage,
      category->{name},
      slug{
        current
      },
      "authorName": author->name,
    }`,
    {
      searchTerm: query && query.searchTerm,
    }
  );

  return {
    props: {
      searchHits,
    },
  };
};

export default JobPage;
