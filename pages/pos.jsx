import BasicTable from "../src/pages-sections/pos/Table";

const Pos = ({ posData }) => {
  return (
    <div>
      <BasicTable posData={posData} />
    </div>
  );
};

export const getStaticProps = async () => {
  // --------------------------------------------
  //  FETCH OPTOINS // REQUEST HEADERS
  // --------------------------------------------
  const myHeaders = new Headers();
  myHeaders.append("X-localization", "ar");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  // --------------------------------------------
  //  FETCH OPTOINS // REQUEST HEADERS
  // --------------------------------------------

  const posData = await fetch(
    "https://sinbad-store.com/api/v2/pos",
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  return {
    props: { posData: posData.data },
  };
};

export default Pos;
