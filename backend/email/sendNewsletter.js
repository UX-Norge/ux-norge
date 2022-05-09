require("dotenv").config();
const mailchimp = require("@mailchimp/mailchimp_marketing");

const NewsletterRecipientListId = "e50b0d53a6";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: "us17",
});

async function ping() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

async function getAllCampaigns() {
  const response = await mailchimp.campaigns.list();
  console.log(response);
}

async function getLists() {
  const response = await mailchimp.lists.getAllLists();
  console.log(response);
}

async function getTemplates() {
  const response = await mailchimp.templates.list();
  console.log(response);
}

async function sendTestEmail(campaignId) {
  try {
    const response = await mailchimp.campaigns.sendTestEmail(campaignId, {
      test_emails: ["tobias@umble.no"],
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

async function createCampaign() {
  try {
    const { id } = await mailchimp.campaigns.create({
      type: "regular",
      recipients: {
        list_id: NewsletterRecipientListId,
      },
      settings: {
        subject_line: "Test Campaign",
        from_name: "UX Norge",
        reply_to: "tobias.wulvik@gmail.com",
        inline_css: true,
      },
    });
    const response = await mailchimp.campaigns.setContent(id, {
      html: "<h1>Hello World</h1>",
    });
    return id;
  } catch (err) {
    console.log(err);
  }
}

async function sendCampaign() {
  ping();
  const campaignId = await createCampaign();

  if (process.env.NODE_ENV === "production") {
    try {
      const response = await mailchimp.campaigns.send(campaignId);
      console.log("Email sent!");
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      sendTestEmail(campaignId);
    } catch (err) {
      console.log(err);
    }
  }
}
sendCampaign();
module.exports = { sendCampaign };
