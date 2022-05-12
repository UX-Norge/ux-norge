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
    sanityNewsletterSignupForm: {
      title,
      text,
      placeholder,
      buttonText,
      privacyText,
    },
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

  const submitEmail = (e: React.FormEvent<HTMLFormElement> | undefined) => {
    e?.preventDefault();
    if (!email) return null;
    console.log(email);
  };

  return (
    <form
      className="relative mx-auto flex w-full max-w-page gap-48 bg-primary-400 p-32 md:my-48 md:rounded-sm"
      onSubmit={submitEmail}
    >
      <VectorIllustrations.MonoDoor
        color="var(--color-primary-400)"
        className="w-80"
      />
      <div className="w-full">
        <Heading2 className="text-h1">{title}</Heading2>
        <Body1>{text}</Body1>
        <div className="flex w-3/4 gap-24">
          <Input
            placeholder={placeholder}
            value={email}
            required
            type="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <Button onClick={submitEmail} type="submit">
            Bli med
          </Button>
        </div>
        <div className="prose mt-8 pr-80 text-gray-900 prose-p:m-0">
          <BlockContent blocks={privacyText} />
        </div>
      </div>
    </form>
  );
};
