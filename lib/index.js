/** @babel */

import {
  getConfig,
  setThemes,
  schema,
} from "./config"

let switchThemeInterval

function switchTheme() {
  const now = new Date(Date.now())
  const hours = now.getHours()
  const isDay = hours >= getConfig().sunrise && hours < getConfig().sunset
  // console.log("Atom Jour Nuit: isDay", isDay, "config", getConfig())

  setThemes(
    isDay
    ? [ getConfig().dayUITheme, getConfig().daySyntaxTheme ]
    : [ getConfig().nightUITheme, getConfig().nightSyntaxTheme ]
  )
}

export default {
  config: schema,

  activate() {
    // console.log("Atom Jour Nuit: schema", schema)

    const config = getConfig()

    // check now
    switchTheme()

    // and run loop
    // TODO run every min and listen for config changes
    switchThemeInterval = setInterval(switchTheme, 1000)

    if (!config.firstTime) {
      atom.beep()
      atom.notifications.addWarning(
        "Jour Nuit",
        {
          detail: "You should edit package settings to customize it.",
          dismissable: true,
        }
      )
      atom.config.set("jour-nuit.firstTime", true)
    }
  },

  deactivate() {
    clearInterval(switchThemeInterval)
  },
}
