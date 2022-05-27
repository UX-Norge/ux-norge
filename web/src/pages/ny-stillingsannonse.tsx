import { Link } from "@Components/Link";
import { cleanGraphqlArray } from "@Lib/helpers";
import { Ad, GraphqlEdges } from "@Types";
import { Input } from "@Ui/Input";
import { DateInput } from "@Ui/Input/DateInput";
import { Textarea } from "@Ui/Input/Input";
import { PageWrapper } from "@Ui/Layout";
import { Body1, Heading1 } from "@Ui/Typography";
import { graphql, PageProps } from "gatsby";
import * as React from "react";

interface DataProps {
  allSanityCompany: GraphqlEdges;
}

const NewAd: React.FC<PageProps<DataProps>> = ({ data }) => {
  const [ad, setAd] = React.useState<Partial<Ad>>({
    title: "",
    description: "",
    body: [],
    deadline: "",
    link: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    location: [],
  });
  const companies = cleanGraphqlArray(data.allSanityCompany);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAd({
      ...ad,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PageWrapper>
      <main className="mx-auto max-w-prose">
        <Heading1>Ny stillingsannonse</Heading1>
        <Body1 className="prose mb-48">
          Hvis bedriften din aldri har annonsert på UXNorge.no, gå inn på{" "}
          <Link type="page" path="annonse">
            Annonsering
          </Link>{" "}
          for å få deg en konto
        </Body1>
        <Input
          name="title"
          value={ad.title}
          onChange={onChange}
          label="Tittel"
        />
        <Textarea
          name="description"
          type="textarea"
          label=""
          value={ad.description}
          onChange={onChange}
        />
        <DateInput
          name="startDate"
          label="Startdato"
          value={ad.startDate}
          onChange={onChange}
        />
      </main>
    </PageWrapper>
  );
};

export const query = graphql`
  query NewAdQuery {
    allSanityCompany {
      edges {
        node {
          name
        }
      }
    }
  }
`;

export default NewAd;
