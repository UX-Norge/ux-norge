export default {
  title: "Block Content",
  name: "articleContent",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Overskrift", value: "h2" },
        { title: "Underoverskrift", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
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
    {
      type: "articleImage",
      render: "ArticleImageRenderer",
    },
    {
      name: "youtube",
      type: "object",
      fields: [
        { name: "url", type: "url", validation: (Rule) => Rule.required() },
        {
          name: "title",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    { type: "inlineRelatedArticle" },
    { type: "factBox" },
  ],
};
