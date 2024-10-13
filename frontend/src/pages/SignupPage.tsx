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

function SignupPage() {
  const data = useActionData() as
    | { error: boolean; message: string }
    | undefined;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="h-screen flex flex-1 justify-center bg-radial-blur-lg">
      <section className="grid text-center h-full items-center p-8">
        <div>
          <Typography variant="h2" color="blue-gray" className="mb-2">
            Sign Up
          </Typography>
          <Typography className="mb-8 text-gray-600 font-normal text-[18px]">
            Welcome to WeatherApp👋 Fill up the form to get started!
          </Typography>

          <Form method="post" className="mx-auto max-w-lg text-left">
            <Input
              label="Your name"
              type="text"
              name="name"
              id="name"
              placeholder="Max Loshak"
              containerClassName="mb-5"
              minLength={3}
              disabled={isSubmitting}
              required
            />
            <Input
              label="Your email"
              type="email"
              name="email"
              id="email"
              placeholder="m.loshak@example.com"
              containerClassName="mb-5"
              pattern="\S+@\S+\.\S+"
              error={data?.error ? data.message : undefined}
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
              disabled={isSubmitting}
              required
            />
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border accent-gray-800 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-gray-300"
                  disabled={isSubmitting}
                  required
                />
              </div>
              <label
                htmlFor="terms"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                I agree with terms and condidtions
              </label>
            </div>
            <Button
              type="submit"
              color="black"
              fullWidth
              isLoading={isSubmitting}
            >
              Submit
            </Button>
          </Form>
          <Typography className="mt-5 text-gray-600 font-normal text-[18px]">
            Already have an account?{' '}
            <Link
              to={`/${ROUTER_KEYS.LOGIN}`}
              className="text-gray-900 underline"
            >
              Log in
            </Link>
          </Typography>
        </div>
      </section>
    </div>
  );
}

export default SignupPage;

export async function action({ request }: { request: Request }) {
  const data = await request.formData();
  const signUpData = {
    name: data.get('name'),
    email: data.get('email'),
    password: data.get('password'),
  };

  const baseurl =
    (import.meta.env.VITE_API_URL as string) || 'http://localhost:8080';

  try {
    const response = await fetch(`${baseurl}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signUpData),
    });

    const responseData = await response.json();
    if (response.status === 400) {
      return { error: true, message: responseData.message };
    }
    if (!response.ok) {
      console.error(`Error ${response.status}: ${responseData}`);
      throw new Error(`Error ${response.status}: ${responseData}`);
    }

    console.log('Logged in successfully:', responseData);
  } catch (error) {
    console.error('Error logging in:', error);
  }

  return redirect('/login');
}
