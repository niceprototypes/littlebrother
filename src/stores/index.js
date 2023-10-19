import {createStore, persist} from "easy-peasy"
import bills from "./bills"
import following from "./following"
import legislators from "./legislators"
import settings from "./settings"
import votes from "./votes"

export default createStore(
  persist(
    {
      bills,
      following,
      legislators,
      settings,
      votes,
    },
    {
      // deny: [],
      storage: "localStorage",
    }
  )
)
