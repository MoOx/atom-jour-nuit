/** @babel */

import { schema } from "../lib/config"
import jourNuit from "../lib/index"

const noTheme = [ "", "" ]
const getThemes = () => atom.config.get("core.themes")

describe("Atom Jour Nuit", () => {
  beforeEach(() => {
    spyOn(Date, "now")
    window.setInterval = window.fakeSetInterval
    atom.config.set("core.themes", noTheme)
  })

  const initTest = (h) => {
    Date.now.andReturn(new Date(null, null, null, h).getTime())
    jourNuit.activate()
  }

  it("should change again at night", () => {
    runs(() => initTest(schema.sunset.default))
    waitsFor(
      () => getThemes()[0] != "",
      "atom didn't change theme (" + getThemes() + ")"
    )
    runs(() =>
      expect(getThemes())
      .toEqual([ schema.nightUITheme.default, schema.nightSyntaxTheme.default ])
    )
  })

  it("should change again at day light", () => {
    runs(() => initTest(schema.sunrise.default))
    waitsFor(
      () => getThemes()[0] != "",
      "atom didn't change theme (" + getThemes() + ")"
    )
    runs(() =>
      expect(getThemes())
      .toEqual([ schema.dayUITheme.default, schema.daySyntaxTheme.default ])
    )
  })

  it("should change at night", () => {
    runs(() => initTest(23))
    waitsFor(
      () => getThemes()[0] != "",
      "atom didn't change theme (" + getThemes() + ")"
    )
    runs(() =>
      expect(getThemes())
      .toEqual([ schema.nightUITheme.default, schema.nightSyntaxTheme.default ])
    )
  })

  it("should change at day light", () => {
    runs(() => initTest(10))
    waitsFor(
      () => getThemes()[0] != "",
      "atom didn't change theme (" + getThemes() + ")"
    )
    runs(() =>
      expect(getThemes())
      .toEqual([ schema.dayUITheme.default, schema.daySyntaxTheme.default ])
    )
  })
})
