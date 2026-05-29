import AboutUs from "../Components/AboutUs/AboutUs";
import AboutUsStats from "../Components/AboutUsStats/AboutUsStats";
import AboutUsValues from "../Components/AboutUsValues/AboutUsValues";
import Banner from "../Components/Banner/Banner";
import aboutMainImg from "/aboutUsBannerImg1.png";
import AboutUsTeamSection from "../Components/AboutUsTeamSection/AboutUsTeamSection";
import AboutUsFoundationSection from "../Components/AboutUsFoundationSection/AboutUsFoundationSection";
import useSeoMeta from "../hooks/useSeoMeta";
import { pageSeo } from "../seo/siteSeo";

const AboutUsPage = () => {
    useSeoMeta(pageSeo.about);

    return (
        <div className="about-us-page-container">
            <AboutUs />
            {/* <Banner
                badgeText="Discover PAIR"
                title="PAIR : Revolutinizing Psychology"
                titleHighlight="PAIR :"
                backgroundImage={aboutMainImg}
                description="Combining the realms of human cognition and technology is no simple task. At PAIR, we believe meeting that challenge requires a revolutionary kind of research culture: one that is both intellectually serious and genuinely enjoyable. We explore how mind and machine shape one another, transforming difficult research and complex findings into clear, goal-driven insight through innovative and creative means."
                chips={["Interdisciplinary Research", "Collaborative Culture", "Innovative Methods"]}
                floatingLabels={["Psychology", "Artificial Intelligence", "Research Community"]}
                detailVariant="about"
                bannerClass="about-page-banner"
                imageScale="large"
                imgClass={"banner-img about-page-banner-image"}
            />   */}
            {/* <AboutUsStats />
            
           */}
             {/* <AboutUsValues /> */}

            <AboutUsTeamSection />
            
            <AboutUsFoundationSection />
        </div>
    );
};

export default AboutUsPage;
