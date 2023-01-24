import Title from "./title";

export default function Body() {
  return (
    <div>
      <Banner />
      <Title />
      <Banner />
    </div>
  );
}

function Banner() {
  return (
    <div>
      <img
        style={{ marginTop: "5px", marginBottom: "10px" }}
        src="freeguybanner.png"
        width="100%"
      ></img>
    </div>
  );
}
