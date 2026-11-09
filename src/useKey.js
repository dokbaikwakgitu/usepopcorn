import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      function callback(e) {
        //once it run the addeventlistener will listen for the whole document forever!!
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }

      document.addEventListener("keydown", callback);
      return function () {
        // cleanup function to remove event listener everytime the componennt movie detail mount so it not gonna acuumulate
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key],
  );
}
