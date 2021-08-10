//==============================================================================
// Mock native modules
//    see https://reactnavigation.org/docs/testing/
// This actually isn't necessary, but it removes an annoying warning that would
//    otherwise show for every test
//==============================================================================
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
