import * as React from "react";
import EditorJS from "@editorjs/editorjs";
import List from "@editorjs/list";
import Header from "@editorjs/header";
import { inputClassNames } from "./lib/helpers";
import { classNames } from "@Lib/helpers";
import { InputWrapper } from "./InputWrapper";
const edjsHTML = require("editorjs-html");

interface BlockContentInputProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BlockContentInput: React.FC<BlockContentInputProps> = ({
  name,
  onChange,
}) => {
  React.useEffect(() => {
    const edjsParser = edjsHTML();
    const editor = new EditorJS({
      placeholder: "Teksten på annonsen din...",
      tools: {
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        header: {
          class: Header,
          config: {
            placeholder: "Enter a header",
            levels: [2, 3],
            defaultLevel: 2,
          },
        },
      },
      onChange: (api, event) => {
        editor.save().then((outputData) => {
          const html = edjsParser.parse(outputData);
          onChange({ target: { value: html, name } });
        });

        console.log("Now I know that Editor's content changed!", event);
      },
    });
    return () => editor.destroy();
  }, []);
  return (
    <InputWrapper label="Annonseinnhold" id="editorjs" required>
      <div
        id="editorjs"
        className={classNames(inputClassNames.all, "px-32")}
      ></div>
    </InputWrapper>
  );
};
