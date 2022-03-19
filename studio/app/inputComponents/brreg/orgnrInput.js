import { withDocument } from "part:@sanity/form-builder";

import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import FormField from "part:@sanity/components/formfields/default";
import Input from "part:@sanity/components/textinputs/default";
import Badge from "part:@sanity/components/badges/default";
import Button from "part:@sanity/components/buttons/default";
import listItemStyle from "part:@sanity/components/lists/default-item-style";

import PatchEvent, { set, unset } from "part:@sanity/form-builder/patch-event";

const createPatchFrom = (value) =>
  PatchEvent.from(value === "" ? unset() : set(Number(value)));

const getToday = () => {
  const date = new Date();
  const leadingZeros = (string) => ("0" + string).slice(-2);
  return `${date.getFullYear()}-${leadingZeros(
    date.getMonth() + 1
  )}-${leadingZeros(date.getDate())}`;
};

const OrgnrInput = React.forwardRef((props, ref) => {
  console.log(props);

  const { type, value, document, onChange } = props;
  const [error, setError] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const today = getToday();
  const url = `https://data.brreg.no/enhetsregisteret/api/enheter?navn=${document.name}&fraRegistreringsdatoEnhetsregisteret=1950-10-20&tilRegistreringsdatoEnhetsregisteret=${today}&konkurs=false`;

  const getOrgnr = () => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setResult(data._embedded ? data._embedded.enheter : []);
        !data._embedded && setError("Fant ingen");
      });
  };

  const setOrgnr = (orgnr) => {
    onChange(createPatchFrom(orgnr));
    setResult([]);
  };

  const handleChange = (event) => {
    onChange(createPatchFrom(event.target.value));
    setResult([]);
  };

  return (
    <FormField label={type.title}>
      <div>
        <Input type="number" value={value} onChange={handleChange} />
        <Button inverted loading={loading} onClick={getOrgnr}>
          Hent org.nr
        </Button>
      </div>
      <div>
        {result.map((company) => (
          <Button
            kind="simple"
            inverted
            onClick={() => setOrgnr(company.organisasjonsnummer)}
          >
            {company.navn}, {company.organisasjonsnummer}
          </Button>
        ))}
      </div>
      <p>{error}</p>
    </FormField>
  );
});

export default withDocument(OrgnrInput);
