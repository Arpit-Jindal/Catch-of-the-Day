import React from "react";
import PropTypes from "prop-types";

//Stateless functional component
const Header = props => (
  <header className="top">
    <h1>
      Catch
      <span className="ofThe">
        <span className="of">OF</span>
        <span className="the">THE</span>
      </span>
      Day
    </h1>
    <h3 className="tagline">
      <span>{props.tagline}</span>
    </h3>
  </header>
);

// class Header extends React.Component {
//   render() {
//     return (
//       <header className="top">
//         <h1>
//           Catch
//           <span className="ofThe">
//             <span className="of">OF</span>
//             <span className="the">THE</span>
//           </span>
//           Day
//         </h1>
//         <h3 className="tagline">
//           <span>{this.props.tagline}</span>
//         </h3>
//       </header>
//     );
//   }
// }

Header.propTypes = {
  tagline: PropTypes.string.isRequired
};

export default Header;
