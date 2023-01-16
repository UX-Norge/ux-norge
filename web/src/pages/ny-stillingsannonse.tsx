import { Link } from "@Components/Link";
import { cleanGraphqlArray } from "@Lib/helpers";
import { Ad, AdPackageType, GraphqlEdges } from "@Types";
import { Button } from "@Ui/Button";
import { SearchDropdown, Dropdown, Input } from "@Ui/Input";
import { DateInput } from "@Ui/Input";
import { Textarea } from "@Ui/Input";
import { BlockContentInput } from "@Ui/Input/BlockContentInput";
import { PageWrapper } from "@Ui/Layout";
import { Body1, Body2, Heading1, Heading3, Heading4 } from "@Ui/Typography";
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
  const packageTypes = cleanGraphqlArray(data.allSanityAdPackageType).filter(
    (packageType) => packageType.duration
  ) as AdPackageType[];

  const [ad, setAd] = React.useState({
    title: "",
    description: "",
    body: [],
    link: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    location: "",
    packageType: "",
    advertiser: "",
    jobType: "fulltid",
    code: "",
  });
  const [selectedPackageType, setSelectedPackageType] =
    React.useState<AdPackageType | null>(packageTypes[0]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAd({
      ...ad,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "packageType") {
      console.log(e.target.name, e.target.value);

      const newPackageType = packageTypes.find(
        ({ _id }) => _id === e.target.value
      );
      console.log(newPackageType);

      setSelectedPackageType(newPackageType || null);
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(ad);

    const response = fetch(`/api/create-ad`, {
      method: `POST`,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ad),
    }).then((res) => res.json());
  };

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
          </Link>{" "}
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
          label="Jobbtype"
          required
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
        {/* <BlockContentInput onChange={onChange} name="body" /> */}
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
        <div className="mt-32">
          <Button type="submit">Send inn forespørsel</Button>
          <Body2 className="mt-8">
            Pris: {selectedPackageType?.price} NOK ekskl. MVA
          </Body2>
          <Body2>Varighet: {selectedPackageType?.duration} dager</Body2>
        </div>
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
