import "./Error.scss";
import { useNavigate } from "react-router-dom";
export default function Error() {
  const navigator = useNavigate();
  const handleClick = () => {
    navigator("/");
  };
  return (
    <div className="w-100vw h-100vh flex items-center justify-center page-error">
      <div>
        <div className="font-size-150px font-bold h-130px flex justify-center">
          <i className="i-tabler-error-404 color-#333"></i>
        </div>
        <div className="font-size-14px text-center color-gray">
          Page Not Found
        </div>
        <div className="mt-20px">
          <div className="lh-40px back-home-btn" onClick={handleClick}>
            Back to the home page
          </div>
        </div>
      </div>
    </div>
  );
}
