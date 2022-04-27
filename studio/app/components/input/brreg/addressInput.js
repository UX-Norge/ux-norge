import { withDocument } from "part:@sanity/form-builder";

import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import FormField from "part:@sanity/components/formfields/default";
import Input from "part:@sanity/components/textinputs/default";
import List from "part:@sanity/components/lists/default";
("part:@sanity/components/textinputs/default");
import Button from "part:@sanity/components/buttons/default";
import listItemStyle from "part:@sanity/components/lists/default-item-style";

import PatchEvent, { set, unset } from "part:@sanity/form-builder/patch-event";

const createPatchFrom = (value) =>
  PatchEvent.from(value === "" ? unset() : set(String(value)));

const AddressInput = React.forwardRef((props, ref) => {
  const { type, value, document, onChange } = props;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const url = `https://data.brreg.no/enhetsregisteret/api/enheter/${document.orgnr}`;

  const getAddress = () => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        let adresse = data.forretningsadresse;
        adresse = `${adresse.adresse[0]} ${adresse.postnummer} ${adresse.kommune}`;
        onChange(createPatchFrom(adresse));
      });
  };

  const handleChange = (event) => {
    onChange(createPatchFrom(event.target.value));
  };

  return (
    <FormField label={type.title}>
      <div>
        <Input value={value} onChange={handleChange} />
        <Button
          inverted
          loading={loading}
          disable={!document.orgnr}
          onClick={getAddress}
        >
          Hent adresse
        </Button>
      </div>
      <p>{error}</p>
    </FormField>
  );
});

export default withDocument(AddressInput);
