import { ReactElement, useState } from "react";
import useForm, { validateEmail } from "../../hooks/useForm";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { APIErrorResponse } from "../../types";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import useAuth from "../../hooks/useAuth";

interface Props {
    onSuccess: () => void
}

const LoginForm = (props: Props): ReactElement => {
    const [error, setError] = useState<APIErrorResponse | undefined>(undefined);
    const { login } = useAuth();

    const { registerValue, submit, loading, items } = useForm({
        items: {
            email: {
                required: true,
                validate: {
                    fn: ({  value }) => validateEmail(value)
                }
            },
            password: { required: true }
        },
        onSubmit: async ({ items }) => {
            try {
                setError(undefined);
                await login({
                    email: items.email.value as string,
                    challenge: items.password.value as string
                });
                props.onSuccess();
            } catch (error) {
                setError(error as APIErrorResponse);
            }
        }
    });

    return (
        <form
            role="form"
            className="space-y-8"
            onSubmit={async (event) => {
                event.preventDefault();
                await submit();
            }}
        >
            <LockClosedIcon className="w-8 h-8 text-indigo-400" />
            <fieldset className="space-y-4">
                <label>
                    <span>Email:</span>
                    <input
                        placeholder="diego@xaes.dev"
                        type="text"
                        value={items.email.value as string}
                        onChange={({ target }) => registerValue("email", target.value)}
                    />
                    {items.email.hasError && ( <span className="form-error">A valid email is required.</span> )}
                </label>
                <label>
                    <span>Password:</span>
                    <input
                        placeholder="Password"
                        type="password"
                        value={items.password.value as string}
                        onChange={({ target }) => registerValue("password", target.value)}
                    />
                    {items.password.hasError && ( <span className="form-error">Password is required.</span> )}
                </label>
                {error && error.errorMessage ? (
                    <span className="form-error text-center w-full capitalize">{error.errorMessage}</span>
                ) : undefined}
            </fieldset>
            <button
                disabled={loading}
                className="button button-primary w-full"
                type="submit"
            >
                <span className="flex items-center justify-center">
                    {loading ? (<ArrowPathIcon className="w-4 h-4 animate-spin text-white mr-2" />) : undefined}
                    <span>Login</span>
                </span>
            </button>
        </form>
    );
};

export default LoginForm;
