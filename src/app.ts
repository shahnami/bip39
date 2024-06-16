import { mnemonicToSeed } from "bip39";
import { hdkey } from "ethereumjs-wallet";

require("dotenv").config();

const generateAddressesFromSeed = async (seed: string, count: number) => {
  let hdwallet = hdkey.fromMasterSeed(await mnemonicToSeed(seed));
  let wallet_hdpath = "m/44'/60'/0'/0/";

  let accounts: { address: string; privateKey: string; publicKey: string }[] =
    [];
  for (let i = 0; i < count; i++) {
    let wallet = hdwallet.derivePath(wallet_hdpath + i).getWallet();
    let address = "0x" + wallet.getAddress().toString("hex");
    let privateKey = "0x" + wallet.getPrivateKey().toString("hex");
    let publicKey = wallet.getPublicKeyString();

    accounts.push({ address, privateKey, publicKey });
  }

  return accounts;
};

generateAddressesFromSeed(process.env.SEED_PHRASE ?? "", 3).then((accounts) => {
  console.log(accounts);
});
