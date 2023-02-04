export function buildRedeemer(tokenIds = [], cost, recipientKeyHash) {
  if (tokenIds.length <= 0) {
    console.log("buildRedeemer: error tokenIds is empty");
    return;
  }

  console.log("minting", tokenIds);

  const tokens = tokenIds.map((id) => parseInt(id));

  // const redeemer = {
  //   tag: "MINT",
  //   data: {
  //     alternative: 0,
  //     fields: [
  //       //list need new alternative fields
  //       { alternative: 0, fields: tokenIds },
  //       cost,
  //       //map need new alternative fields
  //       { alternative: 0, fields: [recipientKeyHash] },
  //     ],
  //   },
  // };

  const redeemer = {
    tag: "MINT",
    data: {
      alternative: 0,
      fields: [
        [tokens],
        parseInt(cost),
        { alternative: 0, fields: [recipientKeyHash] },
      ],
    },
  };
  return redeemer;
}
