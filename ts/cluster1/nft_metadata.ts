import wallet from "../turbin3-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Replace this with your actual image URI from nft_image.ts
        const imageUri = "https://devnet.irys.xyz/FZ64SH5yDrWUzsPjK8JATjRnpTHaeVGv45juF5wq4y5y";
        
        // Create metadata following Metaplex JSON structure
        const metadata = {
            name: "Rugged Skull",
            symbol: "RSKULL",
            description: "You didn’t lose money. You gained lore.",
            image: imageUri,
            attributes: [
                { trait_type: "Rug Status", value: "Absolutely Rugged" },
                { trait_type: "Wallet Balance", value: "0.0000001 SOL" },
                { trait_type: "Emotional Damage", value: "Max" },
                { trait_type: "Hope Level", value: "Delusional" },
                { trait_type: "Exit Liquidity", value: "Yes" },
                { trait_type: "Cause of Death", value: "Yield Farming" },
                { trait_type: "Audit Status", value: "Trust Me Bro" },
                { trait_type: "Afterlife", value: "Discord VC" },
                { trait_type: "Rug Severity", value: "Legendary Nuclear Rug" }
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: imageUri
                    },
                ]
            },
            creators: [
                {
                    address: signer.publicKey,
                    share: 100,
                }
            ]
        };
        
        // Upload metadata to Irys
        const myUri = await umi.uploader.uploadJson(metadata);
        console.log("Your metadata URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
