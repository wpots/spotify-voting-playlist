import LoginButton from "@/app/_components/Auth/LoginButton";
import { Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Welcome from "@/app/_components/Auth/Welcome";

export default function SignIn() {
  return (
    <Container maxWidth="sm">
      <Grid2 container>
        <Grid2 xs display="flex" justifyContent="center" alignItems="center">
          <Welcome>
            <LoginButton>Inloggen</LoginButton>
          </Welcome>
        </Grid2>
      </Grid2>
    </Container>
  );
}
