import React from 'react'
import { useSelector } from 'react-redux'

const BarcodeDetail = (props) => {
    let {clearClick} = props;
    const lastBarcodeData = useSelector(state => state.lastBarcodeData);
    const barcodeFormat = useSelector(state => state.barcodeFormat);
    return (
       <div className='barcode-panel'>
        <div className='d-flex justify-content-between'>
            <p className='font-weight-bold'>1 item</p>
            <p className='cursor-style grey' onClick={clearClick}>Clear</p>
        </div>
        <div className='responsive-barcode'>
            <div className='nested-responsive-barcode'>
                <img src='/images/barcode.jpg' alt="barcode" width={80} height={70}/>
                <div className='pt-3 ms-4'>
                    <h5>{barcodeFormat.replace(/_/g, "-").toUpperCase()}</h5>
                    <p className='grey'>{lastBarcodeData}</p>
                </div>
            </div>
            <img src='/images/search.png' width={55} height={55} alt='search'/>
        </div>
       </div>
    )
}

export default BarcodeDetail