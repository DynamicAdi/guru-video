import React, {lazy} from "react"
import VideoScreen from "./funcs/videoScreen"
import Selection from "./render/Selection"
import Packages from "./components/packages"

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
    <Render backend={backend}/>
    <About />
    <Selection backend={backend}/>
    <Services backend={backend}/>
    <Brands backend={backend} />
    <PopularItems backend={backend} />
    <Packages backend={backend}/>
    <Testmonials />
    <FAQ backend={backend}/>
    <Footer />
    </>
  )
}

export default RenderAllComponents;
