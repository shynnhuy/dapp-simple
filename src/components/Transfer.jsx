import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { ethers } from "ethers";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TokenArtifact from "../contracts/Token.json";
import contractAddress from "../contracts/contract-address.json";
import { setTransaction } from "../redux";

const Transfer = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const tokenData = useSelector((state) => state.tokenData);
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState(0);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const transferToken = async () => {
    if (!to) {
      enqueueSnackbar("You must enter the receiver address!", {
        variant: "error",
      });
      return;
    }

    if (amount <= 0) {
      enqueueSnackbar("Number of amount must greater than 0!", {
        variant: "error",
      });
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const token = new ethers.Contract(
      contractAddress.Token,
      TokenArtifact.abi,
      provider.getSigner(0)
    );

    try {
      const transaction = await token.transfer(to, amount);
      dispatch(setTransaction(transaction.hash));

      const receipt = await transaction.wait();

      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }
      await token.balanceOf(user);
      enqueueSnackbar(
        `Successfully transfer to ${to} ${amount} ${tokenData.symbol}`
      );
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Receiver Address"
            size="small"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Amount"
            size="small"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Grid>
      </Grid>
      <Stack direction={"row"} spacing={2} mt={2}>
        <Button fullWidth variant="outlined" color="error">
          Back
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="info"
          onClick={transferToken}
        >
          Transfer
        </Button>
      </Stack>
    </Box>
  );
};

export default Transfer;
