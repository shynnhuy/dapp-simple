import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  Container,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";

import TokenArtifact from "./contracts/Token.json";
import contractAddress from "./contracts/contract-address.json";

import WalletConnect from "./components/WalletConnect";
import { setBalance, setTokenContract, setTokenData, setUser } from "./redux";
import { useNavigate, Outlet } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const balance = useSelector((state) => state.balance);
  const tokenData = useSelector((state) => state.tokenData);

  const navigate = useNavigate();

  const intializeEthers = async (userAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const _token = new ethers.Contract(
      contractAddress.Token,
      TokenArtifact.abi,
      provider.getSigner(0)
    );
    const name = await _token.name();
    const symbol = await _token.symbol();
    const balance = await _token.balanceOf(userAddress);
    dispatch(setTokenContract(_token));
    dispatch(setTokenData({ name, symbol }));
    dispatch(setBalance(balance));
  };

  //   const getTokenData = async () => {
  //   };

  //   const getBalance = async (userAddress) => {
  //     const balance = await token?.balanceOf(userAddress);
  //   };

  const initialize = (userAddress) => {
    dispatch(setUser(userAddress));
    intializeEthers(userAddress);
    // if (token) {
    // getTokenData();
    // getBalance(userAddress);
    // }
  };

  const connectWallet = async () => {
    const [selectedAddress] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    initialize(selectedAddress);
    window.ethereum.on("accountsChanged", ([newAddress]) => {
      initialize(newAddress);
    });
  };

  if (!user) {
    return <WalletConnect connectWallet={connectWallet} />;
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card sx={{ p: 2 }}>
        <Box>
          <Typography variant="h4" textAlign={"center"} my={2}>
            Shynn Non-fungible Token
          </Typography>
          <Box display={"flex"}>
            <Typography variant="body1">
              Welcome <b>{user}</b>
              <br />
              You have <b>{balance?.toString()}</b> {tokenData?.symbol} in your
              wallet.
            </Typography>
            <Box alignSelf={"center"} ml={2}>
              <IconButton onClick={() => initialize(user)}>
                <RefreshIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        {!user ? <WalletConnect connectWallet={connectWallet} /> : <Outlet />}
      </Card>
    </Container>
  );
}

export default App;
