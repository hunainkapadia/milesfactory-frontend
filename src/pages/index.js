import HeroSection from "../component/HeroSection";
import Footer from "../component/layout/Footer";
import Header from "../component/layout/Header";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../store/features/counter/counterSlice";
import { Button } from "@mui/material";

const Home = () => {
   const count = useSelector((state)=> state.counter.value);
   const dispatch = useDispatch();
   // const count = useSelector((state)=> state.counter.value);
   // const dispatch = useDispatch();
  return (
    <>
      <main className="basecolor1-light-bg">
        <Header />
        {/* counter value {count} */}
        {/* <Button onClick={()=> dispatch(increment())}>Inc</Button>
        <Button onClick={()=> dispatch(decrement())}>Dec</Button> */}
        <HeroSection />
        <Footer />
      </main>
    </>
  );
};

export default Home;
