import styles from "../styles/signin.module.css";
import { TextField, Box } from "@mui/material";
import { Button } from "@components/commons";
import axios from "axios";

const SERVER_URL = "http://localhost:4000/api/v1";

export default function Signin() {
  const handleOnLogin = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/auth/facebook`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <Button color="blue" variant="contained" handleOnAction={handleOnLogin}>
        Facebook Login
      </Button>
    </div>
  );
}
