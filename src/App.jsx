import React, {Suspense, lazy} from "react"
import RenderAllComponents from "./Render"
import SmallLoader from "./global/loader/SmallLoader"

function App({backend}) {
  return (
    <Suspense fallback={
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw'}}>
      <SmallLoader />
    </div>
    }>
      <RenderAllComponents backend={backend} />
    </Suspense>
  )
}

export default App
