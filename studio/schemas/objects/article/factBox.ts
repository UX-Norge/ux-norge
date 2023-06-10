import { FactBox } from "../../../components/render/FactBox";

export default {
  name: "factBox",
  title: "Faktaboks",
  type: "object",
  fields: [
    {
      name: "content",
      title: "content",
      type: "array",
      of: [
        {
          title: "Block",
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
  components: {
    preview: FactBox,
  },
};
