import axios from "axios";

const url = process.env.API;

export async function getProjectInfo() {
  const result = await axios.get(`${url}/info`);
  return result.data;
}

export async function increaseMintedAmounts(amounts) {
  console.log("increasing minting amounts ...");
  const result = await axios.put(`${url}/info/minted/${amounts}`);
  return result.data;
}

export async function getTokenMetaOf(tokenId) {
  const result = await axios.get(`${url}/tokens/${tokenId}`);
  return result.data;
}

export async function markTokenAsMinted(tokenIds, hash, minter) {
  const result = await axios.put(`${url}/tokens/minted/multi`, {
    token_ids: tokenIds,
    hash,
    minter,
  });
  return result.data;
}

export async function getAllUnmintedTokens() {
  const result = await axios.get(`${url}/tokens/unminted`);
  return result.data;
}

export async function createNewMetadata(tokens, minter, og_meta, masked_meta) {
  const { data } = await axios.post(`${url}/meta`, {
    tokens,
    minter,
    og_meta,
    masked_meta,
  });

  return data;
}

export async function getMetadataOf(_oid) {
  const { data } = await axios.get(`${url}/meta/${_oid}`);
  return data;
}

export async function markAsCompleted(_oid) {
  const { data } = await axios.put(`${url}/meta/${_oid}`);
  return data;
}

export async function createNewPass(fingerprint, redeemer) {
  const { data } = await axios.post(`${url}/pass`, {
    fingerprint,
    redeemer,
  });
  return data;
}

export async function getAllPasses() {
  const { data } = await axios.get(`${url}/pass`);
  return data;
}
