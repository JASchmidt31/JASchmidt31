import useThemeStore from '../store/useThemeStore';

const useTheme = () => {
  const { getCurrentTheme } = useThemeStore();

  return { colors: getCurrentTheme() };
};

export default useTheme;
