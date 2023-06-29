import React, { ImgHTMLAttributes, useState } from "react"
import styles from "./Image.module.css"

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    alt: string;
  }

const Image: React.FC<ImageProps> = ({alt, ...props}) => {
    const [skeleton, setSkeleton] = React.useState(true)

    function handleLoad(event: React.ChangeEvent<HTMLImageElement>){
        setSkeleton(false)
        event.target.style.opacity = '1';
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.skeleton}></div>
            <img onLoad={handleLoad} className={styles.img} src="" alt={alt} {...props} />
        </div>
    )
}

export default Image