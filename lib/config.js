/** @babel */

const filterUI = (n) => n.match(/-ui$/)
const filterSyntax = (n) => n.match(/-syntax$/)

export const schema = {
  sunrise: {
    title: "Hour of the sunrise",
    type: "number",
    default: 8,
    minimum: 0,
    maximum: 23,
  },
  sunset: {
    title: "Hour of the sunset",
    type: "number",
    default: 18,
    minimum: 0,
    maximum: 23,
  },
  nightUITheme: {
    title: "UI theme for the night",
    default: "one-dark-ui",
    type: "string",
    enum: atom.themes.getLoadedThemeNames().filter(filterUI),
  },
  nightSyntaxTheme: {
    title: "Syntax theme for the night",
    default: "one-dark-syntax",
    type: "string",
    enum: atom.themes.getLoadedThemeNames().filter(filterSyntax),
  },
  dayUITheme: {
    title: "UI theme for the day",
    default: "one-light-ui",
    type: "string",
    enum: atom.themes.getLoadedThemeNames().filter(filterUI),
  },
  daySyntaxTheme: {
    title: "Syntax theme for the day",
    default: "one-light-syntax",
    type: "string",
    enum: atom.themes.getLoadedThemeNames().filter(filterSyntax),
  },
}

export function getConfig() {
  return atom.config.get("jour-nuit") || {
    sunrise: schema.sunrise.default,
    sunset: schema.sunset.default,
    nightUITheme: schema.nightUITheme.default,
    nightSyntaxTheme: schema.nightSyntaxTheme.default,
    dayUITheme: schema.dayUITheme.default,
    daySyntaxTheme: schema.daySyntaxTheme.default,
  }
}

export function setThemes(themes) {
  const oldThemes = atom.config.get("core.themes")
  // set themes only if changes
  if (oldThemes[0] !== themes[0] || oldThemes[1] !== themes[1]) {
    atom.beep()
    atom.config.set("core.themes", themes)
  }
}
