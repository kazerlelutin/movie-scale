import { render } from "@testing-library/react";
import Verify from "./Verify";
import "@testing-library/jest-dom";
import { SessionProvider } from "next-auth/react";

describe("Verifiy", () => {
  it("renders verify unchanged", () => {
    const { container } = render(
      <SessionProvider session={null}>
        <Verify />
      </SessionProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
