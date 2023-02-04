import { createNewPass } from "./get-token-meta";

export default async function handler(req, res) {
  const fingerprint = req.body.fingerprint;
  const redeemer = req.body.redeemer;

  const marked = await createNewPass(fingerprint, redeemer);

  res.status(200).json({ marked });
}
