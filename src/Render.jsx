import React, {lazy} from "react"
import VideoScreen from "./funcs/videoScreen"


const Navbar = lazy(() => import("./global/navbar"))
const Render = lazy(() => import("./render/index"))
const About = lazy(() => import("./components/about"))
const Brands = lazy(() => import("./components/brands"))
const Services = lazy(() => import("./components/services"))
const PopularItems = lazy(() => import("./components/popularItems"))
const FAQ = lazy(() => import("./components/questions"))
const Testmonials = lazy(() => import("./components/testmonials"))
const Footer = lazy(() => import("./global/footer"))

function RenderAllComponents({backend}) {
  return (
    <>
    <Navbar />
    {/* <VideoScreen /> */}
    <Render backend={backend}/>
    <About />
    <Brands backend={backend} />
    <Services backend={backend}/>
    <PopularItems backend={backend} />
    <Testmonials />
    <FAQ backend={backend}/>
    <Footer />
    </>
  )
}

export default RenderAllComponents;
