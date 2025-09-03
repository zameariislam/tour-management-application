import { Outlet } from "react-router"

import CommonLayout from "./components/layout/CommonLayout"
import { generatesRoutes } from "./utils/generateRoutes"
import { adminSidebarItems } from "./routes/adminSidebarItems"

 
function App() {
    const sidebar= generatesRoutes(adminSidebarItems)
     console.log(sidebar)
  return (
    <CommonLayout>
     <Outlet/>

    </CommonLayout>
  )
}
 
export default App