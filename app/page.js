
'use client'
import Hero from '../components/Hero';

export default function App() {

  return (
    <main>
        <Hero />
    </main>
  );
}

// 'use client'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from '../components/Home';
// import Hero from '../components/Hero2';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Hero />} />
//         <Route path="/events" element={<div>Events Page</div>} />
//         <Route path="/photos" element={<div>Photos Page</div>} />
//         <Route path="/about" element={<div>About Page</div>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// 'use client'
// import Image from "next/image";
// import artda from "../public/assets/artda.png";
// import mjsbanner from "../public/assets/mjsbanner-01.jpg";
// import Result from '../components/Result';

// export default function Home() {

//   return (
//     <main className="flex flex-col items-center  md:space-y-12">
//       <div className="pt-12 md:pt-12 p-10 md:px-56">
//         <Image src={mjsbanner} priority className="rounded-2xl shadow-xl" alt="SSF" />
//       </div>
//       <Result />
//       <Image src={artda} priority alt="art" className="pt-14 w-[80%] animate-pulse" />
//     </main>
//   );
// }


