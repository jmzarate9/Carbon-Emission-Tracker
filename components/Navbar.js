import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { firebaseAuth } from "../firebase-config/config";
import navbarStyles from './styles/Navbar.module.css';

const Navbar = () => {
    const router = useRouter();
    const [showDropdown, setShowDropdown] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogoClick = () => {
        router.push('/');
    };

    const handleAboutClick = () => {
        router.push('/about');
    };

    const handleLearnClick = () => {
        router.push('/carbon-emissions');
    };

    const handleLogin = () => {
        if (isAuthenticated) {
            // User is authenticated, sign out
            firebaseAuth.signOut()
                .then(() => {
                    // Redirect to home after sign out
                    router.push('/');
                })
                .catch((error) => {
                    console.error('Error signing out:', error);
                });
        } else {
            // User is not authenticated, go to login page
            router.push('/login');
        }
    };

    const handleEstimatesMouseEnter = () => {
        setShowDropdown(true);
    };
    
    const handleEstimatesMouseLeave = () => {
    setShowDropdown(false);
    };

    // Handle the Authentication
    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
            setIsAuthenticated(!!user); // Convert to boolean value
        });

        return () => unsubscribe();
    }, []);

    return (
        <nav className={navbarStyles.navbar}>
            <div className={navbarStyles.logo} onClick={handleLogoClick}>
                Carbon Emissions Tracker
            </div>
            <ul className={navbarStyles.navList}>
                <li className={`${navbarStyles.navItem} ${navbarStyles.estimates}`} 
                onMouseEnter={handleEstimatesMouseEnter}
                onMouseLeave={handleEstimatesMouseLeave}>
                Estimates
                {showDropdown && (
                    <ul className={navbarStyles.dropdownContent}>
                    <li>
                        <Link href="/estimates/electricity">Electricity Emission</Link>
                    </li>
                    <li>
                        <Link href="/estimates/flights">Flights Emission</Link>
                    </li>
                    <li>
                        <Link href="/estimates/vehicles">Vehicle Emission</Link>
                    </li>
                    <li>
                        <Link href="/estimates/fuels">Fuel Combustion Emission</Link>
                    </li>
                    </ul>
                )}
                </li>
                <li className={navbarStyles.navItem} onClick={handleAboutClick}>About</li>
                <li className={navbarStyles.navItem} onClick={handleLearnClick}>Carbon Emissions</li>
                <li className={navbarStyles.navItem} onClick={handleLogin}>
                    {isAuthenticated ? <button className={navbarStyles.btn}>Sign Out</button> : <button className={navbarStyles.btn}>Get Started</button>}
                </li>
            </ul>
        </nav>

    )
}

export default Navbar;

//DONE//TODO: If the user is logged in change the "Get Started" to Sign Out