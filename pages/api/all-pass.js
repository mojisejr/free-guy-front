import { getAllPasses } from "./get-token-meta";

export default async function handler(req, res) {
  const passes = await getAllPasses();

  res.status(200).json({ passes });
}
