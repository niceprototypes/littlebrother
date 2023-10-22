const text = {
  fontSize: {
    display: 36,
    h1: 24,
    h2: 18,
    p1: 15,
    p2: 12,
    p3: 10,
  },
  fontWeight: {
    black: 600,
    bold: 500,
    medium: 400,
  },
  lineHeight: {
    condensed: 1,
    normal: 1.375,
  },
}

const core = {
  avatarSize: {
    large: 72,
    medium: 30,
    small: 22,
  },
  borderRadius: {
    medium: 8,
    small: 4,
  },
  gutter: {
    medium: 20,
    small: 10,
  },
  icon: {
    size: {
      small: 16,
      medium: 24,
    },
    strokeWidth: {
      small: 2.25,
      medium: 1.5,
    },
  },
}

const components = {
  gaugeHeight: 70,
  navBar: {
    innerHeight: 32,
    outerHeight: 60,
  },
  pillHeight: 28,
  tabBar: {
    height: 84,
    heightSafari: 72,
  },
}

const colorsLight = {
  color: {
    background: {
      primary: "#fff",
      primaryInverse: "#384149",
      secondary: "#f1f2f3",
      secondaryInverse: "#384149",
    },
    border: {
      primary: "#95a1ad",
      primaryInverse: "#95a1ad",
      secondary: "rgba(0, 0, 0, 0.1)",
      secondaryInverse: "rgba(255, 255, 255, 0.1)",
    },
    content: {
      primary: "#202325",
      primaryInverse: "#fff",
      secondary: "#616C77",
      secondaryInverse: "rgba(255, 255, 255, 0.6)",
      tertiary: "#95a1ad",
      tertiaryInverse: "#86929d",
    },
    link: {
      primary: "#007eee",
      primaryInverse: "#007eee",
    },
    loyalty: {
      primary: "#3cb465",
      primaryInverse: "#3cb465",
    },
    party: {
      democrat: {
        primary: "#3fa4fb",
        primaryInverse: "#52afff",
      },
      independent: {
        primary: "#f59743",
        primaryInverse: "#ffa85a",
      },
      republican: {
        primary: "#eb5f5f",
        primaryInverse: "#ff7070",
      },
    },
  },
}

const colorsDark = {
  color: {
    background: {
      primary: "#282a2a",
      primaryInverse: "#fff",
      secondary: "#1d1f1f",
      secondaryInverse: "#384149",
    },
    border: {
      primary: "#78808a",
      primaryInverse: "#78808a",
      secondary: "rgba(255, 255, 255, 0.1)",
      secondaryInverse: "rgba(0, 0, 0, 0.1)",
    },
    content: {
      primary: "#ffffff",
      primaryInverse: "#202325",
      secondary: "#abb3bd",
      secondaryInverse: "rgba(255, 255, 255, 0.6)",
      tertiary: "#78808a",
      tertiaryInverse: "#86929d",
    },
    link: {
      primary: "#007eee",
      primaryInverse: "#007eee",
    },
    loyalty: {
      primary: "#3cb465",
      primaryInverse: "#3cb465",
    },
    party: {
      democrat: {
        primary: "#3fa4fb",
        primaryInverse: "#3fa4fb",
      },
      independent: {
        primary: "#ffa04b",
        primaryInverse: "#ffa04b",
      },
      republican: {
        primary: "#f36565",
        primaryInverse: "#eb5f5f",
      },
    },
  },
}

const desktop = {
  desktop: {
    viewportWidth: 400,
  },
}

const theme = {
  dark: {
    ...colorsDark,
    ...text,
    ...core,
    ...components,
    ...desktop,
  },
  light: {
    ...colorsLight,
    ...text,
    ...core,
    ...components,
    ...desktop,
  },
}

export default theme
