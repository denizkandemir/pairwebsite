import "./Banner.scss";

const Banner = ({ title, backgroundImage, texts }) => {
    return (
        <div className="banner-container">
            <div className="banner-content-container">
                <div className="banner-text-container">
                    <h3 className="banner-title">
                        {title}
                    </h3>
                    {
                        texts.map((text) => (
                            <p className="banner-text" key={text.id}>
                                {text.text}
                            </p>
                        ))
                    }
                </div>
                <div className="banner-background-img-container">
                    <img src={backgroundImage} alt="" className="banner-background-img" />
                </div>
            </div>

        </div>
    )
}

export default Banner;