import "./Banner.scss";

const Banner = ({ title, titleClass, backgroundImage, texts, buttonText, imgClass }) => {
    return (
        <div className="banner-container">
            <div className="banner-content-container">
                <div className="banner-text-container">
                    <h3 className={`banner-title ${titleClass || ''}`}>
                        {title}
                    </h3>
                    {
                        texts.map((text) => (
                            <p className="banner-text" key={text.id}>
                                {text.text}
                            </p>
                        ))
                    }
                    {/* <button className="banner-button">{buttonText}</button> */}
                    <div className="banner-line"></div>
                </div>
                <div className="banner-background-img-container">
                    <img src={backgroundImage} alt="" className={`banner-background-img ${imgClass || ''}`} />
                </div>
            </div>
        </div>
    )
}

export default Banner;