import { webhooks } from '../utils/webhooks';

export default async function sendVerificationRequest({
  identifier: email,
  url
}) {
  const { host } = new URL(url);

  webhooks.post('/sendVerifyMail', {
    url,
    host,
    email,
  });
  return true;
}
