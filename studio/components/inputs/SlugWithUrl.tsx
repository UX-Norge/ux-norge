import React, { useState } from "react";
import { Button, Flex, Stack, Text } from "@sanity/ui";
import { FiCopy } from "react-icons/fi";
import { SlugInputProps, useFormValue } from "sanity";
import { getRoute } from "../../../web/src/lib/getRoute";
import { RouteTypes } from "@Types";

const SITE_URL = "https://uxnorge.no";

const getFullUrl = (documentType: string, slug?: string) => {
  if (!slug) return null;

  const routeType = (documentType === "doc" ? "page" : documentType) as RouteTypes;
  const path = getRoute(routeType, slug);
  if (!path) return null;

  return `${SITE_URL}${path.replace(/\/$/, "")}`;
};

export const SlugWithUrl: React.FC<SlugInputProps> = (props) => {
  const documentType = useFormValue(["_type"]) as string | undefined;
  const slug = props.value?.current;
  const fullUrl = documentType ? getFullUrl(documentType, slug) : null;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!fullUrl) return;

    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Stack space={3}>
      {props.renderDefault(props)}
      {fullUrl && (
        <Flex align="center" gap={2}>
          <Text size={1} muted style={{ flex: 1 }}>
            {fullUrl}
          </Text>
          <Button
            icon={FiCopy}
            mode="bleed"
            tone="primary"
            title="Kopier URL"
            onClick={handleCopy}
          />
          {copied && (
            <Text size={1} muted>
              Kopiert!
            </Text>
          )}
        </Flex>
      )}
    </Stack>
  );
};
