import React from "react";
import Layout from "../../Layouts/Layout"
import "./AboutUs.css";

const AboutUs = () => {
    return (
        <Layout>
            <div className="about-us-container">
                <div className="about-us-left">
                    <h1>What does it mean to be <span className="brand-color">Wattwise</span>?</h1>

                    <p>
                        To be Wattwise means to embrace a brighter, sustainable
                        future. It means being informed and empowered,
                        understanding that every watt we consume can either
                        deplete our world or enrich it. At Wattwise, we believe
                        in a future where being green isn't a compromise—it's a
                        win-win for both our pockets and our planet.
                    </p>

                    <p>
                        Founded with the vision of bridging the gap between
                        energy providers and consumers, we've embarked on a
                        mission to change the narrative of energy consumption.
                        By aligning interests and fostering transparency, we're
                        making it easier for everyone to make smarter, more
                        conscious energy choices.
                    </p>

                    <p>
                        But it's not just about offering choices. It's about
                        providing solutions that resonate with your values,
                        aspirations, and commitment to a healthier environment.
                        We're passionate about helping households and businesses
                        unlock savings, reduce their carbon footprint, and
                        contribute to a sustainable world.
                    </p>

                    <p>
                        With Wattwise, you're not just conserving energy; you're
                        investing in a movement. A movement that champions
                        efficiency, celebrates innovation, and upholds
                        responsibility.
                    </p>

                    <p>
                        Together, we're lighting the path towards an
                        eco-conscious world, ensuring that every watt consumed
                        contributes to a brighter, greener tomorrow.
                    </p>

                    <p className="call-to-action">
                        Join us, and be Wattwise. Because a sustainable future
                        starts with you.
                    </p>
                </div>
                <div className="about-us-right">
                <img
                    src={process.env.PUBLIC_URL + "/about-us.png"}
                    alt=""
                    className="about-us-img"
                />
                </div>
            </div>
        </Layout>
    );
};

export default AboutUs;
