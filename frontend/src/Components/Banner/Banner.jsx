import "./Banner.scss";

const Banner = ({ title, backgroundImage, text }) => {
    return (
        <div className="banner-container">
            <div className="banner-content-container">
                <div className="banner-text-container">
                    <h3 className="banner-title">
                        {title}
                    </h3>
                    <p className="banner-text">
                        {text}
                    </p>
                </div>
                <div className="banner-background-img-container">
                    <img src={backgroundImage} alt="" className="banner-background-img" />
                </div>
            </div>

        </div>
    )
}

export default Banner;