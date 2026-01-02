import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";

function App() {
  const [data, changeData] = useState([
    {
      name: "Burger",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
      heading: "Juicy grilled burger",
      details:
        "A delicious burger with fresh lettuce, tomato, and melted cheese. Perfect for any meal.",
    },
    {
      name: "Pasta",
      image:
        "https://images.unsplash.com/photo-1525755662778-989d0524087e?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
      heading: "Creamy Italian pasta",
      details:
        "Rich and creamy pasta made with authentic Italian herbs and spices for a delightful taste.",
    },
    {
      name: "Ice Cream",
      image:
        "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
      heading: "Cold sweet delight",
      details:
        "A scoop of heavenly ice cream topped with chocolate syrup and crunchy nuts.",
    },
    {
      name: "Sushi",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
      heading: "Fresh Japanese sushi",
      details:
        "Handcrafted sushi rolls with fresh salmon, rice, and seaweed for a flavorful experience.",
    },
    {
      name: "Salad",
      image:
        "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
      heading: "Healthy green salad",
      details:
        "A refreshing mix of greens, veggies, and nuts tossed with a light vinaigrette dressing.",
    },
  ]);
  return (
    <>
      <Navbar />
      <div className="p-5 flex flex-wrap gap-5">
        {data.map((d) => (
          <Card cardData={d} />
        ))}
      </div>
    </>
  );
}

export default App;
