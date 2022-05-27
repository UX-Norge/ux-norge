import { Link } from "@Components/Link";
import { cleanGraphqlArray } from "@Lib/helpers";
import { Ad, GraphqlEdges } from "@Types";
import { Dropdown, Input } from "@Ui/Input";
import { DateInput } from "@Ui/Input";
import { Textarea } from "@Ui/Input";
import { PageWrapper } from "@Ui/Layout";
import { Body1, Heading1 } from "@Ui/Typography";
import { graphql, PageProps } from "gatsby";
import * as React from "react";

interface DataProps {
  allSanityCompany: GraphqlEdges;
}

const NewAd: React.FC<PageProps<DataProps>> = ({ data }) => {
  const companies = cleanGraphqlArray(data.allSanityCompany).map((company) => ({
    value: company._id,
    label: company.name,
  }));

  const [ad, setAd] = React.useState<Partial<Ad>>({
    title: "",
    description: "",
    body: [],
    startDate: new Date(),
    deadline: "",
    link: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    location: [],
    advertiser: "df",
  });

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
          label="Kort beskrivelse"
          value={ad.description}
          onChange={onChange}
        />
        <DateInput
          name="startDate"
          label="Startdato"
          value={ad.startDate}
          onChange={onChange}
        />
        <div className="grid grid-cols-2 gap-16">
          <Dropdown
            name="advertiser"
            value={ad.advertiser}
            onChange={onChange}
            label="Bedrift"
            options={companies}
            helper="Finner du ikke bedriften din? Se teksten over"
          />
          <Input
            type="text"
            label="Firmakode"
            placeholder="842912"
            name="link"
            value={ad.link}
            onChange={onChange}
            helper="Har du ikke firmakode? Se teksten over"
          />
        </div>
        <Input
          type="text"
          label="Lenke til annonse/søkeportal"
          name="link"
          value={ad.link}
          onChange={onChange}
        />
        <Input
          type="text"
          label="Arbeidssted"
          name="location"
          value={ad.location}
          placeholder="Oslo, Bergen, Trondheim"
          onChange={onChange}
          helper="Kommaseparer om du har flere"
        />
        <Input type="text" name="link" value={ad.link} onChange={onChange} />
      </main>
    </PageWrapper>
  );
};

export const query = graphql`
  query NewAdQuery {
    allSanityCompany {
      edges {
        node {
          _id
          name
        }
      }
    }
  }
`;

export default NewAd;
