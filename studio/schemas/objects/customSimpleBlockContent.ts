import CustomSimpleBlockContentInput from '../../components/inputs/customSimpleBlockContentInput';

export default {
  title: 'Tekst',
  name: 'customSimpleBlockContent',
  type: 'array',
  components: {
    input: CustomSimpleBlockContentInput
  },
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ['https', 'mailto'],
                  }),
              },
            ],
          },
        ],
      },
    },
  ],
};
