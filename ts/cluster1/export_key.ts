import wallet from "../turbin3-wallet.json";
import bs58 from "bs58";

console.log("Private Key (import this to Phantom):");
console.log(bs58.encode(Buffer.from(wallet)));
