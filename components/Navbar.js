import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { firebaseAuth } from "../firebase-config/config";
import Swal from 'sweetalert2';
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
            firebaseAuth.signOut()
                .then(() => {
                    router.push('/');
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully Signed Out!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
                .catch((error) => {
                    console.error('Error signing out:', error);
                });
        } else {
            router.push('/login');
        }
    }

    const handleEstimatesMouseEnter = () => {
        setShowDropdown(true);
    };
    
    const handleEstimatesMouseLeave = () => {
    setShowDropdown(false);
    };


    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
            setIsAuthenticated(!!user); 
        });

        return () => unsubscribe();
    }, []);

    const shouldRenderNavigation = !['/login', '/register'].includes(router.pathname);

    return (
        <nav className={navbarStyles.navbar}>
            <div className={navbarStyles.logo} onClick={handleLogoClick}>
                Carbon Emissions Tracker
            </div>
            {shouldRenderNavigation && (
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
                                    <Link href="/estimates/fuels">Fuel Combustion Emission</Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className={navbarStyles.navItem} onClick={() => router.push('/about')}>About</li>
                    <li className={navbarStyles.navItem} onClick={() => router.push('/carbon-emissions')}>Carbon Emissions</li>
                    <li className={navbarStyles.navItem} onClick={handleLogin}>
                        {isAuthenticated ? <button className={navbarStyles.btn}>Sign Out</button> : <button className={navbarStyles.btn}>Get Started</button>}
                    </li>
                </ul>
            )}
        </nav>
    )
}

export default Navbar;
