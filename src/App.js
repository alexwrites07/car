// // In App.js
// import ImageSlider from "./ImageSlider";
// import './styles.css';
// import testimonials from "./testimonials.json";
// import React, { useState, useEffect } from 'react';
// import PageViewer from './PageViewer';
// import SliderComponent from './Slider';
// import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';

// function App() {
//   const containerStyles = {
//     width: "3 00px",
//     height: "180px",
//     margin: "0 auto",
//   };
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredTestimonials, setFilteredTestimonials] = useState([]);
//   const totalPages = 10; // Set the total number of pages


//   useEffect(() => {
//     // Filter testimonials based on the search term
//     const filtered = testimonials.filter(testimonial =>
//       testimonial.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredTestimonials(filtered);
//   }, [searchTerm, {testimonials}]);

//   const onNextPage = (nextPage) => {
//     if (nextPage >= 1 && nextPage <= totalPages) {
//       setCurrentPage(nextPage);
//     }
//   };

  

//   return (
//     <div>
//     <Router>
    
//       <div className="container">
//       <div className="search-container">
//           <input
//             type="text"
//             placeholder="Search by title..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

      
//       {testimonials.map((component, index) => (
//           <div key={index} className={`component ${index % 3 === 2 ? 'lastInRow' : ''}`}>
//              {/* <img src={{...component}.url} alt ="hi"></img> */}
//              <h2>{{...component}.title}</h2>
//             <div style={containerStyles}>
//         <ImageSlider slides={testimonials} />
//           </div>
//           </div>
//         ))}
        

//         {/* Add a div for the page number at the end */}
//         <div className="componento">
//           <h2>Page {currentPage}</h2>
//         </div>
//       </div>

     
//       <div className="app-container">
//         <Routes>
//           <Route path="/page/:pageNumber"  />
//         </Routes>
//         <SliderComponent totalPages={totalPages} currentPage={currentPage} onNextPage={onNextPage} />
//       </div>
//     </Router>
//     </div>
//   );

// }

// export default App;
// In App.js
import ImageSlider from "./ImageSlider";
// import './styles.css';
// import testimonials from "./testimonials.json";
// import React, { useState, useEffect } from 'react';
// import PageViewer from './PageViewer';
// import SliderComponent from './Slider';
// import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageViewer from "./PageViewer";
import SliderComponent from "./Slider";
import "./styles.css";
import testimonials from "./testimonials.json";

function App() {
  const containerStyles = {
        width: "300px",
        height: "180px",
        margin: "30% 10%",
        
      };
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [relevanceFilter, setRelevanceFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const totalPages = 10; // Set the total number of pages

  useEffect(() => {
    // Filter testimonials based on the search term
    const filtered = testimonials.filter((testimonial) =>
      testimonial.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTestimonials(filtered);
  }, [searchTerm, testimonials]);

  const onNextPage = (nextPage) => {
    if (nextPage >= 1 && nextPage <= totalPages) {
      setCurrentPage(nextPage);
    }
  };

  return (
    <Router>
      <div className="container">
        <div className="search-container">
          
          <input
            type="text"
            placeholder="Search by title..."
            // height="10px"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="search-containe">
          
          <select id="relevance" value={relevanceFilter} onChange={(e) => setRelevanceFilter(e.target.value)}>
            <option value="all">Relevance</option>
            {/* Add additional relevance options if needed */}
          </select>
        </div>
        <div className="search-containe">
          
          <select id="relevance" value={relevanceFilter} onChange={(e) => setRelevanceFilter(e.target.value)}>
            <option value="all">All-Brands</option>
            {/* Add additional relevance options if needed */}
          </select>
        </div>
          
          <br></br>
          <br></br>
          <br></br>
        </div>
        <div className="container">
        {filteredTestimonials.map((component, index) => (
          <div key={index} className={`component ${index % 3 === 2 ? 'lastInRow' : ''}`}>
             {/* <img src={{...component}.url} alt ="hi"></img> */}
             <div className="cv">
            <div style={containerStyles} >
              
        <ImageSlider slides={testimonials} />
        <h2 className="a">{{...component}.title}</h2>
        <h2 className="b">{{...component}.gas}</h2>
        <h2 className="c">{{...component}.mile}</h2>
        <h2 className="d">{{...component}.auto}</h2>
        <h2 className="e">{{...component}.rent}</h2>
        <button className="f">Rent Now </button>
        </div>
          </div>
          </div>
        ))}
        </div>
        {/* Add a div for the page number at the end */}
        <div className="component">
          <h2>Page {currentPage}</h2>
        </div>
      </div>

      {/* Existing components */}
      <div className="app-container">
        <Routes>
          <Route path="/page/:pageNumber" element={<PageViewer />} />
        </Routes>
        <SliderComponent
          totalPages={totalPages}
          currentPage={currentPage}
          onNextPage={onNextPage}
        />
      </div>
    </Router>
  );
}

export default App;
