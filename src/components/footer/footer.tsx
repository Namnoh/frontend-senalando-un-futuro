import React from 'react'
import Image from "next/image";

function Footer() {
  return (
    <>
    <footer>  
      <div className="grid grid-cols-5 grid-rows-3 gap-2">
          <div className="row-span-3">
          <Image
            className=""
            src="/images/Logo_SinBG.png"
            alt=""
            width={200}
            height={200}
          />
          </div>
          <div >2</div>
          <div >3</div>
          <div >4</div>
          <div className="col-span-3 row-span-2 col-start-2 row-start-2">5</div>
          <div className="row-span-3 col-start-5 row-start-1">6</div>
      </div>
    </footer>
    </>
  )
}

export default Footer