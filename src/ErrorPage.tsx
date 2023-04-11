import { useRouteError, Link } from 'react-router-dom';
import Button from './components/Button';

export default function ErrorPage() {
  const error: any = useRouteError();

  return (
    <div id="error-page" className="w-full h-full flex items-center justify-center flex-col text-2xl">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="my-5 underline font-bold text-red-500">{error.statusText || error.message}</p>
      <div className="mt-10">
        <Link to="/">
          <Button theme="primary">HOME</Button>
        </Link>
      </div>
    </div>
  );
}
