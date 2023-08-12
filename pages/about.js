import Link from 'next/link';
import Navbar from '@/components/Navbar';
import aboutStyles from '@/styles/About.module.css';

const AboutPage = () => {
    return (
        <>
            <Navbar />
            <div className={aboutStyles.outerContainer}>
                <div className={aboutStyles.innerContainer}>
                    <div  className={aboutStyles.content}>
                        <h1 className={aboutStyles.heading}>About</h1>
                        <p className={aboutStyles.paragraph}>
                        Welcome to my humble corner of the web, where we're all about tracking carbon emissions and making a positive impact. This project started as a personal quest to understand and address our environmental challenges.
                        </p>
                        <p className={aboutStyles.paragraph}>
                        I'm excited to mention the contribution of <a href='https://www.carboninterface.com/'>Carbon Interface</a> and their API, which significantly aids in collecting precise carbon emissions data for our platform. Thanks to their technology, we're able to offer you valuable insights into your environmental impact.
                        </p>
                        <p className={aboutStyles.paragraph}>
                        This isn't a corporate endeavor – it's a personal passion project. Join me in exploring our carbon footprints, learning, and collectively working toward a greener future. Together, we can make a real difference.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutPage;