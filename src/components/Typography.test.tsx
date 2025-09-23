import { render } from "@testing-library/react-native";
import { useUnistyles } from "react-native-unistyles";
import { Typography } from "./Typography";

describe("Typography", () => {
  it("renders children correctly", () => {
    const { getByText } = render(<Typography>Hello</Typography>);

    expect(getByText("Hello")).toBeTruthy();
  });

  it("renders default font family for all variants", () => {
    const { theme } = useUnistyles();

    const { getByRole } = render(<Typography />);

    expect(getByRole("text").props.style[0]?.fontFamily).toBe(theme.fonts.base);
  });

  it("overrides variant styles with explicit `styles` prop", () => {
    const { getByRole } = render(
      <Typography isPrimary style={{ color: "red" }}>
        Hello
      </Typography>
    );
    const text = getByRole("text");

    const mergedColor = text.props.style
      .map((style: any) => style.color)
      .filter(Boolean)
      .pop();
    expect(mergedColor).toBe("red");
  });
});
