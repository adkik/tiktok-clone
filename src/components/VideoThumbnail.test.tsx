import { act, render } from "@testing-library/react-native";
import VideoThumbnail from "./VideoThumbnail";
import { useThumbnails } from "@/stores/use-thumbnails";

const THUMBNAIL_IMAGE_TESTID = "thumbnail-image";
const LOADING_INDICATOR_TESTID = "loading-indicator";
const URI = "mock-uri";

describe("VideoThumbnail", () => {
  beforeEach(() => {
    useThumbnails.setState({ cache: new Map() });
  });

  it("renders image when uri is loaded", () => {
    act(() => {
      useThumbnails.getState().set("1", URI);
    });

    const { getByTestId } = render(<VideoThumbnail id="1" />);

    expect(getByTestId(THUMBNAIL_IMAGE_TESTID).props.source).toBe(URI);
  });

  it("renders loading state until uri is loaded", () => {
    const { getByTestId, queryByTestId } = render(<VideoThumbnail id="1" />);

    expect(queryByTestId(THUMBNAIL_IMAGE_TESTID)).toBeNull();
    expect(queryByTestId(LOADING_INDICATOR_TESTID)).toBeTruthy();

    act(() => {
      useThumbnails.getState().set("1", URI);
    });

    expect(getByTestId(THUMBNAIL_IMAGE_TESTID).props.source).toBe(URI);
    expect(queryByTestId(LOADING_INDICATOR_TESTID)).toBeNull();
  });
});
