import { Box, Button } from "@mui/material";

const WalletConnect = ({ connectWallet }) => {
  return (
    <Button variant="contained" onClick={connectWallet}>
      Connect to your wallet
    </Button>
  );
};

export default WalletConnect;
