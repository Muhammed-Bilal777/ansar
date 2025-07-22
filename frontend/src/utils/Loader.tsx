import React from "react"
import { Vortex } from "react-loader-spinner"

const Loader = () => {
    return (
        <div className="loader" style={{
            textAlign: "center", padding: "50px", display: "flex", justifyContent: "center", height: "100vh", alignContent: "center", alignItems: "center"


        }}>
            <Vortex
                visible={true}
                height="300"
                width="300"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={['#0c7715', '#f50595', '#f50595', '#f50595', '#0c7715', '#0c7715']}
            />
        </div>
    )
}

export default Loader
