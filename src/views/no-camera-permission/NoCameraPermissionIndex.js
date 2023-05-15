import React from 'react'

const NoCameraPermissionIndex = () => {

    return (
        <div className='no-camera-access'>
            <img src='/images/camera.png' alt="barcode" width={50} height={50}/>
            <p className='ms-3 me-3 text-center'>Camera permission is required to use this app.Please enable camera access in your browser setting!</p>
        </div>
    )
}

export default NoCameraPermissionIndex