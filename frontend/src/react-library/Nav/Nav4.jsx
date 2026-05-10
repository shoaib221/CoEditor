import { createContext, useContext, useEffect, useState } from "react"
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import '../shadow/shadow1.css'

const NavContext = createContext();

export const useNavContext = () => useContext(NavContext);

export const NavProvider = ({ children }) => {



    const [dropdown, setDropdown] = useState(false);

    useEffect(() => {
        console.log("Dropdown State Changed:", dropdown);
    }, [dropdown]);

    const scrollToIdWithOffset = (id, offset = 40) => {
        const el = document.getElementById(id);
        setDropdown(false);
        if (!el) return;

        const y =
            el.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({ top: y, behavior: "smooth" });
    };

    const Nav = () => {


        return (
            <>
                <div className="z-10 px-4 py-2 sticky top-0 w-full bg-(--color4) text-(--color1) hidden lg:flex justify-evenly" >

                    <div onClick={ () => scrollToIdWithOffset( 'about' ) } > About </div>
                    <div onClick={ () => scrollToIdWithOffset( 'skill' ) } > Skills </div>
                    <div onClick={ () => scrollToIdWithOffset( 'project' ) } > Projects </div>
                    <div onClick={ () => scrollToIdWithOffset( 'achievement' ) } > Achievements </div>
                    <div onClick={ () => scrollToIdWithOffset( 'contact' ) }> Contact </div>

                </div>

                <div className="z-30 sticky top-0 w-full bg-(--color4) text-(--color1) lg:hidden flex justify-center items-center" >
                    {dropdown ? <TiArrowSortedUp size={30} onClick={() => setDropdown(prev => !prev)} /> :
                        <TiArrowSortedDown size={30} onClick={() => setDropdown(prev => !prev)} />}
                </div>
            </>
        )
    }

    const Dropdown = () => {


        if (dropdown) return (
            <div className="z-10 px-4 py-2 w-full absolute inset-0 bg-(--color4) text-(--color1) flex flex-col items-center lg:hidden" >
                <div onClick={ () => scrollToIdWithOffset( 'about' ) } className="w-full text-center p-2 shadow-11" > About </div>
                <div onClick={ () => scrollToIdWithOffset( 'skill' ) } className="w-full text-center p-2 shadow-11" > Skills </div>
                <div onClick={ () => scrollToIdWithOffset( 'project' ) } className="w-full text-center p-2 shadow-11" > Projects </div>
                <div onClick={ () => scrollToIdWithOffset( 'achievement' ) } className="w-full text-center p-2 shadow-11" > Achievements </div>
                <div onClick={ () => scrollToIdWithOffset( 'contact' ) } className="w-full text-center p-2 shadow-11" > Contact </div>
            </div>
        )

        return null;

    }

    return (
        <NavContext.Provider value={{ Nav, Dropdown }}>
            {children}
        </NavContext.Provider>
    )

}

//          
