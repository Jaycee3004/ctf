import React, { useEffect } from 'react';

function clear() {
  console.clear();
}

export default function MyComponent() {
  useEffect(() => {
    // This code will only run after the component has been mounted, ensuring window is available
    setInterval(clear, 1);

    function handleKeydown(event) {
      console.log(event);
      if (event.key === "F12" || ((event.ctrlKey || event.altKey) && (event.code === "KeyI" || event.key === "KeyJ" || event.key === "KeyU"))) {
        event.preventDefault();
        return false;
      }
    }

    function handleContextmenu(event) {
      event.preventDefault();
      return false;
    }

    window.addEventListener('keydown', handleKeydown, true);
    window.addEventListener('contextmenu', handleContextmenu, true);

    
  }, []);

  return (
    <>
      <div>
        <h1>ConClear</h1>

        <p><b>Description:</b></p>
        <p>This technique will constantly clear the console, making it harder to debug JavaScript code via console.log and similar functions.</p>

        <p><b>Experiment:</b></p>
        <p>Just open the DevTools.</p>

        <p><b>Impact:</b></p>
        <p>As it can be circumvented by setting the "Preserve log" function, its impact is only minor.</p>
      </div>
    </>
  );
}
