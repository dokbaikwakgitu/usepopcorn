import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    // you gotta  pass the function to save state energy when rerendered happened since once state see the function it just ignored it instead of passing the formula which will be calculated
    const storedValue = localStorage.getItem(key); // the first visit is null mean value didn't even existed yet since useEffect run after first mount completed

    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  // first parameter is just plain string to be refered in local storage (refer to you browswer console ) second parameter is truning array into json
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key],
  );

  return [value, setValue];
}
