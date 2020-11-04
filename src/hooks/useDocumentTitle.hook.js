import { useEffect } from "react";

// function useDocumentTitle() {
//   React.useEffect(() => {
//     document.title = `${numCookies} cookies - Cookie Clicker Workshop`;

//     return () => {
//       document.title = `Cookie Clicker Workshop`;
//     };
//   }, [numCookies]);
// }

const useDocumentTitle = (title, fallbackTitle) => {
  useEffect(() => {
    document.title = title;
    return () => (document.title = fallbackTitle);
  }, [fallbackTitle]);
  return;
};

export default useDocumentTitle;
