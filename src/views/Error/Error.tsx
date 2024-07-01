import "./Error.scss";
import { useNavigate, useRouteError } from "react-router-dom";
export default function Error() {
  const navigator = useNavigate();
  const error = useRouteError() as unknown as {
    status?: string;
    code?: string;
    message?: string;
    stack?: string;
  };
  const handleClick = () => {
    navigator("/", { replace: true });
  };
  return (
    <div className="w-100vw h-100vh flex items-center justify-center page-error">
      <div className="max-w-800px m-auto">
        {error.status && Number(error.status) === 404 ? (
          <div className="font-size-150px font-bold h-80px flex justify-center">
            <i className="i-tabler-error-404 color-#dedcdc font-size-60px"></i>
          </div>
        ) : (
          <></>
        )}
        <div className="font-size-14px text-center color-gray mb-20px">
          {error.status && Number(error.status) === 404 ? "Page Not Found" : ""}
        </div>
        {error.message ? (
          <div className="font-size-12px mb-10px">{error.message}</div>
        ) : (
          <></>
        )}
        {error.stack ? <code>{error.stack}</code> : <></>}
        <div className="mt-20px flex justify-center items-center">
          <div className="lh-40px back-home-btn" onClick={handleClick}>
            Back to the home page
          </div>
        </div>
      </div>
    </div>
  );
}
