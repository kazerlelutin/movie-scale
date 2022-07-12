export default function clickOutside(refs: Array<any>, setter: Function) {
  window.addEventListener("mousedown", (e) => {
    refs.map((ref) => {
      if (ref.current && !ref.current.contains(e.target)) {
        const 
            el = e.target as HTMLInputElement,
            ignore = el.getAttribute('data-ignore')
       if(ignore !== "true"){
        setter();
       }
      }
      return ref;
    });
  });
}
