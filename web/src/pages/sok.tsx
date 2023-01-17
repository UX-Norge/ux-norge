import { ArticleGrid } from "@Components/ArticleGrid";
import { Article, GraphqlEdges } from "@Types";
import { PageWrapper } from "@Ui/Layout";
import { GetServerData } from "gatsby";
import * as React from "react";
import { sanityClient } from "../api-lib/sanity.client";

interface DataProps {
  allSanityAd: GraphqlEdges;
}

export const JobPage = ({
  serverData: { searchHits },
}: {
  serverData: { searchHits: Article[] };
}) => {
  return (
    <PageWrapper>
      <div className="mx-auto max-w-page p-24">
        <ArticleGrid articles={searchHits} />
      </div>
    </PageWrapper>
  );
};

export const getServerData: GetServerData<{ searchHits: Article[] }> = async ({
  query,
}) => {
  const searchHits = await sanityClient.fetch(
    `*[_type == "article" && _score > 0 && !(_id in path("drafts.**"))]
    | score(
      boost(title match $searchTerm, 100),
      boost(authorName match "*" + $searchTerm + "*", 20),
      boost(title match "*" + $searchTerm + "*", 10),
      boost(description match $searchTerm, 1)
    )
    | order(_score desc) 
    {
      title,
      description,
      mainImage,
      slug{
        current
      },
      "authorName": author->name,
    }`,
    {
      searchTerm: query && query.searchTerm,
    }
  );

  console.log(searchHits);

  return {
    props: {
      searchHits,
    },
  };
};

export default JobPage;
