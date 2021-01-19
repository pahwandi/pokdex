import React from "react";
import { Container } from "components/ui";

function Layout({ children }) {
  return (
    <Container>
      {children}
    </Container>
  );
};

export default Layout;