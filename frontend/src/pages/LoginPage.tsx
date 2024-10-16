import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from 'react-router-dom';
import Typography from '../components/Typography';
import Input from '../components/Input';
import Button from '../components/Button';
import { ROUTER_KEYS } from '../keys';
import { setAccessToken, setRefreshToken } from '../utils/auth';

function LoginPage() {
  const data = useActionData() as
    | { error: boolean; message: string }
    | undefined;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="h-screen flex flex-1 justify-center bg-radial-blur">
      <section className="grid text-center h-full items-center p-8">
        <div>
          <Typography variant="h2" color="blue-gray" className="mb-2">
            Log In
          </Typography>
          <Typography className="mb-8 text-gray-600 font-normal text-[18px]">
            Enter your email and password to log in
          </Typography>
          <Form method="post" className="mx-auto max-w-sm text-left">
            <Input
              label="Your email"
              type="email"
              name="email"
              id="email"
              placeholder="m.loshak@example.com"
              containerClassName="mb-5"
              pattern="\S+@\S+\.\S+"
              disabled={isSubmitting}
              required
            />

            <Input
              label="Your password"
              type="password"
              name="password"
              placeholder="•••••••••••"
              containerClassName="mb-5"
              minLength={6}
              error={data?.error ? data.message : undefined}
              disabled={isSubmitting}
              required
            />
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border accent-gray-800 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-gray-300"
                  disabled={isSubmitting}
                />
              </div>
              <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Remember me
              </label>
            </div>
            <Button
              type="submit"
              color="black"
              isLoading={isSubmitting}
              fullWidth
            >
              Submit
            </Button>
          </Form>
          <Typography className="mt-5 text-gray-600 font-normal text-[18px]">
            Don't have an account?{' '}
            <Link
              to={`/${ROUTER_KEYS.SIGNUP}`}
              className="text-gray-900 underline"
            >
              Sign up
            </Link>
          </Typography>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;

export async function action({ request }: { request: Request }) {
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  const baseurl = import.meta.env.VITE_API_URL as string;

  try {
    const response = await fetch(`${baseurl}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authData),
    });

    const responseData = await response.json();
    if (response.status === 401) {
      return { error: true, message: responseData.message };
    }
    if (!response.ok) {
      console.error(`Error ${response.status}: ${responseData}`);
      throw new Error(`Error ${response.status}: ${responseData}`);
    }

    const { accessToken, refreshToken } = responseData;

    console.log('Logged in successfully:', responseData);

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  } catch (error) {
    console.error('Error logging in:', error);
  }

  return redirect('/dashboard');
}
