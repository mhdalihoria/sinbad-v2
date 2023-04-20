import Navbar from "components/navbar/Navbar"
import PageHeaderUpper from "./PageHeaderUpper"

// styled component


// ==============================================================

// ==============================================================

const PageHeader = () => {
  return (
    <>
    <PageHeaderUpper />
    <div style={{height: 100}}>
    <Navbar />
    </div>
    </>
  )
}
 
export default PageHeader