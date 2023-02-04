import axios from "axios";

const instance = axios.create({
  baseURL: `/api/`,
  withCredentials: true,
});

export async function post(route, body = {}) {
  return await instance
    .post(`${route}`, body)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function get(route) {
  return await instance
    .get(`${route}`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function createTransaction(recipientAddress, utxos, amount) {
  return await post(`create-mining-transaction`, {
    recipientAddress,
    utxos,
    amount,
  });
}

export async function signTransaction(_oid, signedTx) {
  return await post(`sign-transaction`, {
    _oid,
    signedTx,
  });
}

export async function markUsedPass(fingerprint, redeemer) {
  return await post(`mark-used-pass`, {
    fingerprint,
    redeemer,
  });
}

export async function markAsMinted(tokenIds, hash, minter) {
  return await post(`mark-minted`, {
    tokenIds,
    hash,
    minter,
  });
}

export async function getAllPasses() {
  return await get(`all-pass`);
}
