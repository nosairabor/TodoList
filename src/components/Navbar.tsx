import {BsSunFill} from "react-icons/bs"
import {BsMoonFill} from "react-icons/bs"
import { useState } from "react";
import { useAppDispatch,useAppSelector } from "../store";
import { toggleLight } from "../store/lightSlice";

const Navbar = () => {
    // const [light, setLight] = useState(false);

    const light = useAppSelector((state) => state.light.light);
    const dispatch = useAppDispatch();

    // const toggleLight = () =>{
    //     setLight(!light)
    // }
    return (
        <div className="">
            <div className="relative" >
                {light ?(
                    <img src={require("../photos/bg-desktop-light.jpg")}  className="min-h-[260px] md:h-full"/>
                ):(
                    <img src={require("../photos/bg-desktop-dark.jpg")} className="min-h-[260px] md:h-full"/>
                )

                }
            </div>
            
            {/* <div className="flex -translate-y-[120px] md:justify-center  md:space-x-[300px]">
                
                <h1 className="text-white  text-[34px] tracking-[10px] font-extrabold">TODO</h1>
                <div onClick={()=> dispatch(toggleLight())} className="mt-2">
                    {light ? (
                        <BsMoonFill className="text-white text-[30px]"/>
                    ):(
                        <BsSunFill className="text-yellow text-[30px]"/>
                    )}
                </div>
                
            </div> */}
        </div>
    );
}
 
export default Navbar;