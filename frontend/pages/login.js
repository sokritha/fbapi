import styles from "../styles/signin.module.css";
import { TextField, Box } from "@mui/material";
import { Button, Link } from "@components/commons";
import axios from "axios";

const SERVER_URL = "https://fbapi-backend.herokuapp.com/api/v1";

export default function Signin() {
  return (
    <div className={styles.container}>
      <Link href={`${SERVER_URL}/auth/facebook`}>
        <a>Facebook Login</a>
      </Link>
    </div>
  );
}
