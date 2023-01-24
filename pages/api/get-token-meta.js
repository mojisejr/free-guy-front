import axios from "axios";

const url = "http://localhost:3333";

export async function getTokenMetaOf(tokenId) {
  const result = await axios.get(`${url}/tokens/${tokenId}`);
  return result.data;
}

export async function markTokenAsMinted(tokenId, hash, minter) {
  const result = await axios.put(
    `${url}/tokens/minted/${tokenId}/${hash}/${minter}`,
    {
      token_id: tokenId,
      hash,
      minter,
    }
  );
  //increase minted token
  await axios.put(`${url}/info/minted`);
  return result.data;
}

export async function getAllUnmintedTokens() {
  const result = await axios.get(`${url}/tokens/unminted`);
  return result.data;
}

// pub token_id: u32,
// pub minter: String,
// pub og_meta: String,
// pub masked_meta: String

export async function createNewMetadata(
  token_id,
  minter,
  og_meta,
  masked_meta
) {
  const { data } = await axios.post(`${url}/meta`, {
    token_id,
    minter,
    og_meta,
    masked_meta,
  });

  return data;
}

export async function getMetadataOf(tokenId) {
  const { data } = await axios.get(`${url}/meta/${tokenId}`);
  return data;
}

export async function markAsCompleted(tokenId) {
  const { data } = await axios.put(`${url}/meta/${tokenId}`);
  return data;
}
