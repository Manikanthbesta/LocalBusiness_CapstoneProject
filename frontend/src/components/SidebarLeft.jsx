import React from 'react';
import PropTypes from 'prop-types';


const Image = ({ src }) => {
  return (
    <img
      src={src}
      alt="Sidebar Image"
      className="w-full h-auto mb-4" 
    />
  );
};

const SidebarLeft = ({ images }) => {
  const imageArray = Array.isArray(images) ? images : [];

  return (
    <div className="h-full hidden lg:block lg:w-2/12 bg-white-200 p-4">
      {imageArray.map((src, index) => (
        <Image key={index} src={src} />
      ))}
    </div>
  );
};

SidebarLeft.defaultProps = {
    images: [
        "https://th.bing.com/th/id/OIP.XeDp5SDJJL5ajss_JDzjMgHaGt?rs=1&pid=ImgDetMain",
        "https://miro.medium.com/max/1080/1*8DDN_DRuSBlM74dVYUjR9Q.png",
        "https://th.bing.com/th/id/OIP.XeDp5SDJJL5ajss_JDzjMgHaGt?rs=1&pid=ImgDetMain"
  ],
};

SidebarLeft.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

export default SidebarLeft;
