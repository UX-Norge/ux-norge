import { VectorIllustrations } from "@Images/VectorIllustrations";
import { Button } from "@Ui/Button";
import { Input } from "@Ui/Input";
import { BlockContent, Body1, Heading2, Heading3 } from "@Ui/Typography";
import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";

interface IProps {}

export const Newsletter: React.FC<IProps> = ({}) => {
  const [email, setEmail] = React.useState("");
  const {
    sanityNewsletterSignupForm: { title, text, placeholder, privacyText },
  } = useStaticQuery(graphql`
    query {
      sanityNewsletterSignupForm(_id: { eq: "newsletterSignupForm" }) {
        title
        text
        placeholder
        buttonText
        privacyText: _rawPrivacyText
      }
    }
  `);

  return (
    <form
      action="https://uxnorge.us1.list-manage.com/subscribe/post?u=d1a65b919a427cf7a70d46d26&amp;id=bd4c3e25bb"
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      target="_blank"
      noValidate={false}
      className="mx-auto w-full gap-48 bg-primary-400"
    >
      <div className="relative mx-auto flex max-w-page">
        <VectorIllustrations.MonoDoor
          foregroundColor="var(--color-primary-400)"
          backgroundColor="var(--color-primary-800)"
          className="absolute -bottom-2 right-48 hidden h-3/4 md:block"
        />
        <div className="w-full p-32">
          <Heading3 className="mb-16 text-h1 sm:max-w-prose">{title}</Heading3>
          {text && <Body1>{text}</Body1>}
          <div className=" max-w-md">
            <Input
              placeholder={placeholder}
              value={email}
              required
              type="email"
              name="EMAIL"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <Button type="submit" color="primary" name="subscribe">
              Bli med
            </Button>
          </div>
          <div className="prose mt-16 max-w-none pr-80 text-gray-900 prose-p:m-0">
            <BlockContent blocks={privacyText} />
          </div>
        </div>
      </div>
    </form>
  );
};
