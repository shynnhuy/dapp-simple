import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DApp = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Button
        variant="contained"
        color="success"
        fullWidth
        onClick={() => navigate("transfer")}
        sx={{ mt: 2 }}
      >
        Transfer
      </Button>
    </Box>
  );
};

export default DApp;
