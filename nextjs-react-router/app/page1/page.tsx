export default async function Page1() {
  let product = 1n;
  for (let i = 1n; i <= 400n; i++) {
    product *= i;
  }
  return <div>This is page 1 {product || "loading..."}</div>;
}
