import { render} from "@testing-library/react";
import Home from "./Index";
import "@testing-library/jest-dom";
import { SessionProvider } from "next-auth/react";

describe("Home", () => {
  it("renders homepage unchanged", () => {
    const { container } = render(
      <SessionProvider session={null}>
        <Home />
      </SessionProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
