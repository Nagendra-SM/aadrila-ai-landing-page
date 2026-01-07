import { Helmet } from "react-helmet-async";
import AboutUs from "../components/sections/AboutSection/AboutUs";
import MeetOurTeam from "../components/sections/AboutSection/MeetOurTeam";

const About = () => {

  return (
    <>
      <Helmet>
        <title>About Aadrila - Meet the Minds Behind Document Automation</title>
        <meta
          name="description"
          content="Get to know the team powering Aadrila's document automation platform and discover the vision guiding our innovation."
        />
      </Helmet>

      <section className="relative overflow-hidden pb-16 pt-8 md:pb-32 md:pt-10">
        <div className="min-h-screen">
      <AboutUs />
      <MeetOurTeam />
    </div>
      </section>
    </>
  );
};

export default About;
