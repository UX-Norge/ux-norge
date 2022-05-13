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

  const submitEmail = (e: React.FormEvent<HTMLFormElement> | undefined) => {};
  {
    /* <form action="https://uxnorge.us1.list-manage.com/subscribe/post?u=d1a65b919a427cf7a70d46d26&amp;id=bd4c3e25bb" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate="">
    <div id="mc_embed_signup_scroll">
	    <br>
	     <br>
	<h2>Abonner på vårt nyhetsbrev</h2>
<div class="mc-field-group">
	<label for="mce-EMAIL">E-postadresse
</label>
	<input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
</div>
	<div id="mce-responses" class="clear">
		<div class="response" id="mce-error-response" style="display:none"></div>
		<div class="response" id="mce-success-response" style="display:none"></div>
	</div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_d1a65b919a427cf7a70d46d26_bd4c3e25bb" tabindex="-1" value=""></div>
    <div class="clear"><input type="submit" value="Abonner" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
    </div>
</form> */
  }
  return (
    <form
      action="https://uxnorge.us1.list-manage.com/subscribe/post?u=d1a65b919a427cf7a70d46d26&amp;id=bd4c3e25bb"
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      target="_blank"
      noValidate={false}
      className="relative mx-auto flex w-full max-w-page gap-48 rounded-t-lg bg-primary-400 p-32 md:my-48 md:rounded-sm"
      onSubmit={submitEmail}
    >
      <VectorIllustrations.MonoDoor
        foregroundColor="var(--color-primary-400)"
        backgroundColor="var(--color-primary-800)"
        className="absolute bottom-0 right-48 hidden h-3/4 md:block"
      />
      <div className="w-full">
        <Heading2 className="mb-16 max-w-prose text-h1">{title}</Heading2>
        {text && <Body1>{text}</Body1>}
        <div className=" max-w-md space-y-16">
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
          <Button
            onClick={submitEmail}
            type="submit"
            color="primary"
            name="subscribe"
          >
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
