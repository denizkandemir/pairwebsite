import "./Banner.scss";
import { Link } from "react-router-dom";

const Banner = ({
    title,
    titleClass,
    titleHighlight,
    backgroundImage,
    imageSrc,
    imageAlt,
    imgClass,
    imagePosition = "right",
    badgeText,
    texts,
    description,
    secondaryDescription,
    chips,
    floatingLabels,
    primaryCta,
    secondaryCta,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
    align = "left",
    buttonText
}) => {
    const resolvedDescription = description || texts?.[0]?.text || "";
    const resolvedSecondaryDescription = secondaryDescription || texts?.[1]?.text || "";
    const resolvedImageSrc = imageSrc || backgroundImage;
    const resolvedImageAlt = imageAlt || title || "PAIR banner";

    const resolvedPrimaryCta = primaryCta || (primaryCtaLabel ? { label: primaryCtaLabel, href: primaryCtaHref } : null) || (buttonText ? { label: buttonText } : null);
    const resolvedSecondaryCta = secondaryCta || (secondaryCtaLabel ? { label: secondaryCtaLabel, href: secondaryCtaHref } : null);

    const renderTitle = () => {
        if (!titleHighlight || !title || !title.includes(titleHighlight)) {
            return title;
        }

        const parts = title.split(titleHighlight);
        return (
            <>
                {parts[0]}
                <span className="banner-title-highlight">{titleHighlight}</span>
                {parts.slice(1).join(titleHighlight)}
            </>
        );
    };

    const renderCta = (cta, variant) => {
        if (!cta?.label) return null;

        if (cta.to) {
            return (
                <Link to={cta.to} className={`banner-cta ${variant}`}>
                    {cta.label}
                </Link>
            );
        }

        if (cta.href) {
            return (
                <a href={cta.href} className={`banner-cta ${variant}`}>
                    {cta.label}
                </a>
            );
        }

        return <button className={`banner-cta ${variant}`} type="button">{cta.label}</button>;
    };

    return (
        <div className={`banner-container ${imagePosition === "left" ? "image-left" : "image-right"}`}>
            <div className="banner-content-container">
                <div className={`banner-text-container ${align === "center" ? "banner-text-center" : ""}`}>
                    {badgeText && <p className="banner-badge">{badgeText}</p>}
                    <h3 className={`banner-title ${titleClass || ''}`}>
                        {renderTitle()}
                    </h3>

                    {resolvedDescription && (
                        <p className="banner-text">{resolvedDescription}</p>
                    )}

                    {resolvedSecondaryDescription && (
                        <p className="banner-text banner-text-secondary">{resolvedSecondaryDescription}</p>
                    )}

                    {!!chips?.length && (
                        <div className="banner-chips" aria-label="Banner topics">
                            {chips.map((chip) => (
                                <span className="banner-chip" key={chip}>{chip}</span>
                            ))}
                        </div>
                    )}

                    {(resolvedPrimaryCta || resolvedSecondaryCta) && (
                        <div className="banner-cta-row">
                            {renderCta(resolvedPrimaryCta, "primary")}
                            {renderCta(resolvedSecondaryCta, "secondary")}
                        </div>
                    )}

                    <div className="banner-line" aria-hidden="true"></div>
                </div>

                <div className="banner-background-img-container">
                    <div className="banner-visual-glow" aria-hidden="true"></div>
                    {!!floatingLabels?.length && (
                        <div className="banner-floating-system" aria-hidden="true">
                            <span className="banner-orbit orbit-1"></span>
                            <span className="banner-orbit orbit-2"></span>
                            <span className="banner-node node-1"></span>
                            <span className="banner-node node-2"></span>
                            <span className="banner-node node-3"></span>
                            <span className="banner-connector connector-1"></span>
                            <span className="banner-connector connector-2"></span>
                            {floatingLabels.slice(0, 3).map((label, index) => (
                                <span key={`${label}-${index}`} className={`banner-micro-tag tag-${index + 1}`}>
                                    <span className="tag-dot"></span>
                                    <span className="tag-text">{label}</span>
                                </span>
                            ))}
                        </div>
                    )}
                    <img src={resolvedImageSrc} alt={resolvedImageAlt} className={`banner-background-img ${imgClass || ''}`} />
                </div>
            </div>
        </div>
    )
}

export default Banner;