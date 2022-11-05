import { Box, BoxProps, Grid } from "@chakra-ui/react";

export default function Home() {
  const defaultProps : BoxProps = {
    padding: "30px",
    fontWeight: "bold"
  }
  return (
    <Grid
      templateAreas={
        "'navbar navbar navbar' 'sidebar main main' 'sidebar footer footer'"
      }
      minHeight="100vh"
      gridTemplateRows={"80px auto 100px"}
      gridTemplateColumns={"300px auto"}
    >
      <Box {...defaultProps} gridArea={"navbar"} bg="red.400">
        navbar
      </Box>
      <Box {...defaultProps} gridArea={"sidebar"} bg="red.300">
        sidebar
      </Box>
      <Box {...defaultProps} gridArea={"main"} bg="pink.400">
        main
      </Box>
      <Box {...defaultProps} gridArea={"footer"} bg="blue.400">
        footer
      </Box>
    </Grid>
  );
}
