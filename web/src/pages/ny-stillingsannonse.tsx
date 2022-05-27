import { Link } from "@Components/Link";
import { cleanGraphqlArray } from "@Lib/helpers";
import { Ad, AdPackageType, GraphqlEdges } from "@Types";
import { Button } from "@Ui/Button";
import { SearchDropdown, Dropdown, Input } from "@Ui/Input";
import { DateInput } from "@Ui/Input";
import { Textarea } from "@Ui/Input";
import { PageWrapper } from "@Ui/Layout";
import { Body1, Heading1, Heading3, Heading4 } from "@Ui/Typography";
import { graphql, PageProps } from "gatsby";
import * as React from "react";

interface DataProps {
  allSanityCompany: GraphqlEdges;
  allSanityAdPackageType: GraphqlEdges;
}

const NewAd: React.FC<PageProps<DataProps>> = ({ data }) => {
  const companies = cleanGraphqlArray(data.allSanityCompany).map((company) => ({
    value: company._id,
    label: company.name,
  }));
  const packageTypes = cleanGraphqlArray(
    data.allSanityAdPackageType
  ) as AdPackageType[];

  const [ad, setAd] = React.useState({
    title: "Titteltest",
    description: "En litt lengre beskrivelse",
    body: [],
    link: "",
    contactName: "Don Norman",
    contactPhone: "47244448",
    contactEmail: "tobias@umble.no",
    location: "Trondheim",
    packageType: "",
    advertiser: "",
    jobType: "fulltid",
    code: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAd({
      ...ad,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const response = fetch(`/api/create-ad`, {
      method: `POST`,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ad),
    }).then((res) => res.json());
  };

  const currenetPackageType = packageTypes.find(
    ({ _id }) => (_id === ad.packageType || {}) as AdPackageType
  );

  return (
    <PageWrapper>
      <form
        className="mx-auto max-w-prose"
        onSubmit={onSubmit}
        method="POST"
        action="/api/create-ad"
      >
        <Heading1>Ny stillingsannonse</Heading1>
        <Body1 className="prose mb-48">
          Hvis bedriften din aldri har annonsert på UXNorge.no, gå inn på{" "}
          <Link type="page" path="annonse">
            Annonsering
          </Link>
          for å få deg en konto
        </Body1>
        <div className="mb-24 rounded-xs bg-yellow-100 p-24">
          <Heading3>Velg annonsetype</Heading3>
          <div className="grid grid-cols-2 gap-16">
            <SearchDropdown
              name="advertiser"
              value={ad.advertiser}
              onChange={onChange}
              label="Bedrift"
              options={companies}
              helper="Finner du ikke bedriften din? Se teksten over"
              required
            />
            <Input
              type="text"
              label="Firmakode"
              placeholder="842912"
              name="code"
              value={ad.code}
              onChange={onChange}
              helper="Har du ikke firmakode? Se teksten over"
              required
            />
          </div>
          <Dropdown
            name="packageType"
            value={ad.packageType}
            label="Annonsepakke"
            options={packageTypes.map((packageType) => ({
              value: packageType._id,
              label: `${packageType.name} (${packageType.price} kr, ${packageType.duration} dager)`,
            }))}
            onChange={onChange}
          />
          <Body1>Pris: {currenetPackageType.price} NOK ekskl. MVA</Body1>
          <Body1>Varighet: {currenetPackageType.duration} dager</Body1>
          <br />
        </div>
        <Heading3>Annonseinnhold</Heading3>
        <Input
          name="title"
          value={ad.title}
          onChange={onChange}
          label="Tittel"
          required
        />
        <Textarea
          name="description"
          type="textarea"
          label="Kort beskrivelse"
          value={ad.description}
          onChange={onChange}
          required
        />
        <Input
          type="text"
          label="Arbeidssted"
          name="location"
          value={ad.location}
          placeholder="Oslo, Bergen, Trondheim"
          onChange={onChange}
          helper="Kommaseparer om du har flere"
          required
        />
        <Dropdown
          name="jobType"
          value={ad.jobType}
          options={[
            { label: "Fulltid", value: "fulltid" },
            { label: "Deltid", value: "deltid" },
            { label: "Sommerjobb", value: "sommerjobb" },
          ]}
          onChange={onChange}
        />
        <Input
          type="text"
          label="Lenke til annonse/søkeportal"
          placeholder="https://www.bedriftsside/annonse"
          name="link"
          value={ad.link}
          onChange={onChange}
        />
        <br />
        <Heading4>Kontaktperson:</Heading4>
        <Input
          type="text"
          label="Navn"
          name="contactName"
          value={ad.contactName}
          placeholder="Don Norman"
          onChange={onChange}
          required
        />
        <Input
          type="text"
          label="E-post"
          name="contactEmail"
          value={ad.contactEmail}
          placeholder="Don Norman"
          onChange={onChange}
          required
        />
        <Input
          type="text"
          label="Mobilnummer"
          name="contactPhone"
          value={ad.contactPhone}
          placeholder="Don Norman"
          onChange={onChange}
        />
        <Button type="submit">Send inn forespørsel</Button>
      </form>
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
    allSanityAdPackageType {
      edges {
        node {
          _id
          name
          duration
          price
        }
      }
    }
  }
`;

export default NewAd;
