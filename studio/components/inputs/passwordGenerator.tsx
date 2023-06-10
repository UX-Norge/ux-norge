import React from "react";
import { Inline, Button } from "@sanity/ui";
import { StringInputProps, PatchEvent, unset, set } from "sanity";

const codeGenerator = (length: number): string => {
  var randomChars = "0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }

  return result;
};

const createPatchFrom = (value) =>
  PatchEvent.from(value === "" ? unset() : set(String(value)));

export const PasswordGenerator: React.FC<StringInputProps> = (props) => {
  const onClick = () => {
    props.onChange(createPatchFrom(codeGenerator(6)));
  };

  return (
    <Inline space={3}>
      {props.renderDefault(props)}
      <Button mode="ghost" disabled={Boolean(props.value)} onClick={onClick}>
        Generer
      </Button>
    </Inline>
  );
};
