import {useStoreActions, useStoreState} from "easy-peasy"
import React from "react"
import Button from "./Button"
import Card from "./Card"
import Flex from "./Flex"
import Gutter from "./Gutter"
import Screen from "./Screen"
import Text from "./Text"
import Toggle from "./Toggle"
import Separator from "./Separator"

const Settings = () => {
  // Prepare actions
  const actions = useStoreActions((actions) => ({
    toggleIsDarkMode: actions.settings.toggleIsDarkMode,
  }))

  // Prepare state
  const state = useStoreState((state) => ({
    isDarkMode: state.settings.isDarkMode,
  }))

  return (
    <Screen
      tabBarConfig={{
        selected: "settings",
      }}
    >
      <Card>
        <Gutter>
          <Text fontWeight="black">Settings</Text>
        </Gutter>
        <Gutter>
          <Flex alignItems="center" justifyContent="space-between">
            <Text>Dark mode</Text>
            <Toggle isSelected={state.isDarkMode} onChange={actions.toggleIsDarkMode} />
          </Flex>
        </Gutter>
      </Card>
      <Gutter>
        <Button isWide label="Clear local storage" onClick={() => localStorage.removeItem("[EasyPeasyStore][0]")} />
      </Gutter>
    </Screen>
  )
}

export default Settings
