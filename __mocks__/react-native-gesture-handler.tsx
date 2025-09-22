import React, { ReactNode } from "react";

export const GestureDetector = ({ children }: { children: ReactNode }) => (
  <>{children}</>
);

function createMockGesture() {
  return {
    toGestureArray: () => [createMockGesture()],
    runOnJS: () => createMockGesture(),
    onStart: () => createMockGesture(),
    onEnd: () => createMockGesture(),
    onTouchesDown: () => createMockGesture(),
    onFinalize: () => createMockGesture(),
  };
}

export const Gesture = {
  Tap: () => createMockGesture(),
};
