import HashLoader from "react-spinners/HashLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  };

const LoadingSpinner = () => {
  return (
    <HashLoader color="#9013FE" loading={true} cssOverride={override} />
  )
}

export default LoadingSpinner