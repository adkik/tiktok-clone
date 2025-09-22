import { act, render } from "@testing-library/react-native";
import { GestureType } from "react-native-gesture-handler";
import { useUnistyles } from "react-native-unistyles";
import LikeButton from "@/components/LikeButton";
import { useLikedVideos } from "@/stores/use-liked-videos";

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
}));

describe("LikeButton", () => {
  beforeEach(() => {
    useLikedVideos.setState({ liked: new Map() });
  });

  it("renders correct color heart when not liked", () => {
    const { theme } = useUnistyles();

    const { getByTestId } = render(
      <LikeButton id="1" onTap={(() => {}) as unknown as GestureType} />
    );
    const icon = getByTestId("heart-icon");

    const inactive = theme.colors.heartIcon(false);

    expect(icon.props.color).toBe(inactive);
  });

  it("renders correct color heart when liked", () => {
    act(() => {
      useLikedVideos.getState().toggleLike("1");
    });

    const { theme } = useUnistyles();

    const { getByTestId } = render(
      <LikeButton id="1" onTap={(() => {}) as unknown as GestureType} />
    );
    const icon = getByTestId("heart-icon");

    const active = theme.colors.heartIcon(true);

    expect(icon.props.color).toBe(active);
  });

  it("reacts to like toggling", () => {
    const { theme } = useUnistyles();

    const { getByTestId } = render(
      <LikeButton id="1" onTap={(() => {}) as unknown as GestureType} />
    );
    const icon = getByTestId("heart-icon");

    // like
    act(() => {
      useLikedVideos.getState().toggleLike("1");
    });

    const active = theme.colors.heartIcon(true);

    expect(icon.props.color).toBe(active);

    // unlike
    act(() => {
      useLikedVideos.getState().toggleLike("1");
    });

    const inactive = theme.colors.heartIcon(false);

    expect(icon.props.color).toBe(inactive);
  });
});
