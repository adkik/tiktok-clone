export const StyleSheet = {
  create: (factory: any) => {
    const generated = factory(require("@/styles/theme").lightTheme, {
      fontScale: 1,
    });

    return {
      ...generated,
      useVariants: jest.fn().mockImplementation(() => generated),
    };
  },
  configure: jest.fn(),
};

export const useUnistyles = () => {
  // import at runtime to break circular dependency
  const themeModule = require("@/styles/theme");

  return {
    theme: themeModule.lightTheme, // override per-test if needed
    rt: { insets: { top: 0, bottom: 0, left: 0, right: 0 } },
  };
};
