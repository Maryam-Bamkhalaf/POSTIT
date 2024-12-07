import React from "react"; // Ensure this line is present if necessary

import userImage from "../Images/user.png"; // Import a default user image
describe("About", () => {

    it("should render the About component", () => {
  
      render(<About />);    // Render the About component in the virtual DOM provided by the testing library
  
      //Assertion: check if there is an h1 element
  
      const aboutElement = screen.getByRole('heading', {level: 1})
  
      expect(aboutElement).toBeInTheDocument();
  
    });
  
    });
  