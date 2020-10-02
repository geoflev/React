import React from "react";

const withClass = (WrappedComponent, className) => {
  // you spread the props you get into this new WrappedComponent
  return (props) => (
    <div className={className}>
      <WrappedComponent {...props} />
    </div>
  );
};

export default withClass;
