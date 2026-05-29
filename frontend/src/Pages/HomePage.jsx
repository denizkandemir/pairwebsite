import Header from "../Components/Header/Header";
import Blog from "../Components/Blog/Blog";
import useSeoMeta from "../hooks/useSeoMeta";
import { pageSeo } from "../seo/siteSeo";

const HomePage = () => {
    useSeoMeta(pageSeo.home);

    return (
        <div>
            <Header />
            {/* <Blog /> */}
        </div>
    )
}

export default HomePage;