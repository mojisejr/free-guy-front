import { increaseMintedAmounts, markTokenAsMinted } from "./get-token-meta";

export default async function handler(req, res) {
  const tokenIds = req.body.tokenIds;
  const hash = req.body.hash;
  const minter = req.body.minter;

  const minted = await markTokenAsMinted(tokenIds, hash, minter);
  await increaseMintedAmounts(tokenIds.length);

  res.status(200).json({ minted });
}
