declare module "react-native-reanimated/mock" {
  const mock: any; // you could try to be more specific, but `any` is safe here
  export = mock;
}
