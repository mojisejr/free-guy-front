import axios from "axios";
import { CID } from "multiformats/cid";

export async function getToBeMintedToken(tokens = [], recipient) {
  const rand =
    tokens.length <= 0
      ? 0
      : Math.floor((Math.random() * 998832) % tokens.length);
  const selectedToken = tokens[rand];
  const parsedMetadataUrl = `https://nftstorage.link/ipfs/${
    selectedToken.ipfs.split("ipfs://")[1]
  }`;

  const { data } = await axios.get(parsedMetadataUrl);
  const v1 = CID.parse(data.image.split("ipfs://")[1].split("/")[0]);
  const v0 = v1.toV0().toString();
  const imageUrl = `ipfs://${v0}/${selectedToken.token_id}.png`;

  const asset = {
    assetName: `free-guy#${selectedToken.token_id}`,
    assetQuantity: "1",
    metadata: {
      ...data,
      description: "1,111 pixel art profile pictures on Cardano",
      dna: data.dna.slice(10),
      image: imageUrl,
    },
    label: "721",
    recipient: {
      address: recipient,
    },
  };

  return { asset, tokenId: selectedToken.token_id };
}
