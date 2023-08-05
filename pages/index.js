import Head from 'next/head';
import { useRouter } from 'next/router';
import landingPageStyles from '@/styles/LandingPage.module.css';
import Navbar from '/components/Navbar';

const Home = () => {
  const router = useRouter();

  const handleLearnMore = () => {
    router.push('/carbon-emissions')
    }

    return (
      <>
        <Navbar />
        <div className={landingPageStyles.container}>
            <Head>
                <title>Carbon Emission Tracker</title>
                <meta name="description" content="Welcome to the Carbon Emission Tracker" />
            </Head>

            <main>
                <header className={landingPageStyles.header}>
                <h1>Carbon Emissions Tracker</h1>
                <p>Welcome to Carbon Emission Tracker: Your Path to a Greener Tomorrow! Monitor your carbon emissions, reduce your footprint, and make a positive impact on the environment. Start today, and let's create a cleaner, healthier world together.</p>
                </header>

                <section className={landingPageStyles.section}>
                    <div className={landingPageStyles.buttons}>
                        <button className={landingPageStyles.btn} onClick={handleLearnMore}>Learn More</button>

                    </div>
                    {/* <p><a href='/register'>Register</a> or <a href='/login'>Login</a> to access the carbon emission services.</p> */}
                </section>
            </main>
        </div>
      </>
  )
}

export default Home;
