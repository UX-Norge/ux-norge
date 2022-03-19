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

const FormalNameInput = React.forwardRef((props, ref) => {
  const { type, value, document, onChange } = props;
  console.log(document);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const url = `https://data.brreg.no/enhetsregisteret/api/enheter/${document.orgnr}`;

  const getFormalName = () => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        onChange(createPatchFrom(data.navn));
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
          onClick={getFormalName}
        >
          Hent formelt navn
        </Button>
      </div>
      <p>{error}</p>
    </FormField>
  );
});

export default withDocument(FormalNameInput);
