import Image from "next/image";
import React from "react";

const ImagesGrid = () => {
  const inspections = [
    {
      image:
        "https://serving.photos.photobox.com/79338811f2b4314592e761807fd98a8dc4ff88db2147990e9488964a175722562847f4fc.jpg",
      id: "#1212323",
    },
    {
      image:
        "https://serving.photos.photobox.com/91021330e44f4d7ed2ef38de36cb41af0343036b301f6749b552daf61e7b9bf44019d088.jpg",
      id: "#12312323",
    },
    {
      image:
        "https://serving.photos.photobox.com/79338811f2b4314592e761807fd98a8dc4ff88db2147990e9488964a175722562847f4fc.jpg",
      id: "#12123423",
    },
    {
      image:
        "https://serving.photos.photobox.com/79338811f2b4314592e761807fd98a8dc4ff88db2147990e9488964a175722562847f4fc.jpg",
      id: "#12132323",
    },
    {
      image:
        "https://serving.photos.photobox.com/79338811f2b4314592e761807fd98a8dc4ff88db2147990e9488964a175722562847f4fc.jpg",
      id: "#12123233",
    },
    {
      image:
        "https://serving.photos.photobox.com/79338811f2b4314592e761807fd98a8dc4ff88db2147990e9488964a175722562847f4fc.jpg",
      id: "#12123253",
    },
    {
      image:
        "https://serving.photos.photobox.com/79338811f2b4314592e761807fd98a8dc4ff88db2147990e9488964a175722562847f4fc.jpg",
      id: "#121223223",
    },
    {
      image:
        "https://serving.photos.photobox.com/79338811f2b4314592e761807fd98a8dc4ff88db2147990e9488964a175722562847f4fc.jpg",
      id: "#12123231",
    },
    {
      image:
        "https://serving.photos.photobox.com/79338811f2b4314592e761807fd98a8dc4ff88db2147990e9488964a175722562847f4fc.jpg",
      id: "#12123230",
    },
    {
      image:
        "https://serving.photos.photobox.com/79338811f2b4314592e761807fd98a8dc4ff88db2147990e9488964a175722562847f4fc.jpg",
      id: "#12123232",
    },
    {
      image:
        "https://serving.photos.photobox.com/79338811f2b4314592e761807fd98a8dc4ff88db2147990e9488964a175722562847f4fc.jpg",
      id: "#12123293",
    },
    {
      image:
        "https://serving.photos.photobox.com/79338811f2b4314592e761807fd98a8dc4ff88db2147990e9488964a175722562847f4fc.jpg",
      id: "#12123323",
    },
    {
      image:
        "https://serving.photos.photobox.com/79338811f2b4314592e761807fd98a8dc4ff88db2147990e9488964a175722562847f4fc.jpg",
      id: "#1212113223",
    },
    {
      image:
        "https://serving.photos.photobox.com/79338811f2b4314592e761807fd98a8dc4ff88db2147990e9488964a175722562847f4fc.jpg",
      id: "#31212323",
    },
    {
      image:
        "https://serving.photos.photobox.com/79338811f2b4314592e761807fd98a8dc4ff88db2147990e9488964a175722562847f4fc.jpg",
      id: "#91212323",
    },
  ];
  
  return (
    <div className="w-full max-h-[30vh] overflow-auto rounded-xl shadow-box grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 p-2">
      {inspections.map((inspection) => (
        <div key={inspection.id} className="w-full h-32 rounded-xl border">
          <Image
            className="rounded-xl"
            alt="inspection thumbnail"
            src={inspection.image}
            height={440}
            width={800}
            objectFit="cover"
            objectPosition="center"
          />
        </div>
      ))}
    </div>
  );
};

export default ImagesGrid;
