export const debounce = (callback: Function, delay: number) => {
  let timerId: any = null;

  return () => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(callback, delay);
  };
};

function search() {
  console.log("search");
}

const debouncedSearch = debounce(search, 1000);

debouncedSearch();
debouncedSearch();
debouncedSearch();
debouncedSearch();
debouncedSearch();
debouncedSearch();
