# Sheeshafinance
*Author: Robert Keyan*

### Assignment

(0) Technologies - React / Angular, Node.JS, Solidity

(1) There must be a file with the list of 5 addresses and the number of tokens in there.

You need to write:

(2) Small SmartContract where there will be addresses and the number of tokens attached to them

(3) On the front client must connect his metamask and:  
(3.1) see the number of tokens on his balance  
(3.2) claim any amount of tokens to his address from the smart contract address  
(3.3) only the wallets among those five can claim tokens  


### Solution overview
For monorepo management I choose [nx](https://nx.dev/), this is great tool with own ecosystem and flexible configurations.
> NOTE: this is my first experience to create the web app with Nx :)

**Smart Contract**  
For the Smart contract development, I used [Hardhat](https://hardhat.org).  
I was using the *local node* of hardhat instead of using Testnets, but it's easy to switch if you have [Infura](https://infura.io/) or [Alchemy](https://www.alchemy.com/) accounts.    
The assignment requires to have "whitelist" addresses, so I prefer to walk with the [MarkleTree](https://en.wikipedia.org/wiki/Merkle_tree) cryptographic algorithm.

**Backend**
The backend is responsible to provide the *whitelisted wallets*, managing them, and generating the MarkleTree hash with verification method
> NOTE: The initial wallets list stored in `packages/app/src/app/wallets.json`

**Frontend**
The Frontend is a basic React web page, to interact with a deployed contract with `ether.js`.

**Testing**
Sadly, I didn't have the time to write the tests for Smart contract :(

### Packages
- React.js (packages/client)
- Nest.js (packages/app)
- Hardhat (packages/hardhat)

### Requirements
Node.js v16+, NPM, Metamask extension in chrome 

### Step-by-step guide

1. Just setup the dependencies with `npm install`
2. Run the local node of hardhat on your machine by `npm run hardhat:node`
3. Open other terminal window and run `npm run backend`
4. Once Backend is started, open another instance of the terminal and deploy the contract via `npm run deploy:contract`
   > Note: Deployment script, request to the backend for whitelisted wallets and MarkleRoot, which is required arguments for contract deployment
5. Copy the *contract address* from the output and go to `packages/client/src/environments/environment.ts` and replace the `contractAddress` value with the new copied address.
6. As all steps passed successfully, just run `npm run client` to open the React app
7. Take a breath..., we 1 step ahead of achieving our goal :)
8. In the final step, you just need to take a few actions in Metamask to order to make the Metamask work with our local node.
   Just read this [article](https://www.web3.university/article/how-to-build-a-react-dapp-with-hardhat-and-metamask), which properly shows how you can do it.
> NOTE: Please take an attention to write custom "correct" nonce for everytime you run the local node, 
> because everytime when you run it, the nonce is reset the value but Metamask keep old one.

# Thank you for review. 
