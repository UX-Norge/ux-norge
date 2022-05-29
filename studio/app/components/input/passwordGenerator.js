import { withDocument } from "part:@sanity/form-builder";

import React, { useRef, useState } from "react";
import FormField from "part:@sanity/components/formfields/default";
import Input from "part:@sanity/components/textinputs/default";
("part:@sanity/components/textinputs/default");
import Button from "part:@sanity/components/buttons/default";

import PatchEvent, { set, unset } from "part:@sanity/form-builder/patch-event";

const createPatchFrom = (value) =>
  PatchEvent.from(value === "" ? unset() : set(String(value)));

const PasswordCodeGenerator = React.forwardRef((props, ref) => {
  const { type, value, document, onChange } = props;

  const codeGenerator = (length) => {
    var randomChars = "0123456789";
    var result = "";
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    onChange(createPatchFrom(result));
  };
  const handleChange = (event) => {
    onChange(createPatchFrom(event.target.value));
  };

  return (
    <FormField label={type.title}>
      <div style={{ display: "flex", gap: "16px" }}>
        <Input value={value} readonly />
        <Button inverted disabled={value} onClick={() => codeGenerator(6)}>
          Generer
        </Button>
      </div>
    </FormField>
  );
});

export default withDocument(PasswordCodeGenerator);
