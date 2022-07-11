import { ethers } from "ethers";
import { KeyboardEvent, useEffect, useState } from "react";
import ABI from "../../SheeshaFinanceToken.json";
import { environment } from "../environments/environment";
import {
  AppContainerStyled,
  ButtonStyled,
  CardBodyStyled,
  CardContainerStyled,
  ErrorContainerStyled,
  InputStyled
} from "./App.styled";

declare let window: any;

export function App() {
  const [amount, setAmount] = useState<number>(0);

  const [balance, setBalance] = useState<string>();
  const [currentAccount, setCurrentAccount] = useState<string>();
  const [isProcessingVerification, setIsProcessingVerification] = useState(false);
  const [contract, setContract] = useState<ethers.Contract>();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    //client side code
    if (!window.ethereum) throw new Error("Please Install Metamask");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const erc20 = new ethers.Contract(environment.contractAddress, ABI, signer);

    setContract(erc20);

    setProvider(provider);
  }, []);

  useEffect(() => {
    if (!currentAccount || !ethers.utils.isAddress(currentAccount) || !contract) return;
    getBalance();
  }, [currentAccount, contract]);

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 5000);
    }
  }, [error]);

  const getBalance = async () => {
    try {
      // @ts-ignore
      const result = await contract.balanceOf(currentAccount);
      setBalance(result.toString());
    } catch (e) {
      setError(e);
    }
  };

  const handleConnect = async () => {
    try {
      // MetaMask requires requesting permission to connect users accounts
      const accounts = await provider?.send("eth_requestAccounts", []);
      if (accounts.length > 0) {
        setCurrentAccount(ethers.utils.getAddress(accounts[0]));
      }
    } catch (e) {
      setError(e);
    }
  };

  const handleDisconnect = () => {
    setBalance(undefined);
    setCurrentAccount(undefined);
  };

  const verifyWallet = async () => {
    try {
      setIsProcessingVerification(true);
      const response = await fetch(`/api/wallets/${currentAccount}/proof`);
      return response.json();
    } catch (e) {
      setError(e);
    } finally {
      setIsProcessingVerification(false);
    }
  };

  const handleSendAmount = async () => {
    const { proof, verifiedAddress } = await verifyWallet();
    if (!verifiedAddress) {
      setError({ message: "Your wallet not whitelisted" });
      return;
    }
    if (!amount) {
      setError({ message: "Please specify amount of tokens" });
      return;
    }
    try {
      const receipt = await contract?.["claim"](proof, amount);
      await receipt.wait();
      await getBalance();
      setAmount(100);
    } catch (e) {
      setError(e);
    }
  };

  const handleChangeAmount = (e: KeyboardEvent) => {
    const key = e.key;
    const isDelete = key === "Backspace" || key === "Delete";
    const isValid = new RegExp("[0-9]").test(key);
    if (!isValid && !isDelete) {
      e.preventDefault();
      return;
    }
  };

  return (
    <AppContainerStyled>
      <CardContainerStyled>
        {
          currentAccount
            ? <ButtonStyled onClick={handleDisconnect} type={"danger"}>Disconnect</ButtonStyled>
            : <ButtonStyled onClick={handleConnect} type={"success"}>Connect</ButtonStyled>
        }
        {currentAccount && <CardBodyStyled>
          <h1>Connected</h1>
          <p className="address">Account: {currentAccount}</p>
          <p className="balance">Balance: {balance} SFT</p>
          <div>
            <InputStyled
              type="text"
              pattern="[0-9]*"
              placeholder={"Amount of SFT"}
              value={amount}
              onKeyDown={handleChangeAmount}
              onChange={(e) => setAmount(+e.target.value)}
            />
            <ButtonStyled onClick={handleSendAmount} disabled={isProcessingVerification} type={'primary'}>Claim</ButtonStyled>
            {
              !!error && <ErrorContainerStyled>
                *{error.message}
              </ErrorContainerStyled>
            }
          </div>
        </CardBodyStyled>
        }
      </CardContainerStyled>
    </AppContainerStyled>
  );
}

export default App;
