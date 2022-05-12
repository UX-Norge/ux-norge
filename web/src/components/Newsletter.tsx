import { VectorIllustrations } from "@Images/VectorIllustrations";
import { Button } from "@Ui/Button";
import { Input } from "@Ui/Input";
import { BlockContent, Body1, Heading3 } from "@Ui/Typography";
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
    <form className="relative bg-primary-400 p-32 pb-0" onSubmit={submitEmail}>
      <Heading3>{title}</Heading3>
      <Body1>{text}</Body1>
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
      <div className="prose pr-80 prose-p:m-0">
        <BlockContent blocks={privacyText} />
      </div>
      <VectorIllustrations.MonoDoor
        color="var(--color-primary-400)"
        className="absolute bottom-0 right-32 w-80"
      />
    </form>
  );
};
