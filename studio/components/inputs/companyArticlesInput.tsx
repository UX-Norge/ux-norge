import React, { useCallback, useEffect, useState } from "react";
import { Box, Card, Flex, Switch, Text } from "@sanity/ui";
import { IntentLink } from "sanity/router";
import { StringInputProps, useClient, useFormValue } from "sanity";

type CompanyArticle = {
  _id: string;
  title?: string;
  hideOnPartnerPage?: boolean;
};

export const CompanyArticlesInput: React.FC<StringInputProps> = () => {
  const documentId = useFormValue(["_id"]) as string | undefined;
  const client = useClient({ apiVersion: "2024-01-15" });
  const [articles, setArticles] = useState<CompanyArticle[]>([]);
  const [loading, setLoading] = useState(false);

  const companyId = documentId?.replace(/^drafts\./, "");

  const loadArticles = useCallback(() => {
    if (!companyId) return;
    setLoading(true);
    client
      .fetch<CompanyArticle[]>(
        `*[_type == "article" && company._ref == $companyId && !(_id in path("drafts.**"))] | order(publishedAt desc) {
          _id,
          title,
          hideOnPartnerPage
        }`,
        { companyId }
      )
      .then(setArticles)
      .finally(() => setLoading(false));
  }, [client, companyId]);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const toggleHide = async (article: CompanyArticle) => {
    const nextValue = !article.hideOnPartnerPage;
    await client
      .patch(article._id)
      .set({ hideOnPartnerPage: nextValue })
      .commit();
    setArticles((current) =>
      current.map((item) =>
        item._id === article._id
          ? { ...item, hideOnPartnerPage: nextValue }
          : item
      )
    );
  };

  if (loading && articles.length === 0) {
    return <Text muted>Henter artikler…</Text>;
  }

  if (articles.length === 0) {
    return <Text muted>Ingen artikler knyttet til denne bedriften.</Text>;
  }

  return (
    <Card border radius={2} padding={3}>
      <Flex direction="column" gap={3}>
        {articles.map((article) => (
          <Flex
            key={article._id}
            align="center"
            justify="space-between"
            gap={3}
          >
            <Box flex={1}>
              <Text size={1}>
                <IntentLink
                  intent="edit"
                  params={{ id: article._id, type: "article" }}
                  style={{ color: "inherit" }}
                >
                  {article.title || "Uten tittel"}
                </IntentLink>
              </Text>
            </Box>
            <Flex align="center" gap={2}>
              <Switch
                checked={Boolean(article.hideOnPartnerPage)}
                onChange={() => toggleHide(article)}
              />
              <Text size={1}>Skjul artikkel</Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Card>
  );
};
